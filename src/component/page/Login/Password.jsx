

import { ErrorMessage, Field, Form, Formik } from "formik";
import { Link } from "react-router-dom";
import React, { useRef, useState, useEffect, useMemo } from "react";
import toast, { Toaster } from "react-hot-toast";
import * as Yup from "yup";
import { GrFormView } from "react-icons/gr";
import { IoEyeOutline } from "react-icons/io5";
import { BsEyeSlashFill } from "react-icons/bs";

const schema =Yup.object().shape({
    password:Yup.string()
    .required("Password is required")
    .min(8,"Password must be 8 characters")
    .matches(/[0-9]/,"Password must contain at leastnumber ")
})


function Password() { 
  const [password, setPassword] = useState('');
  const[visible ,setVisible]=useState(false)
    
  
    
  const [value, setFieldValue] = useState("");
  const [redirect, setredirect] = useState(false);


  useEffect(() => {
    let interval;
    if (redirect) {
      interval = setTimeout(() => {
        Navigation("/");
      }, 2000);
    }
    return () => {
      clearTimeout(interval);
    };
  }, [redirect]);


  return (
    <div className="h-64 w-fit  flex  flex-col justify-center items-center bg-gray-50 shadow-2xl border border-gray-200 m-auto mt-20 rounded-xl ">
      <div className="text-xl font-bold text-black text-center py-4 ">
        Change Password
      </div>
      <div>
        <Formik
        initialValues={{
            password:"",
        }}
        validationSchema={schema} 
        onSubmit={(values) => {
            try {
              axios
                .post("/", values)
                .then((res) => {
                  console.log("errrrrorrrr", res);
                setredirect((prev) => !prev);
                resetForm();
               
                })
                .catch((error) => {
                  console.log(error);
                });
            } catch (error) {
              console.log(error);
            }
          console.log(values);

          }}

        >
            {({ handleSubmit, setFieldValue, value }) =>{
             return(
          <Form onSubmit={handleSubmit}>
            <Toaster />
            <div className=" ml-6">
              <div className=" font-semibold   mx-2 mb-1">
              Enter your new password
                 </div>
              <div className=" flex">
              <Field   
                name="password"
                id="password"
                type={visible?"text":"password"}
                autoComplete="off"
                className="h-8 w-11/12  outline-none  border-2 border-black rounded-lg px-3 pr-7"
                onChange={(e) => {
                    setFieldValue("password", e.target.value);
                  }}
              />
              <button onClick={()=>setVisible(!visible)} className=" relative right-7 pt-1  ">{visible?<IoEyeOutline/>:<BsEyeSlashFill/>}
              </button>
              </div>
              
               <ErrorMessage name="password" component={"div"} className="text-red-600" />
            </div> 

            <button 
            type="submit"
            className=" h-10 w-10/12 bg-teal-800 hover:bg-teal-950 text-white font-medium rounded-lg mx-7 mt-5">
              Submit
            </button>

            

              <div className=" flex mt-3 mx-28 gap-2 ">
                <div> Back to</div>
            <Link to={"/login"}>
                <div className="cursor-pointer font-bold text-teal-800">Login Page</div>
            </Link>
              </div>
          </Form>

             )

            }}
        </Formik>
      </div>
    </div>
  );
}


export default Password 