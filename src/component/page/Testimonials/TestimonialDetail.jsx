import React, { Fragment, useEffect, useState } from "react";
import axios from "../../../Hoc/Axios";
import { useParams } from "react-router-dom";
import { duration } from "@mui/material";
import { connect } from "formik";

function TestimonialDetail() {
  // const [Show, setShow] = useState("CourseInfo");
  const [testimonial, setTestimonial] = useState([]);

  const params = useParams();
  const getdata = (id) => {
    try {
      axios
        .get(`/testomonial/${id}`)
        .then((res) => {
          console.log(res);
          setTestimonial([...res.data.result]);
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (params && params.id) {
      getdata(params.id);
    }
  }, [params]);

  return (

    <div className="  h-full lg:ml-52  pb-10 mt-20  flex flex-col ">
      <div className="  bg-white shadow-2xl border border-tale-100 mt-1  prifont font-semibold  lg:mx-4  py-2 hover:bg-zinc-50 item-center  h-10 rounded-xl text-center ">
        {" "}
        Testimonial Information
      </div>

      <div className=" ">
        <div className="flex flex-col ">
          <div className="lg:mx-4 mt-3 lg:shadow-2xl shadow-lg  border border-tale-100   ">
            {testimonial?.map((val, i) => {
              console.log(val);
              let image = `${import.meta.env.VITE_API_URL}/public/${val.image}`;

              return (
                <div className=" my-12  flex flex-col    ">
                  <div className=" ml-8 ">
                    <img
                      src={image}
                      alt="/"
                      className="h-48  w-48 border border-black"
                    />
                  </div>

                  <div className="mx-1 ml-8 mt-8 grid sm:grid-cols-2 sm:gap-5 gap-3">
                    <div>
                      <div className="  text-purple-700 text-lg sefont font-semibold ">
                        Name
                      </div>
                      <div className=" text-xs sm:text-base  trifont capitalize  ">
                        {val.name}
                      </div> 
                    </div>


                    <div>
                      <div className="  text-purple-700 text-lg sefont font-semibold ">
                        Linkedin
                      </div>
                      <div className=" text-xs sm:text-base  trifont capitalize  ">
                        {val.linkedin}
                      </div> 
                    </div>

                    <div>
                      <div className="  text-purple-700 text-lg sefont font-semibold ">
                        Instagram
                      </div>
                      <div className=" capitalize  ">
                        {val.instagram}
                      </div> 
                    </div>

                    <div>
                      <div className="  text-purple-700 text-lg sefont font-semibold ">
                        Facebook
                      </div>
                      <div className=" text-xs sm:text-base  trifont capitalize  ">
                        {val.facebook}
                      </div> 
                    </div>

                    <div>
                      <div className=" text-lg text-purple-700 font-semibold">
                        Video
                      </div>
                      <div className=" uppercase"> {val.video}</div>
                    </div>


                    <div>
                      <div className=" text-lg text-purple-700 font-semibold">
                        Description
                      </div>
                      <div className=" uppercase"> {val.desc}</div>
                    </div>

                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>

    
  );
}

export default TestimonialDetail;

