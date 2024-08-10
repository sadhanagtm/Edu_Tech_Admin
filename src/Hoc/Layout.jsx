import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../component/Navigation/Sidebar";
import { useNavigate } from "react-router-dom";
import Toolbar from "../component/Navigation/Toolbar";

function Layout() {
  const Navigate = useNavigate();
  const [token, settoken] = useState(false);
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      settoken(false);
      Navigate("/login");
    } else {
      settoken(true);
    }
  }, [localStorage]);

  return (
    <div className="flex">
      <div className="w-fit hidden  lg:block">
        <Sidebar />
      </div>
      <div className="w-full ">
        <Toolbar />
        <div className="mx-10">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
export default Layout;
