// Login Form

import React, { useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import axios from "../../../Hoc/Axios";
import { Formik, Form, ErrorMessage } from "formik";
import { Link, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { FaLock } from "react-icons/fa";
import { MdOutlineFingerprint } from "react-icons/md";
// import LgPic from "../../assets/LgPic.svg";
import LgPic from "../../../assets/LgPic.svg";
import * as Yup from "yup";
import { BsEyeSlashFill } from "react-icons/bs";
import { IoEyeOutline } from "react-icons/io5";

const schema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid Email address format")
    .required("This field is required"),

  password: Yup.string()
    .min(8, "Password must be 8 characters at minimum")
    .required("Password is required")
    // .matches(
    // /[!@#$%^&(),.{}|<>]/,
    //  "Password must contain at least one symbol" )
    .matches(/[0-9]/, "Password must contain at leastnumber "),
  //  .matches(/[A-Z]/,"Password must contain at one uppercase letter ")
  //  .matches(/[a-z]/,"Password must contain at one lowercase letter ")
});
function Login() {
  const [password, setPassword] = useState("");
  const [visible, setVisible] = useState(false);

  const Navigate = useNavigate();

  return (
    <Formik
      initialValues={{
        email: "",
        password: "",
        type: "admin",
      }}
      validationSchema={schema}
      onSubmit={(values) => {
        try {
          axios
            .post("/user/auth/login", values)
            .then((res) => {
              // setUser([...res,data.data])
              console.log("errrrrorrrr", res);
              toast.success("Login Successfully");
              localStorage.setItem("token", res.data.token);
              Navigate("/");
            })
            .catch((error) => {
              console.log(error);
              // toast.error(error.response.data.message)
            });
        } catch (error) {
          console.log(error);
        }
      }}
    >
      {({ handleSubmit, setFieldValue, values }) => {
        return (
          <Form onSubmit={handleSubmit}>
            <Toaster />
            <div className=" ">
              <div className="sm:grid sm:grid-cols-2 flex flex-col ">
                <div className="bg-primary h-64  lg:h-screen sm:h-screen w-full relative sm:flex overflow-hidden  flex-col gap-2 justify-center items-start px-40">
                  <div className="lg:mb-6 w-52 mt-16 lg:mt-0 -ml-16 lg:ml-0 ">
                    <div className=" text-white lg:text-2xl sm:text-3xl text-base font-semibold sm:-mt-48 lg:mt-0 text-nowrap prifont ">
                      Welcome to Edutech
                    </div>
                    <div className="text-xm font-normal text-white mt-3 text-nowrap font ">
                      TRAINING AND SOLUTION
                    </div>

                    <div className=" h-48 w-48 sm:h-64 sm:w-64 lg:w-96 mt-8">
                      <img src={LgPic} alt="login image" className="" />
                    </div>
                  </div>
                </div>

                <div className=" h-97 lg:bg-gray-300 bg-gray-300 text-black flex flex-col sm:bg-zinc-100 ">
                  <div className="lg:bg-gray-50 bg-gray-50 rounded-2xl lg:h-full sm:h-96 lg:w-96 w-full  my-8 mx-auto sm:mt-56 lg:mt-10 sm:bg-zinc-100">
                    <div className="text-center text-2xl font-semibold capitalize py-8  text-blue-800 ">
                      login form
                    </div>
                    <div className="grid grid-rows-2 gap-4 md:mx-10 mx-6 text-center ">
                      <div className="flex flex-col ">
                        <div className="flex border-2 gap-2 p-1 px-4 items-center rounded-lg">
                          <MdOutlineFingerprint className="w-5 h-5 " />
                          <input
                            name="email"
                            type="text"
                            autoComplete="off"
                            placeholder=" Email or username "
                            className="h-10 outline-none bg-transparent w-full justify-start"
                            onChange={(e) => {
                              setFieldValue("email", e.target.value);
                            }}
                          />
                        </div>
                        <ErrorMessage
                          name="email"
                          component={"div"}
                          className="text-red-500  text-start"
                        />
                      </div>

                      <div className="flex flex-col">
                        <div className="flex   border-2 gap-2 items-center p-1 px-1 rounded-lg">
                          <FaLock className="w-10" />
                          <input
                            name="password"
                            id="password"
                            type={visible ? "text" : "password"}
                            autoComplete="off"
                            placeholder="Password"
                            className="h-10 w-full bg-transparent outline-none pr-2"
                            onChange={(e) => {
                              setFieldValue("password", e.target.value);
                            }}
                          />
                          <button
                            onClick={() => setVisible(!visible)}
                            className=" relative right-2 pt-1  "
                          >
                            {visible ? <IoEyeOutline /> : <BsEyeSlashFill />}
                          </button>
                        </div>
                        <ErrorMessage
                          name="password"
                          component={"div"}
                          className="text-red-500 text-start "
                        />
                      </div>

                      <Link to={"/forgotpassword"}>
                        <div className=" text-center font-semibold my-2 text-blue-600">
                          {" "}
                          Forgot password?
                        </div>
                      </Link>

                      <input
                        type="submit"
                        value={"Login"}
                        className="h-10 w-full  bg-blue-700 shadow-xl text-white rounded-3xl"
                      />
                    </div>

                    {/* <div className=" font-semibold text-blue-600 my-2 text-center">Create an account</div> */}
                  </div>
                </div>
              </div>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
}

export default Login;
