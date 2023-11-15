"use client";
import React, {useState} from 'react';

export function  Stakeholder () {
    const [amount, setAmount] = useState('');
    const [vestingPeriod, setVestingPeriod] = useState('');
    const [stakeholderType, setStakeholderType] = useState('');


  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('amount:', amount);
    console.log('vestingPeriod:', vestingPeriod);
    console.log('stakeholderType:', stakeholderType);
  };

    return (
        <div className='container-fluid'>
            <div className="gap-8 items-center justify-center">
                <form className="shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-white text-sm font-bold mb-2" htmlFor="symbol">
                    Amount
                    </label>
                    <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="symbol"
                    type="text"
                    placeholder="Enter Name"
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
                    type="text"
                    placeholder="Enter Org Symbol"
                    value={vestingPeriod}
                    onChange={(e) => setVestingPeriod(e.target.value)}
                    />
                </div>
                
                <div className="mb-6">
                    <label className="block text-white text-sm font-bold mb-2" htmlFor="">
                    Stakeholder Type
                    </label>
                    <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id=""
                    type="text"
                    placeholder="Type/Role"
                    value={stakeholderType}
                    onChange={(e) => setStakeholderType(e.target.value)}
                    />
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
