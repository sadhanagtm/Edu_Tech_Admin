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
import Categorydetail from "./component/page/Category/Categorydetail";
// import Details from "./component/page/Details";
import HeroSection from "./component/page/HeroSection";
import Delete from "./Delete/Delete";
import Studentsdetails from "./component/page/Students/Studentsdetails";
import Vision from "./component/page/Vision";
import Testimonials from "./component/page/Testimonials/Testimonials";
import TestimonialsTable from "./component/page/Testimonials/TestimonialsTable";
import Addtestimonials from "./component/page/Testimonials/Addtestimonials";
import Editcategory from "./component/page/Category/Editcategory";
import Footer from "./component/page/Footer";
import Teammember from "./component/page/Team members/Teammember";
import Addteammember from "./component/page/Team members/Addteammember";
import TeamTable from "./component/page/Team members/TeamTable";
import Terms from "./component/page/TermsOfUse/Terms";
import TermsTable from "./component/page/TermsOfUse/TermsTable";
import AddTerms from "./component/page/TermsOfUse/AddTerms";
import EditInstructor from "./component/page/Instructor/EditInstructor";
import InstructorDetails from "./component/page/Instructor/InstructorDetails";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<DashBoard />} />
            <Route path="herosection" element={<HeroSection />} />
            <Route path="Dashboard" element={<DashBoard />} />

            <Route path="Courses" element={<Courses />} />
            <Route path="/Addcourses" element={<Addcourses />} />
            <Route path="/edit" element={<Edit />} />
            <Route path="Courses/:id" element={<Asd />} />

            <Route path="Category" element={<Category />} />
            <Route path="/Addcategory" element={<Addcategory />} />
            <Route path="/Editcategory" element={<Editcategory />} />
            <Route path="Category/:id" element={<Categorydetail />} />
            <Route path="/kyctable" element={<Kyctable />} />

            <Route path="Student" element={<Student />} />
            <Route path="/Addstudent" element={<Addstudent />} />
            <Route path="Student/:id" element={<Studentsdetails />} />

            <Route path="Instructor" element={<Instructor />} />
            <Route path="/Addinstructor" element={<Addinstructor />} />
            <Route path="/editinstructor" element={<EditInstructor />} />
            <Route path="Instructor/:id" element={<InstructorDetails/>}/>

            <Route path="/testimonials" element={<Testimonials />} />
            <Route path="/testimonialstable" element={<TestimonialsTable />} />
            <Route path="/addtestimonials" element={<Addtestimonials />} />

            <Route path="/teammember" element={<Teammember />} />
            <Route path="/addteammember" element={<Addteammember />} />
            <Route path="/teamtable" element={<TeamTable />} />

            <Route path="/terms" element={<Terms />} />
            <Route path="/termstable" element={<TermsTable />} />
            <Route path="/addterms" element={<AddTerms />} />
            
            <Route path="/delete" element={<Delete />} />
            <Route path="/vision" element={<Vision />} />
            <Route path="/footer" element={<Footer />} />
          </Route>

          <Route path="/Login" element={<Login />} />
          <Route path="/registration" element={<Registration />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
