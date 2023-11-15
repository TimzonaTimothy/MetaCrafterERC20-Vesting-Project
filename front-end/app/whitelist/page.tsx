import React from 'react';
import { Whitelist } from '../../components/Whitelist';

const Page = () => {
    return (
        <div>
            <h1 className='text-lg font-mono font-bold flex items-center justify-center pt-5 pb-5'>Whitelist</h1>
            <Whitelist />
        </div>
    );
}
export default Page;