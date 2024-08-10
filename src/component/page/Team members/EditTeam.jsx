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

function EditTeam() {
  const [value, setFieldValue] = useState("");
  const [teammember, setTeamMember] = useState([]);

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
        Navigation("/teamtable");
      }, 2000);
    }
    return () => {
      clearTimeout(interval);
    };
  }, [redirect]);

  const getdata = (id) => {
    try {
      axios
        .get(`/team/${id}`)
        .then((res) => {
          console.log(res);
          setTeamMember([res.data.data]);
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
      {teammember && teammember.length > 0 && (
        <Formik
          initialValues={{
            name: teammember && teammember.length > 0 ? teammember[0].name : "",
            position:
              teammember && teammember.length > 0 ? teammember[0].position : "",
            facebook:
              teammember && teammember.length > 0 ? teammember[0].facebook : "",
            instagram:
              teammember && teammember.length > 0
                ? teammember[0].instagram
                : "",
            lindekin:
              teammember && teammember.length > 0 ? teammember[0].lindekin : "",
            testo:
              teammember && teammember.length > 0 ? teammember[0].testo : "",
            oldimage:
              teammember && teammember.length > 0 ? teammember[0].image : "",
            image: "",
          }}
          onSubmit={(values, { resetForm }) => {
            setLoading(true); //set loading to true before API call

            try {
              const formData = new FormData();
              formData.append("name", values.name);
              formData.append("position", values.position);
              formData.append("facebook", values.facebook);
              formData.append("instagram", values.instagram);
              formData.append("lindekin", values.lindekin);
              formData.append("testo", values.testo);
              formData.append("image", values.image);

              axios
                .patch(`/team/${location.state.id}/`, formData)
                .then((res) => {
                  console.log(res);
                  toast.success("Save Successfully");
                  setRedirect((prev) => !prev);
                  setTeamMember([...res.data.data]);
                  setLoading(false); //set loading to false before API call

                })
                .catch((error) => {
                  console.log(error);
                  toast.error(error.response.data.message);
                  setLoading(false); //set loading to false before API call

                });
            } catch (error) {
              console.log(error);
              toast.error(error.response.data.message);
              setLoading(false); //set loading to false before API call
            }

            console.log(values);
            resetForm();
            setLoading(false); //set loading to false before API call

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

                {console.log(values, teammember)}

                <div className="lg:ml-60 ">
                  <div className="grid lg:grid-cols-3 sm:grid-cols-2 lg:gap-9 gap-4 sm:gap-8 ">
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

                    <div className="text-left">
                      <div className="text-lg font-medium text-purple-700 mb-2">
                        Position
                      </div>
                      <div>
                        <Field
                          name="position"
                          type="text"
                          className="outline-none h-10  w-full outline-gray-200"
                          onChange={(e) => {
                            setFieldValue("position", e.target.value);
                          }}
                        />
                      </div>
                    </div>

                    <div className="text-left">
                      <div className="text-lg font-medium text-purple-700 mb-2">
                        Facebook
                      </div>
                      <div>
                        <Field
                          name="facebook"
                          type="text"
                          className="outline-none h-10  w-full outline-gray-200"
                          onChange={(e) => {
                            setFieldValue("facebook", e.target.value);
                          }}
                        />
                      </div>
                    </div>

                    <div className="text-left">
                      <div className="text-lg font-medium text-purple-700 mb-2">
                        Instagram
                      </div>
                      <div>
                        <Field
                          name="instagram"
                          type="text"
                          className="outline-none h-10  w-full outline-gray-200"
                          onChange={(e) => {
                            setFieldValue("instagram", e.target.value);
                          }}
                        />
                      </div>
                    </div>

                    <div className="text-left">
                      <div className="text-lg font-medium text-purple-700 mb-2">
                        Lindekin
                      </div>
                      <div>
                        <Field
                          name="lindekin"
                          type="text"
                          className="outline-none h-10  w-full outline-gray-200"
                          onChange={(e) => {
                            setFieldValue("lindekin", e.target.value);
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
                            className="h-48  lg:w-48 sm:w-48"
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
                          type="file"
                          accept="image/*"
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
                      Testimonial
                        <JoditEditor
                          ref={editor}
                          value={content}
                          // config={config}
                          tabIndex={1} // tabIndex of textarea
                          onBlur={(newContent) => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
                          onChange={(newContent) => {
                            setFieldValue("testo", newContent);
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
      )}
    </div>
  );
}

export default EditTeam;
