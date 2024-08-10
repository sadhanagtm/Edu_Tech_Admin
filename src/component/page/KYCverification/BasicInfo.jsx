import React, { useRef, useState } from "react";
import { ErrorMessage, Formik, Form, Field } from "formik";
import axios from "../../../Hoc/Axios";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import * as Yup from "yup";
import { IoCloudUploadSharp } from "react-icons/io5";

const schema = Yup.object().shape({
  dob: Yup.string().required("This field is required"),
  nationality: Yup.string().required("This field is required"),
  gender: Yup.string().required("You must choose one"),
  mariatalStatus: Yup.string().required("You must choose one"),
  fatherName: Yup.string().required("This field is required"),
  grandFatherName: Yup.string().required("This field is required"),
  occupation: Yup.string().required("This field is required"),
  experience: Yup.string().required("This field is required"),
  qualification: Yup.string().required("This field is required"),
  skills: Yup.string().required("This field is required"),
  cv: Yup.string().required("This field is required"),
});

const basic = [
  { name: "dob", type: "date", placeholder: "", label: "Date of birth" },
  { name: "nationality", type: "text", placeholder: "", label: "Nationality" },
  {
    name: "gender",
    type: "select",
    label: "Select your gender",
    option: ["Select gender", "Male", "Female"],
  },
  {
    name: "maritalStatus",
    type: "select",
    label: "Marital Status",
    option: ["Select Status", "Married", "Unmarried"],
  },
  { name: "fatherName", type: "text", placeholder: "", label: "Father Name" },
  {
    name: "grandFatherName",
    type: "text",
    placeholder: "",
    label: "Grandfather Name",
  },
  { name: "occupation", type: "text", placeholder: "", label: "Occupation" },
  { name: "experience", type: "text", placeholder: "", label: "Experience" },

  {
    name: "qualification",
    type: "text",
    placeholder: "",
    label: "Qualification",
  },
  {
    name: "skills",
    type: "text",
    placeholder: "",
    label: "Skills",
  },
  // { name: "cv", type: "file", label: "Upload Your CV" },
  // { name: "cv", type: "file", label: "Upload CV" },
];

function BasicInfo({ handleNext }) {
  const Navigate = useNavigate();

  const [image, setImage] = useState();
  const inputRef = useRef(null);
  const handleImageClick = () => {
    inputRef.current.click();
  };
  const handleImageChange = () => {
    const file = e.target.files[0];
    console.log(file);
    setImage(e.target.files[0]);
  };

  return (
    <Formik
      initialValues={{
        dob: "",
        nationality: "",
        maritalStatus: "",
        fatherName: "",
        grandFatherName: "",
        occupation: "",
        gender: "",
        experience: "",
        qualification: "",
        skills: "",
        cv: "",
      }}
      validationSchema={schema}
      onSubmit={(values, { resetForm }) => {
        console.log(values);
        try {
          const formData = new FormData();

          formData.append("dob", values.dob);
          formData.append("nationality", values.nationality);
          formData.append("gender", values.gender);
          formData.append("maritalStatus", values.maritalStatus);
          formData.append("fatherName", values.fatherName);
          formData.append("grandFatherName", values.grandFatherName);
          formData.append("occupation", values.occupation);
          formData.append("experience", values.experience);
          formData.append("qualification", values.qualification);
          formData.append("skills", values.skills);
          formData.append("cv", values.cv);
          // formData.append("image", values.image);

          // for(let i=0;i<image.length;i++){
          // formData.append(image[${i}], values.image[0]);
          // }
          axios
            .post("/basicdetails/ ", formData)
            .then((res) => {
              console.log("user data", res);
              toast.success("Submit Successfully");
              handleNext();

              // Navigate("/");
            })
            .catch((error) => {
              console.log(error);
              toast.error("something went wrong");
            });
        } catch (error) {
          console.log(error);
        }
        console.log(values);
        // resetForm();
      }}
    >
      {({ handleSubmit, setFieldValue, values }) => {
        return (
          <>
            <div>
              <Toaster />
              <Form onSubmit={handleSubmit}>
                <div className="sm:grid sm:grid-cols-2 gap-7 flex flex-col mx-7 mt-9">
                  {basic.map((val, i) => {
                    if (val.type === "date") {
                      return (
                        <div className="flex flex-col  ">
                          <label className="px-3">{val.label}</label>
                          <Field
                            name={val.name}
                            type={val.type}
                            placeholder={val.placeholder}
                            className="outline-blue-200 px-3  border border-gray-300 h-12 w-full rounded-xl"
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
                      );
                    } else if (val.type === "text") {
                      return (
                        <div className=" ">
                          <div className="flex flex-col">
                            <label className="px-3">{val.label} </label>
                            <Field
                              name={val.name}
                              type={val.type}
                              placeholder={val.placeholder}
                              className="outline-blue-200 px-3  border border-gray-300 h-12 w-full rounded-xl"
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
                      );
                    } else if (val.type === "select") {
                      return (
                        <div className="flex flex-col">
                          <label className="px-3">{val.label} </label>
                          <Field
                            name={val.name}
                            as={val.type}
                            placeholder={val.placeholder}
                            className="outline-blue-200 px-3  border border-gray-300 h-12 w-full rounded-xl"
                            onChange={(e) => {
                              setFieldValue(val.name, e.target.value);
                            }}
                          >
                            {val.option.map((items, inds) => {
                              return <option name={items}>{items}</option>;
                            })}
                          </Field>
                          <ErrorMessage
                            name={val.name}
                            component={"div"}
                            className="text-red-600"
                          />
                        </div>
                      )}
 

                     
                  })}
                </div>

                <div className="text-left mt-8 mx-7 flex flex-col items-center  ">
                    <div className=" font-semibold text-blue-900 py-2">
                      Upload your CV
                    </div>
                    <div onClick={handleImageClick} className="sm:w-72 w-full cursor-pointer">
                      {values.image ? (
                        <img
                          src={URL.createObjectURL(values.image)}
                          className="h-72 sm:w-72 w-full border object-contain "
                          alt="image"
                          name="image"
                        />
                      ) : (
                        <div className="h-72 sm:w-72 w-full border border-black border-dashed flex text-xl flex-col  justify-center text-center items-center text-gray-400 ">
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
                        style={{ display:"none" }}
                      />
                      <ErrorMessage
                        name="image"
                     component={"div"}
                    className="text-red-600"
                         />
                    </div>
                  </div> 


                <div className='  flex float-end mx-11   '>
                <button type='submit' className=' sm:w-32 w-16  h-10 rounded-3xl relative top-14  text-center   text-white bg-ternary'>
               NEXT
             </button>
             </div>
              </Form>
            </div>
          </>
        );
      }}
    </Formik>
  );
}

export default BasicInfo;