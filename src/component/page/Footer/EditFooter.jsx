

import { Field, Formik, Form } from "formik";
import React, { useRef, useState, useEffect, useMemo } from "react";
import toast, { Toaster } from "react-hot-toast";
import { Description, Navigation } from "@mui/icons-material";
import axios from "../../../Hoc/Axios";
import { IoCloudUploadSharp } from "react-icons/io5";
import JoditEditor from "jodit-react";
import { duration } from "@mui/material";
import { ClipLoader } from "react-spinners";
import { useNavigate, useLocation } from "react-router-dom";

function EditFooter() {
  const data = [
    { name: "email", type: "email", label: "Email" },
    { name: "address", type: "text", label: "Address" },
    { name: "phone", type: "number", label: "Phone" },
    { name: "facebook", type: "text", label: "Facebook" },
    { name: "twitter", type: "text", label: "Twitter" },
    { name: "linkedin", type: "text", label: "Linkedin" },
    { name: "website", type: "text", label: "Website" },
  ];

  const [value, setFieldValue] = useState("");
  const [hero, setHero] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();

  const inputRef = useRef(null);
  const inputtRef = useRef(null);
  const [primary, setPrimary] = useState("");
  const [secondary, setSecondary] = useState("");
  const [redirect, setRedirect] = useState(false);

  const [placeholder, setplaceholder] = useState("enter description...");
  const [loading, setLoading] = useState(false);

  const editor = useRef(null);
  const [content, setContent] = useState("");

  const handlePrimaryClick = () => {
    inputRef.current.click();
  };

  const handleSecondaryClick = () => {
    inputtRef.current.click();
  };

  const handlePrimaryChange = (e) => {
    const file = e.target.files[0];
    console.log(file);
    setPrimary(e.target.files[0]);
  };
  const handleSecondaryChange = (e) => {
    const file = e.target.files[0];
    console.log(file);
    setSecondary(e.target.files[0]);
  };

  useEffect(() => {
    let interval;
    if (redirect) {
      interval = setTimeout(() => {
        navigate("/footertable");
      }, 2000);
    }
    return () => {
      clearTimeout(interval);
    };
  }, [redirect, navigate]);

  const getdata = (id) => {
    try {
      axios
        .get(`/footer/${id}`)
        .then((res) => {
          console.log(res);
          setHero([...res.data.result]);
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
      getdata(location.state.id);
    }
  }, []);

  return (
    <div className="mt-20 lg:ml-52">
      {hero && hero.length > 0 && (
        <Formik
          initialValues={{
            oldprimaryLogo: hero && hero.length > 0 ? hero[0].primaryLogo : "",
            primaryLogo: "",

            oldsecondaryLogo:
              hero && hero.length > 0 ? hero[0].secondaryLogo : "",
            secondaryLogo: "",

            email: hero && hero.length > 0 ? hero[0].email : "",
            address: hero && hero.length > 0 ? hero[0].address : "",
            phone: hero && hero.length > 0 ? hero[0].phone : "",
            facebook: hero && hero.length > 0 ? hero[0].facebook : "",
            twitter: hero && hero.length > 0 ? hero[0].twitter : "",
            linkedin: hero && hero.length > 0 ? hero[0].linkedin : "",
            website: hero && hero.length > 0 ? hero[0].website : "",
          }}
          onSubmit={(values, { resetForm }) => {
            setLoading(true); //set loading to true before API call

            try {
              const formData = new FormData();

              formData.append("primaryLogo", values.primaryLogo);
              formData.append("secondaryLogo", values.secondaryLogo);
              formData.append("email", values.email);
              formData.append("address", values.address);
              formData.append("phone", values.phone);
              formData.append("facebook", values.facebook);
              formData.append("twitter", values.twitter);
              formData.append("linkedin", values.linkedin);
              formData.append("website", values.website);

              axios
                .patch(`/footer/${location.state.id}/`, formData)
                .then((res) => {
                  console.log(res);
                  toast.success("Save Successfully");
                  setRedirect((prev) => !prev);
                  setHero([...res.data.data]);
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

                {console.log(values, hero)}

                <div>
                  <div className="grid lg:grid-cols-3 sm:grid-cols-2 lg:gap-9 gap-4 sm:gap-8 ">
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
                                className="outline-none h-10  w-full outline-gray-200 "
                                onChange={(e) => {
                                  setFieldValue(val.name, e.target.value);
                                }}
                              />
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <div className=" col-span-2 mt-10 grid grid-cols-1 justify-between">

                    <div className=" grid sm:grid-cols-2">

                    <div className="text-left mt-0">
                      <div className="text-lg font-medium text-purple-700 mb-2">
                      Upload Primary Logo
                      </div>
                      <div
                        onClick={handlePrimaryClick}
                        className=" border sm:w-48"
                      >
                        {values.primaryLogo ? (
                          <img
                            src={URL.createObjectURL(values.primaryLogo)}
                            className="h-48  lg:w-48 sm:w-48 object-contain"
                            alt=""
                            name="primaryLogo"
                          />
                        ) : (
                          <img
                            src={`http://192.168.1.95:8080/public/${values.oldprimaryLogo}`}
                            className="h-48  lg:w-48 sm:w-48"
                            alt=""
                            name="primaryLogo"
                          />
                        )}
                        <input
                          name="primaryLogo"
                          type="file"
                          accept="image/*"
                          ref={inputRef}
                          onChange={(e) => {
                            setFieldValue("primaryLogo", e.target.files[0]);
                          }}
                          style={{ display: "none" }}
                        />
                      </div>
                    </div>

                    <div className="text-left mt-0">
                      <div className="text-lg font-medium text-purple-700 mb-2">
                      Upload Secondary Logo
                      </div>
                      <div
                        onClick={handleSecondaryClick}
                        className=" border sm:w-48"
                      >
                        {values.secondaryLogo ? (
                          <img
                            src={URL.createObjectURL(values.secondaryLogo)}
                            className="h-48  lg:w-48 sm:w-48 object-contain"
                            alt=""
                            name="secondaryLogo"
                          />
                        ) : (
                          <img
                            src={`http://192.168.1.95:8080/public/${values.oldsecondaryLogo}`}
                            className="h-48  lg:w-48 sm:w-48"
                            alt=""
                            name="secondaryLogo"
                          />
                        )}
                        <input
                          name="secondaryLogo"
                          type="file"
                          accept="image/*"
                          ref={inputtRef}
                          onChange={(e) => {
                            setFieldValue("secondaryLogo", e.target.files[0]);
                          }}
                          style={{ display: "none" }}
                        />
                      </div>
                    </div>

                    </div>

                  
                    <div className="text-left flex gap-5 ">
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
      )}
    </div>
  );
}

export default EditFooter;
