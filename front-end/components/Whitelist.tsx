"use client";
import React, {useState, useEffect} from 'react';
import myabi from "../myabi.json";
import { BigNumber, ethers } from "ethers";

export function Whitelist () {
    const [address, setAddress] = useState('');
    const [whitelistResult, setWhitelistResult] = useState('');
    const [withdrawalResult, setWithdrawalResult] = useState('');
    const contractABI = myabi;
    const contractAddress = "0x93723624D8d63378b3Aa22C86d7deaa821341edB";


    const handleEligibility = async (e: React.FormEvent) => {
        e.preventDefault();
        console.log('beneficiary Address:',address);
        
        try {
            // Call the registerStakeholder function directly
            await whitelistCheck();
           
          } catch (error) {
            console.error('Error:', error);
          }
        };
        const whitelistCheck = async () => {
            try {
              if (typeof window !== 'undefined' && window.ethereum) {
                const provider = new ethers.providers.Web3Provider(window.ethereum as any);
                const signer = provider.getSigner();
                
                const VestingContract = new ethers.Contract(
                  contractAddress,
                  contractABI,
                  signer
                );

                const stakeholderExists = await VestingContract.stakeholders(address);
                if (!stakeholderExists.whitelisted) {
                    setWhitelistResult('Stakeholder does not exist or is not whitelisted');
                    return;
                }
          
                const whitelistingCheck = await VestingContract.whitelistAddress(
                  address, { gasLimit: 200000 }
                );
                setWhitelistResult(whitelistingCheck ? 'Address is whitelisted' : 'Address is not whitelisted');

              }
            } catch (error) {
              console.error('Error in whitelistcheck: ', error);
              // Display user-friendly error messages or handle errors as needed
            }
          };


          const handleWithdrawal = async (e: React.FormEvent) => {
            e.preventDefault();
            
            
            try {
                // Call the registerStakeholder function directly
                await withdrawal();
                console.log('Withdrawal Done');
              } catch (error) {
                console.error('Error:', error);
              }
            };
            const withdrawal = async () => {
                try {
                  if (typeof window !== 'undefined' && window.ethereum) {
                    const provider = new ethers.providers.Web3Provider(window.ethereum as any);
                    const signer = provider.getSigner();
                    const signerAddress = await signer.getAddress();
                    const VestingContract = new ethers.Contract(
                      contractAddress,
                      contractABI,
                      signer
                    );
              
                    const withNow = await VestingContract.claimTokens(
                    );
                    setWithdrawalResult('Withdrawal successful');
    
                  }
                } catch (error) {
                  console.error('Error in withdrawal: ', error);
                  // Display user-friendly error messages or handle errors as needed
                }
              };

    return (
        <div className='container-fluid'>
            <div className="gap-8 items-center justify-center">
                <form className="shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleEligibility}>
                
                <div className="mb-6">
                    <label className="block text-white text-sm font-bold mb-2" htmlFor="symbol">
                    Check Eligibility
                    </label>
                    <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="symbol"
                    type="text"
                    placeholder="Enter Address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    />
                </div>
                
                <p className="text-white">{whitelistResult}</p>
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


            <div className="mt-5 gap-8 items-center justify-center">
                <form className="shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleWithdrawal}>
                        
                <div className="flex items-center justify-between">
                    <button
                    className="outline outline-offset-2 outline-4 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    type="submit"
                    >
                    Withdraw Now
                    </button>
                </div>

                <p className="text-white">{withdrawalResult}</p>
                </form>
            </div>
        </div>
    );
}
