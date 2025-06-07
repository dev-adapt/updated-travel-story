// import React ,{useState}from 'react'
// import { MdAdd,MdClose,MdDeleteOutline,MdUpdate } from 'react-icons/md';
// import DateSelector from '../../components/Input/DateSelector';
// import ImageSelector from '../../components/Input/ImageSelector';
// import TagInput from '../../components/Input/TagInput';
// import uploadImage from '../../utils/uploadImage';
// import axiosInstance from '../../utils/axiosInstance';
// import moment from 'moment';
// import { toast } from 'react-toastify';
// const AddEditTravelStory = ({
//     storyInfo,
//     type,
//     onClose,
//     getAllTravelStories,
// }) => {
//     const [visitedDate,setVisitedDate]=useState(storyInfo?.visitedDate ||null);
//     const[storyImg,setStoryImg]=useState(storyInfo?.imageUrl||null);
//     const[title,setTitle]=useState(storyInfo?.title ||"");
//     const[story,setStory]=useState(storyInfo?.story ||"");
//     const[visitedLocation,setVisitedLocation]=useState(storyInfo?.visitedLocation||[]);
//     const[error,setError]=useState("");


//     //Add new travel story
//     const addNewTravelStory = async () => {
//         try {
//             let imageUrl="";
//             //upload image if present
//             if (storyImg) {
//                 const imgUploadRes=await uploadImage(storyImg);
//                 //get image URL
//                 imageUrl=imgUploadRes.imageUrl || "";
//             }

//             const response =await axiosInstance.post("/add-travel-story",{
//                 title,
//                 story,
//                 imageUrl:imageUrl || "",
//                 visitedLocation,
//                 visitedDate:visitedDate 
//                 ?moment(visitedDate).valueOf()
//                 :moment().valueOf(),
//             });
//             if(response.data && response.data.story){
//                 toast.success("Story Added Successfully");
//                 //Refresh stories
//                 getAllTravelStories();
//                 //close modal or form
//                 onClose();
//             }
//        }catch(error){
//         if(
//             error.response &&
//             error.response.data &&
//             error.response.data.message 
//         ){
//             setError(error.response.data.message);
//         }else{
//             //handle unexpected error
//             setError("an unexpected error ocurred. Please try again.")
//         }
//       }
//     }
   
//     // const addNewTravelStory = async () => {
//     //     try {
//     //         let imageUrl = "";
    
//     //         // Upload the image if one is provided
//     //         if (storyImg) {
//     //             if (typeof storyImg === "object") {
//     //                 const imgUploadRes = await uploadImage(storyImg);
//     //                 imageUrl = imgUploadRes.imageUrl || "";
//     //             } else {
//     //                 imageUrl = storyImg; // Use the existing URL if already uploaded
//     //             }
//     //         }
    
//     //         // Prepare the payload for the API
//     //         const postData = {
//     //             title,
//     //             story,
//     //             imageUrl,
//     //             visitedLocation,
//     //             visitedDate: visitedDate
//     //                 ? moment(visitedDate).valueOf()
//     //                 : moment().valueOf(),
//     //         };
    
//     //         // Call the backend API to add the story
//     //         const response = await axiosInstance.post("/add-travel-story", postData);
    
//     //         if (response.data && response.data.story) {
//     //             toast.success("Story Added Successfully");
//     //             getAllTravelStories(); // Refresh stories
//     //             onClose(); // Close the modal or form
//     //         } else {
//     //             toast.error("Failed to add story. Please try again.");
//     //         }
//     //     } catch (error) {
//     //         console.error("Error adding story:", error);
    
//     //         if (error.response && error.response.data && error.response.data.message) {
//     //             setError(error.response.data.message); // Show specific backend error
//     //         } else {
//     //             setError("An unexpected error occurred. Please try again.");
//     //         }
//     //     }
//     // };
    

//     //Update Travel Story
//     // const updateTravelStory = async () => {
//     //     const storyId=storyInfo._id;
//     //     try {
//     //         let imageUrl="";

//     //         const postData={
//     //             title,
//     //             story,
//     //             imageUrl:storyInfo.imageUrl || "",
//     //             visitedLocation,
//     //             visitedDate:visitedDate 
//     //             ?moment(visitedDate).valueOf()
//     //             :moment().valueOf(),
//     //         }

//     //         if(typeof storyImg==="object"){
//     //             //upload new image
//     //             const imgUploadRes=await uploadImage(storyImg);
//     //             imageUrl=imgUploadRes.imageUrl||"";

//     //             postData={
//     //                 ...postData,
//     //                 imageUrl:imageUrl,
//     //             }
//     //         }

//     //         const response =await axiosInstance.post("/edit-story/"+storyId,postData);

//     //         if(response.data && response.data.story){
//     //             toast.success("Story Updated Successfully");
//     //             //Refresh stories
//     //             getAllTravelStories();
//     //             //close modal or form
//     //             onClose();
//     //         }
//     //    }catch(error){
//     //     if(
//     //         error.response &&
//     //         error.response.data &&
//     //         error.response.data.message 
//     //     ){
//     //         setError(error.response.data.message);
//     //     }else{
//     //         //handle unexpected error
//     //         setError("an unexpected error ocurred. Please try again.")
//     //     }
//     //   }
//     // }
   
//     const updateTravelStory = async () => {
//         const storyId = storyInfo._id; // Ensure storyInfo has _id defined
//         try {
//             // Set initial values for the payload
//             let imageUrl = storyInfo.imageUrl || storyImg; // Use existing image URL if not updated
//             let postData = {
//                 title,
//                 story,
//                 imageUrl,
//                 visitedLocation,
//                 visitedDate: visitedDate
//                     ? moment(visitedDate).valueOf()
//                     : moment().valueOf(),
//             };
    
//             // Check if a new image file is being uploaded
//             if (typeof storyImg === "object") {
//                 const imgUploadRes = await uploadImage(storyImg);
//                 imageUrl = imgUploadRes.imageUrl || "";
//                 postData.imageUrl = imageUrl; // Update the payload with the new image URL
//             }
    
//             // Make the API call to update the story
//             const response = await axiosInstance.put(`/edit-story/${storyId}`, postData);
    
//             if (response.data && response.data.story) {
//                 toast.success("Story Updated Successfully");
    
//                 // Refresh stories to reflect the updates on the UI
//                 getAllTravelStories();
    
//                 // Close the modal or form
//                 onClose();
//             } else {
//                 toast.error("Failed to update story. Please try again.");
//             }
//         } catch (error) {
//             console.error("Error updating story:", error);
//             if (error.response && error.response.data && error.response.data.message) {
//                 setError(error.response.data.message); // Display backend error message
//             } else {
//                 setError("An unexpected error occurred. Please try again.");
//             }
//         }
//     };
    
    
    

//     const handleAddOrUpdateClick=()=>{
//         console.log("input data:",{title,storyImg,story,visitedLocation,visitedDate})
//         if(!title){
//             setError("please enter the title");
//             return;
//         }
//         if(!story){
//             setError("please enter the story");
//             return;
//         }
//         setError("");
//         if(type==="edit"){
//             updateTravelStory();
//         }else{
//             addNewTravelStory();
//         }
//     };

//     //delete image or update the story
//     const handleDeleteStoryImg=async()=>{
//         //Deleting the image
//         const deleteImgRes=await axiosInstance.delete("/delete-image",{
//             params:{
//                 imageUrl:storyInfo.imageUrl,
//             },
//         });
//         if(deleteImgRes.data){
//             const storyId=storyInfo._id;

//             const postData = {
//                 title,
//                 story,
//                 visitedLocation,
//                 visitedDate : moment().valueOf(),
//                 imageUrl: "",
//             };
//             //updating story
//             const response=await axiosInstance.put(
//                 "/edit-story/"+storyId,
//                 postData
//             );
//             setStoryImg(null);
//         }
//     };
//   return (
//     <div className='relative'>
//       <div className='flex items-center justify-between'>
//         <h5 className='text-xl font-medium text-slate-700'>
//             {type === 'add' ? 'Add Story' : 'Update Story'}
//         </h5>

//         <div className='flex items-center gap-3 bg-cyan-50/50 p-2 rounded-l-lg'>
//           {type==="add"?(
//             <button className='btn-small' onClick={handleAddOrUpdateClick}>
//                 <MdAdd className="text-lg"/>ADD STORY
//             </button>
//             ):(
//                 <>
//                 <button className='btn-small' onClick={handleAddOrUpdateClick}>
//                 <MdUpdate className="text-lg"/>UPDATE STORY
//             </button>

//                 </>
//             )          
//         }
//             <button className='' onClick={onClose}>
//                 <MdClose className='text-xl text-slate-400'/>
//             </button>
          
//         </div>
       
//       </div>
//       {error && (
//             <p className='text-red-500 text-xs pt-2 text-right'>{error}</p>
//         )}
//       <div>
//         <div className='flex-1 flex flex-col gap-2 pt-4'>
//             <label className='input-label'>TITLE</label>
//             <input
//             type='text'
//             className='text-2xl text-slate-950 outline-none'
//             placeholder='A day at the Great Wall'
//             value={title}
//             onChange={({target})=> setTitle(target.value)}
//             />
//             <div className='my-3'>
//                 <DateSelector date={visitedDate} setDate={setVisitedDate} />
//             </div>

//             <ImageSelector
//             image={storyImg}
//             setImage={setStoryImg}
//             handleDeleteImg={handleDeleteStoryImg}/>

//             <div className='flex flex-col gap-2 mt-4'>
//                 <label className='input-label'>STORY</label>
//                 <textarea
//                 className='text-sm text-slate-950 outline-none bg-slate-50 p-2 rounded'
//                 placeholder='Your Story'
//                 rows={10}
//                 value={story}
//                 onChange={({target})=>setStory(target.value)}/>
//             </div>

//         </div>
//         <div className='pt-3'>
//             <label className='input-label'>VISITED LOCATIONS</label>
//             <TagInput tags={visitedLocation} setTags={setVisitedLocation}/>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default AddEditTravelStory;
// // 
// {/* <button className='btn-small btn-delete' onClick={onClose}>
// <MdDeleteOutline className="text-lg"/>DELETE
// </button> */}


import React, { useState } from 'react';
import { MdAdd, MdClose, MdUpdate } from 'react-icons/md';
import DateSelector from '../../components/Input/DateSelector';
import ImageSelector from '../../components/Input/ImageSelector';
import TagInput from '../../components/Input/TagInput';
import uploadImage from '../../utils/uploadImage';
import axiosInstance from '../../utils/axiosInstance';
import moment from 'moment';
import { toast } from 'react-toastify';

const AddEditTravelStory = ({
  storyInfo,
  type,
  onClose,
  getAllTravelStories,
}) => {
  const [visitedDate, setVisitedDate] = useState(storyInfo?.visitedDate || null);
  const [storyImg, setStoryImg] = useState(storyInfo?.imageUrl || null);
  const [title, setTitle] = useState(storyInfo?.title || '');
  const [story, setStory] = useState(storyInfo?.story || '');
  const [visitedLocation, setVisitedLocation] = useState(
    storyInfo?.visitedLocation || []
  );
  const [error, setError] = useState('');

  // Add a new travel story
  const addNewTravelStory = async () => {
    try {
      let imageUrl = storyImg;
      if (storyImg && typeof storyImg === 'object') {
        const imgUploadRes = await uploadImage(storyImg);
        imageUrl = imgUploadRes.imageUrl || '';
      }

      const response = await axiosInstance.post('/add-travel-story', {
        title,
        story,
        imageUrl: imageUrl || '',
        visitedLocation,
        visitedDate: visitedDate
          ? moment(visitedDate).valueOf()
          : moment().valueOf(),
      });

      if (response.data && response.data.story) {
        toast.success('Story added successfully!');
        getAllTravelStories();
        onClose();
      }
    } catch (err) {
      handleApiError(err);
    }
  };

  // Update an existing travel story
  const updateTravelStory = async () => {
    const storyId = storyInfo._id;
    try {
      let imageUrl = storyImg;
      if (storyImg && typeof storyImg === 'object') {
        const imgUploadRes = await uploadImage(storyImg);
        imageUrl = imgUploadRes.imageUrl || '';
      }

      const response = await axiosInstance.put(`/edit-story/${storyId}`, {
        title,
        story,
        imageUrl: imageUrl || '',
        visitedLocation,
        visitedDate: visitedDate
          ? moment(visitedDate).valueOf()
          : moment().valueOf(),
      });

      if (response.data && response.data.story) {
        toast.success('Story updated successfully!');
        getAllTravelStories();
        onClose();
      }
    } catch (err) {
      handleApiError(err);
    }
  };

  // Handle API Errors
  const handleApiError = (err) => {
    if (err.response && err.response.data && err.response.data.message) {
      setError(err.response.data.message);
    } else {
      setError('An unexpected error occurred. Please try again.');
    }
  };

  // Handle Add or Update action
  const handleAddOrUpdateClick = () => {
    if (!title) {
      setError('Please enter the title.');
      return;
    }
    if (!story) {
      setError('Please enter the story.');
      return;
    }
    setError('');
    if (type === 'edit') {
      updateTravelStory();
    } else {
      addNewTravelStory();
    }
  };

  // Handle Delete Image
  const handleDeleteStoryImg = async () => {
    try {
      if (storyInfo?.imageUrl) {
        await axiosInstance.delete('/delete-image', {
          params: { imageUrl: storyInfo.imageUrl },
        });
        setStoryImg(null);
      }
    } catch (err) {
      handleApiError(err);
    }
  };

  return (
    <div className="relative">
      <div className="flex items-center justify-between">
        <h5 className="text-xl font-medium text-slate-700">
          {type === 'add' ? 'Add Story' : 'Update Story'}
        </h5>
        <div className="flex items-center gap-3 bg-cyan-50/50 p-2 rounded-l-lg">
          <button className="btn-small" onClick={handleAddOrUpdateClick}>
            {type === 'add' ? (
              <>
                <MdAdd className="text-lg" /> Add Story
              </>
            ) : (
              <>
                <MdUpdate className="text-lg" /> Update Story
              </>
            )}
          </button>
          <button onClick={onClose}>
            <MdClose className="text-xl text-slate-400" />
          </button>
        </div>
      </div>
      {error && <p className="text-red-500 text-xs pt-2 text-right">{error}</p>}
      <div>
        <div className="flex-1 flex flex-col gap-2 pt-4">
          <label className="input-label">Title</label>
          <input
            type="text"
            className="text-2xl text-slate-950 outline-none"
            placeholder="A day at the Great Wall"
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
          <div className="my-3">
            <DateSelector date={visitedDate} setDate={setVisitedDate} />
          </div>
          <ImageSelector
            image={storyImg}
            setImage={setStoryImg}
            handleDeleteImg={handleDeleteStoryImg}
          />
          <div className="flex flex-col gap-2 mt-4">
            <label className="input-label">Story</label>
            <textarea
              className="text-sm text-slate-950 outline-none bg-slate-50 p-2 rounded"
              placeholder="Your story"
              rows={10}
              value={story}
              onChange={({ target }) => setStory(target.value)}
            />
          </div>
        </div>
        <div className="pt-3">
          <label className="input-label">Visited Locations</label>
          <TagInput tags={visitedLocation} setTags={setVisitedLocation} />
        </div>
      </div>
    </div>
  );
};

export default AddEditTravelStory;
