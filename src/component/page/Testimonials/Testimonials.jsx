// import React, { useRef, useState, useEffect } from "react";
// import { BsFillEyeFill } from "react-icons/bs";
// import { Field, Formik, Form, ErrorMessage } from "formik";
// import toast, { Toaster } from "react-hot-toast";
// import { useNavigate } from "react-router-dom";
// import axiosinstance from "../../../Hoc/Axios";
// import { IoCloudUploadSharp } from "react-icons/io5";
// import JoditEditor from "jodit-react";
// import { Link } from "react-router-dom";
// import { ClipLoader } from "react-spinners";

// import * as Yup from "yup";

// const schema = Yup.object().shape({
//   desc: Yup.string().required("This field is required"),
//   video: Yup.string().required("This field is required"),
//   image: Yup.string().required("This field is required"),
// });

// function Testimonials() {
//   const [content, setContent] = useState("");
//   const inputRef = useRef(null);
//   const videoRef = useRef(null);
//   const [redirect, setRedirect] = useState(false);
//   const[testo, setTesto] = useState("")

//   const[loading,setLoading]= useState(false);

//   const editor = useRef(null);
//   const navigate = useNavigate();

//   const handleImageClick = () => {
//     inputRef.current.click();
//   };

//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     setFieldValue("image", file);
//   };

//   const handleVideoClick = () => {
//     videoRef.current.click();
//   };

//   const handleVideoChange = (e) => {
//     const file = e.target.files[0];
//     setFieldValue("video", file);
//   };

//   useEffect(() => {
//     if (redirect) {
//       setTimeout(() => {
//         navigate("/testimonialstable");
//       }, 2000);
//     }
//   }, [redirect, navigate]);

//   return (
//     <div className="lg:ml-52 mt-20">
//       <div>
//         <div className="text-2xl font-bold text-purple-700 font">Testimonial</div>
//         <Link to={"/testimonialstable"}>
//           <div className="top-20 lg:right-8 right-9 absolute">
//             <button className="lg:h-10 h-7 w-20 bg-red-700 text-white lg:text-lg font-semibold rounded-xl">
//               View
//             </button>
//           </div>
//         </Link>
//       </div>

//       <div className="mt-6 w-full">
//         <Formik
//           initialValues={{
//             desc: "",
//             video: "",
//             image: "",
//           }}
//           validationSchema={schema}
//           onSubmit={(values, { resetForm }) => {
//             setLoading(true); //set loading to true before API call

//             try{

//               const formData = new FormData();
//               formData.append("desc", values.desc);
//               formData.append("image", values.image);
//               formData.append("video", values.video);
  
//               axiosinstance
//                 .post("/testomonial", formData)
//                 .then((res) => {
//                   toast.success("Post Successful");
//                   setRedirect(true);
                  
//                   resetForm();
//                  setLoading(true); //set loading to true before API call

//                 })
                
//                 .catch((error) => {
//                   toast.error(error.response.data.message);
//                   setLoading(false); //set loading to false before API call

//                 });
//             } catch (error) {
//               console.log(error);
//               setLoading(false); //set loading to false before API call

//             }
//           }}
//         >
//           {({ handleSubmit, setFieldValue, values }) => (
//             <Form onSubmit={handleSubmit}>
//               <Toaster />

//               {loading && (
//                 <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
//                   <ClipLoader size={50} color={"#123abc"} loading={loading} />
//                 </div>
//               )} 
              
//               <div className="flex flex-col lg:gap-8 gap-5 w-full m-auto ml-1">
//                 <div className="col-span-2 my-5 justify-between">
//                   <div className="lg:grid lg:grid-cols-3 md:grid sm:grid sm:grid-cols-2 gap-10">
//                     <div className="text-left mt-0 w-full">
//                       <div className="text-lg font-medium text-purple-700 mb-2">
//                         Upload Image
//                       </div>
//                       <div onClick={handleImageClick} className="w-full border">
//                         {values.image ? (
//                           <img
//                             src={URL.createObjectURL(values.image)}
//                             className="h-72 w-full object-contain"
//                             alt=""
//                           />
//                         ) : (
//                           <div className="h-72 w-full border border-black border-dashed flex text-xl flex-col justify-center text-center items-center text-gray-400">
//                             <div className="text-5xl">
//                               <IoCloudUploadSharp />
//                             </div>
//                             <div>Click to upload</div>
//                           </div>
//                         )}
//                         <input
//                           name="image"
//                           type="file"
//                           accept="image/*"
//                           ref={inputRef}
//                           onChange={(e) => {
//                             setFieldValue("image", e.target.files[0]);
//                           }}
//                           style={{ display: "none" }}
//                         />
//                         <ErrorMessage
//                           name="image"
//                           component="div"
//                           className="text-red-600"
//                         />
//                       </div>
//                     </div>

//                     <div className="text-left mt-7 sm:mt-0 w-full lg:col-span-2">
//                       <div className="text-lg font-medium text-purple-700 mb-2">
//                         Video
//                       </div>
//                       <div onClick={handleVideoClick} className="w-full">
//                         {values.video ? (
//                           <video
//                             controls
//                             src={URL.createObjectURL(values.video)}
//                             className="h-72 w-full"
//                             alt=""
//                           />
//                         ) : (
//                           <div className="h-72 w-full border border-black border-dashed flex text-xl flex-col justify-center text-center items-center text-gray-400">
//                             <div className="text-5xl">
//                               <IoCloudUploadSharp />
//                             </div>
//                             <div>Click to upload</div>
//                           </div>
//                         )}
//                         <input
//                           name="video"
//                           type="file"
//                           accept="video/*"
//                           ref={videoRef}
//                           onChange={(e) => {
//                             setFieldValue("video", e.target.files[0]);
//                           }}
//                           style={{ display: "none" }}
//                         />
//                         <ErrorMessage
//                           name="video"
//                           component="div"
//                           className="text-red-600"
//                         />
//                       </div>
//                     </div>
//                   </div>

//                   <div className="my-10">
//                     <div className="text-lg font-medium text-purple-700 mb-2">
//                       Description
//                     </div>
//                     <JoditEditor
//                       ref={editor}
//                       value={content}
//                       name="desc"
//                       tabIndex={1}
//                       onBlur={(newContent) => setContent(newContent)}
//                       onChange={(newContent) => {
//                         setFieldValue("desc", newContent);
//                       }}
//                     />
//                     <ErrorMessage
//                       name="desc"
//                       component="div"
//                       className="text-red-600"
//                     />
//                   </div>

//                   <div className="flex gap-5 my-5">
//                     <button
//                       onClick={() => navigate(-1)}
//                       type="button"
//                       className="bg-red-600 h-10 w-24 text-lg rounded-lg text-center text-white hover:bg-red-500"
//                     >
//                       Cancel
//                     </button>

//                     <button
//                       type="submit"
//                       className="bg-indigo-600 h-10 w-24 text-lg rounded-lg text-center text-white hover:bg-indigo-500"
//                     >
//                       Post
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             </Form>
//           )}
//         </Formik>
//       </div>
//     </div>
//   );
// }

// export default Testimonials;

import React, { useRef, useState, useEffect } from "react";
import { Field, Formik, Form, ErrorMessage } from "formik";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import axiosinstance from "../../../Hoc/Axios";
import { IoCloudUploadSharp } from "react-icons/io5";
import JoditEditor from "jodit-react";
import { Link } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import * as Yup from "yup";

const schema = Yup.object().shape({
  name: Yup.string().required("This field is required"),
  // linkedin: Yup.string().url("Invalid URL").required("This field is required"),
  // instagram: Yup.string().url("Invalid URL").required("This field is required"),
  // facebook: Yup.string().url("Invalid URL").required("This field is required"),
  desc: Yup.string().required("This field is required"),
  video: Yup.string().required("This field is required"),
  image: Yup.string().required("This field is required"),
});

function Testimonials() {
  const [content, setContent] = useState("");
  const inputRef = useRef(null);
  const videoRef = useRef(null);
  const [redirect, setRedirect] = useState(false);
  const [loading, setLoading] = useState(false);

  const editor = useRef(null);
  const navigate = useNavigate();

  const handleImageClick = () => {
    inputRef.current.click();
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setFieldValue("image", file);
  };

  const handleVideoClick = () => {
    videoRef.current.click();
  };

  const handleVideoChange = (e) => {
    const file = e.target.files[0];
    setFieldValue("video", file);
  };

  useEffect(() => {
    if (redirect) {
      setTimeout(() => {
        navigate("/testimonialstable");
      }, 2000);
    }
  }, [redirect, navigate]);

  return (
    <div className="lg:ml-52 mt-20">
      <div>
        <div className="text-2xl font-bold text-purple-700 font">Testimonial</div>
        <Link to={"/testimonialstable"}>
          <div className="top-20 lg:right-8 right-9 absolute">
            <button className="lg:h-10 h-7 w-20 bg-red-700 text-white lg:text-lg font-semibold rounded-xl">
              View
            </button>
          </div>
        </Link>
      </div>

      <div className="mt-6 w-full">
        <Formik
          initialValues={{
            name: "",
            linkedin: "",
            instagram: "",
            facebook: "",
            desc: "",
            video: "",
            image: "",
          }}
          validationSchema={schema}
          onSubmit={(values, { resetForm }) => {
            setLoading(true); // Set loading to true before API call

            try {
              const formData = new FormData();
              formData.append("name", values.name);
              formData.append("linkedin", values.linkedin);
              formData.append("instagram", values.instagram);
              formData.append("facebook", values.facebook);
              formData.append("desc", values.desc);
              formData.append("image", values.image);
              formData.append("video", values.video);

              axiosinstance
                .post("/testomonial", formData)
                .then((res) => {
                  toast.success("Post Successful");
                  setRedirect(true);
                  resetForm();
                })
                .catch((error) => {
                  toast.error(error.response.data.message);
                  setLoading(false); // Set loading to false in case of error
                });
            } catch (error) {
              console.log(error);
              setLoading(false); // Set loading to false in case of exception
            }
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

              <div className="flex flex-col lg:gap-8 gap-5 w-full m-auto ml-1">
                <div className="col-span-2 my-5 justify-between">
                  <div className="lg:grid lg:grid-cols-3 md:grid sm:grid sm:grid-cols-2 gap-10">
                    <div className="text-left mt-0 w-full">
                      <div className="text-lg font-medium text-purple-700 mb-2">
                        Upload Image
                      </div>
                      <div onClick={handleImageClick} className="w-full border">
                        {values.image ? (
                          <img
                            src={URL.createObjectURL(values.image)}
                            className="h-72 w-full object-contain"
                            alt=""
                          />
                        ) : (
                          <div className="h-72 w-full border border-black border-dashed flex text-xl flex-col justify-center text-center items-center text-gray-400">
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
                          onChange={(e) => setFieldValue("image", e.target.files[0])}
                          style={{ display: "none" }}
                        />
                        <ErrorMessage
                          name="image"
                          component="div"
                          className="text-red-600"
                        />
                      </div>
                    </div>

                    <div className="text-left mt-7 sm:mt-0 w-full lg:col-span-2">
                      <div className="text-lg font-medium text-purple-700 mb-2">
                        Video
                      </div>
                      <div onClick={handleVideoClick} className="w-full">
                        {values.video ? (
                          <video
                            controls
                            src={URL.createObjectURL(values.video)}
                            className="h-72 w-full"
                            alt=""
                          />
                        ) : (
                          <div className="h-72 w-full border border-black border-dashed flex text-xl flex-col justify-center text-center items-center text-gray-400">
                            <div className="text-5xl">
                              <IoCloudUploadSharp />
                            </div>
                            <div>Click to upload</div>
                          </div>
                        )}
                        <input
                          name="video"
                          type="file"
                          accept="video/*"
                          ref={videoRef}
                          onChange={(e) => setFieldValue("video", e.target.files[0])}
                          style={{ display: "none" }}
                        />
                        <ErrorMessage
                          name="video"
                          component="div"
                          className="text-red-600"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="my-10">
                    <div className="text-lg font-medium text-purple-700 mb-2">
                      Name
                    </div>
                    <Field
                      type="text"
                      name="name"
                      className="w-full border p-2"
                    />
                    <ErrorMessage
                      name="name"
                      component="div"
                      className="text-red-600"
                    />
                  </div>

                  <div className="my-10">
                    <div className="text-lg font-medium text-purple-700 mb-2">
                      LinkedIn
                    </div>
                    <Field
                      type="text"
                      name="linkedin"
                      className="w-full border p-2"
                    />
                    <ErrorMessage
                      name="linkedin"
                      component="div"
                      className="text-red-600"
                    />
                  </div>

                  <div className="my-10">
                    <div className="text-lg font-medium text-purple-700 mb-2">
                      Instagram
                    </div>
                    <Field
                      type="text"
                      name="instagram"
                      className="w-full border p-2"
                    />
                    <ErrorMessage
                      name="instagram"
                      component="div"
                      className="text-red-600"
                    />
                  </div>

                  <div className="my-10">
                    <div className="text-lg font-medium text-purple-700 mb-2">
                      Facebook
                    </div>
                    <Field
                      type="text"
                      name="facebook"
                      className="w-full border p-2"
                    />
                    <ErrorMessage
                      name="facebook"
                      component="div"
                      className="text-red-600"
                    />
                  </div>

                  <div className="my-10">
                    <div className="text-lg font-medium text-purple-700 mb-2">
                      Description
                    </div>
                    <JoditEditor
                      ref={editor}
                      value={content}
                      name="desc"
                      tabIndex={1}
                      onBlur={(newContent) => setContent(newContent)}
                      onChange={(newContent) => {
                        setFieldValue("desc", newContent);
                      }}
                    />
                    <ErrorMessage
                      name="desc"
                      component="div"
                      className="text-red-600"
                    />
                  </div>

                  <div className="flex gap-5 my-5">
                    <button
                      onClick={() => navigate(-1)}
                      type="button"
                      className="bg-red-600 h-10 w-24 text-lg rounded-lg text-center text-white hover:bg-red-500"
                    >
                      Cancel
                    </button>

                    <button
                      type="submit"
                      className="bg-indigo-600 h-10 w-24 text-lg rounded-lg text-center text-white hover:bg-indigo-500"
                    >
                      Post
                    </button>
                  </div>
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default Testimonials;
