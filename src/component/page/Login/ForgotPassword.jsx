import { Field, Form, Formik } from "formik";
import { Link } from "react-router-dom";
import React, { useRef, useState, useEffect, useMemo } from "react";
import toast, { Toaster } from "react-hot-toast";


function ForgotPassword() {
      
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
    <div className="h-60 w-96 bg-gray-50 shadow-2xl border border-gray-200 m-auto mt-20 rounded-xl ">
      <div className="text-xl font-bold text-black text-center py-5 ">
        Forgot Password
      </div>
      <div>
        <Formik
        initialValues={{
            email:"",
        }}
         
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
              <div className=" font-semibold  mx-2 mb-1">
                {" "}
                Enter Your Email Address
              </div>
              <Field   
                name="email"
                type="email"
                autoComplete="off"
                className="h-8 w-11/12 outline-none  border-2 border-black rounded-lg px-3 "
                onChange={(e) => {
                    setFieldValue("email", e.target.value);
                  }}
              />
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

export default ForgotPassword;
