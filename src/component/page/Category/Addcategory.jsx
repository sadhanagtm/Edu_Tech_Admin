import { Field, Formik, Form, ErrorMessage } from "formik";
import React, { useRef, useState, useEffect, useMemo } from "react";
import toast, { Toaster } from "react-hot-toast";
import { Navigation } from "@mui/icons-material";
import axios from "../../../Hoc/Axios";
import { IoCloudUploadSharp } from "react-icons/io5";
import { Link } from "react-router-dom";
import { ClipLoader } from "react-spinners";


import JoditEditor from "jodit-react";
import * as Yup from "yup";
import { IoIosArrowBack } from "react-icons/io";

const schema = Yup.object().shape({
  name: Yup.string().required("This field is required"),
  image: Yup.string().required("This field is required"),
});

function Addcategory() {
  const [value, setFieldValue] = useState("");
  const inputRef = useRef(null);
  const [image, setImage] = useState("");
  const [redirect, setredirect] = useState(false);
const[category, setCategoty]= useState("");
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
    <div className="mt-20 lg:ml-52">
      <Formik
        initialValues={{
          name: "",
          image: "",
        }}
        validationSchema={schema}
        onSubmit={(values, { resetForm }) => {
          setLoading(true); //set loading to true before API call

          try {
            const formData = new FormData();
            formData.append("name", values.name);
            formData.append("image", values.image);
            axios
              .post("/category/", formData)
              .then((res) => {
                console.log(res);
                toast.success("post Successful");
                setredirect((prev) => !prev);
                resetForm();
                setCategoty([...res.data.data]);
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
            <Form
             onSubmit={handleSubmit}>
              <Toaster />

 
              {loading && (
                <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
                  <ClipLoader size={50} color={"#123abc"} loading={loading} />
                </div>
              )}

              <div className="">
                <div className="flex justify-between">
                  <div className="text-2xl font-bold  text-purple-700 lg:mb-6 mb-3 font">
                    Category
                  </div>
                  <Link to={"/Category"}>
                    <div className="h-10 w-10 bg-gray-300 rounded-3xl text-3xl text-purple-700 px-1 py-1 ">
                      <IoIosArrowBack />
                    </div>
                  </Link>
                </div>

                <div className="w-full ">
                  <div className=" font-medium text-purple-700 mb-2 mt-6">
                    Name
                  </div>
                  <div>
                    <Field
                      name="name"
                      autoComplete="off"
                      type="text"
                      className="outline-none h-8 w-full outline-gray-200"
                      onChange={(e) => {
                        setFieldValue("name", e.target.value);
                      }}
                    />
                    <ErrorMessage
                      name="name"
                      component={"div"}
                      className="text-red-600"
                    />
                  </div>
                </div>

                <div>
                  <div className="mt-7 ">
                    <div className="font-medium text-purple-700 mb-2">
                      Upload Image
                    </div>
                    <div onClick={handleImageClick} className="border w-48">
                      {values.image ? (
                        <img
                          src={URL.createObjectURL(values.image)}
                          className="h-48 w-48 object-contain"
                          alt=""
                          name="image"
                        />
                      ) : (
                        <div className="h-48 sm:w-48  border border-black border-dashed flex text-xl flex-col  justify-center text-center items-center text-gray-400 ">
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

                  <div className="text-left flex gap-5 mt-3 ">
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
    </div>
  );
}

export default Addcategory;
