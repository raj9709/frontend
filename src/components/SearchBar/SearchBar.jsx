import { Search, SearchX } from 'lucide-react'
import React from 'react'

function SearchBar({value , onChange,handleSearch,onClearSearch}) {
  return (
    <div className='w-80 flex items-center px-4 bg-slate-100 rounded-xl'>
        <input type="text" placeholder='Search Notes'
        className='w-full text-xs text-black    bg-transparent py-[11px] outline-none'
        value={value}
        onChange={onChange}/>
        {value && (<SearchX onClick={onClearSearch} className='text-xl text-slate-500 cursor-pointer hover:text-black mr-3' />)}
        <Search className='text-slate-400 cursor-pointer hover:text-black' onClick={handleSearch} />
    </div>
  )
}

export default SearchBar