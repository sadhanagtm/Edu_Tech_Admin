
import React, { useEffect, useRef, useState } from 'react'
import { IoIosNotifications } from "react-icons/io";
 import { IoMdMail } from "react-icons/io";

import { CgProfile } from "react-icons/cg";
import { FaRegEdit } from "react-icons/fa";
import { FiSettings,FiHelpCircle,FiLogOut   } from "react-icons/fi";
import { MdOutlineForwardToInbox } from "react-icons/md";

function Toolbar  ()  {
  const[open,setOpen] = useState(false);
  const divRef=useRef();
  const imgRef=useRef();
  
  window.addEventListener('click',(e)=>{
    if(e.target !== divRef.current && e.target !== imgRef.current){
      setOpen(false)
    }
  });



  return (
    <div className='flex '>
    <div className="flex h-14 bg-primary justify-end fixed z-10 w-full ">
   
      <button className="cursor-pointer text-2xl flex gap-5 mr-10 mt-3 text-gray-300 ">
        <div className='flex mt-1 gap-3'>

         <IoIosNotifications />
         <IoMdMail />
        </div>
         <div className='h-8 w-8 ' onClick={()=>{setOpen(!open)}} >
            <img src='https://www.shareicon.net/data/128x128/2017/01/06/868320_people_512x512.png' ref={imgRef}/>
         </div>
         </button>

    </div>
   
  




  
   {
       open && 
      
      <div ref={divRef} className='h-100 w-60 bg-gray-200 float-end mx-5 absolute z-10 right-0'>
                   <div className=' text-black'>
                      <div className=' text-center my-9'>
                      <div className=' text-xl  font-semibold '>Laxmi Dhakal </div>
                      <div className='text-xs'>someone123@gmail.com</div>
                      </div>
   
   
                       <div  onClick={()=>setOpen(false)} className='mx-14 grid gap-6 cursor-pointer '>
                     <div className='flex gap-6 '><CgProfile className='text-2xl ' />My Profile</div>
                     <div className='flex gap-6'><FaRegEdit  className='text-2xl'/>Edit Profile</div>
                     <div className='flex gap-6'><MdOutlineForwardToInbox className='text-2xl' />Inbox</div>
                     <div className='flex gap-6'><FiSettings className='text-2xl' />Settings</div>
                     <div className='flex gap-6'><FiHelpCircle  className='text-2xl'/>Helps</div>
                     <div className='flex gap-6'><FiLogOut  className='text-2xl'/>Logout</div> 
                      </div> 
                        </div>
                 </div>
    }

</div>
   
  );
};

export default Toolbar;





















