"use client";
import React, {useState, useEffect} from 'react';
import myabi from "../myabi.json";
import { BigNumber, ethers } from "ethers";

export function  Stakeholder () {
    const [beneficiaryAddress, setBeneficiaryAddress] = useState('');
    const [amount, setAmount] = useState('');
    const [vestingPeriod, setVestingPeriod] = useState('');
    const [stakeholderType, setStakeholderType] = useState('');

    const contractABI = myabi;
    const contractAddress = "0x93723624D8d63378b3Aa22C86d7deaa821341edB";
    console.log('Contract Address:', contractAddress);
    console.log('Contract ABI:', contractABI);


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('beneficiary Address:',beneficiaryAddress);
    console.log('amount:', amount);
    console.log('vestingPeriod:', vestingPeriod);
    console.log('stakeholderType:', stakeholderType);
    try {
        // Call the registerStakeholder function directly
        await registerStakeholder();
        console.log('Stakeholder Registration Done');
      } catch (error) {
        console.error('Error:', error);
      }
    };
    const registerStakeholder = async () => {
        try {
          if (typeof window !== 'undefined' && window.ethereum) {
            const provider = new ethers.providers.Web3Provider(window.ethereum as any);
            const signer = provider.getSigner();
            const bal = await signer.getAddress();
            const VestingContract = new ethers.Contract(
              contractAddress,
              contractABI,
              signer
            );
      
            const stakeHolderRegistration = await VestingContract.addStakeholder(
              beneficiaryAddress,
              amount,
              vestingPeriod,
              stakeholderType
            );
            console.log('Registration Done');
          }
        } catch (error) {
          console.error('Error in registerStakeholder:', error);
          // Display user-friendly error messages or handle errors as needed
        }
      };
      
   

    return (
        <div className='container-fluid'>
            <div className="gap-8 items-center justify-center">
                <form className="shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-white text-sm font-bold mb-2" htmlFor="beneficiary Address">
                    beneficiary Address
                    </label>
                    <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="beneficiary Address"
                    type="text"
                    placeholder="Enter Beneficiary Address"
                    value={beneficiaryAddress}
                    onChange={(e) => setBeneficiaryAddress(e.target.value)}
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-white text-sm font-bold mb-2" htmlFor="symbol">
                    Amount
                    </label>
                    <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="symbol"
                    type="number"
                    placeholder="Enter Amount"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    />
                </div>
                <div className="mb-6">
                    <label className="block text-white text-sm font-bold mb-2" htmlFor="symbol">
                    Vesting Period
                    </label>
                    <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="symbol"
                    type="number"
                    placeholder="Enter Vesting Period"
                    value={vestingPeriod}
                    onChange={(e) => setVestingPeriod(e.target.value)}
                    />
                </div>
                
                <div className="mb-6">
                    <label className="block text-white text-sm font-bold mb-2" htmlFor="">
                    Stakeholder Type
                    </label>
                    <select
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="stakeholderType"
              value={stakeholderType}
              onChange={(e) => setStakeholderType(e.target.value)}
            >
                <option value="" disabled>Select Type</option>
                <option value={0}>Founder</option>
              <option value={1}>Investor</option>
              <option value={2}>Other</option>
            </select>
                    
                </div>
                <div className="flex items-center justify-between">
                    <button
                    className="outline outline-offset-2 outline-4 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    type="submit"
                    >
                    Submit
                    </button>
                </div>
                </form>
            </div>
        </div>
    );
}
