'use client';
import { Input } from '@/components/ui/input';
import { Icons } from '../Icons';
import { Search } from 'lucide-react';

const SearchBar = () => {
    return (
        <div className='flex w-1/4 items-center justify-center'>
            <Icons.search className='relative left-8 text-gray-400' />
            <Input
                placeholder='Search'
                type='search'
                className='bg-gray-700 pl-10 focus:bg-white focus:text-gray-900'
            />
        </div>
    );
};

export default SearchBar;
