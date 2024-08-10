import { Field, Formik, Form, ErrorMessage } from "formik";
import React, { useRef, useState, useEffect, useMemo } from "react";
import toast, { Toaster } from "react-hot-toast";
import { Description, Navigation } from "@mui/icons-material";
import axios from "../../../Hoc/Axios";
import { IoCloudUploadSharp } from "react-icons/io5";
import JoditEditor from "jodit-react";
import { duration } from "@mui/material";
import { IoIosArrowBack } from "react-icons/io";
import { Link } from "react-router-dom";
import { ClipLoader } from "react-spinners";

import * as Yup from "yup";

const schema = Yup.object().shape({
  name: Yup.string().required("This field is required"),
  price: Yup.string().required("This field is required"),
  duration: Yup.string().required("This field is required"),
  discount: Yup.string().required("This field is required"),
  rating: Yup.string()
    .max(5, "Rating should be up to 5 only")
    .required("This field is required"),
  tags: Yup.string().required("This field is required"),
  desc: Yup.string().required("This field is required"),
  image: Yup.string().required("This field is required"),
  overview: Yup.string().required("This field is required"),
});

function Addcourses() {
  const [options, setOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState("");
  const [category, setCategory] = useState("");
  

  

  
  const data = [
    { name: "name", type: "text", lable: "Name" },
    { name: "price", type: "number", lable: "Price" },
    { name: "duration", type: "text", lable: "Duration" },
    { name: "rating", type: "number", lable: "Rating" },
    { name: "tags", type: "text", lable: "Tags" },
    { name: "discount", type: "percentge", lable: "Discount" },
  ];
  
  const [value, setFieldValue] = useState("");
  const inputRef = useRef(null);
  const videoRef = useRef(null);
  const [image, setImage] = useState("");
  const [video, setVideo] = useState("");
  const [redirect, setredirect] = useState(false);
  const [placeholder, setplaceholder] = useState("enter desc...");



  useEffect(() => {
    axios
      .get("/category")
      .then((res) => {
        setOptions([...res.data.newArr]);
        console.log(res.data, "category ko data ");
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleChange = (e) => {
    setSelectedOption(e.target.value);
  };
  const editor = useRef(null);
  const [content, setContent] = useState("");

  const[loading,setLoading]= useState(false);


  const handleImageClick = () => {
    inputRef.current.click();
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    console.log(file);
    setImage(e.target.files[0]);
  };

  const handleVideoClick = () => {
    videoRef.current.click();
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
          price: "",
          duration: "",
          desc: "",
          image: "",
          rating: "",
          tags: "",
          discount: "",
          overview: "",
        }}
        validationSchema={schema}
        onSubmit={(values, { resetForm }) => {
          setLoading(true); //set loading to true before API call

          try {
            const formData = new FormData();
            formData.append("name", values.name);
            formData.append("price", values.price);
            formData.append("duration", values.duration);
            formData.append("description", values.desc);
            formData.append("image", values.image);
            formData.append("rating", values.rating);
            formData.append("tags", values.tags);
            formData.append("discount", values.discount);
            formData.append("overview", values.overview);
            formData.append("category", values.category);

            axios
              .post("/course/superadmin", formData)
              .then((res) => {
                console.log(res);
                toast.success("post Successful");
                setredirect((prev) => !prev);
                setcourse([...res.data.data]);
                resetForm();
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

              <div className="lg:ml-52">
                <div className=" flex justify-between ">
                  <div className="text-2xl font-bold  text-purple-700 lg:mb-6 mb-3 font">
                    Courses
                  </div>

                  <Link to={"/Courses"}>
                    <div className="h-10 w-10 bg-gray-300 rounded-3xl text-3xl text-purple-700 px-1 py-1 ">
                      <IoIosArrowBack />
                    </div>
                  </Link>
                </div>

                <div className=" grid lg:grid-cols-3  sm:grid-cols-2 lg:gap-8 gap-4 sm:gap-8">
                  {data.map((val, i) => {
                    return (
                      <div>
                        <div className=" font-medium text-purple-700 mb-2 ">
                          {val.lable}
                        </div>
                        <div>
                          <Field
                            name={val.name}
                            autoComplete="off"
                            type={val.type}
                            className="outline-none w-full h-8  outline-gray-200  "
                            onChange={(e) => {
                              setFieldValue(val.name, e.target.value);
                            }}
                          />
                          <ErrorMessage
                            name={val.name}
                            component={"div"}
                            className="text-red-600"
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>

               {/* Dropdown sslector using API */}
                <div className=" mt-10">
                  <div className=" font-medium text-purple-700 mb-2 ">
                    {" "}
                    Select a Category{" "}
                  </div>
                  <select
                    className="outline-none   h-8  outline-gray-200 w-full  "
                    value={values.category}
                    onChange={(e) => {
                      console.log(e.target.value);
                      setFieldValue("category", e.target.value);
                    }}
                  >
                    <option value="">select a category</option>
                    {options.map((option) => (
                      <option key={option.id} value={option.id}>
                        {option.name}
                        {console.log(option.id, "yo category ko id ho")}
                      </option>
                    ))}
                  </select>
                </div>

                <div className=" col-span-2 my-10 justify-between">
                  <div className=" lg:grid lg:grid-cols-3 md:grid sm:grid sm:grid-cols-2 gap-10 ">
                    <div className="text-left mt-0 w-full ">
                      <div className="text-lg font-medium text-purple-700 mb-2">
                        Upload Image
                      </div>
                      <div onClick={handleImageClick} className="w-full border">
                        {values.image ? (
                          <img
                            src={URL.createObjectURL(values.image)}
                            className="h-72  w-full object-contain "
                            alt=""
                            name="image"
                          />
                        ) : (
                          <div
                            className="h-72  w-full 
                         border border-black border-dashed flex text-xl flex-col
                           justify-center text-center items-center text-gray-400 "
                          >
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

                    <div className="text-left mt-0 w-full lg:col-span-2 ">
                      <div className="text-lg font-medium text-purple-700 mb-2">
                        Video
                      </div>
                      <div onClick={handleVideoClick} className="w-full">
                        {values.overview ? (
                          <video
                            controls
                            src={URL.createObjectURL(values.overview)}
                            className="h-72 w-full"
                            alt=""
                            name="overview"
                          />
                        ) : (
                          <div className="h-72  w-full border border-black border-dashed flex text-xl flex-col  justify-center text-center items-center text-gray-400 ">
                            <div className="text-5xl">
                              <IoCloudUploadSharp />
                            </div>
                            <div>Click to upload</div>
                          </div>
                        )}
                        <input
                          name="overview"
                          type="file"
                          accept="video/*"
                          ref={videoRef}
                          onChange={(e) => {
                            setFieldValue("overview", e.target.files[0]);
                          }}
                          style={{ display: "none" }}
                        />
                        <ErrorMessage
                          name="overview"
                          component={"div"}
                          className="text-red-600"
                        />
                      </div>
                    </div>
                  </div>

                  <div className=" mt-10 ">
                    <div className="text-lg font-medium text-purple-700 mb-2 ">
                      Description{" "}
                    </div>
                    <JoditEditor
                      ref={editor}
                      value={content}
                      name="desc"
                      // config={config}
                      tabIndex={1} // tabIndex of textarea
                      onBlur={(newContent) => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
                      onChange={(newContent) => {
                        setFieldValue("desc", newContent);
                      }}
                    />
                    <ErrorMessage
                      name="desc"
                      component={"div"}
                      className="text-red-600"
                    />
                  </div>

                  <div className=" flex gap-5 mt-5  ">
                    <button
                      onClick={() => {
                        Navigation(-1);
                      }}
                      type="button"
                      className="bg-red-600 h-10  w-24 text-lg rounded-lg text-center text-white hover:bg-red-500"
                    >
                      Cancel
                    </button>

                    <button
                      type="submit"
                      className="bg-indigo-600 h-10  w-24 text-lg rounded-lg text-center text-white hover:bg-indigo-500"
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

export default Addcourses;
