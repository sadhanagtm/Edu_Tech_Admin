import { Field, Formik, Form } from "formik";
import React, { useRef, useState, useEffect, useMemo } from "react";
import toast, { Toaster } from "react-hot-toast";
import { Description, Navigation } from "@mui/icons-material";
import axios from "../../../Hoc/Axios";
import { IoCloudUploadSharp } from "react-icons/io5";
import JoditEditor from "jodit-react";
import { duration } from "@mui/material";
import { useLocation } from "react-router-dom";
import { ClipLoader } from "react-spinners";


function EditStudent() {
  const [value, setFieldValue] = useState("");
  const [student, setStudent] = useState("");

  const location = useLocation();
  const inputRef = useRef(null);
  const [image, setImage] = useState("");
  const [redirect, setRedirect] = useState(false);

  const [loading, setLoading] = useState(false);


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
        Navigation("/Student");
      }, 2000);
    }
    return () => {
      clearTimeout(interval);
    };
  }, [redirect]);

  const getdata = (id) => {
    try {
      axios
        .get(`/student/${id}`)
        .then((res) => {
          console.log(res);
          setStudent([res.data.result]);
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
    <div className="mt-20 lg:ml-52">
      {student && student.length > 0 && (
        <Formik
          initialValues={{
            firstName:
              student && student.length > 0 ? student[0].firstName : "",
            middleName:
              student && student.length > 0 ? student[0].middleName : "",
            lastName: student && student.length > 0 ? student[0].lastName : "",
            email: student && student.length > 0 ? student[0].email : "",
            address: student && student.length > 0 ? student[0].address : "",
            phone: student && student.length > 0 ? student[0].phone : "",
            oldimage: student && student.length > 0 ? student[0].image : "",
            image: "",
          }}
          onSubmit={(values, { resetForm }) => {
            setLoading(true); //set loading to true before API call

            try {
              const formData = new FormData();
              formData.append("firstName", values.firstName);
              formData.append("middleName", values.middleName);
              formData.append("lastName", values.lastName);
              formData.append("email", values.email);
              formData.append("address", values.address);
              formData.append("phone", values.phone);
              formData.append("image", values.image);

              axios
                .patch(`/student/${location.state.id}/`, formData)
                .then((res) => {
                  console.log(res);
                  toast.success("post Successfully");
                  setRedirect((prev) => !prev);
                  setStudent([...res.data.data]);
                  setLoading(false); //set loading to false before API call

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

            console.log(values);
            resetForm();
          }}
        >
          {({ handleSubmit, setFieldValue, values }) => {
            return (
              <Form onSubmit={handleSubmit}>
                <Toaster />

                {loading && (
                  <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
                    <ClipLoader size={50} color={"#123abc"} loading={loading} />
                  </div>
                )}

                {console.log(values, student)}

                <div>
                  <div className="grid lg:grid-cols-3 sm:grid-cols-2 lg:gap-9 gap-4 sm:gap-8 ">
                    <div>
                      <div className="text-lg font-medium text-purple-700 mb-2">
                        First Name
                      </div>
                      <div>
                        <Field
                          name="firstName"
                          type="text"
                          label="hehe"
                          className="outline-none h-10  w-full outline-gray-200"
                          onChange={(e) => {
                            setFieldValue("firstName", e.target.value);
                          }}
                        />
                      </div>
                    </div>

                    <div>
                      <div className="text-lg font-medium text-purple-700 mb-2">
                        Middle Name
                      </div>
                      <div>
                        <Field
                          name="middleName"
                          type="text"
                          label="hehe"
                          className="outline-none h-10  w-full outline-gray-200"
                          onChange={(e) => {
                            setFieldValue("middleName", e.target.value);
                          }}
                        />
                      </div>
                    </div>

                    <div>
                      <div className="text-lg font-medium text-purple-700 mb-2">
                        Last Name
                      </div>
                      <div>
                        <Field
                          name="lastName"
                          type="text"
                          label="hehe"
                          className="outline-none h-10  w-full outline-gray-200"
                          onChange={(e) => {
                            setFieldValue("lastName", e.target.value);
                          }}
                        />
                      </div>
                    </div>

                    <div className="text-left">
                      <div className="text-lg font-medium text-purple-700 mb-2">
                        Email
                      </div>
                      <div>
                        <Field
                          name="email"
                          type="email"
                          className="outline-none h-10  w-full outline-gray-200"
                          onChange={(e) => {
                            setFieldValue("email", e.target.value);
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
                          className="outline-none h-10  w-full outline-gray-200"
                          onChange={(e) => {
                            setFieldValue("address", e.target.value);
                          }}
                        />
                      </div>
                    </div>

                    <div>
                      <div className="text-lg font-medium text-purple-700 mb-2">
                        Phone
                      </div>
                      <div>
                        <Field
                          name="phone"
                          type="number"
                          className="outline-none h-10  w-full outline-gray-200"
                          onChange={(e) => {
                            setFieldValue("phone", e.target.value);
                          }}
                        />
                      </div>
                    </div>
                  </div>

                  <div className=" col-span-2 mt-10 grid grid-cols-1 justify-between">
                    <div className="text-left mt-0">
                      <div className="text-lg font-medium text-purple-700 mb-2">
                        Upload Image
                      </div>
                      <div
                        onClick={handleImageClick}
                        className=" border sm:w-48"
                      >
                        {values.image ? (
                          <img
                            src={URL.createObjectURL(values.image)}
                            className="h-48  lg:w-48 sm:w-48 object-contain"
                            alt=""
                            name="image"
                          />
                        ) : (
                          <img
                            src={`http://192.168.1.95:8080/public/${values.oldimage}`}
                            className="h-48  lg:w-48 sm:w-48"
                            alt=""
                            name="image"
                          />
                        )}
                        <input
                          name="image"
                          type="file"
                          accept="image/*"
                          ref={inputRef}
                          onChange={(e) => {
                            setFieldValue("image", e.target.files[0]);
                          }}
                          style={{ display: "none" }}
                        />
                      </div>
                    </div>

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

export default EditStudent;
