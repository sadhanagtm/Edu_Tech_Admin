import React, { useRef, useState } from "react";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { MdOutlineEditNote } from "react-icons/md";

import { RiDashboardFill } from "react-icons/ri";
import { FaBook } from "react-icons/fa";
import { MdCategory } from "react-icons/md";
import { FaChalkboardTeacher } from "react-icons/fa";
import { FaUniversity } from "react-icons/fa";
import { PiStudent } from "react-icons/pi";
import { FaRegRegistered } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { Scrollbar } from "react-scrollbars-custom";


function Sidebar({onClose}) {
  const divRef = useRef();

  const closeSidebar= (e) =>{
    if(divRef.current===e.target){
      onClose();
    }
  }
  const Navigate= useNavigate();
  const [name, setName] = useState("Laxmi Dhakal ");

  const handleEdit = () => {
    const newName = prompt("Enter the new name:", name);
    if (newName !== null && newName !== "") {
      setName(newName);
    }
  };
  const handleDelete = () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this name?"
    );
    if (confirmDelete) {
      setName("");
    }
  };

  return (
    <div ref={divRef} onClick={closeSidebar} className="w-full fixed">

    <div className="h-full w-60  bg-primary fixed  scroll-container  lg:mt-7 mt-14 ">
      <div className="fixed ">
      {/* <div className=" flex justify-center">
        <img src={"/src/image/Lopho.png"} alt="image" className=" flex w-40" />
      </div> */}

      <div className="flex justify-evenly  lg:mt-12 bg-teal-800 h-12 w-44 rounded-lg ml-7 mt-8">
        <img
          src="https://www.shareicon.net/data/128x128/2017/01/06/868320_people_512x512.png"
          className="h-8 w-8 mt-2 "
        />
        <div>
          <div className="text-white font-semibold text-center    ">
            <p> {name}</p>
          </div>
          <div className="text-white text-sm  w-12    ">Admin</div>
        </div>

        {/* <button className='text-white text-3xl ' onClick={handleEdit}><MdOutlineEditNote /></button>
      <button  className="text-red-400 text-2xl " onClick={handleDelete}><RiDeleteBin5Fill /></button> */}
      </div>


      </div>



  <div className="content">

      <div 
      onClick={onClose}
       className=" text-white font-semibold grid gap-5 mt-28 ml-4   ">
        <Link to={"/Dashboard"}>
          <div className="flex gap-3 ml-1  app:hover cursor-pointer w-48  h-10 rounded-lg pt-2 hover:bg-teal-800">
            <RiDashboardFill className="mt-1 ml-4" />
            Dashboard
          </div>
        </Link>

        <Link to={"/herosection"}>
          <div className="flex gap-3 ml-1  app:hover cursor-pointer w-48  h-10 rounded-lg pt-2 hover:bg-teal-800">
            <FaRegRegistered className="mt-1 ml-4" />
            Hero Section
          </div>
        </Link>

        <Link to={"/Courses"}>
          <div className="flex gap-3 ml-1  app:hover cursor-pointer w-48  h-10 rounded-lg pt-2 hover:bg-teal-800">
            <FaBook className="mt-1 ml-4" />
            Courses
          </div>
        </Link>

        <Link to={"/Category"}>
          <div className="flex gap-3 ml-1  app:hover cursor-pointer w-48  h-10 rounded-lg pt-2 hover:bg-teal-800">
            <MdCategory className="mt-1 ml-4" />
            Category
          </div>
        </Link>

        <Link to={"/Student"}>
          <div className="flex gap-3 ml-1  app:hover cursor-pointer w-48  h-10 rounded-lg pt-2 hover:bg-teal-800">
            <PiStudent className="mt-1 ml-4" />
            Students
          </div>
        </Link>

        <Link to={"/Instructor"}>
          <div className="flex gap-3 ml-1  app:hover cursor-pointer w-48  h-10 rounded-lg pt-2 hover:bg-teal-800">
            <FaChalkboardTeacher className="mt-1 ml-4" />
            Instructor
          </div>
        </Link>

        <Link to={"/testimonials"}>
          <div className="flex gap-3 ml-1  app:hover cursor-pointer w-48  h-10 rounded-lg pt-2 hover:bg-teal-800">
            <RiDashboardFill className="mt-1 ml-4" />
            Testimonials
          </div>
        </Link>

        <Link to={"/Teammember"}>
          <div className="flex gap-3 ml-1  app:hover cursor-pointer w-48  h-10 rounded-lg pt-2 hover:bg-teal-800">
            <FaUniversity className="mt-1 ml-4" />
            Team Member
          </div>
        </Link>

      </div>

  </div>



    </div>

    </div>
  );
}

export default Sidebar;
