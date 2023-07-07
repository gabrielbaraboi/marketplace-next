'use client';
import { Input } from '@/components/ui/input';

const SearchBar = () => {
    return (
        <div className=' w-1/4'>
            <Input
                placeholder='Search'
                type='search'
                className=' bg-gray-700 focus:bg-white focus:text-gray-900'
            />
        </div>
    );
};

export default SearchBar;
