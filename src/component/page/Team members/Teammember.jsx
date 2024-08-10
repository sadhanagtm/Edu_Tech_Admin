import { Field, Formik, Form, ErrorMessage } from "formik";
import React, { useRef, useState, useEffect, useMemo } from "react";
import toast, { Toaster } from "react-hot-toast";
import { Navigation } from "@mui/icons-material";
import axios from "../../../Hoc/Axios";
import { IoCloudUploadSharp } from "react-icons/io5";
import JoditEditor from "jodit-react";
import { Link } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { IoIosArrowBack } from "react-icons/io";


import * as Yup from "yup";

const schema = Yup.object().shape({
  name: Yup.string().required("This field is required"),
  position: Yup.string().required("This field is required"),
  facebook: Yup.string().required("This field is required"),
  instagram: Yup.string().required("This field is required"),
  lindekin: Yup.string().required("This field is required"),
  image: Yup.string().required("This field is required"),
});

function Teammember() {
  const data = [
    { name: "name", type: "text", label: " Name" },
    { name: "position", type: "text", label: "Position" },
    { name: "facebook", type: "text", label: "Facebook " },
    { name: "instagram", type: "text", label: "Instagram" },
    { name: "lindekin", type: "text", label: "Lindekin" },
  ];

  const [value, setFieldValue] = useState("");
  const inputRef = useRef(null);
  const [image, setImage] = useState("");
  const [redirect, setredirect] = useState(false);
  const [placeholder, setplaceholder] = useState("enter description...");
   
  const[loading,setLoading]= useState(false);

  const [team, setTeam] = useState("");

  const editor = useRef(null);
  const [content, setContent] = useState("");



  const handleImageClick = () => {
    inputRef.current.click();
  };

  const handleImageChange = () => {
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

  return (
    <div className="mt-20 ">
      <Formik
        initialValues={{
          name: "",
          position: "",
          facebook: "",
          instagram: "",
          lindekin: "",
          image: "",
        }}
        validationSchema={schema}
        onSubmit={(values, { resetForm }) => {
          setLoading(true); //set loading to true before API call

          try {
            const formData = new FormData();
            formData.append("name", values.name);
            formData.append("position", values.position);
            formData.append("facebook", values.facebook);
            formData.append("instagram", values.instagram);
            formData.append("lindekin", values.lindekin);
            formData.append("image", values.image);

            axios
              .post("/team", formData)
              .then((res) => {
                console.log(res);
                toast.success("post Successful");
                setredirect((prev) => !prev);
                setTeam([...res.data.data]);
                resetForm();
                setLoading(true); //set loading to true before API call

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
              
              <div className="lg:ml-52 ">
                <div className=" flex justify-between">
                  <div className="text-2xl font-bold  text-purple-700 lg:mb-6 mb-3 font">
                    Team Member
                  </div>
                  <Link to={"/TeamTable"}>
                    <div className="top-20 lg:right-8 right-8 absolute ">
                      <button className=" lg:h-10 h-7 w-20 bg-red-700 text-white lg:text-lg font-semibold rounded-xl">
                        View
                      </button>
                    </div>
                  </Link>
                </div>

                <div className=" grid lg:grid-cols-3 sm:grid-cols-2 lg:gap-8 gap-4 sm:gap-8">
                  {data.map((val, i) => {
                    return (
                      <div>
                        <div className="text-left">
                          <div className="text-lg font-medium text-purple-700 mb-2">
                            {" "}
                            {val.label}
                          </div>
                          <div>
                            <Field
                              name={val.name}
                              autoComplete="off"
                              type={val.type}
                              className="outline-none h-8  w-full outline-gray-200 "
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
                      </div>
                    );
                  })}
                </div>

              

                <div className=" col-span-2 mt-10 grid grid-cols-1 justify-between">
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

                  <div className="text-left flex gap-5 my-5 ">
                    <button
                      onClick={() => {
                        Navigation(-1);
                      }}
                      type="button"
                      className="bg-red-600 h-10 my-5 w-24 lg:text-lg rounded-lg text-center text-white hover:bg-red-500"
                    >
                      Cancel
                    </button>

                    <button
                      type="submit"
                      className="bg-indigo-600 h-10 my-5 w-24 lg:text-lg rounded-lg text-center text-white hover:bg-indigo-500"
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

export default Teammember;
