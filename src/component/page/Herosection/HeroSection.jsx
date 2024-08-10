

import { Field, Formik, Form, ErrorMessage } from "formik";
import React, { useRef, useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import axiosinstance from "../../../Hoc/Axios";
import { IoCloudUploadSharp } from "react-icons/io5";
import JoditEditor from "jodit-react";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import { ClipLoader } from "react-spinners";

const schema = Yup.object().shape({
  title: Yup.string().required("This field is required"),
  subtitle: Yup.string().required("This field is required"),
  description: Yup.string().required("This field is required"),
  image: Yup.string().required("This field is required"),
  pagelocation: Yup.string().required("This field is required"),
});

function HeroSection() {
  const [image, setImage] = useState(null);
  const [redirect, setRedirect] = useState(false);
  const [content, setContent] = useState("");
  const [selectedOption, setSelectedOption] = useState("");

  const inputRef = useRef(null);
  const editor = useRef(null);

  const[loading,setLoading]= useState(false);

  const handleChange = (e) => {
    setSelectedOption(e.target.value);
  };

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
        Navigation("/herosectiontable");

      }, 2000);
    }
    return () => {
      clearTimeout(interval);
    };
  }, [redirect]);

  return (
    <div className="mt-20 lg:ml-52">
      <div>
        <div className="text-2xl font-bold text-purple-700">
          Hero Section
        </div>

        <Link to="/herosectiontable">
          <div className="top-20 lg:right-8 right-9 absolute">
            <button className="lg:h-10 h-7 w-20 bg-red-700 text-white lg:text-lg font-semibold rounded-xl">
              View
            </button>
          </div>
        </Link>
      </div>

      <div className="mt-6 w-full">
        <Formik
          initialValues={{
            title: "",
            subtitle: "",
            description: "",
            image: "",
            pagelocation: "",
          }}
          validationSchema={schema}
          onSubmit={(values, { resetForm }) => {
            setLoading(true); //set loading to true before API call
            try {
              const formData = new FormData();
              formData.append("title", values.title);
              formData.append("subtitle", values.subtitle);
              formData.append("description", values.description);
              formData.append("image",values.image);
              formData.append("pagelocation", values.pagelocation);

              axiosinstance
                .post("/banner", formData)
                .then((res) => {
                  console.log(res);
                  toast.success("Post Successful");
                  setRedirect(true);
                  resetForm();
                  setLoading(false); //set loading to false before API call
                  
                })
                .catch((error) => {
                  console.log(error);
                  toast.error(error.response?.data?.message);
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

              <div className="flex flex-col m-auto gap-7 w-full">
                <div>
                  <div className="text-lg font-medium text-purple-700 py-2">
                    Title
                  </div>
                  <div>
                    <Field
                      name="title"
                      type="text"
                      className="outline-none h-8 outline-gray-200 w-full"
                    />
                    <ErrorMessage
                      name="title"
                      component="div"
                      className="text-red-600"
                    />
                  </div>
                </div>

                <div>
                  <div className="text-lg font-medium text-purple-700 py-2">
                    Subtitle
                  </div>
                  <div>
                    <Field
                      name="subtitle"
                      type="text"
                      className="outline-none h-8 outline-gray-200 w-full"
                    />
                    <ErrorMessage
                      name="subtitle"
                      component="div"
                      className="text-red-600"
                    />
                  </div>
                </div>

                <div className="w-full">
                  <div className="py-1 text-lg font-medium text-purple-700">
                    Description
                  </div>
                  <JoditEditor
                    name="description"
                    ref={editor}
                    value={content}
                    tabIndex={1}
                    onBlur={(newContent) => setContent(newContent)}
                    onChange={(newContent) => {
                      setFieldValue("description", newContent);
                    }}
                  />
                  <ErrorMessage
                    name="description"
                    component="div"
                    className="text-red-600"
                  />
                </div>

                <div className="lg:flex lg:gap-44">
                <div className="text-left mt-0">
                    <div className="text-lg font-medium text-purple-700 mb-2">
                      Upload Image
                    </div>
                    <div onClick={handleImageClick} className="border sm:w-48">
                      {values.image ? (
                        <img
                          src={URL.createObjectURL(values.image)}
                          className="h-48 lg:w-48 w-full object-contain sm:w-48"
                          alt=""
                          name="image"
                        />
                      ) : (
                        <div className="h-48  lg:w-48  sm:w-48 w-full border border-black border-dashed flex text-xl flex-col  justify-center text-center items-center text-gray-400 ">
                          <div className="text-5xl">
                            <IoCloudUploadSharp />
                          </div>
                          <div>Click to upload</div>
                        </div>
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
                      <ErrorMessage
                        name="image"
                        component={"div"}
                        className="text-red-600"
                      />
                    </div>
                  </div>

                  <div className="mt-9">
                    <select
                      id="pagelocation"
                      name="pagelocation"
                      value={values.pagelocation}
                      onChange={(e) => setFieldValue("pagelocation", e.target.value)}
                      className="border outline-none h-10 lg:w-96 text-center lg:text-xl text-sm w-full text-purple-700 font-medium"
                    >
                      <option value="">Select...</option>
                      <option value="whyus">Why Us</option>
                      <option value="banner">Banner</option>
                      <option value="discover">Discover</option>
                      <option value="welcome">Welcome</option>
                    </select>
                    <ErrorMessage
                      name="pagelocation"
                      component="div"
                      className="text-red-600"
                    />
                  </div>
                </div>

                <div className="text-left flex gap-5 sm:mt-2">
                  <button
                    type="button"
                    onClick={() => window.history.back()}
                    className="bg-red-600 h-10 my-2 w-24 text-lg rounded-lg text-center text-white hover:bg-indigo-500"
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    className="bg-indigo-600 h-10 my-2 w-24 text-lg rounded-lg text-center text-white hover:bg-indigo-500"
                  >
                    Post
                  </button>
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default HeroSection;

