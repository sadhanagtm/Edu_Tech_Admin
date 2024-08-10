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

function EditVision() {
  const [value, setFieldValue] = useState("");
  const [hero, setHero] = useState([]);

  const location = useLocation();
  const inputRef = useRef(null);
  const [image, setImage] = useState("");
  const [redirect, setRedirect] = useState(false);
  const [placeholder, setplaceholder] = useState("enter description...");
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
        .get(`/mission/${id}`)
        .then((res) => {
          console.log(res);
          setHero([...res.data.result]);
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
      {hero && hero.length > 0 && (
        <Formik
          initialValues={{
            title: hero && hero.length > 0 ? hero[0].title : "",
            description: hero && hero.length > 0 ? hero[0].description : "",
            icon: hero && hero.length > 0 ? hero[0].icon : "",
          }}
          onSubmit={(values, { resetForm }) => {
            setLoading(true); //set loading to true before API call

            try {
              const formData = new FormData();
              formData.append("title", values.title);
              formData.append("description", values.description);
              formData.append("icon", values.icon);

              axios
              .patch(`/mission/${location.state.id}/`, formData)
              .then((res) => {
                console.log(res);
                toast.success("post Successfully");
                setRedirect((prev) => !prev);
                setHero([...res.data.data]);
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

                {console.log(values, hero)}

                <div className="lg:ml-52  ">
                  <div className=" mx-1 ">
                    <div className="text-lg font-medium text-purple-700 mb-2">
                      Title
                    </div>
                    <div>
                      <Field
                        name="title"
                        type="text"
                        className="outline-none h-10  w-full outline-gray-200"
                        onChange={(e) => {
                          setFieldValue("title", e.target.value);
                        }}
                      />
                    </div>
                  </div>
                  <div className=" mx-1 ">
                    <div className="text-lg font-medium text-purple-700 mb-2">
                      Icon
                    </div>
                    <div>
                      <Field
                        name="icon"
                        type="text"
                        className="outline-none h-10  w-full outline-gray-200"
                        onChange={(e) => {
                          setFieldValue("icon", e.target.value);
                        }}
                      />
                    </div>
                  </div>

                  <div className="mt-10 ">
                    <div className="text-lg font-medium text-purple-700 mb-2 ">
                      Description
                      <JoditEditor
                        ref={editor}
                        value={value.description}
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
              </Form>
            );
          }}
        </Formik>
      )}
    </div>
  );
}

export default EditVision;
