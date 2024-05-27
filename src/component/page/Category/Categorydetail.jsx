import React, { Fragment, useEffect, useState } from "react";
import axios from "../../../Hoc/Axios";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useParams } from "react-router-dom";
import { duration } from "@mui/material";
import { connect } from "formik";

function Categorydetail() {
  const [Show, setShow] = useState("CourseInfo");
  const [course, setcourse] = useState([]);

  const params = useParams();
  const getdata = (id) => {
    try {
      axios
        .get(`/category/${id}`)
        .then((res) => {
          console.log(res);
          setcourse([res.data.result]);
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
    <Fragment>
      {course ? (
        <div className=" w-full h-full overflow-scroll pb-10 mt-20 ml-10 ">
          {/* {console.log(course)} */}
          <div className="grid grid-cols-2 shadow-2xl">
            <div
              onClick={() => {
                setShow("CourseInfo");
              }}
              className={` cursor-pointer  h-8 ${
                Show === "CourseInfo" ? "text-black " : ""
              } text-center font-semibold text-lg  hover:text-blue-500`}
            >
              Course Info
            </div>
            <div
              onClick={() => {
                setShow("Syllabus");
              }}
              className={` cursor-pointer  h-8 ${
                Show !== "CourseInfo"
                  ? "text-black shadow-2xl bg-white rounded-3xl"
                  : ""
              } text-center font-semibold text-lg  hover:text-blue-500`}
            >
              Syllabus
            </div>
          </div>

          {Show === "CourseInfo" ? (
            <div className="grid grid-cols-2 ml-20 ">
              <div className="flex flex-col ml-3">
                <div className=" h-fit my-5 mx-14 shadow-2xl bg-white ">
                  {course?.map((val, i) => {
                    console.log(val);
                    let image = `${import.meta.env.VITE_API_URL}/public/${val.image}`;

                    return (
                      <div className=" my-12 flex flex-col justify-between mx-20 ">
                        <div className=" flex justify-center items-center mr-10">
                          <img
                            src={image}
                            alt="/"
                            className="h-48  w-48 border border-black"
                             
                          />
                        </div>

                        <div className=" grid grid-cols-2 gap-7 mt-16">
                          <div className="">
                            <div className=" text-purple-700 text-lg font-semibold ">
                              Name
                            </div>
                            <div className=" capitalize ">{val.name}</div>
                          </div>
                      

                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="flex flex-col mr-3">
                <div className=" my-5 h-full ">
                  <div className="font-semibold text-center text-xl pt-7  capitalize text-purple-700  ">
                    About this field
                  </div>
                  {course?.map((val, i) => {
                    return (
                      <div className=" text-justify my-3 mx-3">
                        {val.description ? (
                          <div
                            dangerouslySetInnerHTML={{
                              __html: val.description,
                            }}
                            className="line-clamp-5 text-base px-2 py-1 font-normal   "
                          />
                        ) : (
                          <div className="line-clamp-3 text-sm py-1  font-normal px-2">
                            is simply dummy text of the printing and typesetting
                            industry. Lorem Ipsum has been the industry's
                            standard dummy text ever since the 1500s, when an
                            unknown printer took a galley of type and scrambled
                            it to make a type specimen book. It has survived not
                            only five centuries, but also the leap into
                            electronic typesetting, remaining essentially
                            unchanged. It was popularised in the 1960s with the
                            release of Letraset sheets containing Lorem Ipsum
                            passages, and more recently with desktop publishing
                            software like Aldus PageMaker including versions of
                            Lorem Ipsum.
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          ) : (
            <div className="w-10/12 mx-auto grid gap-6 mt-5  ">
              {course.map((val, i) => {
                return val.syllabus.map((item, ind) => {
                  return (
                    <Accordion key={i}>
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1-content"
                        id="panel1-header"
                      >
                        <Typography className="font-semibold hover:text-red-800 ">
                          {item.title}
                        </Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        <Typography>
                          <div
                            dangerouslySetInnerHTML={{
                              __html: item.description,
                            }}
                          />
                        </Typography>
                      </AccordionDetails>
                    </Accordion>





                  );
                });
              })}
            </div>
          )}
        </div>
      ) : (
        "LOADING"
      )}
    </Fragment>
  );
}

export default Categorydetail;
