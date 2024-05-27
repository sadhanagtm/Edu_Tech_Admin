import { Field, Formik, Form } from "formik";
import React, { useRef, useState, useEffect, useMemo } from "react";
import toast, { Toaster } from "react-hot-toast";
import { Navigation } from "@mui/icons-material";
import axios from "../../../Hoc/Axios";
import { IoCloudUploadSharp } from "react-icons/io5";
import JoditEditor from "jodit-react";

function Addstudent() {
  const [value, setFieldValue] = useState("");
  const inputRef = useRef(null);
  const [image, setImage] = useState("");
  const [redirect, setredirect] = useState(false);
  const [placeholder, setplaceholder] = useState("enter description...");

  const editor = useRef(null);
  const [content, setContent] = useState("");

  const handleImageClick = () => {
    inputRef.current.click();
  };

  const handleImageChange = () => {
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

  return (
    <div className="mt-20">
      <Formik
        initialValues={{
          name: "",
          email: "",
          phone: "",
          address: "",
          image: "",
        }}
        onSubmit={(values, { resetForm }) => {
          try {
            const formData = new FormData();
            formData.append("name", values.name);
            formData.append("email", values.email);
            formData.append("phone", values.phone);
            formData.append("image", values.image);
            formData.append("address", values.address);

            axios
              .post("/student/", formData)
              .then((res) => {
                console.log(res);
                toast.success("Login Successful");
                setredirect((prev) => !prev);
                localStorage.setItem("token", res.data.accesstoken);
                Navigate("/");
                // setcourse([...res.data.data]);
              })
              .catch((error) => {
                console.log(error);
                toast.error(error.response.data.message);
              });
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
              <div className="grid grid-cols-2  gap-10 ">
                <div className="text-left">
                  <div className="text-lg font-medium text-purple-700 mb-2">
                    Name
                  </div>
                  <div>
                    <Field
                      name="name"
                      type="text"
                      label="hehe"
                      className="outline-none h-10 w-[400px] outline-gray-200"
                      onChange={(e) => {
                        setFieldValue("name", e.target.value);
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
                      label="hehe"
                      className="outline-none h-10 w-[400px] outline-gray-200"
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
                      label="hehe"
                      className="outline-none h-10 w-[400px] outline-gray-200"
                      onChange={(e) => {
                        setFieldValue("address", e.target.value);
                      }}
                    />
                  </div>
                </div>

                <div className="text-left">
                  <div className="text-lg font-medium text-purple-700 mb-2">
                    Phone
                  </div>
                  <div>
                    <Field
                      name="phone"
                      type="number"
                      label="hehe"
                      className="outline-none h-10 w-[400px] outline-gray-200"
                      onChange={(e) => {
                        setFieldValue("phone", e.target.value);
                      }}
                    />
                  </div>
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
                          alt=""
                          name="image"
                        />
                      ) : (
                        <div className="h-48  w-48  border border-black border-dashed flex text-xl flex-col  justify-center text-center items-center text-gray-400 ">
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

                  {/* <div className="text-left mt-10 ">
                    <div className="text-lg font-medium text-purple-700 mb-2 ">
                      Description
                   
                      <JoditEditor
                        ref={editor}
                        value={content}
                        // config={config}
                        tabIndex={1} // tabIndex of textarea
                        onBlur={(newContent) => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
                        onChange={(newContent) => {
                          setFieldValue("description", e.target.value);
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
    </div>
  );
}

export default Addstudent;
