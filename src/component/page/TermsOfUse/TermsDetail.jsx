
import React, { Fragment, useEffect, useState } from "react";
import axios from "../../../Hoc/Axios";
import { useParams } from "react-router-dom";
import { duration } from "@mui/material";
import { connect } from "formik";

function TermsDetail() {
  const [Show, setShow] = useState("CourseInfo");
  const [student, setStudent] = useState([]);

  const params = useParams();
  const getdata = (id) => {
    try {
      axios
        .get(`/terms/${id}`)
        .then((res) => {
          console.log(res);
          setStudent([res.data.result]);
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
        Terms OfUse Information
      </div>

      <div className=" ">
        <div className="flex flex-col ">
          <div className="lg:mx-4 mt-3 lg:shadow-2xl shadow-lg  border border-tale-100   ">
            {student?.map((val, i) => {
              console.log(val);
            //   let image = `${import.meta.env.VITE_API_URL}/public/${val.image}`;

              return (
                <div className=" my-12  flex flex-col    ">
                  {/* <div className=" ml-8 ">
                    <img
                      src={image}
                      alt="/"
                      className="h-48  w-48 border border-black"
                    />
                  </div> */}

                  <div className="mx-1 ml-8 mt-8 grid sm:grid-cols-2 sm:gap-5 gap-3">

                    <div>
                      <div className="  text-purple-700 text-lg sefont font-semibold ">
                      Privacy Policy
                      </div>
                      <div className=" text-xs sm:text-base  trifont capitalize  ">
                        {val.privacyPolicy}
                      </div>
                    </div>

                    <div>
                      <div className=" text-lg text-purple-700 font-semibold ">
                      Instructor Terms
                      </div>
                      <div className=" lowercase "> {val.instructorTerms}</div>
                    </div>

                    <div>
                      <div className=" text-lg text-purple-700 font-semibold ">
                       Terms Of Use
                      </div>
                      <div className=" lowercase "> {val.termsOfuse}</div>
                    </div>

                    <div>
                      <div className=" text-lg text-purple-700 font-semibold ">
                      Pricing Policy
                      </div>
                      <div className=" capitalize "> {val.pricingPolicy}</div>
                    </div>

                    <div>
                      <div className=" text-lg text-purple-700 font-semibold">
                      Business Privacy Statement
                      </div>
                      <div className=" uppercase"> {val.businessPrivacyStatement}</div>
                    </div>


                    <div>
                      <div className=" text-lg text-purple-700 font-semibold">
                      Master Services Agreement
                      </div>
                      <div className=" uppercase"> {val.masterServicesAgreement}</div>
                    </div>  

                    <div>
                      <div className=" text-lg text-purple-700 font-semibold">
                      Business Term Conditions
                      </div>
                      <div className=" uppercase"> {val.businessTermConditions}</div>
                    </div>

                    <div>
                      <div className=" text-lg text-purple-700 font-semibold">
                      Affiliate Terms Conditions
                      </div>
                      <div className=" uppercase"> {val.affiliateTermsConditions}</div>
                    </div>

                    <div>
                      <div className=" text-lg text-purple-700 font-semibold">
                      Launch Services
                      </div>
                      <div className=" uppercase"> {val.launchServices}</div>
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

export default TermsDetail;
