import React, { useRef, useState } from "react";
import {
  IoMailUnreadSharp,
  IoMenu,
  IoNotifications,
  IoSearchOutline,
} from "react-icons/io5";
import { RxCross2 } from "react-icons/rx";
import Sidebar from "./Sidebar";
import { FaAngleDown, FaAngleUp, FaSearch } from "react-icons/fa";

import Profile from "./Profile/Profile";
import ShowProfile from "./Profile/ShowProfile";
import { IoIosNotifications, IoMdMail } from "react-icons/io";

function Toolbar() {
  const [isShow, setIsShow] = useState(false);
  const toggleMenu = () => {
    setIsShow(!isShow);
  };

  const [isOpen, setIsOpen] = useState(false);
  const toggleButton = () => {
    setIsOpen(!isOpen);
  };

  const [Course, setcourse] = useState([]);
  const [query, setQuery] = useState("");

  const handlesearch = (event) => {
    const getSearch = event.target.value;
    setQuery(getSearch);
    if (getSearch.length > 0) {
      const searchdata = Course.filter((item) =>
        item.name.toLowerCase().includes(getSearch)
      );
      setcourse(searchdata);
    } else {
      setcourse(filter);
    }

    setQuery(getSearch);
  };

  return (
    <div>
      <div className=" bg-primary lg:h-14 h-16  py-3 w-full fixed z-20 ">
        <div className="flex justify-between items-center   ">
          <img
            src={"/src/image/Lopho.png"}
            alt="image"
            className=" z-20  aspect-square lg:h-14 h-10 mx-4 w-40 lg:-mt-4 mb-5"
          />

          <div className=" flex">
            <button
              onClick={toggleMenu}
              className=" mb-5  text-4xl px-2 lg:hidden "
            >
              {isShow ? (
                <RxCross2 className="text-white  animate-pulse hover:bg-zinc-300 hover:text-black hover:rounded-xl" />
              ) : (
                <IoMenu className="text-white hover:bg-zinc-300 hover:text-black hover:rounded-xl" />
              )}
            </button>
            {isShow && <Sidebar onClose={() => setIsShow(false)} />}

            <div className="   lg:flex text-center justify-end items-center  gap-5 mx-3 mb-7">
              <div className=" lg:flex hidden lg:gap-2">
                <div>
                  <input
                    type="text"
                    name="name"
                    autoComplete="off"
                    value={query}
                    onChange={(e) => handlesearch(e)}
                    className=" border-2 border-black rounded-xl sm:h-8 w-32  sm:w-56 pl-3 pr-3 outline-none "
                    placeholder="search here"
                  />
                </div>

                <IoIosNotifications className=" text-white h-7 w-7" />
                <IoMdMail className=" text-white h-7 w-7" />
              </div>

              <div className="flex flex-row relative  lg:left-0 top-1 right-2 lg:right-0 lg:bottom-0 -mt-2">
                <Profile top={true} />

                <button
                  onClick={toggleButton}
                  className="pt-6 relative lg:right-8 right-1   "
                >
                  {isOpen ? (
                    <FaAngleUp className="text-xl text-white " />
                  ) : (
                    <FaAngleDown className="text-xl text-white " />
                  )}
                </button>
                {isOpen && <ShowProfile onClose={() => setIsOpen(false)} />}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Toolbar;
