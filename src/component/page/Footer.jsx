import { Field, Form, Formik } from "formik";
import React, { useRef, useState, useEffect, useMemo } from "react";
import { IoCloudUploadSharp } from "react-icons/io5";
import toast, { Toaster } from "react-hot-toast";

function Footer() {


    const inputRef = useRef(null);
    const [image, setImage] = useState("");
  
  
    const handleImageClick = () => {
      inputRef.current.click();
    };
  
    const handleImageChange = (e) => {
      const file = e.target.files[0];
      console.log(file);
      setImage(e.target.files[0]);
    };


  return (
    <div className="mt-20 lg:ml-56">
      <div className=" h-16 w-full bg-gray-50 shadow-xl flex rounded-lg  items-center justify-between">
        <div className=" text-xl font-semibold ml-4 ">Footer</div>
      </div>

      <div className=" h-full full mt-8 grid lg:grid-cols-2 sm:grid-cols-2 gap-3 bg-re-300">
        <div className="bg-gray-100 rounded-lg">
          <Formik>
            <Form className="ml-6 mt-3">
              <Toaster />
              <div className="text-2xl  font-bold "> General Settings </div>

              <div>
                <div className="text-lg  font-semibold mt-5">Title</div>
                <Field
                  name="title"
                  autoComplete="off"
                  type="text"
                  className=" h-9 w-11/12 border-gray-400  border-2 rounded-lg  mt-2 outline-none"
                />
              </div>





               <div className="mt-8">
                    <div className="text-lg font-medium  mb-2">
                      Upload Primary Logo
                    </div>
                    <div onClick={handleImageClick}>
                      {image ? (
                        <img
                          src={URL.createObjectURL(image)}
                          className="h-48 w-48 justify-center"
                          alt=""
                          name="image"
                        />
                      ) : (
                        <div className="h-48  w-11/12  border border-black border-dashed flex text-xl flex-col  justify-center text-center items-center text-gray-400 ">
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
                  onChange={handleImageClick}
                        style={{ display: "none" }}
                      />

                    </div>
                  </div> 


           
                  <div className="mt-8">
                    <div className="text-lg font-medium  mb-2">
                    Upload Secondary Logo
                    </div>
                    <div onClick={handleImageClick}>
                      {image ? (
                        <img
                          src={URL.createObjectURL(image)}
                          className="h-48 w-48 justify-center"
                          alt=""
                          name="image"
                        />
                      ) : (
                        <div className="h-48  w-11/12  border border-black border-dashed flex text-xl flex-col  justify-center text-center items-center text-gray-400 ">
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
                  onChange={handleImageClick}
                        style={{ display: "none" }}
                      />

                    </div>
                  </div>




              <button
               type="submit"
               className="h-12 w-40 bg-primary text-white mt-5 rounded-xl text-xl font-semibold mb-6 hover:bg-teal-800">
                Save Changes
              </button>
            </Form>
          </Formik>
        </div>

        <div className="bg-gray-100 rounded-lg">
          <Formik>
            <Form className="ml-6 mt-3">
              <div className="text-2xl font-bold ">Contact Information</div>

              <div>
                <div className="text-lg font-semibold mt-5">Email</div>
                <Field
                  name="email"
                  autoComplete="off"
                  type="email"
                  className=" h-9 w-11/12 border-gray-400  border-2 rounded-lg  mt-2 outline-none"
                />
              </div>

              <div>
                <div className="text-lg font-semibold mt-5">Address</div>
                <Field
                  name="address"
                  autoComplete="off"
                  type="text"
                  className=" h-9 w-11/12 border-gray-400  border-2 rounded-lg  mt-2 outline-none"
                />
              </div>

              <div>
                <div className="text-lg font-semibold mt-5">Phone</div>
                <Field
                  name="phone"
                  autoComplete="off"
                  type="number"
                  className=" h-9 w-11/12 border-gray-400  border-2 rounded-lg  mt-2 outline-none"
                />
              </div>

              <div>
                <div className="text-lg font-semibold mt-5">Facebook</div>
                <Field
                  name="facebook"
                  autoComplete="off"
                  type="text"
                  className=" h-9 w-11/12 border-gray-400  border-2 rounded-lg  mt-2 outline-none"
                />
              </div>

              <div>
                <div className="text-lg font-semibold mt-5">Instagram</div>
                <Field
                  name="instagram"
                  autoComplete="off"
                  type="text"
                  className=" h-9 w-11/12 border-gray-400  border-2 rounded-lg  mt-2 outline-none"
                />
              </div>

              <div>
                <div className="text-lg font-semibold mt-5">Linkedin</div>
                <Field
                  name="Linkedin"
                  autoComplete="off"
                  type="text"
                  className=" h-9 w-11/12 border-gray-400  border-2 rounded-lg  mt-2 outline-none"
                />
              </div>

              <div>
                <div className="text-lg font-semibold mt-5">Twitter</div>
                <Field
                  name="twitter"
                  autoComplete="off"
                  type="text"
                  className=" h-9 w-11/12 border-gray-400  border-2 rounded-lg  mt-2 outline-none"
                />
              </div>

              <div>
                <div className="text-lg font-semibold mt-5">website</div>
                <Field
                  name="website"
                  autoComplete="off"
                  type="text"
                  className=" h-9 w-11/12 border-gray-400  border-2 rounded-lg  mt-2 outline-none"
                />
              </div>

              <button
              type="submit"
               className="h-12 w-36 bg-primary text-white mt-5 rounded-xl text-xl font-semibold mb-6 hover:bg-teal-800">
                Update
              </button>
            </Form>
          </Formik>
        </div>
      </div>
    </div>
  );
}

export default Footer;
