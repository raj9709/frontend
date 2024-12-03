import React, { useState } from 'react';
import ProfileInfo from '../Cards/ProfileInfo';
import './Navbar.css';
import { useLocation, useNavigate } from 'react-router-dom';
import SearchBar from '../SearchBar/SearchBar';
const Navbar = ({userInfo, onSearchNote, handleClearSearch}) => {

  const [searchQuery,setSearchQuery] = useState("")
  const navigate = useNavigate();
  const location = useLocation()
  const home = () =>{
    navigate("/dashboard")
  }
  const onLogout =()=> {
    localStorage.clear();
    navigate("/login")
  }

  const handleSearch = ()=>{
    if (searchQuery) {
      onSearchNote(searchQuery)
    }
  }

  const onClearSearch=()=>{
    setSearchQuery("")
    handleClearSearch()
  }
  const nav = () =>{
    navigate("")
  }

  return (
    <div className="flex items-center justify-between px-6 py-3 bg-[#be95c4] shadow-md">
      {/* Left Side: Logo or Brand */}
      <h2 onClick={nav} className="text-xl text-black font-medium italic font-mono glow-on-hover">Note iT</h2>

      {/* Search Bar */}
      <SearchBar value={searchQuery}
      onChange={({target})=> {setSearchQuery(target.value)}}
      handleSearch={handleSearch}
      onClearSearch={onClearSearch}/>

      {/* Right Side: Profile Info */}
      {location.pathname !== "/login" && location.pathname !== "/signup" && <ProfileInfo userInfo={userInfo} onLogout={onLogout} />}
    </div>
  );
};

export default Navbar;
