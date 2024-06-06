import { Field, Formik, Form } from "formik";
import React, { useRef, useState, useEffect, useMemo } from "react";
import toast, { Toaster } from "react-hot-toast";
import { Description, Navigation } from "@mui/icons-material";
import axios from "../../../Hoc/Axios";
import { IoCloudUploadSharp } from "react-icons/io5";
import JoditEditor from "jodit-react";
import { duration } from "@mui/material";
import { useLocation } from "react-router-dom";

function EditInstructor() {
  const data = [
    { name: "firstName", type: "text", label: "First Name" },
    { name: "middleName", type: "text", label: "Middle Name" },
    { name: "lastName", type: "text", label: "Last Name" },
    { name: "phone", type: "number", label: "Phone" },
    { name: "address", type: "text", label: "Address" },
    { name: "email", type: "email", label: "Email" },
    { name: "password", type: "password", label: "Password" },
  ];

  const [value, setFieldValue] = useState("");
  const [instructor, setInstructor] = useState([]);

  const location = useLocation();
  const inputRef = useRef(null);
  const [image, setImage] = useState("");
  const [redirect, setredirect] = useState(false);
  const [placeholder, setplaceholder] = useState("enter description...");

  const editor = useRef(null);
  const [content, setContent] = useState("");

  const handleImageClick = () => {
    inputRef.current.click();
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    console.log(file);
    setImage(e.target.files[0]);
  };

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

  const getdata = (id) => {
    try {
      axios
        .get(`/instructor/${id}`)
        .then((res) => {
          console.log(res);
          setInstructor([res.data.result]);
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (location && location.state && location.state.id) {
      getdata(location.state.id);
    }
  }, []);

  return (
    <div className="mt-20">
      {instructor && instructor.length > 0 && (
        <Formik
          initialValues={{
            firstname:
              instructor && instructor.length > 0
                ? instructor[0].firstname
                : "",
            lastName:
              instructor && instructor.length > 0 ? instructor[0].lastName : "",
            middleName:
              instructor && instructor.length > 0
                ? instructor[0].middleName
                : "",
            password:
              instructor && instructor.length > 0 ? instructor[0].password : "",
            // image: instructor && instructor.length > 0 ? instructor[0].image : "",
            email:
              instructor && instructor.length > 0 ? instructor[0].email : "",
            phone:
              instructor && instructor.length > 0 ? instructor[0].phone : "",
            address:
            instructor && instructor.length > 0 ? instructor[0].address : "",
          }}
          onSubmit={(values, { resetForm }) => {
            try {
              const formData = new FormData();
              formData.append("firstName", values.firstName);
              formData.append("lastName", values.lastName);
              formData.append("middleName", values.middleName);
              formData.append("password", values.password);
              formData.append("email", values.email);
              formData.append("phone", values.phone);
              formData.append("image", values.image);
              formData.append("address", values.address);
            } catch (error) {
              console.log(error);
            }

            console.log(values);
            resetForm();
          }}
        >
          {({ handleSubmit, setFieldValue, values }) => {
            return (
              <Form onSubmit={handleSubmit}>
                <Toaster />

                {console.log(values, instructor)}

                <div className="lg:ml-60 ">
                  <div className="grid lg:grid-cols-3 sm:grid-cols-2 lg:gap-9 gap-4 sm:gap-8 ">
                    {data.map((val, i) => {
                      return (
                        <div>
                          <div className="text-left">
                            <div className="text-lg font-medium text-purple-700 mb-2">
                              {" "}
                              {val.label}
                            </div>
                            <div>
                              <Field
                                name={val.name}
                                autoComplete="off"
                                type={val.type}
                                className="outline-none h-10  w-full outline-gray-200 "
                                onChange={(e) => {
                                  setFieldValue(val.name, e.target.value);
                                }}
                              />
                            </div>
                          </div>
                        </div>
                      );
                    })}

                    {/* <div className="text-left">
                      <div className="text-lg font-medium text-purple-700 mb-2">
                        Name
                      </div>
                      <div>
                        <Field
                          name="firstName"
                          type="text"
                          label="hehe"
                          className="outline-none h-10  w-full outline-gray-200"
                          onChange={(e) => {
                            setFieldValue("name", e.target.value);
                          }}
                        />
                      </div>
                    </div>

                    <div className="text-left">
                      <div className="text-lg font-medium text-purple-700 mb-2">
                        Price
                      </div>
                      <div>
                        <Field
                          name="middlename"
                          type="text"
                          label="hehe"
                          className="outline-none h-10  w-full outline-gray-200"
                          onChange={(e) => {
                            setFieldValue("price", e.target.value);
                          }}
                        />
                      </div>
                    </div>

                    <div className="text-left">
                      <div className="text-lg font-medium text-purple-700 mb-2">
                        Duration
                      </div>
                      <div>
                        <Field
                          name="lastname"
                          type="text"
                          label="hehe"
                          className="outline-none h-10  w-full outline-gray-200"
                          onChange={(e) => {
                            setFieldValue("duration", e.target.value);
                          }}
                        />
                      </div>
                    </div>

                    <div className="text-left">
                      <div className="text-lg font-medium text-purple-700 mb-2">
                        Password
                      </div>
                      <div>
                        <Field
                          name="password"
                          type="password"
                          label="hehe"
                          className="outline-none h-10  w-full outline-gray-200"
                          onChange={(e) => {
                            setFieldValue("rating", e.target.value);
                          }}
                        />
                      </div>
                    </div>

                    <div className="text-left">
                      <div className="text-lg font-medium text-purple-700 mb-2">
                        Discount
                      </div>
                      <div>
                        <Field
                          name="email"
                          type="email"
                          label="hehe"
                          className="outline-none h-10  w-full outline-gray-200"
                          onChange={(e) => {
                            setFieldValue("discount", e.target.value);
                          }}
                        />
                      </div>
                    </div>

                    <div className="text-left">
                      <div className="text-lg font-medium text-purple-700 mb-2">
                        Address
                      </div>
                      <div>
                        <Field
                          name="address"
                          type="text"
                          label="hehe"
                          className="outline-none h-10  w-full outline-gray-200"
                          onChange={(e) => {
                            setFieldValue("tags", e.target.value);
                          }}
                        />
                      </div>
                    </div> */}
                  </div>

                  <div className=" col-span-2 mt-10 grid grid-cols-1 justify-between">
                    <div className="text-left mt-0">
                      <div className="text-lg font-medium text-purple-700 mb-2">
                        Upload Image
                      </div>
                      <div onClick={handleImageClick}>
                        {values.image ? (
                          <img
                            src={URL.createObjectURL(values.image)}
                            className="h-48  lg:w-48 sm:w-48"
                            alt=""
                            name="image"
                          />
                        ) : (
                          <div className="h-48  lg:w-48 sm:w-48 border border-black border-dashed flex text-xl flex-col  justify-center text-center items-center text-gray-400 ">
                            <div className="text-5xl">
                              <IoCloudUploadSharp />
                            </div>
                            <div>Click to upload</div>
                          </div>
                        )}
                        <input
                          name="image"
                          type="file"
                          ref={inputRef}
                          onChange={(e) => {
                            setFieldValue("image", e.target.files[0]);
                          }}
                          style={{ display: "none" }}
                        />
                      </div>
                    </div>
{/* 
                    <div className="text-left mt-10 ">
                      <div className="text-lg font-medium text-purple-700 mb-2 ">
                        Description
                        <JoditEditor
                          ref={editor}
                          value={content}
                          // config={config}
                          tabIndex={1} // tabIndex of textarea
                          onBlur={(newContent) => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
                          onChange={(newContent) => {
                            setFieldValue("description", newContent);
                          }}
                        />
                      </div>
                    </div> */}

                    <div className="text-left flex gap-5 ">
                      <button
                        onClick={() => {
                          Navigation(-1);
                        }}
                        type="button"
                        className="bg-red-600 h-10 my-5 w-24 text-lg rounded-lg text-center text-white hover:bg-red-500"
                      >
                        Cancel
                      </button>

                      <button
                        type="submit"
                        className="bg-indigo-600 h-10 my-5 w-24 text-lg rounded-lg text-center text-white hover:bg-indigo-500"
                      >
                        Post
                      </button>
                    </div>
                  </div>
                </div>
              </Form>
            );
          }}
        </Formik>
      )}
    </div>
  );
}

export default EditInstructor;
