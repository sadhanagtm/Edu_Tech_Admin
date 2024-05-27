import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./component/page/Login";
import Registration from "./component/page/Registration";
import Layout from "./Hoc/Layout";
import DashBoard from "./component/page/DashBoard";
import Table from "./component/page component/Table";
import Edit from "./component/page/Courses/Edit";
import Toolbar from "./component/Navigation/Toolbar";
import Student from "./component/page/Students/Student";
import Courses from "./component/page/Courses/Courses";
import Category from "./component/page/Category/Category";
import Kyctable from "./component/page/Kyctable";

import Addstudent from "./component/page/Students/Addstudent";
import Addcourses from "./component/page/Courses/Addcourses";
import Addcategory from "./component/page/Category/Addcategory";
import Addinstructor from "./component/page/Instructor/Addinstructor";
import Instructor from "./component/page/Instructor/Instructor";

import Asd from "./component/page/Courses/Asd";
import Categorydetail from "./component/page/Category/Categorydetail"
// import Details from "./component/page/Details";
import HeroSection from "./component/page/HeroSection";
import Delete from "./Delete/Delete";
import Studentsdetails from "./component/page/Students/Studentsdetails";
import Vision from "./component/page/Vision";
import Testimonials from "./component/page/Testimonials/Testimonials";
import TestimonialsTable from "./component/page/Testimonials/TestimonialsTable";
import Addtestimonials from "./component/page/Testimonials/Addtestimonials";
import Editcategory from "./component/page/Category/Editcategory";
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<DashBoard />} />
            <Route path="Student" element={<Student />} />
            <Route path="Dashboard" element={<DashBoard />} />
            <Route path="Courses" element={<Courses />} />
            <Route path="Courses/:id" element={<Asd />} />
            <Route path="Category/:id" element={<Categorydetail />} />
            <Route path="Student/:id" element={<Studentsdetails />} />

            <Route path="herosection" element={<HeroSection/>}/>
            <Route path="Category" element={<Category />} />
            <Route path="/kyctable" element={<Kyctable />} />
            <Route path="Instructor" element={<Instructor />} />
            <Route path="/Addstudent" element={<Addstudent />} />
            <Route path="/Addcourses" element={<Addcourses />} />
            <Route path="/Addcategory" element={<Addcategory />} />
            <Route path="/Addinstructor" element={<Addinstructor />} />
            {/* <Route path="/details" element={<Details />} /> */}
          <Route path="/edit" element={<Edit />} />
          <Route path="/delete" element={<Delete />} />
          <Route path="/vision" element={<Vision/>}/>
          <Route path="/testimonials" element={<Testimonials/>}/>
          <Route path="/testimonialstable" element={<TestimonialsTable/>}/>
          <Route path="/addtestimonials" element={<Addtestimonials/>}/>
          <Route path="/Editcategory" element={<Editcategory/>}/>


          </Route>

          <Route path="/Login" element={<Login />} />
          <Route path="/registration" element={<Registration />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
