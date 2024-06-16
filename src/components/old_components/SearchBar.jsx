import resetSearch from '../../assets/old_assets/close.png';
import searchIcon from '../../assets/old_assets/searchicon.png';
import { useState } from 'react';

export default function SearchBar({searchFilter, resetList}) {
  const [searchTerm, setSearchTerm] = useState('');

  function inputHandler(event) {
    setSearchTerm(event.target.value);
  }

  function searchHandler(event) {
    if (event.key === 'Enter') {
      event.preventDefault();
      searchFilter(searchTerm);
    }
  }
  function searchHandlerClick() {
    searchFilter(searchTerm);
  }
  function clearSearch() {
    setSearchTerm('');
    resetList();
  }

  return (
    <div id="SEARCHBARCONTAINER" className='flex flex-1 relative pl-2 justify-center items-center'>
      <div id='SEARCHBARWRAPPER' className='relative'>
      <input
        id="search-bar"
        type="text"
        placeholder="Search"
        value={searchTerm}
        onChange={inputHandler}
        onKeyPress={searchHandler}
        className='w-full border-[1px] rounded-full min-w-[88px] max-w-[130px] border-green-500 outline-none pl-[6px] font-buttons bg-black focus:bg-gray-700 placeholder-green-500 pr-[46px] sm:max-w-[240px] text-green-500'
      />
      {searchTerm && (
      <img
        id="reset"
        alt="reset-search-icon"
        src={resetSearch}
        onClick={clearSearch}
        className='w-3 h-3 z-10 absolute right-[30px] bottom-[7px]'
      />)}
      <img
        id="search"
        alt="search-icon"
        src={searchIcon}
        onClick={searchHandlerClick}
        className='w-[14px] h-[14px] z-10 absolute right-[10px] bottom-[6px]'
      />
      {/* <p className='search-tag'>Search</p> */}
      </div>
    </div>
  );
}

