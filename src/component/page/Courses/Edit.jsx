import { Field, Formik, Form } from "formik";
import React, { useRef, useState, useEffect, useMemo } from "react";
import toast, { Toaster } from "react-hot-toast";
import { Description, Navigation } from "@mui/icons-material";
import axios from "../../../Hoc/Axios";
import { IoCloudUploadSharp } from "react-icons/io5";
import JoditEditor from "jodit-react";
import { duration } from "@mui/material";
import { useLocation } from "react-router-dom";

function Edit() {
  const [value, setFieldValue] = useState("");
  const [course, setcourse] = useState([]);

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
        .get(`/course/${id}`)
        .then((res) => {
          console.log(res);
          setcourse([res.data.result]);
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
      {course && course.length > 0 && (
        <Formik
          initialValues={{
            name: course && course.length > 0 ? course[0].name : "",
            price: course && course.length > 0 ? course[0].price : "",
            duration: course && course.length > 0 ? course[0].duration : "",
            description:
              course && course.length > 0 ? course[0].description : "",
            // image: course && course.length > 0 ? course[0].image : "",
            rating: course && course.length > 0 ? course[0].rating : "",
            tags: course && course.length > 0 ? course[0].tags : "",
            discount: course && course.length > 0 ? course[0].discount : "",
          }}
          onSubmit={(values, { resetForm }) => {
            try {
              const formData = new FormData();
              formData.append("name", values.name);
              formData.append("price", values.price);
              formData.append("duration", values.duration);
              formData.append("description", values.description);
              formData.append("image", values.image);
              formData.append("rating", values.rating);
              formData.append("tags", values.tags);
              formData.append("discount", values.discount);
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

                {console.log(values, course)}

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

                    <div className="text-left">
                      <div className="text-lg font-medium text-purple-700 mb-2">
                        Price
                      </div>
                      <div>
                        <Field
                          name="price"
                          type="number"
                          label="hehe"
                          className="outline-none h-10 w-[250px] outline-gray-200"
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
                          name="duration"
                          type="text"
                          label="hehe"
                          className="outline-none h-10 w-[250px] outline-gray-200"
                          onChange={(e) => {
                            setFieldValue("duration", e.target.value);
                          }}
                        />
                      </div>
                    </div>

                    <div className="text-left">
                      <div className="text-lg font-medium text-purple-700 mb-2">
                        Rating
                      </div>
                      <div>
                        <Field
                          name="rating"
                          type="number"
                          label="hehe"
                          className="outline-none h-10 w-[250px] outline-gray-200"
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
                          name="discount"
                          type="percentage"
                          label="hehe"
                          className="outline-none h-10 w-[250px] outline-gray-200"
                          onChange={(e) => {
                            setFieldValue("discount", e.target.value);
                          }}
                        />
                      </div>
                    </div>

                    <div className="text-left">
                      <div className="text-lg font-medium text-purple-700 mb-2">
                        Tags
                      </div>
                      <div>
                        <Field
                          name="tags"
                          type="text"
                          label="hehe"
                          className="outline-none h-10 w-[250px] outline-gray-200"
                          onChange={(e) => {
                            setFieldValue("tags", e.target.value);
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
                      <div onClick={handleImageClick}>
                        {values.image ? (
                          <img
                            src={URL.createObjectURL(values.image)}
                            className="h-48  w-48"
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

export default Edit;
