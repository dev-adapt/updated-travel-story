import React, { useState,useRef, useEffect } from 'react'
import { FaRegFileImage } from 'react-icons/fa6';
import { MdDeleteOutline } from 'react-icons/md';

const ImageSelector = ({image,setImage,handleDeleteImg}) => {
    const inputRef=useRef(null);
    const[previewUrl,setPreviewUrl]=useState(null);

    const handleImageChange=(event)=>{
        const file=event.target.files[0];
        if(file){
            setImage(file);
        }
    };

    const onChooseFile=()=>{
        inputRef.current.click();
    };

    const handleRemoveImage=()=>{
        setImage(null);
        handleDeleteImg()
    }
    useEffect(()=>{
        //if image prop is a string (URL),set it as previw url
        if(typeof image === 'string'){
            setPreviewUrl(image);
        }else if(image){
            //if the image prop is a file object,create a preview URL
            setPreviewUrl(URL.createObjectURL(image));
        }else{
            ///if there is no image,clear the preview URL
            setPreviewUrl(null);
        }
        return()=>{
            if(previewUrl &&typeof previewUrl==='string' && !image){
                URL.revokeObjectURL(previewUrl);
            }
        }
    },[image]);

  return (
    <div>
      <input 
        type="file"
      title="file"
      accept="image/*"
      ref={inputRef}
      onChange={handleImageChange}
      className='hidden'
      />

   {!image?( <button className='w-full h-[220px] flex flex-col items-center justify-center gap-4 bg-slate-50 rounded border border-slate-200/50' 
    onClick={()=>onChooseFile()}>
        <div className='w-14 h-14 flex items-center justify-center bg-cyan-50 rounded-full border border-cyan-100'>
            <FaRegFileImage className="text-xl text-cyan-500"/>
        </div>

        <p className='text-sm text-slate-500'>Browse image file to upload</p>
    </button>):(
    <div className='w-full relative'>
        <img src={previewUrl} alt="Selected" className='w-full h-[300px] object-cover rounded-lg'/>
        <button
        className='btn-small btn-delete absolute top-2 right-2'
        onClick={handleRemoveImage}>
            <MdDeleteOutline className='text-lg'/>
        </button>
    </div>)
    }
    </div>
  );
};

export default ImageSelector;


// import React, { useState, useRef, useEffect } from 'react';
// import { FaRegFileImage } from 'react-icons/fa6';
// import { MdDeleteOutline } from 'react-icons/md';


// const ImageSelector = ({ image, setImage }) => {
//   const inputRef = useRef(null);
//   const [previewUrl, setPreviewUrl] = useState(null);

//   const handleImageChange = (event) => {
//     const file = event.target.files[0];
//     if (file && file.type.startsWith('image/')) {//yaha par change hai
//       setImage(file);
//     } else {
//       alert('Please select a valid image file.');
//     }
//   };

//   const onChooseFile = () => {
//     inputRef.current.click();
//   };

//   useEffect(() => {
//     if (!image) {
//       setPreviewUrl(null);
//       return;
//     }

//     // Generate the preview URL only when the image is a new file
//     if (typeof image === 'string') {
//       setPreviewUrl(image);
//     } else if (image instanceof File) {//yaha par change hai
//       const objectUrl = URL.createObjectURL(image);
//       setPreviewUrl(objectUrl);

//       // Clean up the object URL when the component unmounts or the image changes
//       return () => {
//         URL.revokeObjectURL(objectUrl);
//       };
//     }
//   }, [image]);

//   return (
//     <div>
//       <input
//         type="file" // Ensure this is specified
//         title="file"
//         accept="image/*"
//         ref={inputRef}
//         onChange={handleImageChange}
//         className="hidden"
//       />

//       {!image ? (
//         <button
//           className="w-full h-[220px] flex flex-col items-center justify-center gap-4 bg-slate-50 rounded border border-slate-200/50"
//           onClick={onChooseFile}
//         >
//           <div className="w-14 h-14 flex items-center justify-center bg-cyan-50 rounded-full border border-cyan-100">
//             <FaRegFileImage className="text-xl text-cyan-500" />
//           </div>
//           <p className="text-sm text-slate-500">Browse image file to upload</p>
//         </button>
//       ) : (
//         <div className="w-full relative">
//           <img
//             src={previewUrl}
//             alt="Preview"
//             className="w-full h-[220px] object-cover rounded"
//           />
//         </div>
//       )}
//     </div>
//   );
// };

// export default ImageSelector;
