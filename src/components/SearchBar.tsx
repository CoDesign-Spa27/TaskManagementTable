'use client';
import React, { useState } from 'react';
import { useTaskContext } from '../context/TaskContext';
import { Search } from 'lucide-react';

const SearchBar: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const { searchTasks } = useTaskContext();
  const [isExpanded, setIsExpanded] = useState(false);

  const handleIconClick = () => {
    setIsExpanded(true);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    searchTasks(query);
  };

  const handleBlur = () => {
    setIsExpanded(false);
  };

  return (
    <div className="relative px-3 flex items-center" onBlur={handleBlur} tabIndex={-1}>
 
      {!isExpanded && (
        <div
          className="absolute inset-y-0 left-4 flex items-center sm:hidden cursor-pointer"
          onClick={handleIconClick}
        >
          <Search className="bg-[#941B0F] w-10 h-10 p-2 text-white rounded-md" />
        </div>
      )}
 
      <div
        className={`absolute inset-y-0 sm:left-6 left-7 top-3 items-center pointer-events-none ${
          isExpanded ? 'block' : 'hidden sm:block'
        }`}
      >
        <svg
          className="w-4 h-4 text-gray-500 dark:text-gray-400"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 20 20"
        >
          <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
          />
        </svg>
      </div>

  
      <input
        type="search"
        className={`block p-2 pl-10 text-sm border rounded transition-all duration-300 ease-in-out focus:w-[300px] focus:opacity-100 focus:outline-none ${
          isExpanded ? 'w-[300px] opacity-100' : 'w-0 opacity-0 sm:w-[300px] sm:opacity-100'
        }`}
        placeholder="Search"
        onChange={handleSearch}
        value={searchQuery}
        onFocus={handleIconClick}
      />
    </div>
  );
};

export default SearchBar;
