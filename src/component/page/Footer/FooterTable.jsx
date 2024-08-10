

import React, { useState, useEffect } from "react";
import Table from "../../page component/Table";
import axios from "../../../Hoc/Axios";

import { MdDelete } from "react-icons/md";
import { MdModeEdit } from "react-icons/md";
import { Link } from "react-router-dom";
import Modal from "../../../Delete/Modal";

function FooterTable() {
  const [showdelete, setShowDelete] = useState(false);
  const [deleteid, setdeleteid] = useState(null);

  const columns = [
    {
      name: "Email",
      sortable: true,

      cell: (row) => {
        console.log(row);
        return (
          <div className="">
            <Link to={`/footer/${row.id}`}>{row.email}</Link>
          </div>
        );
      },

      selector: (row) => row.email,
    },

    {
      name: "primaryLogo",
      sortable: true,
      cell: (row) => {
        let primaryLogo = `${import.meta.env.VITE_API_URL}/public/${row.primaryLogo}`;
        return (
          <div className="h-8 w-8">
            <img src={primaryLogo} />
          </div>
        );
      },

      selector: (row) => row.primaryLogo,
    },

    {
        name: "secondaryLogo",
        sortable: true,
        cell: (row) => {
          let secondaryLogo = `${import.meta.env.VITE_API_URL}/public/${row.secondaryLogo}`;
          return (
            <div className="h-8 w-8">
              <img src={secondaryLogo} />
            </div>
          );
        },
  
        selector: (row) => row.secondaryLogo,
      },

    // { name: "email", sortable: true, selector: (row) => row.email },
    { name: "address", sortable: true, selector: (row) => row.address },
    { name: "phone", sortable: true, selector: (row) => row.phone },
    { name: "facebook", sortable: true, selector: (row) => row.facebook },

    {
       name: "twitter",
        sortable: true, 
        cell: (row) => {
          console.log(row);
          return (
            <div className="">
              <Link to={`/footer/${row.id}`}>{row.twitter}</Link>
            </div>
          );
        },

        selector: (row) => row.twitter,
       },

    { name: "linkedin", sortable: true, selector: (row) => row.linkedin },
    { name: "website", sortable: true, selector: (row) => row.website },

    {
      name: "Action",
      cell: (row) => (
        <div className="gap-4 flex items-center justify-center text-xl ">
          <Link
            to={"/editfooter"}
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

  const [app, setApp] = useState([]);
  const [filter, setFilter] = useState([]);
  const [query, setQuery] = useState("");

  const getdata = (id) => {
    try {
      axios
        .get(`/footer`)
        .then((res) => {
          console.log(res);
          setApp([...res.data.result]);
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
    getdata();
  }, []);

  const data = [];

  const handleEdit = () => {};

  const handleDelete = (id) => {
    try {
      axios.delete(`/footer/${id}`);
      getdata();
    } catch (error) {
      console.log(error);
    }
  };

  console.log(app);

  const handlesearch = (event) => {
    const getSearch = event.target.value;
    setQuery(getSearch);
    if (getSearch.length > 0) {
      const searchdata = app.filter((item) =>
        item.name.toLowerCase().includes(getSearch)
      );
      setApp(searchdata);
    } else {
      setApp(filter);
    }

    setQuery(getSearch);
  };

  return (
    <div className="lg:ml-52">
      {showdelete && (
        <Modal
          handleDelete={() => handleDelete()}
          setShowDelete={() => {
            setShowDelete(false);
          }}
        />
      )}

      <div className=" mt-24">
        <input
          type="text"
          name="name"
          value={query}
          className=" border-2 border-black rounded-xl sm:h-8 w-32   sm:w-56 pl-3 pr-3 "
          onChange={(e) => handlesearch(e)}
          placeholder="search here"
        />
      </div>

      <Link to={"/footer"}>
        <div className="  top-20 lg:right-10 right-4 absolute mt-4">
          <button className="lg:h-10 h-7 w-24 bg-red-700 text-white lg:text-lg font-semibold  rounded-xl ">
            Add New
          </button>
        </div>
      </Link>

      {app && <Table data={app} columns={columns} />}

      {/* <div className=" text-xl ">
            <button onClick={handleEdit}></button>
    
            <button onClick={handleDelete(Course._id)}></button>
          </div> */}
    </div>
  );
}

export default FooterTable;
