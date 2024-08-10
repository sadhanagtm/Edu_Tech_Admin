import React, { useState, useEffect } from "react";
import Table from "../../page component/Table";
import axios from "../../../Hoc/Axios";

import { MdDelete } from "react-icons/md";
import { MdModeEdit } from "react-icons/md";
import { Link } from "react-router-dom";
import Modal from "../../../Delete/Modal";

function Category() {
  const [showdelete, setShowDelete] = useState(false);
  const [deleteid, setdeleteid] = useState(null);

  const columns = [
    {
      name: "Name",
      sortable: true,

      cell: (row) => {
        console.log(row);
        return (
          <div>
            <Link to={`/category/${row.id}`}>{row.name}</Link>
          </div>
        );
      },

      selector: (row) => row.name,
    },

    {
      name: "Image",
      sortable: true,
      cell: (row) => {
        let image = `${import.meta.env.VITE_API_URL}/public/${row.image}`;

        return (
          <div className="h-8 w-8">
            <img src={image} />
          </div>
        );
      },

      selector: (row) => row.image,
    },

    {
      name: "Action",
      cell: (row) => (
        <div className="gap-4 flex items-center justify-center text-xl ">
          <Link
            to={"/Editcategory"}
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

  const getdata = (id) => {
    try {
      axios
        .get(`/category`)
        .then((res) => {
          console.log(res);
          setapp([...res.data.newArr]);
          setFilter([...res.data.newArr]);
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
      axios.delete(`/category/${deleteid}`);
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

      <div className=" mt-24 ">
        <input
          type="text"
          name="name"
          autoComplete="off"
          value={query}
          className=" border-2 border-black rounded-xl sm:h-8  w-32 sm:w-56 pl-3 pr-3 "
          onChange={(e) => handlesearch(e)}
          placeholder="search here"
        />
      </div>

      <Link to={"/Addcategory"}>
        <div className="  top-20 lg:right-10 right-4 absolute mt-4">
          <button className="lg:h-10 h-7 w-24 bg-red-700 text-white lg:text-lg font-semibold  rounded-xl ">
            Add New
          </button>
        </div>
      </Link>

      {App && <Table data={App} columns={columns} />}

      {/* <div className=" text-xl ">
        <button onClick={handleEdit}></button>
        <button onClick={handleDelete}></button>
      </div> */}
    </div>
  );
}

export default Category;
