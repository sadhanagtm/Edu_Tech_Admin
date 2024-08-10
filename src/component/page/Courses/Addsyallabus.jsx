import {  Formik, Form, ErrorMessage } from "formik";
import React, { useRef, useState, useEffect, useMemo } from "react";
import toast, { Toaster } from "react-hot-toast";
import { Navigation } from "@mui/icons-material";
import axios from "../../../Hoc/Axios";
import JoditEditor from "jodit-react";
import { RiVideoUploadLine } from "react-icons/ri";
import * as Yup from "yup"
import { CiCircleList } from "react-icons/ci";
import { IoChevronBack } from "react-icons/io5";
import { Link } from "react-router-dom";
const schema = Yup.object().shape({
  
  title: Yup.string().required("This field is required"),
  subtitle: Yup.string().required("This field is required"),
  description: Yup.string().required("This field is required"),
  video: Yup.string().required("This field is required"),
  
});
function Addsyallabus() {
  
  const [value, setFieldValue] = useState("");
  
  const [redirect, setredirect] = useState(false);
  const [placeholder, setplaceholder] = useState("enter description...");

  const editor = useRef(null);
  const [content, setContent] = useState("");

  
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
        Navigation("/");
      }, 2000);
    }
    return () => {
      clearTimeout(interval);
    };
  }, [redirect]);

  return (
    <div className="mt-24">
      <Formik
        initialValues={{
          title:"",
          subtitle:"",
          desc: "",
         video:"",
        }}
       
        validationSchema={schema}
        onSubmit={(values, { resetForm }) => {
          try {
            const formData = new FormData();
            formData.append("title", values.title);
            formData.append("subtitle", values.subtitle);
            formData.append("desc", values.desc);
            formData.append("video", values.video);

            axios
              .post(`/syllabus/${id}`, formData)
              .then((res) => {
                console.log(res);
                toast.success("Post Successful");
                setredirect((prev) => !prev);
               
                setsyllabus([...res.data.data]);
                resetForm();
              })
              .catch((error) => {
                console.log(error);
                toast.error(error.response.data.message);
              });
          } catch (error) {
            console.log(error);
          }

          console.log(values);
         
        }}
      >
        {({ handleSubmit, setFieldValue, values }) => {
          return (
            <Form onSubmit={handleSubmit}>
              <Toaster />

              <div className=" lg:ml-60 mt-24 mx-5 lg:mx-8 ">
              <Link to={"/syllabus"}>
                  <div className=" bg-purple-800 h-7 w-8 py-1 pl-1 text-center  text-white rounded-md float-end hover:bg-purple-700 "><IoChevronBack   className="h-5 w-5"/></div>
                  </Link>
             
               <div className=" font-bold font text-2xl text-purple-800 hover:text-purple-700 hover:border-b-0 border-b-2 border-purple-800  w-fit cursor-pointer ">Syllabus</div>
              
              

                <div className="sm:grid sm:grid-cols-2 mt-8 gap-7 flex flex-col  ">
                  <div className="text-left">
                    <div className="text-lg font-medium text-purple-700 mb-2">
                      Title
                    </div>
                    <div>
                      <input
                        name="title"
                        type="text"
                         autoComplete="off"
                        className="outline-none h-10 w-full outline-gray-200"
                        onChange={(e) => {
                          setFieldValue("title", e.target.value);
                        }}
                      />
                       <ErrorMessage
                        name="title"
                     component={"div"}
                    className="text-red-600"
                         />
                    </div>
                  </div>

                  <div className="text-left">
                    <div className="text-lg font-medium text-purple-700 mb-2">
                      Subtitle
                    </div>
                    <div>
                      <input
                        name="subtitle"
                        type="text"
                         autoComplete="off"
                        className="outline-none h-10 w-full outline-gray-200"
                        onChange={(e) => {
                          setFieldValue("subtitle", e.target.value);
                        }}
                      />
                       <ErrorMessage
                        name="subtitle"
                     component={"div"}
                    className="text-red-600"
                         />
                    </div>
                  </div>
                  </div>

              
                

                  <div className="text-left mt-10  w-full">
                    <div className="text-lg font-medium text-purple-700 mb-2 ">
                      Description
                      
                      <JoditEditor
                      
                        ref={editor}
                        value={content}
                       className="text-black"
                        // config={config}
                        tabIndex={1} // tabIndex of textarea
                        onBlur={(newContent) => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
                        onChange={(newContent) => {
                            setFieldValue("desc",newContent);
                        }}
                      />
                       <ErrorMessage
                        name="desc"
                     component={"div"}
                    className="text-red-600 font-normal"
                         />
                    </div>
                  </div>

                  <div className=" mt-10 w-full">
              <div className="">
                    <div className="text-lg  font-semibold  text-purple-700 mb-2">
                      Upload Course Video
                    </div>
                    <div onClick={handleVideoClick}>
                      {values.video ? (
                        <video controls
                        src={URL.createObjectURL(values.video)}
                        alt=""
                        name="video"
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
                        name="video"
                        type="file"
                        ref={videoRef}
                        className="w-full height={200} bg-black controls={true}  muted={true} loop={true} autoPlay={true} "
                        
                        
                        onChange={(e) => {
                          setFieldValue("video", e.target.files[0]);
                        }}
                        style={{ display: "none" }}
                      />
                       <ErrorMessage
                        name="video"
                     component={"div"}
                    className="text-red-600"
                         />
                    </div>
                  </div>
                {/* <video src="/Videos/video.mp4"  width={1090} height={200}  controls={true}  muted={true} loop={true} autoPlay={true} className=" bg-black"/> */}
              </div>


                  <div className="text-left flex gap-6 my-5  ">
                    <button
                      onClick={() => {
                        Navigation(-1);
                      }}
                      type="button"
                      className="bg-red-600 h-11 my-5 w-24 shadow-2xl text-lg rounded-lg text-center text-white hover:bg-red-500"
                    >
                      Cancel
                    </button>

                    <button
                      type="submit"
                      className="bg-indigo-600 h-11 my-5 w-24 shadow-2xl text-lg rounded-lg text-center text-white hover:bg-indigo-500"
                    >
                      Post
                    </button>
                  </div>
                
              </div>
            </Form>
          );
      
        }}
      </Formik>


    </div> 
    

  );
}

export default Addsyallabus;