import { Field, Formik, Form, ErrorMessage } from "formik";
import React, { useRef, useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import axios from "../../../Hoc/Axios";
import { IoCloudUploadSharp } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";

import * as Yup from "yup";

const schema = Yup.object().shape({
  primaryLogo: Yup.mixed().required("This field is required"),
  secondaryLogo: Yup.mixed().required("This field is required"),
  email: Yup.string().required("This field is required"),
  address: Yup.string().required("This field is required"),
  phone: Yup.string().required("This field is required"),
  facebook: Yup.string().required("This field is required"),
  twitter: Yup.string().required("This field is required"),
  linkedin: Yup.string().required("This field is required"),
  website: Yup.string().required("This field is required"),
});

function Footer() {
  const data = [
    { name: "email", type: "email", label: "Email" },
    { name: "address", type: "text", label: "Address" },
    { name: "phone", type: "text", label: "Phone" },
    { name: "facebook", type: "text", label: "Facebook" },
    { name: "twitter", type: "text", label: "Twitter" },
    { name: "linkedin", type: "text", label: "Linkedin" },
    { name: "website", type: "text", label: "Website" },
  ];

  const inputRef = useRef(null);
  const inputtRef = useRef(null);
  const navigate = useNavigate();
  const[loading,setLoading]= useState(false);

  
  const handlePrimaryClick = () => {
    inputRef.current.click();
  };

  const handleSecondaryClick = () => {
    inputtRef.current.click();
  };

  return (
    <div className="mt-20">
      <Formik
        initialValues={{
          primaryLogo: null,
          secondaryLogo: null,
          email: "",
          address: "",
          phone: "",
          facebook: "",
          twitter: "",
          linkedin: "",
          website: "",
        }}
        validationSchema={schema}
        onSubmit={(values, { resetForm }) => {
          setLoading(true); //set loading to true before API call

          try {
            const formData = new FormData();
            formData.append("primaryLogo", values.primaryLogo);
            formData.append("secondaryLogo", values.secondaryLogo);
            formData.append("email", values.email);
            formData.append("address", values.address);
            formData.append("phone", values.phone);
            formData.append("facebook", values.facebook);
            formData.append("twitter", values.twitter);
            formData.append("linkedin", values.linkedin);
            formData.append("website", values.website);

            axios
              .post("/footer", formData)
              .then((res) => {
                console.log(res);
                toast.success("Post Successful");
                navigate("/footertable");
                resetForm();
                setLoading(true); //set loading to true before API call

              })
              .catch((error) => {
                console.log(error);
                toast.error(error.response.data.message);
                setLoading(false); //set loading to false before API call

              });
          } catch (error) {
            console.log(error);
            setLoading(false); //set loading to false before API call

          }
        }}
      >
        {({ handleSubmit, setFieldValue, values }) => (
          <Form onSubmit={handleSubmit}>
            <Toaster />

            
            {loading && (
                <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
                  <ClipLoader size={50} color={"#123abc"} loading={loading} />
                </div>
              )} 


            <div className="lg:ml-52">
              <div className="text-2xl font-bold text-purple-700 lg:mb-6 mb-3 font">
                Footer
              </div>
              <Link to={"/footertable"}>
                <div className="top-20 lg:right-10 right-11 absolute">
                  <button className="lg:h-10 h-7 w-20 bg-red-700 text-white lg:text-lg font-semibold rounded-xl">
                    View
                  </button>
                </div>
              </Link>

              <div className="grid lg:grid-cols-3 sm:grid-cols-2 lg:gap-8 gap-4 sm:gap-8">
                {data.map((val, i) => (
                  <div key={i}>
                    <div className="text-left">
                      <div className="text-lg font-medium text-purple-700 mb-2">
                        {val.label}
                      </div>
                      <div>
                        <Field
                          name={val.name}
                          autoComplete="off"
                          type={val.type}
                          className="outline-none h-8 w-full outline-gray-200"
                        />
                        <ErrorMessage
                          name={val.name}
                          component="div"
                          className="text-red-600"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className=" -ml-1 mt-10 grid sm:grid-cols-2 justify-between">
                <div>
                  <div className="text-lg font-medium mb-2">
                    Upload Primary Logo
                  </div>
                  <div
                    onClick={handlePrimaryClick}
                    className="sm:w-11/12 border"
                  >
                    {values.primaryLogo ? (
                      <img
                        src={URL.createObjectURL(values.primaryLogo)}
                        className="h-48 sm:w-11/12 w-full object-contain"
                        alt="Primary Logo"
                      />
                    ) : (
                      <div className="h-48 w-full border border-black border-dashed flex text-xl flex-col justify-center text-center items-center text-gray-400">
                        <div className="text-5xl">
                          <IoCloudUploadSharp />
                        </div>
                        <div>Click to upload</div>
                      </div>
                    )}
                    <input
                      name="primaryLogo"
                      type="file"
                      accept="image/*"
                      ref={inputRef}
                      onChange={(e) => {
                        setFieldValue("primaryLogo", e.target.files[0]);
                      }}
                      style={{ display: "none" }}
                    />
                    <ErrorMessage
                      name="primaryLogo"
                      component="div"
                      className="text-red-600"
                    />
                  </div>
                </div>

                <div>
                  <div className="text-lg font-medium mb-2">
                    Upload Secondary Logo
                  </div>
                  <div
                    onClick={handleSecondaryClick}
                    className="w-11/12 border"
                  >
                    {values.secondaryLogo ? (
                      <img
                        src={URL.createObjectURL(values.secondaryLogo)}
                        className="h-48 w-11/12 object-contain"
                        alt="Secondary Logo"
                      />
                    ) : (
                      <div className="h-48 w-full border border-black border-dashed flex text-xl flex-col justify-center text-center items-center text-gray-400">
                        <div className="text-5xl">
                          <IoCloudUploadSharp />
                        </div>
                        <div>Click to upload</div>
                      </div>
                    )}
                    <input
                      name="secondaryLogo"
                      type="file"
                      accept="image/*"
                      ref={inputtRef}
                      onChange={(e) => {
                        setFieldValue("secondaryLogo", e.target.files[0]);
                      }}
                      style={{ display: "none" }}
                    />
                    <ErrorMessage
                      name="secondaryLogo"
                      component="div"
                      className="text-red-600"
                    />
                  </div>
                </div>
              </div>

              <div className="flex gap-5 my-5">
                <button
                  onClick={() => navigate(-1)}
                  type="button"
                  className="bg-red-600 h-10 my-5 w-24 lg:text-lg rounded-lg text-center text-white hover:bg-red-500"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="bg-indigo-600 h-10 my-5 w-24 lg:text-lg rounded-lg text-center text-white hover:bg-indigo-500"
                >
                  Post
                </button>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default Footer;
