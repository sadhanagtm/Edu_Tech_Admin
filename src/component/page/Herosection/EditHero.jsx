import { Field, Formik, Form, ErrorMessage } from "formik";
import React, { useRef, useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import axios from "../../../Hoc/Axios";
import { IoCloudUploadSharp } from "react-icons/io5";
import JoditEditor from "jodit-react";
import { useNavigate, useLocation } from "react-router-dom";
import * as Yup from "yup";

const schema = Yup.object().shape({
  title: Yup.string().required("This field is required"),
  subtitle: Yup.string().required("This field is required"),
  description: Yup.string().required("This field is required"),
  image: Yup.mixed(),
  pagelocation: Yup.string().required("This field is required"),
});

function EditHero() {
  const [hero, setHero] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  const inputRef = useRef(null);
  const [image, setImage] = useState("");
  const [redirect, setRedirect] = useState(false);
  const editor = useRef(null);
  const [content, setContent] = useState("");

  const [loading, setLoading] = useState(false);

  const handleImageClick = () => {
    inputRef.current.click();
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  useEffect(() => {
    if (redirect) {
      const timer = setTimeout(() => {
        navigate("/herosectiontable");
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [redirect, navigate]);

  const getdata = (id) => {
    axios
      .get(`/banner/${id}`)
      .then((res) => {
        setHero([res.data.result]);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    if (location && location.state && location.state.id) {
      getdata(location.state.id);
    }
  }, [location]);

  return (
    <div className="mt-20">
      {hero && hero.length > 0 && (
        <Formik
          initialValues={{
            title: hero[0].title || "",
            subtitle: hero[0].subtitle || "",
            description: hero[0].description || "",
            oldimage: hero[0].image || "",
            image: null,
            pagelocation: hero[0].pagelocation || "",
          }}
          validationSchema={schema}
          onSubmit={(values, { resetForm }) => {
            setLoading(true); //set loading to true before API call

            try {
              const formData = new FormData();
              formData.append("title", values.title);
              formData.append("subtitle", values.subtitle);
              formData.append("description", values.description);
              if (image) {
                formData.append("image", image);
              }
              formData.append("pagelocation", values.pagelocation);

              axios
                .patch(`/banner/${location.state.id}/`, formData)
                .then((res) => {
                  toast.success("Post Successful");
                  setRedirect(true);
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
            resetForm();
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

              <div className="lg:ml-52">
                <div className="mx-1">
                  <div className="text-lg font-medium text-purple-700 mb-2">
                    Title
                  </div>
                  <Field
                    name="title"
                    type="text"
                    className="outline-none h-10 w-full outline-gray-200"
                  />
                  <ErrorMessage
                    name="title"
                    component="div"
                    className="text-red-600"
                  />
                </div>

                <div className="mx-1">
                  <div className="text-lg font-medium text-purple-700 mb-2">
                    Subtitle
                  </div>
                  <Field
                    name="subtitle"
                    type="text"
                    className="outline-none h-10 w-full outline-gray-200"
                  />
                  <ErrorMessage
                    name="subtitle"
                    component="div"
                    className="text-red-600"
                  />
                </div>

                <div className="mt-10">
                  <div className="text-lg font-medium text-purple-700 mb-2">
                    Upload Image
                  </div>
                  <div onClick={handleImageClick} className="border sm:w-48">
                    {values.image || image ? (
                      <img
                        src={URL.createObjectURL(values.image || image)}
                        className="h-48 lg:w-48 sm:w-48 object-contain"
                        alt="Preview"
                      />
                    ) : (
                      <img
                        src={`http://192.168.1.106:8080/public/${values.oldimage}`}
                        className="h-48 lg:w-48 sm:w-48"
                        alt="Old"
                      />
                    )}
                    <input
                      name="image"
                      type="file"
                      accept="image/*"
                      ref={inputRef}
                      onChange={handleImageChange}
                      style={{ display: "none" }}
                    />
                  </div>
                </div>

                <div className="mt-10">
                  <div className="text-lg font-medium text-purple-700 mb-2">
                    Description
                  </div>
                  <JoditEditor
                    ref={editor}
                    value={values.description}
                    tabIndex={1}
                    onBlur={(newContent) => setContent(newContent)}
                    onChange={(newContent) =>
                      setFieldValue("description", newContent)
                    }
                  />
                  <ErrorMessage
                    name="description"
                    component="div"
                    className="text-red-600"
                  />
                </div>

                <div className="mt-9">
                  <select
                    id="pagelocation"
                    name="pagelocation"
                    value={values.pagelocation}
                    onChange={(e) =>
                      setFieldValue("pagelocation", e.target.value)
                    }
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

                <div className="text-left flex gap-5">
                  <button
                    onClick={() => navigate(-1)}
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
          )}
        </Formik>
      )}
    </div>
  );
}

export default EditHero;
