import React, { useState } from 'react'

import ReCAPTCHA from "react-google-recaptcha";
import axios from '../../Hoc/Axios';
import { Formik,Form,Field } from 'formik'
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
 import { FaLock } from "react-icons/fa";
 import { MdOutlineFingerprint } from "react-icons/md";

 import * as Yup from "yup";







 const schema = Yup.object().shape({
   email: Yup.string().email("not email").required("Email is required"),
   password: Yup.string() .min(5, "password must be 5 character") .required(" password is required"),

  });  

function Login() {
 
  
  const Navigate=useNavigate()
 

 
  return (
    <Formik
      initialValues={{
      email:'',
      password:'',
    }}
    validationSchema={schema}
   onSubmit={(values) => {
      try {
  
        const formData= new FormData();
        formData.append("email", values.email);
        formData.append("password", values.password);
  
        axios
          .post("/user/auth/login", values)
          .then((res) => {
            // setUser([...res,data.data])
            console.log("errrrrorrrr",res);
             toast.success("Login Successfully")
            localStorage.setItem('token', res.data.token)
            Navigate("/")
            
          })
          .catch((error) => {
            console.log(error);
            // toast.error(error.response.data.message)
          });
      } catch (error) {
        console.log(error);
      }
   }}
    
    // onSubmit={(values) => {
    // postregister(values)
    // }}

    >
  
  {({ handleSubmit, setFieldValue, values }) => {
    return<Form onSubmit={handleSubmit}>
     <Toaster/>
    <div className=' ' >
        <div className='grid grid-cols-2'>
        <div className="bg-primary h-screen w-full relative flex overflow-hidden  flex-col gap-2 justify-center items-start px-40">
        <div className="h-72 absolute -top-24 right-24 w-72  bg-transparent border-ds  border-4 rounded-full"></div>
        <div className="h-80 absolute -top-20  -right-10 w-80  bg-transparent border-ds  border-4 rounded-full"></div>
        <div className="h-72 absolute -bottom-24 left-32 w-72  bg-transparent border-ds  border-4 rounded-full"></div>
        <div className="h-80 absolute -bottom-20 -left-10 w-80  bg-transparent border-ds  border-4 rounded-full"></div>
       <div className='mb-6 ml-3'>
        <div className="text-3xl font-bold flex justify-start  text-white">
          Lopho Abroad Consultancy
        </div>
        <div className="text-xm font-normal text-white">
          TRAINING AND SOLUTION 
        </div>
        <button className="border-2 rounded-lg h-[40px] bg-white fot-bold mt-2 text-blue-500 w-[100px]">
          Read more
        </button></div>
      </div>

        <div className=' h-97 bg-gray-300 text-black flex flex-col  '>
            <div className=' bg-gray-50 rounded-2xl h-full w-96   my-8 mx-auto '>
            <div className='text-center text-2xl font-semibold capitalize py-8  text-blue-800 '>login form</div>
            <div className='grid grid-rows-2 gap-4 mx-10 text-center '>
               
                <div className="flex  border-2 gap-2 p-1 items-center rounded-lg">
                      <MdOutlineFingerprint className="w-10 " />
                      <Field
                        name="email"
                        type="text"
                        placeholder=" Email or username "
                        className="h-10 outline-none bg-transparent w-[250px] justify-start"
                        onChange={(e)=>{
                          setFieldValue("email",e.target.value)
                        }}
                      />
                    </div>
                

                <div className="flex  border-2 gap-2 items-center p-1 rounded-lg">
                      <FaLock className="w-10" />
                      <input
                        name="password"
                        type="password"
                        placeholder="Password"
                        className="h-10 w-[250px] bg-transparent outline-none"
                        onChange={(e)=>{
                          setFieldValue("password",e.target.value)
                        }}
                      />
                    </div>
                  
                  
                
                <ReCAPTCHA className='w-72  '
                      sitekey=" 6LfC_ngpAAAAAEqisEc9e4MFHS1Ac5LDfwcp1XdZ"
                    />

<input type='submit'
 className='h-10 w-32 mx-auto bg-blue-700 shadow-xl text-white rounded-3xl'/>
</div>
<div className=" text-center font-semibold my-2 text-blue-600"> Forgot your password?</div>
<div className='font-semibold text-center my-2'>OR</div>


                   
<div className=" font-semibold text-blue-600 my-2 text-center">Create an account</div>

                 
            </div>
        </div>
        </div>   
    </div>
    </Form>
  }}
    </Formik>



  )
}

export default Login
