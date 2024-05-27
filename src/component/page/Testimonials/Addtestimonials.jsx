import { Field, Formik, Form } from "formik";
import React, { useRef, useState, useEffect, useMemo } from "react";
import toast, { Toaster } from "react-hot-toast";
import { Description, Navigation } from "@mui/icons-material";
import axios from "../../../Hoc/Axios";
import { IoCloudUploadSharp } from "react-icons/io5";
import JoditEditor from "jodit-react";
import { duration } from "@mui/material";

function Addtestimonials() {
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
    <div className="mt-20">
      <Formik
        initialValues={{
          name: "",
          description: "",
          video: "",
        }}
        onSubmit={(values, { resetForm }) => {
          try {
            const formData = new FormData();
            formData.append("name", values.name);

            formData.append("description", values.description);
            formData.append("video", values.video);

            axios
              .post("/testimonial/", formData)
              .then((res) => {
                console.log(res);
                toast.success("Login Successful");
                setredirect((prev) => !prev);
                localStorage.setItem("token", res.data.accesstoken);
                Navigate("/");
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

              <div className="ml-60 ">
                <div className="grid grid-cols-3 gap-9 ">
                  <div className="text-left">
                    <div className="text-lg font-medium text-purple-700 mb-2">
                      Name
                    </div>
                    <div>
                      <Field
                        name="name"
                        type="text"
                        label="hehe"
                        className="outline-none h-10 w-[250px] outline-gray-200"
                        onChange={(e) => {
                          setFieldValue("name", e.target.value);
                        }}
                      />
                    </div>
                  </div>
                </div>

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
                        setFieldValue("description", e.target.value);
                      }}
                    />
                  </div>
                </div>

                <div className=" col-span-2 mt-10 grid grid-cols-1 justify-between">
           

                  <div className="text-left mt-0  ">
                    <div className="text-lg font-medium text-purple-700 mb-2">
                      Video
                    </div>
                    <div onClick={handleVideoClick}>
                      {values.video ? (
                        <video
                          controls
                          src={URL.createObjectURL(values.video)}
                          className="h-full w-11/12"
                          alt=""
                          name="video"
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

export default Addtestimonials;
