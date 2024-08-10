import { Field, Formik, Form } from "formik";
import React, { useRef, useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "../../../Hoc/Axios";
import JoditEditor from "jodit-react";
import { IoCloudUploadSharp } from "react-icons/io5";
import { ClipLoader } from "react-spinners";

function Edit() {
  const [value, setFieldValue] = useState("");
  const [course, setCourse] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();
  const inputRef = useRef(null);
  const [image, setImage] = useState("");
  const [redirect, setRedirect] = useState(false);
  const [placeholder, setPlaceholder] = useState("enter description...");
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
  const videoRef = useRef(null);
  const handleVideoClick = () => {
    videoRef.current.click();
  };

  const handleVideoChange = () => {
    const file = e.target.files[0];
    console.log(file);
    setVideo(e.target.files[0]);
  };

  useEffect(() => {
    let interval;
    if (redirect) {
      interval = setTimeout(() => {
        navigate("/Courses");
      }, 2000);
    }
    return () => {
      clearTimeout(interval);
    };
  }, [redirect, navigate]);

  const getData = (id) => {
    try {
      axios
        .get(`/course/${id}`)
        .then((res) => {
          console.log(res);
          setCourse([res.data.result]);
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
      getData(location.state.id);
    }
  }, [location]);

  return (
    <div className="mt-24 ">
      {course && course.length > 0 && (
        <Formik
          initialValues={{
            name: course[0]?.name || "",
            price: course[0]?.price || "",
            duration: course[0]?.duration || "",
            description: course[0]?.description || "",
            oldimage: course[0]?.image || "",
            image: "",
            oldoverview: course[0]?.overview || "",
            overview: "",
            rating: course[0]?.rating || "",
            tags: course[0]?.tags || "",
            discount: course[0]?.discount || "",
          }}
          onSubmit={(values, { resetForm }) => {
            setLoading(true); //set loading to true before API call

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
              formData.append("overview", values.discount);

              axios
                .patch(`/course/${location.state.id}/superadmin`, formData)
                .then((res) => {
                  console.log(res);
                  toast.success("Save Successfully");
                  setRedirect((prev) => !prev);
                  setCourse([...res.data.data]);
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

                <div className="lg:ml-52 mt-24 mx-6 lg:mx-12">
                  <div className="lg:grid lg:grid-cols-3 gap-8 mt-8 sm:grid sm:grid-cols-2 flex flex-col">
                    <div className="text-left">
                      <div className="text-lg font-medium text-purple-700 mb-2">
                        Name
                      </div>
                      <div>
                        <Field
                          name="name"
                          type="text"
                          className="outline-none h-8 w-full outline-gray-200"
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
                          className="outline-none h-8 w-full outline-gray-200"
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
                          className="outline-none h-8 w-full outline-gray-200"
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
                          className="outline-none h-8 w-full outline-gray-200"
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
                          type="text"
                          className="outline-none h-8 w-full outline-gray-200"
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
                          className="outline-none h-8 w-full outline-gray-200"
                          onChange={(e) => {
                            setFieldValue("tags", e.target.value);
                          }}
                        />
                      </div>
                    </div>
                  </div>

                  <div className=" mt-10 w-full">
                    <div className="">
                      <div className="text-left mt-0">
                        <div className="text-lg font-medium text-purple-700 mb-2">
                          Upload Image
                        </div>
                        <div
                          onClick={handleImageClick}
                          className="border sm:w-48 cursor-pointer"
                        >
                          {values.image ? (
                            <img
                              src={URL.createObjectURL(values.image)}
                              className="h-48 lg:w-48 sm:w-48 object-contain cursor-pointer"
                              alt=""
                              name="image"
                            />
                          ) : (
                            <img
                              src={`http://192.168.1.95:8080/public/${values.oldimage}`}
                              className="h-48 lg:w-48 sm:w-48"
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
                      {/* <div onClick={handleVideoClick}>
                      {values.video ? (
                        <video controls
                        src={`http://192.168.100.31:8080/public/${values.oldoverview}`}
                        alt=""
                        name="overview"
                        className="w-full height={200}  bg-black controls={true} muted={true} loop={true} autoPlay={true}border border-black cursor-pointer"
                        />
                      ) : (
                        <div className=" h-56 w-56 cursor-pointer  border border-black border-dashed flex text-xl flex-col  justify-center text-center items-center text-gray-400 ">
                          <div className="text-5xl ">
                          <RiVideoUploadLine />
                          </div>
                          <div>Click to upload</div>
                        </div>
                      )}
                      <input
                        name="overview"
                        type="file"
                        ref={videoRef}
                        className="w-full height={200} bg-black controls={true}  muted={true} loop={true} autoPlay={true} "
                        
                        
                        onChange={(e) => {
                          setFieldValue("overview", e.target.files[0]);
                        }}
                        style={{ display: "none" }}
                      />
                       
                    </div> */}
                    </div>
                  </div>

                  <div className="text-left mt-10">
                    <div className="text-lg font-medium text-purple-700 mb-2">
                      Description
                    </div>
                    <JoditEditor
                      ref={editor}
                      value={values.description}
                      tabIndex={1} // tabIndex of textarea
                      onBlur={(newContent) => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
                      onChange={(newContent) => {
                        setFieldValue("description", newContent);
                      }}
                    />
                  </div>

                  <div className="text-left flex gap-5">
                    <button
                      onClick={() => {
                        navigate(-1);
                      }}
                      type="button"
                      className="bg-red-600 h-10 my-5 w-24 text-lg rounded-lg text-center text-white hover:bg-red-500"
                    >
                      Cancel
                    </button>

                    <button
                      type="submit"
                      className="bg-green-600 h-10 my-5 w-24 text-lg rounded-lg text-center text-white hover:bg-green-500"
                    >
                      Save
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

export default Edit;
