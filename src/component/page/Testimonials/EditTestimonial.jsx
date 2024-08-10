import { Field, Formik, Form, ErrorMessage } from "formik";
import React, { useRef, useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useLocation } from "react-router-dom";
import axios from "../../../Hoc/Axios";
import JoditEditor from "jodit-react";
import { RiVideoUploadLine } from "react-icons/ri";
import { ClipLoader } from "react-spinners";

function Edittestimonial() {
  const [testimonial, setTestimonial] = useState({});
  const location = useLocation();
  const inputRef = useRef(null);
  const videoRef = useRef(null);
  const editor = useRef(null);
  const [redirect, setRedirect] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleImageClick = () => {
    inputRef.current.click();
  };

  const handleVideoClick = () => {
    videoRef.current.click();
  };

  const getdata = (id) => {
    try {
      axios
        .get(`/testomonial/${id}`)
        .then((res) => {
          console.log(res,"testomonial data");
          setTestimonial(...res.data.result);
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
  }, [location]);

  useEffect(() => {
    let interval;
    if (redirect) {
      interval = setTimeout(() => {
        // Navigate to the home page or wherever you want
      }, 2000);
    }
    return () => {
      clearTimeout(interval);
    };
  }, [redirect]);

  return (
    <div className="mt-24 lg:ml-44">
      {testimonial && (
        <Formik
          initialValues={{
            name: testimonial.name || "",
            instagram: testimonial.instagram || "",
            facebook: testimonial.facebook || "",
            linkedin: testimonial.linkedin || "",
            oldImage: testimonial.image || "",
            image: "",
            oldVideo: testimonial.video || "",
            video: "",
            desc: testimonial.desc || "",
          }}
          onSubmit={(values, { resetForm }) => {
            try {
              const formData = new FormData();
              formData.append("desc", values.desc);
              formData.append("name", values.name);
              formData.append("facebook", values.facebook);
              formData.append("instagram", values.instagram);
              formData.append("linkedin", values.linkedin);

              if (values.image) {
                formData.append("image", values.image);
              }
              if (values.video) {
                formData.append("video", values.video);
              }

              axios
                .patch(`/testomonial/${location.state.id}/`, formData)
                .then((res) => {
                  console.log(res);
                  toast.success("Save Successfully");
                  setRedirect(true);
                  setTestimonial([...res.data.data]);
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
              <Form
                onSubmit={handleSubmit}
                className="flex flex-col gap-5 mt-2 lg:mx-9"
              >
                <Toaster />

                {loading && (
                  <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
                    <ClipLoader size={50} color={"#123abc"} loading={loading} />
                  </div>
                )}

                <div>
                  <div className="text-lg font-medium text-purple-700 mb-2">
                    Name
                  </div>
                  <Field
                    name="name"
                    type="text"
                    className="outline-none h-10 w-full outline-gray-200"
                  />
                  <ErrorMessage
                    name="name"
                    component="div"
                    className="text-red-600"
                  />
                </div>

                <div>
                  <div className="text-lg font-medium text-purple-700 mb-2">
                    Facebook
                  </div>
                  <Field
                    name="facebook"
                    type="text"
                    className="outline-none h-10 w-full outline-gray-200"
                  />
                  <ErrorMessage
                    name="facebook"
                    component="div"
                    className="text-red-600"
                  />
                </div>

                <div>
                  <div className="text-lg font-medium text-purple-700 mb-2">
                  Linkedin
                  </div>
                  <Field
                    name="linkedin"
                    type="text"
                    className="outline-none h-10 w-full outline-gray-200"
                  />
                  <ErrorMessage
                    name="linkedin"
                    component="div"
                    className="text-red-600"
                  />
                </div> 

                <div>
                  <div className="text-lg font-medium text-purple-700 mb-2">
                    Instagram
                  </div>
                  <Field
                    name="instagram"
                    type="text"
                    className="outline-none h-10 w-full outline-gray-200"
                  />
                  <ErrorMessage
                    name="instagram"
                    component="div"
                    className="text-red-600"
                  />
                </div>

                <div className="md:grid lg:grid-cols-3 sm:grid sm:grid-cols-2 gap-10 mt-10 flex flex-col">
                  <div className="text-left w-full">
                    <div className="font-medium text-purple-700 mb-2">
                      Upload Image
                    </div>
                    <div onClick={handleImageClick} className="w-full border">
                      {values.image ? (
                        <img
                          src={URL.createObjectURL(values.image)}
                          className="h-72 object-contain w-full cursor-pointer"
                          alt="image"
                          name="image"
                        />
                      ) : (
                        <img
                          src={`http://192.168.1.95:8080/public/${values.oldImage}`}
                          className="h-72 w-full cursor-pointer object-contain"
                          alt=""
                          name="image"
                        />
                      )}
                      <input
                        name="image"
                        accept="image/*"
                        type="file"
                        ref={inputRef}
                        onChange={(e) => {
                          setFieldValue("image", e.target.files[0]);
                        }}
                        style={{ display: "none" }}
                      />
                    </div>
                  </div>
                  <div className="w-full lg:col-span-2">
                    <div className="">
                      <div className="font-semibold text-purple-700 mb-2">
                        Upload Course Video
                      </div>
                      <div onClick={handleVideoClick} className="w-full">
                        {values.video ? (
                          <video
                            controls
                            src={URL.createObjectURL(values.video)}
                            alt="video"
                            name="video"
                            className="w-full h-72 bg-black border border-black cursor-pointer"
                          />
                        ) : (
                          <div className="h-72 w-full cursor-pointer border border-black border-dashed flex text-xl flex-col justify-center text-center items-center text-gray-400">
                            <div className="text-5xl">
                              <RiVideoUploadLine />
                            </div>
                            <div>Click to upload</div>
                          </div>
                        )}
                        <input
                          name="video"
                          type="file"
                          accept="video/*"
                          ref={videoRef}
                          className="w-full h-72 bg-black"
                          onChange={(e) => {
                            setFieldValue("video", e.target.files[0]);
                          }}
                          style={{ display: "none" }}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-4">
                  <div className="font-medium text-purple-700 py-2 w-full">
                    Description
                  </div>
                  <JoditEditor
                    ref={editor}
                    value={values.desc}
                    className="text-black font-normal"
                    name="desc"
                    tabIndex={1} // tabIndex of textarea
                    onBlur={(newContent) => setFieldValue("desc", newContent)} // preferred to use only this option to update the content for performance reasons
                    onChange={(newContent) => {
                      setFieldValue("desc", newContent);
                    }}
                  />
                </div>

                <div className="text-left flex gap-5">
                  <button
                    type="submit"
                    className="bg-indigo-600 h-10 my-5 w-24 text-lg rounded-xl text-center text-white hover:bg-indigo-400"
                  >
                    Submit
                  </button>
                </div>
              </Form>
            );
          }}
        </Formik>
      )}
    </div>
  );
}

export default Edittestimonial;
