// import { Field, Formik, Form } from "formik";
// import React, { useRef, useState, useEffect } from "react";
// import toast, { Toaster } from "react-hot-toast";
// import { useNavigate, useLocation } from "react-router-dom";
// import axios from "../../../Hoc/Axios";
// import JoditEditor from "jodit-react";
// import { IoCloudUploadSharp } from "react-icons/io5";

// function EditTerms() {
//   const [value, setFieldValue] = useState("");
//   const [terms, setTerms] = useState([]);
//   const location = useLocation();
//   const navigate = useNavigate();
//   const inputRef = useRef(null);
//   const [redirect, setRedirect] = useState(false);
//   const [placeholder, setPlaceholder] = useState("enter description...");
//   const [content, setContent] = useState("");

//   const editor = useRef(null);
//   const pricingeditor = useRef(null);
//   const instructoreditor = useRef(null);
//   const termsOfUseeditor = useRef(null);
//   const launcheditor = useRef(null);
//   const affiliateeditor = useRef(null);
//   const businessTermeditor = useRef(null);
//   const businessPrivacyeditor = useRef(null);
//   const masterServiceseditor = useRef(null);

//   useEffect(() => {
//     let interval;
//     if (redirect) {
//       interval = setTimeout(() => {
//         navigate("/termstable");
//       }, 2000);
//     }
//     return () => {
//       clearTimeout(interval);
//     };
//   }, [redirect, navigate]);

//   const getData = (id) => {
//     try {
//       axios
//         .get(`/terms/${id}`)
//         .then((res) => {
//           console.log(res);
//           setTerms([...res.data.result]);
//         })
//         .catch((error) => {
//           console.log(error);
//         });
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   useEffect(() => {
//     if (location && location.state && location.state.id) {
//       console.log(location.state.id,"location id")
//       getData(location.state.id);
//     }
//   }, [location]);

//   return (
//     <div className="mt-24 ">
//       {terms && terms.length > 0 && (
//         <Formik
//           initialValues={{
//             privacyPolicy: terms[0]?.privacyPolicy || "",
//             pricingPolicy: terms[0]?.pricingPolicy || "",
//             instructorTerms: terms[0]?.instructorTerms || "",
//             termsOfUse: terms[0]?.termsOfUse || "",
//             launchServices: terms[0]?.launchServices || "",
//             affiliateTermsConditions: terms[0]?.affiliateTermsConditions || "",
//             businessTermConditions: terms[0]?.businessTermConditions || "",
//             businessPrivacyStatement: terms[0]?.businessPrivacyStatement || "",
//             masterServicesAgreement: terms[0]?.masterServicesAgreement || "",
//           }}
//           onSubmit={(values, { resetForm }) => {
//             try {
//               const formData = new FormData();

//               formData.append("privacyPolicy", values.privacyPolicy);
//               formData.append("pricingPolicy", values.pricingPolicy);
//               formData.append("instructorTerms", values.instructorTerms);
//               formData.append("termsOfUse", values.termsOfUse);
//               formData.append("launchServices", values.launchServices);
//               formData.append("affiliateTermsConditions", values.affiliateTermsConditions);
//               formData.append("businessTermConditions", values.businessTermConditions);
//               formData.append("businessPrivacyStatement", values.businessPrivacyStatement);
//               formData.append("masterServicesAgreement", values.masterServicesAgreement);

//               axios
//                 .patch(`/terms/${location.state.id}/`, formData)
//                 .then((res) => {
//                   console.log(res);
//                   toast.success("Save Successfully");
//                   setRedirect((prev) => !prev);
//                   setTerms([...res.data.result]);
//                 })
//                 .catch((error) => {
//                   console.log(error);
//                   toast.error(error.response.data.message);
//                 });
//             } catch (error) {
//               console.log(error);
//             }

//             console.log(values);
//             resetForm();
//           }}
//         >
//           {({ handleSubmit, setFieldValue, values }) => {
//             return (
//               <Form onSubmit={handleSubmit}>
//                 <Toaster />

//                 <div className="lg:ml-52 mt-24 mx-6 lg:mx-12">
//                   <div className="text-left mt-10">
//                     <div className="text-lg font-medium text-purple-700 mb-2">
//                       Privacy Policy
//                     </div>
//                     <JoditEditor
//                       ref={editor}
//                       value={values.privacyPolicy}
//                       tabIndex={1} // tabIndex of textarea
//                       onBlur={(newContent) => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
//                       onChange={(newContent) => {
//                         setFieldValue("privacyPolicy", newContent);
//                       }}
//                     />
//                   </div>

//                   <div className="text-left mt-10">
//                     <div className="text-lg font-medium text-purple-700 mb-2">
//                       pricing Policy
//                     </div>
//                     <JoditEditor
//                       ref={pricingeditor}
//                       value={values.pricingPolicy}
//                       tabIndex={1} // tabIndex of textarea
//                       onBlur={(newContent) => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
//                       onChange={(newContent) => {
//                         setFieldValue("pricingPolicy", newContent);
//                       }}
//                     />
//                   </div>

//                   <div className="text-left mt-10">
//                     <div className="text-lg font-medium text-purple-700 mb-2">
//                       Instructor Terms
//                     </div>
//                     <JoditEditor
//                       ref={instructoreditor}
//                       value={values.instructorTerms}
//                       tabIndex={1} // tabIndex of textarea
//                       onBlur={(newContent) => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
//                       onChange={(newContent) => {
//                         setFieldValue("instructorTerms", newContent);
//                       }}
//                     />
//                   </div>

//                   <div className="text-left mt-10">
//                     <div className="text-lg font-medium text-purple-700 mb-2">
//                       terms OfUse
//                     </div>
//                     <JoditEditor
//                       ref={termsOfUseeditor}
//                       value={values.termsOfUse}
//                       tabIndex={1} // tabIndex of textarea
//                       onBlur={(newContent) => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
//                       onChange={(newContent) => {
//                         setFieldValue("termsOfUse", newContent);
//                       }}
//                     />
//                   </div>

//                   <div className="text-left mt-10">
//                     <div className="text-lg font-medium text-purple-700 mb-2">
//                       launch Services
//                     </div>
//                     <JoditEditor
//                       ref={editor}
//                       value={values.launchServices}
//                       tabIndex={1} // tabIndex of textarea
//                       onBlur={(newContent) => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
//                       onChange={(newContent) => {
//                         setFieldValue("launchServices", newContent);
//                       }}
//                     />
//                   </div>

//                   <div className="text-left mt-10">
//                     <div className="text-lg font-medium text-purple-700 mb-2">
//                       affiliate Terms Conditions
//                     </div>
//                     <JoditEditor
//                       ref={editor}
//                       value={values.affiliateTermsConditions}
//                       tabIndex={1} // tabIndex of textarea
//                       onBlur={(newContent) => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
//                       onChange={(newContent) => {
//                         setFieldValue("affiliateTermsConditions", newContent);
//                       }}
//                     />
//                   </div>

//                   <div className="text-left mt-10">
//                     <div className="text-lg font-medium text-purple-700 mb-2">
//                       business Term Conditions
//                     </div>
//                     <JoditEditor
//                       ref={businessTermeditor}
//                       value={values.businessTermConditions}
//                       tabIndex={1} // tabIndex of textarea
//                       onBlur={(newContent) => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
//                       onChange={(newContent) => {
//                         setFieldValue("businessTermConditions", newContent);
//                       }}
//                     />
//                   </div>

//                   <div className="text-left mt-10">
//                     <div className="text-lg font-medium text-purple-700 mb-2">
//                       business Privacy Statement
//                     </div>
//                     <JoditEditor
//                       ref={businessPrivacyeditor}
//                       value={values.businessPrivacyStatement}
//                       tabIndex={1} // tabIndex of textarea
//                       onBlur={(newContent) => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
//                       onChange={(newContent) => {
//                         setFieldValue("businessPrivacyStatement", newContent);
//                       }}
//                     />
//                   </div>

//                   <div className="text-left mt-10">
//                     <div className="text-lg font-medium text-purple-700 mb-2">
//                       master Services Agreement
//                     </div>
//                     <JoditEditor
//                       ref={masterServiceseditor}
//                       value={values.masterServicesAgreement}
//                       tabIndex={1} // tabIndex of textarea
//                       onBlur={(newContent) => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
//                       onChange={(newContent) => {
//                         setFieldValue("masterServicesAgreement", newContent);
//                       }}
//                     />
//                   </div>

//                   <div className="text-left flex gap-5">
//                     <button
//                       onClick={() => {
//                         navigate(-1);
//                       }}
//                       type="button"
//                       className="bg-red-600 h-10 my-5 w-24 text-lg rounded-lg text-center text-white hover:bg-red-500"
//                     >
//                       Cancel
//                     </button>

//                     <button
//                       type="submit"
//                       className="bg-green-600 h-10 my-5 w-24 text-lg rounded-lg text-center text-white hover:bg-green-500"
//                     >
//                       Save
//                     </button>
//                   </div>
//                 </div>
//               </Form>
//             );
//           }}
//         </Formik>
//       )}
//     </div>
//   );
// }




import { Field, Formik, Form } from "formik";
import React, { useRef, useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "../../../Hoc/Axios";
import JoditEditor from "jodit-react";

function EditTerms() {
  const [terms, setTerms] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();
  const [redirect, setRedirect] = useState(false);

  const editor = useRef(null);
  const pricingEditor = useRef(null);
  const instructorEditor = useRef(null);
  const termsOfUseEditor = useRef(null);
  const launchEditor = useRef(null);
  const affiliateEditor = useRef(null);
  const businessTermEditor = useRef(null);
  const businessPrivacyEditor = useRef(null);
  const masterServicesEditor = useRef(null);

  useEffect(() => {
    let interval;
    if (redirect) {
      interval = setTimeout(() => {
        navigate("/termstable");
      }, 2000);
    }
    return () => {
      clearTimeout(interval);
    };
  }, [redirect, navigate]);

  const getData = (id) => {
    axios
      .get(`/terms/${id}`)
      .then((res) => {
        setTerms(res.data.result);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  useEffect(() => {
    if (location && location.state && location.state.id) {
      getData(location.state.id);
    }
  }, [location]);

  return (
    <div className="mt-24 ">
      {terms && terms.length > 0 && (
        <Formik
          initialValues={{
            privacyPolicy: terms[0]?.privacyPolicy || "",
            pricingPolicy: terms[0]?.pricingPolicy || "",
            instructorTerms: terms[0]?.instructorTerms || "",
            termsOfUse: terms[0]?.termsOfUse || "",
            launchServices: terms[0]?.launchServices || "",
            affiliateTermsConditions: terms[0]?.affiliateTermsConditions || "",
            businessTermConditions: terms[0]?.businessTermConditions || "",
            businessPrivacyStatement: terms[0]?.businessPrivacyStatement || "",
            masterServicesAgreement: terms[0]?.masterServicesAgreement || "",
          }}
          onSubmit={(values, { resetForm }) => {
            const formData = new FormData();
            Object.keys(values).forEach((key) => {
              formData.append(key, values[key]);
            });

            axios
              .patch(`/terms/${location.state.id}/`, formData, {
                headers: {
                  'Content-Type': 'multipart/form-data'
                }
              })
              .then((res) => {
                toast.success("Save Successfully");
                // Fetch updated data after a successful update
                getData(location.state.id);
                setRedirect(true);
              })
              .catch((error) => {
                console.error("Error updating data:", error);
                toast.error(error.response?.data?.message || "An error occurred");
              });

            // Reset form should be called after submission
            resetForm();
          }}
        >
          {({ handleSubmit, setFieldValue, values }) => (
            <Form onSubmit={handleSubmit}>
              <Toaster />
              <div className="lg:ml-52 mt-24 mx-6 lg:mx-12">
                {[
                  { name: 'privacyPolicy', label: 'Privacy Policy', ref: editor },
                  { name: 'pricingPolicy', label: 'Pricing Policy', ref: pricingEditor },
                  { name: 'instructorTerms', label: 'Instructor Terms', ref: instructorEditor },
                  { name: 'termsOfUse', label: 'Terms of Use', ref: termsOfUseEditor },
                  { name: 'launchServices', label: 'Launch Services', ref: launchEditor },
                  { name: 'affiliateTermsConditions', label: 'Affiliate Terms & Conditions', ref: affiliateEditor },
                  { name: 'businessTermConditions', label: 'Business Terms & Conditions', ref: businessTermEditor },
                  { name: 'businessPrivacyStatement', label: 'Business Privacy Statement', ref: businessPrivacyEditor },
                  { name: 'masterServicesAgreement', label: 'Master Services Agreement', ref: masterServicesEditor },
                ].map(({ name, label, ref }) => (
                  <div className="text-left mt-10" key={name}>
                    <div className="text-lg font-medium text-purple-700 mb-2">{label}</div>
                    <JoditEditor
                      ref={ref}
                      value={values[name]}
                      tabIndex={1}
                      onChange={(newContent) => setFieldValue(name, newContent)}
                    />
                  </div>
                ))}
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
                    className="bg-green-600 h-10 my-5 w-24 text-lg rounded-lg text-center text-white hover:bg-green-500"
                  >
                    Save
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

export default EditTerms;










// export default EditTerms;
// import { Field, Formik, Form } from "formik";
// import React, { useRef, useState, useEffect } from "react";
// import toast, { Toaster } from "react-hot-toast";
// import { useNavigate, useLocation } from "react-router-dom";
// import axios from "../../../Hoc/Axios";
// import JoditEditor from "jodit-react";

// function EditTerms() {
//   const [terms, setTerms] = useState([]);
//   const location = useLocation();
//   const navigate = useNavigate();
//   const [redirect, setRedirect] = useState(false);

//   // Individual refs for each editor instance
//   const editor = useRef(null);
//   const pricingEditor = useRef(null);
//   const instructorEditor = useRef(null);
//   const termsOfUseEditor = useRef(null);
//   const launchEditor = useRef(null);
//   const affiliateEditor = useRef(null);
//   const businessTermEditor = useRef(null);
//   const businessPrivacyEditor = useRef(null);
//   const masterServicesEditor = useRef(null);

//   useEffect(() => {
//     let interval;
//     if (redirect) {
//       interval = setTimeout(() => {
//         navigate("/termstable");
//       }, 2000);
//     }
//     return () => {
//       clearTimeout(interval);
//     };
//   }, [redirect, navigate]);

//   const getData = (id) => {
//     axios
//       .get(`/terms/${id}`)
//       .then((res) => {
//         setTerms(res.data.result);
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   };

//   useEffect(() => {
//     if (location && location.state && location.state.id) {
//       getData(location.state.id);
//     }
//   }, [location]);

//   return (
//     <div className="mt-24 ">
//       {terms && terms.length > 0 && (
//         <Formik
//           initialValues={{
//             privacyPolicy: terms[0]?.privacyPolicy || "",
//             pricingPolicy: terms[0]?.pricingPolicy || "",
//             instructorTerms: terms[0]?.instructorTerms || "",
//             termsOfUse: terms[0]?.termsOfUse || "",
//             launchServices: terms[0]?.launchServices || "",
//             affiliateTermsConditions: terms[0]?.affiliateTermsConditions || "",
//             businessTermConditions: terms[0]?.businessTermConditions || "",
//             businessPrivacyStatement: terms[0]?.businessPrivacyStatement || "",
//             masterServicesAgreement: terms[0]?.masterServicesAgreement || "",
//           }}
//           onSubmit={(values, { resetForm }) => {
//             try {
//               const formData = new FormData();

//               formData.append("privacyPolicy", values.privacyPolicy);
//               formData.append("pricingPolicy", values.pricingPolicy);
//               formData.append("instructorTerms", values.instructorTerms);
//               formData.append("termsOfUse", values.termsOfUse);
//               formData.append("launchServices", values.launchServices);
//               formData.append("affiliateTermsConditions", values.affiliateTermsConditions);
//               formData.append("businessTermConditions", values.businessTermConditions);
//               formData.append("businessPrivacyStatement", values.businessPrivacyStatement);
//               formData.append("masterServicesAgreement", values.masterServicesAgreement);

//               axios
//                 .patch(`/terms/${location.state.id}/`, formData, {
//                   headers: {
//                     'Content-Type': 'multipart/form-data'
//                   }
//                 })
//                 .then((res) => {
//                   toast.success("Save Successfully");
//                   setRedirect(true);
//                 })
//                 .catch((error) => {
//                   toast.error(error.response?.data?.message || "An error occurred");
//                 });
//             } catch (error) {
//               console.log(error);
//             }
//             resetForm();
//           }}
//         >
//           {({ handleSubmit, setFieldValue, values }) => (
//             <Form onSubmit={handleSubmit}>
//               <Toaster />

//               <div className="lg:ml-52 mt-24 mx-6 lg:mx-12">
//                 <div className="text-left mt-10">
//                   <div className="text-lg font-medium text-purple-700 mb-2">
//                     Privacy Policy
//                   </div>
//                   <JoditEditor
//                     ref={editor}
//                     value={values.privacyPolicy}
//                     tabIndex={1}
//                     onChange={(newContent) => setFieldValue("privacyPolicy", newContent)}
//                   />
//                 </div>

//                 <div className="text-left mt-10">
//                   <div className="text-lg font-medium text-purple-700 mb-2">
//                     Pricing Policy
//                   </div>
//                   <JoditEditor
//                     ref={pricingEditor}
//                     value={values.pricingPolicy}
//                     tabIndex={1}
//                     onChange={(newContent) => setFieldValue("pricingPolicy", newContent)}
//                   />
//                 </div>

//                 <div className="text-left mt-10">
//                   <div className="text-lg font-medium text-purple-700 mb-2">
//                     Instructor Terms
//                   </div>
//                   <JoditEditor
//                     ref={instructorEditor}
//                     value={values.instructorTerms}
//                     tabIndex={1}
//                     onChange={(newContent) => setFieldValue("instructorTerms", newContent)}
//                   />
//                 </div>

//                 <div className="text-left mt-10">
//                   <div className="text-lg font-medium text-purple-700 mb-2">
//                     Terms of Use
//                   </div>
//                   <JoditEditor
//                     ref={termsOfUseEditor}
//                     value={values.termsOfUse}
//                     tabIndex={1}
//                     onChange={(newContent) => setFieldValue("termsOfUse", newContent)}
//                   />
//                 </div>

//                 <div className="text-left mt-10">
//                   <div className="text-lg font-medium text-purple-700 mb-2">
//                     Launch Services
//                   </div>
//                   <JoditEditor
//                     ref={launchEditor}
//                     value={values.launchServices}
//                     tabIndex={1}
//                     onChange={(newContent) => setFieldValue("launchServices", newContent)}
//                   />
//                 </div>

//                 <div className="text-left mt-10">
//                   <div className="text-lg font-medium text-purple-700 mb-2">
//                     Affiliate Terms & Conditions
//                   </div>
//                   <JoditEditor
//                     ref={affiliateEditor}
//                     value={values.affiliateTermsConditions}
//                     tabIndex={1}
//                     onChange={(newContent) => setFieldValue("affiliateTermsConditions", newContent)}
//                   />
//                 </div>

//                 <div className="text-left mt-10">
//                   <div className="text-lg font-medium text-purple-700 mb-2">
//                     Business Terms & Conditions
//                   </div>
//                   <JoditEditor
//                     ref={businessTermEditor}
//                     value={values.businessTermConditions}
//                     tabIndex={1}
//                     onChange={(newContent) => setFieldValue("businessTermConditions", newContent)}
//                   />
//                 </div>

//                 <div className="text-left mt-10">
//                   <div className="text-lg font-medium text-purple-700 mb-2">
//                     Business Privacy Statement
//                   </div>
//                   <JoditEditor
//                     ref={businessPrivacyEditor}
//                     value={values.businessPrivacyStatement}
//                     tabIndex={1}
//                     onChange={(newContent) => setFieldValue("businessPrivacyStatement", newContent)}
//                   />
//                 </div>

//                 <div className="text-left mt-10">
//                   <div className="text-lg font-medium text-purple-700 mb-2">
//                     Master Services Agreement
//                   </div>
//                   <JoditEditor
//                     ref={masterServicesEditor}
//                     value={values.masterServicesAgreement}
//                     tabIndex={1}
//                     onChange={(newContent) => setFieldValue("masterServicesAgreement", newContent)}
//                   />
//                 </div>

//                 <div className="text-left flex gap-5">
//                   <button
//                     onClick={() => navigate(-1)}
//                     type="button"
//                     className="bg-red-600 h-10 my-5 w-24 text-lg rounded-lg text-center text-white hover:bg-red-500"
//                   >
//                     Cancel
//                   </button>

//                   <button
//                     type="submit"
//                     className="bg-green-600 h-10 my-5 w-24 text-lg rounded-lg text-center text-white hover:bg-green-500"
//                   >
//                     Save
//                   </button>
//                 </div>
//               </div>
//             </Form>
//           )}
//         </Formik>
//       )}
//     </div>
//   );
// }

// export default EditTerms;
