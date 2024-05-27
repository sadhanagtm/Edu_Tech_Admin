import { Field, Formik, Form } from "formik";
import React, { useRef, useState, useEffect, useMemo } from "react";
import toast, { Toaster } from "react-hot-toast";
import { Description, Navigation } from "@mui/icons-material";
import axiosinstance from "../../Hoc/Axios";
import { IoCloudUploadSharp } from "react-icons/io5";
import JoditEditor from "jodit-react";
import { duration } from "@mui/material";

function HeroSection() {
  const [value, setFieldValue] = useState("");
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

  return (
    <div className="mt-20">
      <Formik
        initialValues={{
          title: "",
          description: "",
          image: "",
        }}
        onSubmit={(values, { resetForm }) => {
          try {
            const formData = new FormData();
            formData.append("title", values.title);
            formData.append("description", values.description);
            formData.append("image", values.image);

            axiosinstance
              .post("/banner", formData)
              .then((res) => {
                console.log(res);
                toast.success("Login Successful");
                setredirect((prev) => !prev);
                localStorage.setItem("token", res.data.accesstoken);
                Navigate("/");
                 setcourse([...res.data.data]);
               })
               .catch((error) => {
                console.log(error);
                toast.error(error.response.data.message);
              });
          }
          
          catch (error) {
            console.log(error);
          }

          console.log(values);
          resetForm();
        }}
      >
        {({ handleSubmit, setFieldValue, values }) => {
          return (
            <div className=" ml-48">
            <Form onSubmit={handleSubmit}>
              <Toaster />
              <div className="text-3xl font-bold ml-20 text-purple-700 mb-10 ">Hero Section</div>

              <div className=" flex flex-col gap-10 w-10/12 m-auto">
            
                  <div className="text-left">
                    <div className="text-lg font-medium text-purple-700 mb-2">
                      Title
                    </div>
                    <div>
                      <Field
                        name="title"
                        type="text"
                        label="hehe"
                        className="outline-none h-10 w-10/12 outline-gray-200"
                        // onChange={(e) => {
                        //   setFieldValue("title", e.target.value);
                        // }}
                      />
                    </div>
                  </div>
             
                  <div className="text-left mt-10 ">
                    <div className="text-lg font-medium text-purple-700 mb-2 w-10/12 ">
                      Description
                      <JoditEditor
                        ref={editor}
                        value={content}
                      name="description"
                        // config={config}
                        tabIndex={1} // tabIndex of textarea
                        onBlur={(newContent) => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
                        onChange={(newContent) => {
                          setFieldValue("description", newContent)
                        }}
                      />
                    </div>
                  </div>

              

              <div className="flex gap-44">
                
                  <div className="text-left mt-0  ">
                    <div className="text-lg font-medium text-purple-700 mb-2">
                       Image
                    </div>
                    <div onClick={handleImageClick}>
                      {values.image ? (
                        <img 
                          src={URL.createObjectURL(values.image)}
                          className="h-48 w-48"
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

                 <div className=" mt-9">
                  <select className=" border outline-none h-10 w-96 text-center text-xl text-purple-700 font-medium ">
                    <option>Welcomepage</option>
                    <option>NumberInfo</option>
                    <option>Offers</option>
                    <option>Banner</option>
                    <option>Whyus</option>
                    <option>Courses</option>



                  </select>
                 </div>

              </div>




                  <div className="text-left flex gap-5 ">
                    <button
                      onClick={() => {
                        Navigation(-1);
                      }}
                      type="submit"
                      className="bg-red-600 h-10 my-5 w-24 text-lg rounded-lg text-center text-white hover:bg-indigo-500"
                    >
                      Cancle
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

            </div>
          );
        }}
      </Formik>
    </div>
  );
}

export default HeroSection;
