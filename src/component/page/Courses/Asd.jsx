// table ko kunai pani row ma click garyera tyo row  ko detail nikalna ko lagi

import React, { Fragment, useEffect, useState } from "react";
import Table from "../../page component/Table";
import axios from "../../../Hoc/Axios";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Link, useParams } from "react-router-dom";
import { duration } from "@mui/material";
import { connect } from "formik";
import { MdModeEdit } from "react-icons/md";
import Modal from "../../../Delete/Modal";
import { Delete } from "react-axios";
import { MdDelete } from "react-icons/md";

function Asd() {
  const [Show, setShow] = useState("CourseInfo");
  const [showdelete, setShowDelete] = useState(false);
  const [deleteid, setdeleteid] = useState(null);

  const columns = [
    {
      name: "Title",
      sortable: true,
      cell: (row) => {
        console.log(row);
        return (
          <div>
            <Link to={`/syllabus/${row.id}`}>{row.title}</Link>
          </div>
        );
      },
      selector: (row) => row.title,
    },

    { name: "Subtitle", sortable: true, selector: (row) => row.subtitle },
    { name: "Description", sortable: true, selector: (row) => row.description },

    {
      name: "Video",
      sortable: true,
      cell: (row) => {
        let video = `${import.meta.env.VITE_API_URL}/public/${row.video}`;
        return (
          <div className="h-8 w-8">
            <video controls src={video} />
          </div>
        );
      },

      selector: (row) => row.video,
    },
    {
      name: "Action",
      cell: (row) => (
        <div className="gap-4 flex items-center justify-center text-xl ">
          <Link to={"/editsyallabus"} state={{ id: row.id }}>
            <button className="  " id={row.ID}>
              <MdModeEdit />
            </button>
          </Link>

          <button
            className=" "
            onClick={() => {
              setShowDelete(true);
              setdeleteid(row.id);
            }}
            // onClick={() => handleDelete(row.id)}
            id={row.id}
          >
            <MdDelete />
          </button>
        </div>
      ),
      selector: (row) => row.action,
    },
  ];

  const [App, setapp] = useState([]);
  const [filter, setFilter] = useState([]);
  const [query, setQuery] = useState("");

  const getdatas = (id) => {
    try {
      axios
        .get(`/syllabus`)
        .then((res) => {
          console.log(res);
          console.log(res.data.result.syllabus, "syllabus data");
          setapp([...res.data.result.syllabus]);
          setFilter([...res.data.result]);
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getdatas();
  }, []);

  const data = [];

  const handleEdit = () => {};
  const handleDelete = (id) => {
    try {
      axios.delete(`/syllabus/${deleteid}`);
      getdata();
    } catch (error) {
      console.log(error);
    }
  };

  console.log(App);

  const handlesearch = (event) => {
    const getSearch = event.target.value;
    setQuery(getSearch);
    if (getSearch.length > 0) {
      const searchdata = App.filter((item) =>
        item.name.toLowerCase().includes(getSearch)
      );
      setapp(searchdata);
    } else {
      setapp(filter);
    }

    setQuery(getSearch);
  };

  const [course, setcourse] = useState([]);
  const params = useParams();
  const getdata = (id) => {
    try {
      axios
        .get(`/course/${id}`)
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
        <div className=" w-full h-full overflow-scroll pb-10 mt-16 lg:ml-10  ">
          {/* {console.log(course)} */}
          <div className="grid grid-cols-2 bg-zinc-300 shadow-2xl h-9  ">
            <div
              onClick={() => {
                setShow("CourseInfo");
              }}
              className={` cursor-pointer  h-8 ${
                Show === "CourseInfo"
                  ? "text-black shadow-2xl bg-zinc-100 rounded-r-3xl"
                  : ""
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
                  ? "text-black shadow-2xl bg-zinc-100 rounded-l-3xl"
                  : ""
              } text-center font-semibold text-lg  hover:text-blue-500`}
            >
              Syllabus
            </div>
          </div>

          {Show === "CourseInfo" ? (
            <div className="grid lg:grid-cols-2 lg:ml-20 ">
              <div className="flex flex-col lg:ml-3">
                <div className=" h-fit lg:mx-14 shadow-2xl bg-white ">
                  {course?.map((val, i) => {
                    console.log(val);
                    let image = `${import.meta.env.VITE_API_URL}/public/${
                      val.image
                    }`;

                    return (
                      <div className=" lg:my-12 my-6 flex flex-col justify-between lg:mx-20   ">
                        <div className=" flex justify-center items-center lg:mr-10  ">
                          <img
                            src={image}
                            alt="/"
                            className="h-48  w-48 border border-black"
                          />
                        </div>

                        <div className=" grid grid-cols-2 sm:gap-5 gap-9 mt-16 lg:-ml-5 mx-auto  ">
                          <div className="">
                            <div className=" text-purple-700 text-lg font-semibold ">
                              Name
                            </div>
                            <div className=" capitalize ">{val.name}</div>
                          </div>

                          <div className="lg:ml-10 sm:ml-10">
                            <div className=" text-lg text-purple-700 font-semibold ">
                              Duration
                            </div>
                            <div className=" capitalize "> {val.duration}</div>
                          </div>

                          <div className="">
                            <div className=" text-lg text-purple-700 font-semibold ">
                              Price
                            </div>
                            <div className=" uppercase "> {val.price}</div>
                          </div>

                          <div className="lg:ml-10 sm:ml-10">
                            <div className=" text-lg text-purple-700 font-semibold">
                              Rating
                            </div>
                            <div> {val?.rating}</div>
                          </div>

                          <div className=" ">
                            <div className=" text-lg text-purple-700 font-semibold ">
                              Discount
                            </div>
                            <div className=" capitalize"> {val.discount}</div>
                          </div>

                          <div className=" lg:ml-10 sm:ml-10 ">
                            <div className=" text-lg text-purple-700 font-semibold ">
                              Tags
                            </div>
                            <div className=" capitalize "> {val.tags}</div>
                          </div>

                          <div className="">
                            <div className=" text-lg text-purple-700 font-semibold ">
                              Overview
                            </div>
                            <div className=" uppercase "> {val.overview}</div>
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
            //  syallabus

            <div className="ml-5 mt-7 sm:ml-36">
              {showdelete && (
                <Modal
                  handleDelete={() => handleDelete()}
                  setShowDelete={() => {
                    setShowDelete(false);
                  }}
                />
              )}
              <div className=" ">
                <input
                  type="text"
                  name="name"
                  value={query}
                  className=" border-2 border-gray-700 h-8 lg:w-64  rounded-xl pl-3 outline-none"
                  onChange={(e) => handlesearch(e)}
                  placeholder="Search here"
                />
              </div>

              {App && <Table data={App} columns={columns} />}

              <Link to={"/addsyallabus"}>
                <div className="  top-32 lg:right-16 right-16 absolute">
                  <button className=" lg:h-10 h-8 w-24 bg-red-700 text-white text-lg font-semibold  rounded-md ">
                    Add New
                  </button>
                </div>
              </Link>
            </div>
          )}
        </div>
      ) : (
        "LOADING"
      )}
    </Fragment>
  );
}

export default Asd;
