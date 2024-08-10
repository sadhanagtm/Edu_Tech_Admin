import React, { Fragment, useEffect, useState } from "react";
import axios from "../../../Hoc/Axios";
import { useParams } from "react-router-dom";
import { duration } from "@mui/material";
import { connect } from "formik";

function FooterDetails() {
  const [Show, setShow] = useState("CourseInfo");
  const [foot, setFoot] = useState([]);

  const params = useParams();
  const getdata = (id) => {
    try {
      axios
        .get(`/footer/${id}`)
        .then((res) => {
          console.log(res);
          setFoot([...res.data.result]);
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
        Footer Information
      </div>

      <div className=" ">
        <div className="flex flex-col ">
          <div className="lg:mx-4 mt-3 lg:shadow-2xl shadow-lg  border border-tale-100   ">
            {foot?.map((val, i) => {
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
                    {/* <div className="   ">
                      <div className="  text-purple-700 text-lg sefont font-semibold ">
                        Title
                      </div>
                      <div className=" text-xs sm:text-base  trifont capitalize  ">
                        {val.title}
                      </div>
                    </div> */}

                    <div>
                      <div className=" text-lg text-purple-700 font-semibold ">
                        Email
                      </div>
                      <div className=" lowercase "> {val.email}</div>
                    </div>

                    <div>
                      <div className=" text-lg text-purple-700 font-semibold ">
                        Address
                      </div>
                      <div className=" capitalize "> {val.address}</div>
                    </div>

                    <div>
                      <div className=" text-lg text-purple-700 font-semibold">
                        Phone
                      </div>
                      <div className=" uppercase"> {val.phone}</div>
                    </div>

                    <div>
                      <div className=" text-lg text-purple-700 font-semibold ">
                        Facebook
                      </div>
                      <div className=" lowercase "> {val.facebook}</div>
                    </div>


                  
                    <div>
                      <div className=" text-lg text-purple-700 font-semibold ">
                        Twitter
                      </div>
                      <div className=" lowercase "> {val.twitter}</div>
                    </div>

                    
                    <div>
                      <div className=" text-lg text-purple-700 font-semibold ">
                        Linkedin
                      </div>
                      <div className=" lowercase "> {val.linkedin}</div>
                    </div>

                    
                    <div>
                      <div className=" text-lg text-purple-700 font-semibold ">
                        Website
                      </div>
                      <div className=" lowercase "> {val.website}</div>
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

export default FooterDetails;
