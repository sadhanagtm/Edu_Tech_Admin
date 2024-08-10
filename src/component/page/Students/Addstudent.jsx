import { Field, Formik, Form, ErrorMessage } from "formik";
import React, { useRef, useState, useEffect, useMemo } from "react";
import toast, { Toaster } from "react-hot-toast";
import { Navigation } from "@mui/icons-material";
import axios from "../../../Hoc/Axios";
import { IoCloudUploadSharp } from "react-icons/io5";
import JoditEditor from "jodit-react";
import { Link } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
import { BsEyeSlashFill } from "react-icons/bs";
import { IoEyeOutline } from "react-icons/io5";
import { ClipLoader } from "react-spinners";


import * as Yup from "yup";

const schema = Yup.object().shape({
  firstName: Yup.string().required("This field is required"),
  lastName: Yup.string().required("This field is required"),
  // middleName: Yup.string().required("This field is required"),
  password: Yup.string().required("This field is required"),
  email: Yup.string().required("This field is required"),
  phone: Yup.string().required("This field is required"),
  address: Yup.string().required("This field is required"),
  image: Yup.string().required("This field is required"),
});

function Addstudent() {
  const data = [
    { name: "firstName", type: "text", label: "First Name" },
    { name: "middleName", type: "text", label: "Middle Name" },
    { name: "lastName", type: "text", label: "Last Name" },
    { name: "phone", type: "number", label: "Phone" },
    { name: "address", type: "text", label: "Address" },
    { name: "email", type: "email", label: "Email" },
    // { name: "password", type: "password", label: "Password" },
  ];

  const [value, setFieldValue] = useState("");
  const inputRef = useRef(null);
  const [image, setImage] = useState("");
  const [redirect, setredirect] = useState(false);
  const [placeholder, setplaceholder] = useState("enter description...");
  const [student, setStudent]= useState("");
  const editor = useRef(null);
  const [content, setContent] = useState("");

  const [password, setPassword] = useState("");
  const [visible, setVisible] = useState(false);

  const[loading,setLoading]= useState(false);


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
        Navigation("/");
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
          firstName: "",
          lastName: "",
          middleName: "",
          password: "",
          email: "",
          phone: "",
          address: "",
          image: "",
        }}
        validationSchema={schema}
        onSubmit={(values, { resetForm }) => {
          setLoading(true); //set loading to true before API call

          try {
            const formData = new FormData();
            formData.append("firstName", values.firstName);
            formData.append("middleName", values.middleName);
            formData.append("lastName", values.lastName);
            formData.append("email", values.email);
            formData.append("password", values.password);
            formData.append("phone", values.phone);
            formData.append("image", values.image);
            formData.append("address", values.address);

            axios
              .post("/user/auth/register/student/user", formData)
              .then((res) => {
                console.log(res);
                toast.success("post Successful");
                setredirect((prev) => !prev);
                setStudent([...res.data.data]);
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


              <div className="lg:ml-52 ">
                <div className=" flex justify-between">
                  <div className="text-2xl font-bold  text-purple-700 lg:mb-6 mb-3 font">
                  Student
                  </div>
                  <Link to={"/student"}>
                    <div className="h-10 w-10 bg-gray-300 rounded-3xl text-3xl text-purple-700 px-1 py-1 ">
                      <IoIosArrowBack />
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



                <div className="  mt-9 sm:grid-cols-3 grid gap-5">
                  <div>
                    <div className="text-lg font-medium text-purple-700 mb-2">
                      {" "}
                      Password
                    </div>

                    <div className="flex   border-2 gap-2 items-cente px-1 -ml-1 ">
                      <input
                        name="password"
                        id="password"
                        type={visible ? "text" : "password"}
                        autoComplete="off"
                        placeholder="Password"
                        className="h-10 w-full bg-transparent outline-none pr-2"
                        onChange={(e) => {
                          setFieldValue("password", e.target.value);
                        }}
                      />
                      <button
                        onClick={() => setVisible(!visible)}
                        className=" relative right-2 pt-1  "
                      >
                        {visible ? <IoEyeOutline /> : <BsEyeSlashFill />}
                      </button>
                    </div>
                    <ErrorMessage
                      name="password"
                      component={"div"}
                      className="text-red-500 text-start "
                    />
                  </div>

                
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

export default Addstudent;
