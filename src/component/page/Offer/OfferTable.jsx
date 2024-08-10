import React, { useState, useEffect, useRef } from "react";
import Table from "../../page component/Table";
import axios from "../../../Hoc/Axios";
import { MdDelete } from "react-icons/md";
import { MdModeEdit } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { Delete } from "react-axios";
import Modal from "../../../Delete/Modal";
import { GrFormPreviousLink } from "react-icons/gr";
import { GrFormNextLink } from "react-icons/gr";

function OfferTable() {
  const [showdelete, setShowDelete] = useState(false);
  const [deleteid, setdeleteid] = useState(null);


  const columns = [
    {
      name: "Name",
      sortable: true,
       
      cell: (row) => {
        console.log(row);
        return (
          <div className="">
            <Link to={`/package/${row.id}`}>{row.name}</Link>
          </div>
        );
      },

      selector: (row) => row.name,
    },
    {
      name: "Content",
      sortable: true,
      selector: (row) => row.content,
    },
    {
      name: "Course",
      sortable: true,
      cell: (row) => (
        <div>
          {row.course.map((course) => (
            <div key={course.id}>{course.name}</div>
          ))}
        </div>
      ),
    },
   
    {
          name: "Action",
          cell: (row) => (
            <div className="gap-4 flex items-center justify-center text-xl ">
              <Link
                to={"/editoffer"}
                state={{
                  id: row.id,
                }}
              >
                <button className="  " id={row.id}>
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

  const [Course, setcourse] = useState([]);
  const [filter, setFilter] = useState([]);
  const [query, setQuery] = useState("");

  const getdata = () => {
    try {
      axios
        .get("/package")
        .then((res) => {
          console.log(res);
          setcourse(res.data.result);
          setFilter(res.data.result);
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getdata();
  }, []);

  const data = [];

  const handleEdit = () => {};

  const handleDelete = (id) => {
    try {
      axios.delete(`/package/${deleteid}`);
      getdata();
    } catch (error) {
      console.log(error);
    }
  };

  console.log(Course);

  const handlesearch = (event) => {
    const getSearch = event.target.value;
    setQuery(getSearch);
    if (getSearch.length > 0) {
      const searchdata = Course.filter((item) =>
        item.name.toLowerCase().includes(getSearch)
      );
      setcourse(searchdata);
    } else {
      setcourse(filter);
    }

    setQuery(getSearch);
  };

  return (
    <div className="lg:ml-52  ">
      {showdelete && (
        <Modal
          handleDelete={() => handleDelete()}
          setShowDelete={() => {
            setShowDelete(false);
          }}
        />
      )}

      <div className=" mt-24 ">
        <input
          type="text"
          name="name"
          autoComplete="off"
          value={query}
          className=" border-2 border-black rounded-xl sm:h-8 w-32   sm:w-56 pl-3 pr-3 "
          onChange={(e) => handlesearch(e)}
          placeholder="search here"
        />
      </div>

      {/* <Link to={"/Addcourses"}>
        <div className="  top-20 lg:right-10  right-4 absolute mt-4">
          <button className="lg:h-10 w-24 h-7 bg-red-700 text-white lg:text-lg font-semibold  rounded-xl  ">
            Add New
          </button>
        </div>
      </Link> */}

      {Course && <Table data={Course} columns={columns} />}
    </div>
  );
}

export default OfferTable;