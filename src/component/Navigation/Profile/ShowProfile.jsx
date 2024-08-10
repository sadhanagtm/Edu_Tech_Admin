import React, { useRef } from 'react'
import { CgProfile } from 'react-icons/cg';
import { FiLogOut, FiSettings } from 'react-icons/fi';
import { MdOutlineForwardToInbox, MdOutlineVerified } from 'react-icons/md';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';

function ShowProfile({onClose}) {
    const divRef =useRef();
    const closeData=(e)=>{
      if(divRef.current===e.target){
        onClose();
      }
    }
    const Navigate=useNavigate()
  return (
    <div  ref={divRef} onClick={onClose}  >
        <div 
          
            className="h-48 w-60 mt-12 bg-gray-100 shadow-xl float-end absolute z-10  -right-4   "
          >
            <div className=" text-black">
              {/* <div className=" text-center my-4">
                <div className=" text-xl  font-semibold ">Laxmi Dhakal</div>
                <div className="text-xs">someone@gmail.com</div>
              </div> */}

              <div
                
              onClick={onClose}  className="mx-10 grid gap-5  cursor-pointer "
              >
                
                  <Link to={'/viewprofile'}>
                  <div  className="flex gap-6 mt-8  ">
                    <CgProfile className="text-2xl " />
                    My Profile
                    
                  </div>
                  </Link>

                <Link
                 to={"kycform"}>
                  <div className="flex gap-6 ">
                    <MdOutlineVerified className="text-2xl" />
                    KYC Form
                  </div>
                </Link>
                <hr />
                <div
                  onClick={() => {
                    localStorage.removeItem("token");
                    window.location.reload();
                  }}
                  className="flex gap-6 "
                >
                  <FiLogOut className="text-2xl " />
                  Logout
                </div>
              </div>
            </div>
          </div>
    </div>
  )
}

export default ShowProfile
