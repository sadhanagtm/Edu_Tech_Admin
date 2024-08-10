import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./component/page/Login/Login";
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
import HeroSection from "./component/page/Herosection/HeroSection";
import HerosectionTable from "./component/page/Herosection/HerosectionTable";
import HeroDetails from "./component/page/Herosection/HeroDetails";
import EditHero from "./component/page/Herosection/EditHero";

import Delete from "./Delete/Delete";
import Studentsdetails from "./component/page/Students/Studentsdetails";
import Testimonials from "./component/page/Testimonials/Testimonials";
import TestimonialsTable from "./component/page/Testimonials/TestimonialsTable";
import Editcategory from "./component/page/Category/Editcategory";

import Footer from "./component/page/Footer/Footer";
import FooterTable from "./component/page/Footer/FooterTable";
import EditFooter from "./component/page/Footer/EditFooter";
import FooterDetails from "./component/page/Footer/FooterDetails";

import Teammember from "./component/page/Team members/Teammember";
import TeamTable from "./component/page/Team members/TeamTable";
import EditTeam from "./component/page/Team members/EditTeam";
import TeamDetails from "./component/page/Team members/TeamDetails";

import Terms from "./component/page/TermsOfUse/Terms";
import TermsTable from "./component/page/TermsOfUse/TermsTable";
// import AddTerms from "./component/page/TermsOfUse/AddTerms";
import EditInstructor from "./component/page/Instructor/EditInstructor";
import InstructorDetails from "./component/page/Instructor/InstructorDetails";
import { Modal } from "@mui/material";
import TestimonialDetail from "./component/page/Testimonials/TestimonialDetail";
import EditTestimonial from "./component/page/Testimonials/EditTestimonial";
import EditStudent from "./component/page/Students/EditStudent";
import Profile from "./component/Navigation/Profile/Profile";
import ViewProfile from "./component/Navigation/Profile/ViewProfile";
import ShowProfile from "./component/Navigation/Profile/ShowProfile";
import ForgotPassword from "./component/page/Login/ForgotPassword";
import DarkMode from "./DarkMode";
import KYCform from "./component/page/KYCverification/KYCform";
import Password from "./component/page/Login/Password";

import Vision from "./component/page/Vision/Vision";
import EditVision from "./component/page/Vision/EditVision";
import VisionTable from "./component/page/Vision/VisionTable";
import VisionDetails from "./component/page/Vision/VisionDetails";
import Addsyallabus from "./component/page/Courses/Addsyallabus";
import Viewsyallabus from "./component/page/Courses/Viewsyallabus";
import Editsyallabus from "./component/page/Courses/Editsyallabus";
import EditTerms from "./component/page/TermsOfUse/EditTerms";
import TermsDetail from "./component/page/TermsOfUse/TermsDetail";
// import OfferForm from "./component/page/Offer/OfferForm";
import OfferTable from"./component/page/Offer/OfferTable";
import OfferForm from "./component/page/Offer/OfferForm";
import EditOffer from "./component/page/Offer/EditOffer";
import Offerdetail from "./component/page/Offer/Offerdetail";


function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<DashBoard />} />
            <Route path="Dashboard" element={<DashBoard />} />

            <Route path="herosection" element={<HeroSection />} />
            <Route path="herosectiontable" element={<HerosectionTable />} />
            
            <Route path="banner/:id" element={<HeroDetails />} />
            <Route path="edithero" element={<EditHero />} />
            <Route path="Courses" element={<Courses />} />
            <Route path="/Addcourses" element={<Addcourses />} />
            <Route path="/edit" element={<Edit />} />

            <Route path="Courses/:id" element={<Asd />} />
            <Route path="Category" element={<Category />} />
            <Route path="/addsyallabus" element={<Addsyallabus/>}/>
            <Route path="Syllabus/:id" element={<Viewsyallabus/>}/>
            <Route path="/editsyallabus" element={<Editsyallabus/>}/>



            <Route path="/Addcategory" element={<Addcategory />} />
            <Route path="/Editcategory" element={<Editcategory />} />
            <Route path="Category/:id" element={<Categorydetail />} />
            <Route path="/kyctable" element={<Kyctable />} />
            <Route path="Student" element={<Student />} />
            <Route path="/Addstudent" element={<Addstudent />} />
            <Route path="Student/:id" element={<Studentsdetails />} />
            <Route path="/editstudent" element={<EditStudent />} />
            <Route path="Instructor" element={<Instructor />} />
            <Route path="/Addinstructor" element={<Addinstructor />} />
            <Route path="/editinstructor" element={<EditInstructor />} />
            <Route path="Instructor/:id" element={<InstructorDetails />} />
            <Route path="/testimonials" element={<Testimonials />} />
            <Route path="/testimonialstable" element={<TestimonialsTable />} />

            <Route path="testomonial/:id" element={<TestimonialDetail />} />

            <Route path="/edittestimonial" element={<EditTestimonial />} />

            <Route path="/teammember" element={<Teammember />} />
            <Route path="/teamtable" element={<TeamTable />} />
            <Route path="/editteam" element={<EditTeam />} />

            <Route path="TeamDetails/:id" element={<TeamDetails/>}/>

            <Route path="/terms" element={<Terms />} />
            <Route path="/termstable" element={<TermsTable />} />
            {/* <Route path="/addterms" element={<AddTerms />} /> */}
            <Route path="/editterms" element={<EditTerms/>}/>
            <Route path="terms/:id" element={<TermsDetail/>}/>

            <Route path="/footer" element={<Footer />} />
            <Route path="/footertable" element={<FooterTable />} />
            <Route path="/editfooter" element={<EditFooter />} />
            <Route path="footer/:id" element={<FooterDetails/>}/>

            <Route path="/profile" element={<Profile />} />
            <Route path="/viewprofile" element={<ViewProfile />} />
            <Route path="/showprofile" element={<ShowProfile />} />
            <Route path="/delete" element={<Delete />} />
            <Route path="/modal" element={<Modal />} />
            <Route path="/kycform" element={<KYCform/>}/>

            <Route path="/vision" element={<Vision />} />
            <Route path="/editvision" element={<EditVision/>}/>
            <Route path="/visiontable" element={<VisionTable/>}/>
            <Route path="mission/:id" element={<VisionDetails/>}/>
            {/* <Route path="/offerform" element={<OfferForm/>}/> */}
            <Route path="/offerform" element={<OfferForm/>}/>
            <Route path="/offertable" element={<OfferTable/>}/>
            <Route path="/editoffer" element={<EditOffer/>}/>
            <Route path="package/:id" element={<Offerdetail/>}/>

          </Route>

          <Route path="/Login" element={<Login />} />
          <Route path="/darkmode" element={<DarkMode />} />
          <Route path="/forgotpassword" element={<ForgotPassword />} />
          <Route path="/password" element={<Password/>}/>
          <Route path="/registration" element={<Registration />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
