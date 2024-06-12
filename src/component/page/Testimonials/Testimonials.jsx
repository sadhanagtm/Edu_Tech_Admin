import React, { useRef, useState, useEffect, useMemo } from "react";
import { BsFillEyeFill } from "react-icons/bs";
import { Field, Formik, Form } from "formik";
import toast, { Toaster } from "react-hot-toast";
import { Description, Navigation } from "@mui/icons-material";
import axiosinstance from "../../../Hoc/Axios";
import { IoCloudUploadSharp } from "react-icons/io5";
import JoditEditor from "jodit-react";
import { Link } from "react-router-dom";

function Testimonials() {
  const [value, setFieldValue] = useState("");
  const inputRef = useRef(null);
  const [video, setVideo] = useState("");
  const [redirect, setredirect] = useState(false);
  const [placeholder, setplaceholder] = useState("enter description...");
  const editor = useRef(null);
  const [content, setContent] = useState("");

  const handleVideoClick = () => {
    inputRef.current.click();
  };

  const handleVideoChange = (e) => {
    const file = e.target.files[0];
    console.log(file);
    setVideo(e.target.files[0]);
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
    <div className="lg:ml-64 mt-20">
      <div>
              <div className="text-2xl font-bold  text-purple-700 font">Testimonial</div>
              <Link to={"/testimonialstable"}>
        <div className="  top-20 lg:right-8 right-4 absolute ">
          <button className="lg:h-10 h-7 w-20 bg-red-700 text-white lg:text-lg font-semibold  rounded-xl ">
            View
          </button>
        </div>
      </Link>
      </div>
              

   

      <div className="mt-6 w-full">
        <Formik
          initialValues={{
            title: "",
            description: "",
            video: "",
          }}
          onSubmit={(values, { resetForm }) => {
            try {
              const formData = new FormData();
              formData.append("title", values.title);
              formData.append("description", values.description);
              formData.append("video", values.video);

              axiosinstance
                .post("/testimonial", formData)
                .then((res) => {
                  console.log(res);
                  toast.success("Login Successful");
                  setredirect((prev) => !prev);
                  localStorage.setItem("token", res.data.accesstoken);
                  Navigate("/");
                  setcourse([...res.data.data]);
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
              <div className=" ">
                <Form onSubmit={handleSubmit}>
                  <Toaster />

                  <div className=" flex flex-col lg:gap-8 gap-5  w-full m-auto ml-1   ">
                    <div>
                      <div className="text-lg font-medium text-purple-700 mb-2">
                        Title
                      </div>
                      <div>
                        <Field
                          name="title"
                          autoComplete="off"
                          type="text"
                          label="hehe"
                          className="outline-none h-8 w-full  outline-gray-200"
                          // onChange={(e) => {
                          //   setFieldValue("title", e.target.value);
                          // }}
                        />
                      </div>
                    </div>

                    <div>
                      <div className="text-lg font-medium text-purple-700 mb-2 w-full ">
                        Description
                       </div>
                        <JoditEditor
                          ref={editor}
                          value={content}
                          name="description"
                          // config={config}
                          tabIndex={1} // tabIndex of textarea
                          onBlur={(newContent) => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
                          onChange={(newContent) => {
                            setFieldValue("description", newContent);
                          }}
                        />
                    </div>

                   
                      <div>
                        <div className="text-lg font-medium text-purple-700 mb-2">
                          Video
                        </div>
                        <div onClick={handleVideoClick}>
                          {values.video ? (
                            <video
                              controls
                              src={URL.createObjectURL(values.video)}
                              className="sm:h-80 h-48 w-full   "
                              alt=""
                              name="video"
                            />
                          ) : (
                            <div className="sm:h-80 h-48 w-full  border border-black border-dashed flex text-xl flex-col  justify-center text-center items-center text-gray-400 ">
                              <div className="text-5xl">
                                <IoCloudUploadSharp />
                              </div>
                              <div>Click to upload</div>
                            </div>
                          )}
                          <input
                            name="video"
                            type="file"
                            ref={inputRef}
                            onChange={(e) => {
                              setFieldValue("video", e.target.files[0]);
                            }}
                            style={{ display: "none" }}
                          />
                        </div>
                      </div>

           

                

                    <div className="flex gap-5 ">
                      {/* <button
                      onClick={() => {
                        Navigation(-1);
                      }}
                      type="submit"
                      className="bg-red-600 h-10 my-5 w-24 text-lg rounded-lg text-center text-white hover:bg-red-400"
                    >
                      Cancle
                    </button> */}

                      <button
                        type="submit"
                        className="bg-indigo-600 h-10 w-24 text-lg rounded-lg text-center text-white  hover:bg-indigo-400 mb-2"
                      >
                        Submit
                      </button>
                    </div>
                  </div>
                </Form>
              </div>
            );
          }}
        </Formik>
      </div>
    </div>
  );
}

export default Testimonials;
