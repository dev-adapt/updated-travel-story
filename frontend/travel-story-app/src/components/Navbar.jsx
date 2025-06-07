import React from 'react';
import ProfileInfo from './Cards/ProfileInfo';
import LOGO from"../assets/images/travel_story_logo.svg";
import { useNavigate } from 'react-router-dom';
import SearchBar from './Input/SearchBar';
const Navbar = ({userInfo,searchQuery,setSearchQuery,onSearchNote,handleClearSearch}) => {
  const isToken=localStorage.getItem("token");

   const navigate=useNavigate();


  const onLogout = () =>{
    localStorage.clear();
    navigate("/login");
  };
const handleSearch=()=>{
  if(searchQuery){
    onSearchNote(searchQuery);
  }
};
const onClearSearch=()=>{
  handleClearSearch();
  setSearchQuery("");
};

  return (
    <div className='bg-white  flex items-center justify-between px-0 py-0 drop-shadow sticky top-20 z-10 '>
      <img src={LOGO} alt='travel story' className='h-12'/>
      {isToken &&(
        <>
        <SearchBar
        value={searchQuery}
        onChange={({target})=>{
          setSearchQuery(target.value);
        }}
        handleSearch={handleSearch}
        onClearSearch={onClearSearch}/>
          <ProfileInfo userInfo={userInfo} onLogout={onLogout}/>{""}
          </> 
        )}
         
    </div>
  )
}

export default Navbar;
