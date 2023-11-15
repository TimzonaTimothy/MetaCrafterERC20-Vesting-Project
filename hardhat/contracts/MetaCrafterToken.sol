// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";

contract CustomToken is ERC20, Ownable {
    using SafeMath for uint256;

    struct Organization {
        string name;
        string symbol;
        address orgAddress;
        address tokenAddress;
    }

    mapping(address => Organization) public organizations;

    enum StakeholderType { Founder, Investor, Other } //types of stakeholders

    struct Stakeholder {
        uint256 amount;
        uint256 vestingPeriod;
        uint256 releaseTime;
        bool whitelisted;
        StakeholderType stakeholderType; // Type of stakeholder
    }

    mapping(address => Stakeholder) public stakeholders;
    mapping(address => StakeholderType) public stakeholderTypes;

    event TokensClaimed(address indexed beneficiary, uint256 amount);
    event AddressWhitelisted(address indexed beneficiary);

    constructor() ERC20("MetaToken", "MTN") {
        transferOwnership(0x109D25547BD97E4ED7f8362f27e50F084521D033);
        _mint(msg.sender, 100000 * 10 ** 18);
    }

    modifier onlyOrg(address orgAddress) {
        require(
        msg.sender == organizations[orgAddress].orgAddress || msg.sender == organizations[orgAddress].orgAddress,
        "Caller is not the owner or a member of the organization"
    );
    _;
    }

    function mint(address to, uint256 amount) public onlyOwner {
        _mint(to, amount);
    }

    function registerOrganization(string memory name,string memory symbol,address orgAddress, address tokenAddress) external {
        require(organizations[orgAddress].orgAddress == address(0), "Organization already exists");
        organizations[orgAddress] = Organization(name, symbol,orgAddress,tokenAddress);
    }

    function addStakeholder(
        address beneficiary,
        uint256 amount,
        uint256 vestingPeriod,
        StakeholderType stakeholderType
    ) external onlyOrg(msg.sender) {
        require(!stakeholders[beneficiary].whitelisted, "Stakeholder already exists");
        stakeholders[beneficiary] = Stakeholder({
            amount: amount,
            vestingPeriod: vestingPeriod,
            releaseTime: block.timestamp + vestingPeriod,
            whitelisted: false,
            stakeholderType: stakeholderType
        });

        stakeholderTypes[beneficiary] = stakeholderType; 
    }

    function whitelistAddress(address beneficiary) external onlyOrg(msg.sender) {
        require(stakeholders[beneficiary].amount > 0, "Stakeholder does not exist");
        require(!stakeholders[beneficiary].whitelisted, "Address already whitelisted");
        stakeholders[beneficiary].whitelisted = true;
        emit AddressWhitelisted(beneficiary);
    }

    function claimTokens() external {
        require(stakeholders[msg.sender].whitelisted, "Address not whitelisted");
        require(block.timestamp >= stakeholders[msg.sender].releaseTime, "Vesting period not over");

        uint256 amount = stakeholders[msg.sender].amount;
        stakeholders[msg.sender].amount = 0;

        _transfer(owner(), msg.sender, amount);

        emit TokensClaimed(msg.sender, amount);
    }
}


