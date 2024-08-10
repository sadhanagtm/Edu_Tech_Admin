import React, { useRef, useState, useEffect } from "react";
import { Field, Formik, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate, Link } from "react-router-dom";
import axiosinstance from "../../../Hoc/Axios";
import { IoCloudUploadSharp } from "react-icons/io5";
import { ClipLoader } from "react-spinners";

const schema = Yup.object().shape({
  title: Yup.string().required("This field is required"),
  description: Yup.string().required("This field is required"),
  icon: Yup.string().required("This field is required"),
  type: Yup.string().required("This field is required"),
});

function Vision() {
  const inputRef = useRef(null);
  const [redirect, setRedirect] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (redirect) {
      const timer = setTimeout(() => {
        navigate("/visiontable");
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [redirect, navigate]);

  const handleImageClick = () => {
    inputRef.current.click();
  };

  return (
    <div className="mt-20 lg:ml-52">
      <Formik
        initialValues={{
          title: "",
          description: "",
          icon: "",
          type: "vision", // Default value
        }}
        validationSchema={schema}
        onSubmit={(values, { resetForm }) => {
          setLoading(true); //set loading to true before API call

          const formData = new FormData();
          formData.append("type", values.type);
          formData.append("title", values.title);
          formData.append("description", values.description);
          formData.append("icon", values.icon);

          const data = {
            type: values.type.toLowerCase(),
            data: {
              title: values.title,
              description: values.description,
              icon: values.icon,
            },
          };

          axiosinstance
            .post("/mission/create", data)
            .then((res) => {
              toast.success("Submission Successful");
              setRedirect(true);
              resetForm();
              setLoading(true); //set loading to true before API call
            })
            .catch((error) => {
              setLoading(false); //set loading to false before API call
              toast.error(error.response.data.message);
            });
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
            <div className="text-2xl font-bold text-purple-700">Our Vision</div>
            <Link to={"/visiontable"}>
              <div className="absolute top-20 right-9 lg:right-8">
                <button className="lg:h-10 h-7 w-20 bg-red-700 text-white lg:text-lg font-semibold rounded-xl">
                  View
                </button>
              </div>
            </Link>
            <div className="flex flex-col m-auto gap-7 w-full">
              <div>
                <div className="text-lg font-medium text-purple-700 py-2">
                  Title
                </div>
                <Field
                  name="title"
                  type="text"
                  className="outline-none h-8 outline-gray-200 w-full"
                />
                <ErrorMessage
                  name="title"
                  component={"div"}
                  className="text-red-600"
                />
              </div>

              <div className="text-lg font-medium text-purple-700 w-full">
                <div className="py-1">Description</div>
                <Field
                  name="description"
                  as="textarea"
                  className="outline-none h-24 outline-gray-200 w-full"
                />
                <ErrorMessage
                  name="description"
                  component={"div"}
                  className="text-red-600"
                />
              </div>
              <div className="text-lg font-medium text-purple-700 w-full">
                <div className="py-1">Icon</div>
                <Field
                  name="icon"
                  type="text"
                  className="outline-none h-8 outline-gray-200 w-full"
                />
                <ErrorMessage
                  name="icon"
                  component={"div"}
                  className="text-red-600"
                />
              </div>
              <div className="lg:flex lg:gap-44">
                <div className="mt-9">
                  <Field
                    name="type"
                    as="select"
                    className="border outline-none h-10 lg:w-96 text-center lg:text-xl text-sm w-full text-purple-700 font-medium"
                  >
                    <option value="Vision">Vision</option>
                    <option value="Mission">Mission</option>
                    <option value="Objective">Objective</option>
                  </Field>
                  <ErrorMessage
                    name="type"
                    component={"div"}
                    className="text-red-600"
                  />
                </div>
              </div>
              <div className="text-left flex gap-5 sm:mt-2">
                <button
                  onClick={() => navigate(-1)}
                  type="button"
                  className="bg-red-600 h-10 my-2 w-24 text-lg rounded-lg text-center text-white hover:bg-indigo-500"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-indigo-600 h-10 my-2 w-24 text-lg rounded-lg text-center text-white hover:bg-indigo-500"
                >
                  Post
                </button>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default Vision;
