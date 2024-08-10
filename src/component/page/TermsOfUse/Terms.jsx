
import React, { useRef, useState, useEffect } from "react";
import JoditEditor from "jodit-react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Formik } from "formik";
import toast, { Toaster } from "react-hot-toast";
import axios from "../../../Hoc/Axios";

function Terms() {
  const [redirect, setRedirect] = useState(false);
  const navigate = useNavigate();

  const editor = useRef(null);
  const pricingeditor = useRef(null);
  const instructoreditor = useRef(null);
  const termsOfUseeditor = useRef(null);
  const launcheditor = useRef(null);
  const affiliateeditor = useRef(null);
  const businessTermeditor = useRef(null);
  const businessPrivacyeditor = useRef(null);
  const masterServiceseditor = useRef(null);

  useEffect(() => {
    if (redirect) {
      const timer = setTimeout(() => {
        navigate("/");
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [redirect, navigate]);

  return (
    <div className="mt-20 lg:ml-52">
      <Formik
        initialValues={{
          privacyPolicy: "",
          instructorTerms: "",
          termsOfUse: "",
          pricingPolicy: "",
          businessPrivacyStatement: "",
          masterServicesAgreement: "",
          businessTermConditions: "",
          affiliateTermsConditions: "",
          launchServices: ""
        }}
        onSubmit={(values, { resetForm }) => {
          const formData = {
            privacyPolicy: values.privacyPolicy,
            instructorTerms: values.instructorTerms,
            termsOfUse: values.termsOfUse,
            pricingPolicy: values.pricingPolicy,
            businessPrivacyStatement: values.businessPrivacyStatement,
            masterServicesAgreement: values.masterServicesAgreement,
            businessTermConditions: values.businessTermConditions,
            affiliateTermsConditions: values.affiliateTermsConditions,
            launchServices: values.launchServices
          };

          axios
            .post("/terms", formData)
            .then((res) => {
              toast.success("Post Successful");
              setRedirect(true);
              resetForm();
            })
            .catch((error) => {
              console.error(error);
              toast.error(error.response?.data?.message || "An error occurred");
            });
        }}
      >
        {({ handleSubmit, setFieldValue, values }) => (
          <Form onSubmit={handleSubmit}>
            <Toaster />
            <div>
              <div className="sm:text-2xl text-xl font-bold text-purple-700 mt-2">
                Terms Of Use
              </div>
              <Link to={"/termstable"}>
                <div className="top-20 lg:right-11 right-10 absolute">
                  <button className="lg:h-10 h-7 w-20 bg-red-700 text-white lg:text-lg font-semibold rounded-xl">
                    View
                  </button>
                </div>
              </Link>
            </div>

            <div className="gap-10 flex flex-col sm:mt-9 mt-5 mb-9 sm:text-xl">
              <div>
                <div className="font-semibold text-purple-700 mb-2 w-full">
                  Privacy Policy
                </div>
                <JoditEditor
                  ref={editor}
                  value={values.privacyPolicy}
                  name="privacyPolicy"
                  tabIndex={1}
                  onBlur={(newContent) => setFieldValue("privacyPolicy", newContent)}
                />
              </div>

              <div>
                <div className="font-semibold text-purple-700 mb-2 w-full">
                  Instructor Terms
                </div>
                <JoditEditor
                  ref={instructoreditor}
                  value={values.instructorTerms}
                  name="instructorTerms"
                  tabIndex={1}
                  onBlur={(newContent) => setFieldValue("instructorTerms", newContent)}
                />
              </div>

              <div>
                <div className="font-semibold text-purple-700 mb-2 w-full">
                  Terms Of Use
                </div>
                <JoditEditor
                  ref={termsOfUseeditor}
                  value={values.termsOfUse}
                  name="termsOfUse"
                  tabIndex={1}
                  onBlur={(newContent) => setFieldValue("termsOfUse", newContent)}
                />
              </div>

              <div>
                <div className="font-semibold text-purple-700 mb-2 w/full">
                  Pricing Policy
                </div>
                <JoditEditor
                  ref={pricingeditor}
                  value={values.pricingPolicy}
                  name="pricingPolicy"
                  tabIndex={1}
                  onBlur={(newContent) => setFieldValue("pricingPolicy", newContent)}
                />
              </div>

              <div>
                <div className="font-semibold text-purple-700 mb-2 w-full">
                  Business Privacy Statement
                </div>
                <JoditEditor
                  ref={businessPrivacyeditor}
                  value={values.businessPrivacyStatement}
                  name="businessPrivacyStatement"
                  tabIndex={1}
                  onBlur={(newContent) => setFieldValue("businessPrivacyStatement", newContent)}
                />
              </div>

              <div>
                <div className="font-semibold text-purple-700 mb-2 w/full">
                  Master Services Agreement
                </div>
                <JoditEditor
                  ref={masterServiceseditor}
                  value={values.masterServicesAgreement}
                  name="masterServicesAgreement"
                  tabIndex={1}
                  onBlur={(newContent) => setFieldValue("masterServicesAgreement", newContent)}
                />
              </div>

              <div>
                <div className="font-semibold text-purple-700 mb-2 w/full">
                  Business Term Conditions
                </div>
                <JoditEditor
                  ref={businessTermeditor}
                  value={values.businessTermConditions}
                  name="businessTermConditions"
                  tabIndex={1}
                  onBlur={(newContent) => setFieldValue("businessTermConditions", newContent)}
                />
              </div>

              <div>
                <div className="font-semibold text-purple-700 mb-2 w/full">
                  Affiliate Terms Conditions
                </div>
                <JoditEditor
                  ref={affiliateeditor}
                  value={values.affiliateTermsConditions}
                  name="affiliateTermsConditions"
                  tabIndex={1}
                  onBlur={(newContent) => setFieldValue("affiliateTermsConditions", newContent)}
                />
              </div>

              <div>
                <div className="font-semibold text-purple-700 mb-2 w/full">
                  Launch Services
                </div>
                <JoditEditor
                  ref={launcheditor}
                  value={values.launchServices}
                  name="launchServices"
                  tabIndex={1}
                  onBlur={(newContent) => setFieldValue("launchServices", newContent)}
                />
              </div>
            </div>
            <div className="text-left flex gap-5 mt-5">
              <button
                onClick={() => {
                  navigate(-1);
                }}
                type="button"
                className="bg-red-600 h-10 my-5 w-24 text-lg rounded-lg text-center text-white hover:bg-indigo-500"
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
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default Terms;
