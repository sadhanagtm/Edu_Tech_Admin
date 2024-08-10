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
import { Link, useLocation, useNavigate } from "react-router-dom";
import JoditEditor from "jodit-react";
import { TbTransfer } from "react-icons/tb";
import { RxCross2 } from "react-icons/rx";
import { IoDocumentAttach } from "react-icons/io5";
import { GrDocument } from "react-icons/gr";
import Profile from "./Profile/Profile";
import { BiSolidCategory } from "react-icons/bi";


function Sidebar({ onClose }) {
  const divRef = useRef();

  const location = useLocation();

  const closeSidebar = (e) => {
    if (divRef.current === e.target) {
      onClose();
    }
  };
  const Navigate = useNavigate();

  const navlink = [
    {
      title: "Dashboard",
      icon: <RiDashboardFill />,
      path: "/Dashboard",
    },

    {
      title: "Hero Section",
      icon: <RiDashboardFill />,
      path: "/herosection",
    },

    {
      title: "Courses",
      icon: <FaBook />,
      path: "/Courses ",
    },

    {
      title: "Category",
      icon: <BiSolidCategory />,
      path: "/Category",
    },

    {
      title: "Students",
      icon: <PiStudent />,
      path: "/Student",
    },

    {
      title: "Instructor",
      icon: <FaChalkboardTeacher />,
      path: "/Instructor",
    },
    {
      title: "Testimonial",
      icon: <GrDocument />,
      path: "/testimonials ",
    },

    {
      title: " Team Member",
      icon: <GrDocument />,
      path: "/Teammember ",
    },

    {
      title: " Footer",
      icon: <GrDocument />,
      path: "/footer ",
    },

    {
      title: "Vision",
      icon: <BiSolidCategory />,
      path: "/vision",
    },

    {
      title: "Terms Of Use",
      icon: <BiSolidCategory />,
      path: "/terms",
    },
  ];

  return (
    <div
      ref={divRef}
      onClick={closeSidebar}
      className="w-full fixed left-0 z-10"
    >
      <div className=" h-full w-52 bg-primary fixed flex flex-col gap-5  top-0 z-10 mx-auto  ">
        <div
          onClick={onClose}
          className=" text-white font-semibold grid w-10/12 mt-20 mx-auto gap-3 text-sm   "
        >
          {navlink.map((val, i) => {
            console.log(location.pathname == val.path);
            return (
              <Link key={i} to={val.path}>
                <div
                  className={`flex gap-3  p-2 items-center ${
                    location.pathname == val.path
                      ? "bg-teal-800"
                      : "bg-transparent"
                  }  app:hover cursor-pointer  
       rounded-lg hover:bg-teal-800`}
                >
                  <div>{val.icon}</div>
                  <div>{val.title}</div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
export default Sidebar;
