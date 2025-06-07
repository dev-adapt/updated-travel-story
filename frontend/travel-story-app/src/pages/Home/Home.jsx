import React, { useState,useEffect, useCallback } from "react";
import Navbar from "../../components/Navbar";
import {useNavigate} from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import TravelStoryCard from "../../components/Cards/TravelStoryCard";
import AddEditTravelStory from "./AddEditTravelStory";
import ViewTravelStory from "./ViewTravelStory";
import {MdAdd} from "react-icons/md";
import { ToastContainer ,toast} from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
import Modal from "react-modal";
import EmptyCard from "../../components/Cards/EmptyCard";

import { DayPicker } from "react-day-picker";
import moment from "moment";
import debounce from "lodash.debounce"; 
import FilterInfoTitle from "../../components/Cards/FilterInfoTitle";
import { getEmptyCardMessage,getEmptyCardImg } from "../../utils/helper";
const Home = () => {
  const navigate =useNavigate();

  const[userInfo,setUserInfo]=useState(null);
  const[allStories,setAllStories]=useState([]);
  const[searchQuery,setSearchQuery]=useState('');
  const[filterType,setFilterType]=useState('');

  const[dateRange,setDateRange]=useState({from:null, to:null});
  const[openAddEditModal,setOpenAddEditModal]=useState({
    isShown:false,
    type:"add",
    data:null,
  });

  const[openViewModal,setOpenViewModal]=useState({
    isShown:false,
    data:null,
  });

  //Get user info
  const getUserInfo= async ()=>{
    try{
      const response=await axiosInstance.get("/get-user");
      if(response.data && response.data.user){
        //set user info if data exists
        setUserInfo(response.data.user);
      }
    }catch(error){
      if(error.response.status === 401){
        //clear storage if unauthorized
        localStorage.clear();
        navigate("/login");//redirect to login
      }
    }
  };
  

  //get all travel stories
const getAllTravelStories=async()=>{
  try{
    const response=await axiosInstance.get("/get-all-stories");
      if(response.data && response.data.stories){
        setAllStories(response.data.stories)
      }
  }catch(error){
    console.log("An unexpected error occurred. Please try again.")
  }
}

//Handle edit story click
const handleEdit=(data)=>{
  setOpenAddEditModal({isShown:true, type:"edit",data:data});
};

//handle travel story click
const handleViewStory=(data)=>{
  setOpenViewModal({isShown:true,data});
};

//handle update favourite
const updateIsFavourite=async (storyData)=>{
  const storyId=storyData._id;
  try{
    const response=await axiosInstance.put(
      "/update-is-favourite/"+storyId,
      {
        isFavourite:!storyData.isFavourite,
      }
    )
    if(response.data && response.data.story){
      toast.success("Story Updated Successfully");
      if(filterType==="search" && searchQuery){
        onSearchStory(searchQuery);
      }else if(filterType==="date"){
        debouncedFilterStoriesByDate(dateRange);
      }else{
       getAllTravelStories();}
    }
  }catch(error){
    console.log("An unexpected error occurred. Please try again.")
  }
};
//Delete travel story
const deleteTravelStory=async (data)=>{
  const storyId=data._id;
  try{
    const response=await axiosInstance.delete("/delete-story/"+storyId);
    if(response.data && !response.data.error){
      toast.error("Story Deleted Successfully");
      setOpenViewModal((prevState)=>({...prevState,isShown:false}));
      getAllTravelStories();
    }
  }catch (error) {
   console.log("An unexpected error occurred. Please try again.")
}
}
//search story
const onSearchStory=async(query)=>{
    try{
      const response=await axiosInstance.get("/search",{
        params:{
          query,
        },
      });
      if(response.data && response.data.stories){
        setFilterType("Search");
        setAllStories(response.data.stories);
      }
    }catch(error){
      console.log("An unexpected error occurred. Please try again.")
    }
}

const handleClearSearch=async(query)=>{
  setFilterType("");
  getAllTravelStories();
}

//handle filter travel story by date range
// const filterStoriesByDate= async(day)=>{
//   try{
//     const startDate=day.from? moment(day.from).valueOf():null;
//     const endDate=day.to?moment(day.to).valueOf():null;
//     if(startDate && endDate){
//       const response=await axiosInstance.get("/travel-stories/filter",{
//         params:{startDate,endDate},
//       });
//       if(response.data && response.data.stories){
//         setFilterType("date");
//         setAllStories(response.data.stories);
//       }
//     }
//   }catch(error){
//     console.log("An unexpected error occurred. Please try again search.")
//   }
// }

const debouncedFilterStoriesByDate = useCallback(
  debounce(async (day) => {
    try {
      const startDate = day.from ? moment(day.from).valueOf() : null;
      const endDate = day.to ? moment(day.to).valueOf() : null;

      if (startDate && endDate) {
        const response = await axiosInstance.get("/travel-stories/filter", {
          params: { startDate, endDate },
        });

        if (response.data && response.data.stories) {
          setFilterType("date");
          setAllStories(response.data.stories);
        }
      }
    } catch (error) {
      console.error("An unexpected error occurred. Please try again.");
    }
  }, 1500), // Debounce delay of 1500ms
  []
);

// Handle day selection
const handleDayClick = (day) => {
  setDateRange(day);

  // Trigger debounced API call only when both dates are selected
  if (day.from && day.to) {
    debouncedFilterStoriesByDate(day);
  }
}
//handle date range select
// const handleDayClick = (day) => {
//   setDateRange(day);

//   // Only filter stories when both `from` and `to` dates are selected
//   if (day.from && day.to) {
//     filterStoriesByDate(day);
//   }
// };

// let filterTimeout;
// const handleDayClick = (day) => {
//   setDateRange(day);

//   if (day.from && day.to) {
//     clearTimeout(filterTimeout);
//     filterTimeout = setTimeout(() => {
//       filterStoriesByDate(day);
//     }, 1000); // 500ms delay
//   }
// };
const resetFilter=()=>{
  setDateRange({from:null,to:null});
  setFilterType("");
  getAllTravelStories();
}
  useEffect(()=>{
    getAllTravelStories();
    getUserInfo();
    
    return ()=>{};
  },[]);


  

  return( <>
  <div><Navbar userInfo={userInfo} searchQuery={searchQuery} setSearchQuery={setSearchQuery} onSearchNote={onSearchStory} handleClearSearch={handleClearSearch}/>
  </div>
    
    <div className="container mx-auto py-0">

<FilterInfoTitle
    filterType={filterType}
    filterDates={dateRange}
      onClear={()=>{
        resetFilter();
      }}
    />

    <div className="flex gap-7">
    <div className="flex-1">
     {allStories.length>0?(
      <div className="grid grid-cols-2 gap-4">
         {allStories.map((item)=>{
        return(
          <TravelStoryCard 
          key={item._id}
          imgUrl={item.imageUrl}
          title={item.title}
          story={item.story}
          date={item.visitedDate}
          visitedLocation={item.visitedLocation}
          isFavourite={item.isFavourite}
        //  onEdit={()=>handleEdit(item)}
          onClick={()=>handleViewStory(item)}
          onFavouriteClick={()=>updateIsFavourite(item)}
          />
        );
      })}
      </div>
     ):(
      <EmptyCard imgSrc={getEmptyCardImg(filterType)} 
      message={getEmptyCardMessage(filterType)}
      />
     )}
    </div>
     <div className="w-[350px]">
      <div className="bg-white border border-slate-200 shadow-lg shadow-slate-200/60 rounded-lg">
        <div className="p-3">
          <DayPicker
          captionLayout="dropdown-buttons"
          mode="range"
          selected={dateRange}
          onSelect={handleDayClick}
          pagedNavigation
          />
        </div>
      </div>
     </div>
    </div>
  </div>


     {/* Add and edit travel story model */}
     <Modal
     isOpen={openAddEditModal.isShown}
     onRequestClose={()=>{}}
     style={{
      overlay:{
        backgroundColor:"rgba(0,0,0,0.2)",
        zIndex:999,
      },
     }}
     appElement={document.getElementById("root")}
     className="model-box">
      <AddEditTravelStory
       type={openAddEditModal.type}
       storyInfo={openAddEditModal.data}
       onClose={()=>{
        setOpenAddEditModal({isShown:false,type:"add",data:null});
       }}
       getAllTravelStories={getAllTravelStories}
      />
     </Modal>

   {/* View travel story model */}
   <Modal
     isOpen={openViewModal.isShown}
     onRequestClose={()=>{}}
     style={{
      overlay:{
        backgroundColor:"rgba(0,0,0,0.2)",
        zIndex:999,
      },
     }}
     appElement={document.getElementById("root")}
     className="model-box">
      <ViewTravelStory
      storyInfo={openViewModal.data || null} 
      onClose={()=>{
        setOpenViewModal((prevState)=>({...prevState,isShown:false}));
      }}
      onEditClick={()=>{
        setOpenViewModal((prevState)=>({...prevState,isShown:false}));
        handleEdit(openViewModal.data || null)
      }}
      onDeleteClick={()=>{
        deleteTravelStory(openViewModal.data||null);
      }}
        />
     </Modal>


  <button className="w-16 h-16 flex items-center justify-center rounded-full bg-primary hover:bg-cyan-400 fixed right-10 bottom-10"
    onClick={()=>{
      setOpenAddEditModal({isShown:true,type:"add",data:null});
    }}
  >
    <MdAdd className="test-[32px] text-white"/>
  </button>

 <ToastContainer/>
  </>);
};
export default Home;
