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

function Editcategory() {
  const [value, setFieldValue] = useState("");
  const [category, setCategory] = useState([]);

  const location = useLocation();
  const inputRef = useRef(null);
  const [image, setImage] = useState("");
  const [redirect, setRedirect] = useState(false);
  const [placeholder, setplaceholder] = useState("enter description...");

  const editor = useRef(null);
  const [content, setContent] = useState("");

  const [loading, setLoading] = useState(false);

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
        Navigation("/category");
      }, 2000);
    }
    return () => {
      clearTimeout(interval);
    };
  }, [redirect]);

  const getdata = (id) => {
    try {
      axios
        .get(`/category/${id}`)
        .then((res) => {
          console.log(res);
          setCategory([res.data.result]);
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
      {category && category.length > 0 && (
        <Formik
          initialValues={{
            name: category && category.length > 0 ? category[0].name : "",
            oldimage: category && category.length > 0 ? category[0].image : "",
            image: "",
          }}
          onSubmit={(values, { resetForm }) => {
            setLoading(true); //set loading to true before API call

            try {
              const formData = new FormData();
              formData.append("name", values.name);
              formData.append("image", values.image);

              axios
                .patch(`/category/${location.state.id}/`, formData)
                .then((res) => {
                  console.log(res);
                  toast.success("post Successfully");
                  setRedirect((prev) => !prev);
                  setLoading(false); //set loading to false before API call
                  setCategory([...res.data.data]);
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

                {console.log(values, category)}

                <div>
                  <div className="text-left">
                    <div className="text-lg font-medium text-purple-700 mb-2">
                      Name
                    </div>
                    <div>
                      <Field
                        name="name"
                        type="text"
                        className="outline-none h-10  w-full outline-gray-200"
                        onChange={(e) => {
                          setFieldValue("name", e.target.value);
                        }}
                      />
                    </div>
                  </div>

                  <div className=" col-span-2 mt-10 grid grid-cols-1 justify-between">
                    <div className="text-left mt-0">
                      <div className="text-lg font-medium text-purple-700 mb-2">
                        Upload Image
                      </div>
                      <div
                        onClick={handleImageClick}
                        className=" border sm:w-48 "
                      >
                        {values.image ? (
                          <img
                            src={URL.createObjectURL(values.image)}
                            className="h-48  w-48 sm:w-48 object-contain"
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

export default Editcategory;
