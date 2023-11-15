import React from 'react';
import { Organisation } from '../../components/organisations';
const Page = () => {
    return (
        <div>
            <h1 className='text-lg font-mono font-bold flex items-center justify-center pt-5 pb-5'>Organisation Registration</h1>
            <Organisation />
        </div>
    );
}
export default Page;