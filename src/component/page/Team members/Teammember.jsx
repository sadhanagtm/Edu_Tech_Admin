import React, { useRef, useState, useEffect, useMemo } from "react";
import { BsFillEyeFill } from "react-icons/bs";
import { Field, Formik, Form } from "formik";
import toast, { Toaster } from "react-hot-toast";
import { Description, Navigation } from "@mui/icons-material";
import axiosinstance from "../../../Hoc/Axios";
import { IoCloudUploadSharp } from "react-icons/io5";
import JoditEditor from "jodit-react";
import { Link } from "react-router-dom";

function Teammember() {
  const data = [
    { name: "name", type: "text", label: "Name" },
    { name: "position", type: "text", label: "Position" },
    { name: "facebook", type: "text", label: "Facebook" },
    { name: "twitter", type: "text", label: "Twitter" },
    { name: "linkedin", type: "text", label: "Linkedin" },
  ];

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

  return (
    <div className="lg:ml-64 mt-20 -ml-2">
      <div className=" h-16 w-full  bg-gray-50  shadow-xl flex rounded-lg -ml-1  items-center justify-between">
        <div className="  lg:text-xl font-semibold ml-4 ">Team Members</div>
        <Link to={"/TeamTable"}>
          <div className="flex gap-2   justify-between lg:mr-7 mr-3 cursor-pointer ">
            <BsFillEyeFill className="  lg:text-lg mt-1" />
            View Team Members
          </div>
        </Link>
      </div>

      <div className="mt-10  w-full">
        <Formik
          initialValues={{
            name: "",
            position: "",
            facebook: "",
            twitter: "",
            Linkedin: "",
            testimonial: "",
            image: "",
          }}
          onSubmit={(values, { resetForm }) => {
            try {
              const formData = new FormData();
              formData.append("name", values.name);
              formData.append("position", values.position);
              formData.append("facebook", values.facebook);
              formData.append("twitter", values.twitter);
              formData.append("Linkedin", values.Linkedin);
              formData.append("testimonial", values.testimonial);
              formData.append("image", values.image);

              //   axiosinstance
              //     .post("/testimonial", formData)
              //     .then((res) => {
              //       console.log(res);
              //       toast.success("Login Successful");
              //       setredirect((prev) => !prev);
              //       localStorage.setItem("token", res.data.accesstoken);
              //       Navigate("/");
              //       setcourse([...res.data.data]);
              //     })
              //     .catch((error) => {
              //       console.log(error);
              //       toast.error(error.response.data.message);
              //     });
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

                  <div className=" lg:ml-5">
                    <div className="grid lg:grid-cols-3 lg:gap-11 gap-5 ">
                      {data.map((val, i) => {
                        return (
                          <div className="text-left">
                            <div className="text-lg font-medium text-purple-700 mb-2">
                              {val.label}
                            </div>
                            <div>
                              <Field
                                name={val.name}
                                autoComplete="off"
                                type={val.type}
                                className="outline-none h-10  w-full  outline-gray-200"
                                // onChange={(e) => {
                                //   setFieldValue("title", e.target.value);
                                // }}
                              />
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    <div className="text-left lg:mt-10 mt-7 ">
                      <div className="text-lg font-medium text-purple-700 lg:mb-9 mb-6 w-full ">
                       <div className="mb-2">  Testimonial  </div>
                        <JoditEditor
                          ref={editor}
                          value={content}
                          name="testimonial"
                          // config={config}
                          tabIndex={1} // tabIndex of textarea
                          onBlur={(newContent) => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
                          onChange={(newContent) => {
                            setFieldValue("testimonial", newContent);
                          }}
                        />
                      </div>
                    </div>

                 
                      <div className="text-left mt-0  ">
                        <div className="text-lg font-medium text-purple-700 mb-2">
                          Image
                        </div>
                        <div onClick={handleImageClick}>
                          {values.image ? (
                            <img
                              controls
                              src={URL.createObjectURL(values.image)}
                              className="h-48 lg:w-48 w-full "
                              alt=""
                              name="image"
                            />
                          ) : (
                            <div className="h-48  lg:w-48  border border-black border-dashed flex text-xl flex-col  justify-center text-center items-center text-gray-400 ">
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
                   

                    <div className="text-left flex gap-5 ">
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
                        className="bg-indigo-600 h-10 my-5 w-24 text-lg rounded-lg text-center text-white  hover:bg-indigo-400"
                      >
                        Submit
                      </button>
                    </div>
                  </div>
                </Form>
            
            );
          }}
        </Formik>
      </div>
    </div>
  );
}

export default Teammember;
