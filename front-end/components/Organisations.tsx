"use client";
import React, { useState, useEffect  } from 'react';
import myabi from "../myabi.json";
import { BigNumber, ethers } from "ethers";

declare var window: any
export function  Organisation () {
    const contractABI = myabi;
    const contractAddress = "0x93723624D8d63378b3Aa22C86d7deaa821341edB";
    const [name, setName] = useState('');
    const [symbol, setSymbol] = useState('');
    const [orgAddress, setOrgAddress] = useState('');
    const [tokenAddress, setTokenAddress] = useState('');
    console.log('Contract Address:', contractAddress);
    console.log('Contract ABI:', contractABI);

    
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        console.log('name:', name);
        console.log('symbol:', symbol);
        console.log('orgAddress:', orgAddress);
        console.log('tokenAddress:', tokenAddress);
      
        try {
          // Call the registerOrganisation function directly
          await registerOrganisation();
          console.log('Registration Done');
        } catch (error) {
          console.error('Error:', error);
        }
      };
      
      const registerOrganisation = async () => {
        if (typeof window !== 'undefined' && window.ethereum) {
          const provider = new ethers.providers.Web3Provider(window.ethereum as any);
          const signer = provider.getSigner();
          const bal = await signer.getAddress();
          const VestingContract = new ethers.Contract(
            contractAddress,
            contractABI,
            signer
          );
      
          try {
            const registration = await VestingContract.registerOrganization(
              name,
              symbol,
              orgAddress,
              tokenAddress
            );
            console.log('Registration Done');
          } catch (e) {
            console.log(e);
          }
        }
      };
      

    return (
        <div className='container-fluid'>
            <div className="gap-8 items-center justify-center">
                <form className="shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <div className="mb-4">
                    <label className="block text-white text-sm font-bold mb-2" htmlFor="symbol">
                    Name
                    </label>
                    <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="symbol"
                    type="text"
                    placeholder="Enter Name"
                    required
                    onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div className="mb-6">
                    <label className="block text-white text-sm font-bold mb-2" htmlFor="symbol">
                    Symbol
                    </label>
                    <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="symbol"
                    type="text"
                    placeholder="Enter Org Symbol"
                    required
                    onChange={(e) => setSymbol(e.target.value)}
                    />
                </div>
                <div className="mb-6">
                    <label className="block text-white text-sm font-bold mb-2" htmlFor="orgAddress">
                    Org Address
                    </label>
                    <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="orgAddress"
                    type="text"
                    placeholder="Org Wallet Address"
                    required
                    onChange={(e) => setOrgAddress(e.target.value)}
                    />
                </div>
                <div className="mb-6">
                    <label className="block text-white text-sm font-bold mb-2" htmlFor="tokenAddress">
                    Token Address
                    </label>
                    <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="tokenAddress"
                    type="text"
                    placeholder="Token Address"
                    required
                    onChange={(e) => setTokenAddress(e.target.value)}
                    />
                </div>
                <div className="flex items-center justify-between">
                    <button
                    className="outline outline-offset-2 outline-4 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    type="submit"
                    onClick={(e)=>handleSubmit(e)}
                    >
                    Submit
                    </button>
                </div>
                </form>
            </div>
        </div>
    );
}
