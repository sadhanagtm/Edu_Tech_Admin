import React, { useState, useEffect } from "react";
import Table from "../../page component/Table";
import axios from "../../../Hoc/Axios";

import { MdDelete } from "react-icons/md";
import { MdModeEdit } from "react-icons/md";
import { Link } from "react-router-dom";

function TermsTable () {
  const columns = [
    { name: "name", sortable: true, selector: (row) => row.name },
    { name: "Description", sortable: true, selector: (row) => row.description },
 
    {
      name: "Action",
      cell: (row) => (
        <div className="gap-4 flex items-center justify-center text-xl ">
          <Link to={"/edit"} state={{
            id:row.id
          }}>
            <button className="  " id={row.id}>
              <MdModeEdit />
            </button>
          </Link>

          <button
            className=" "
            onClick={() => handleDelete(row.id)}
            id={row.id}
          >
            <MdDelete />
          </button>
        </div>
      ),
      selector: (row) => row.action,
    },
  ];

  const [terms, setTerms] = useState([]);
  const [filter, setFilter] = useState([]);
  const [query, setQuery] = useState("");

  const getdata = (id) => {
    try {
      // axios
      //   .get(`/testimonial`)
      //   .then((res) => {
      //     console.log(res);
      //     setTerms([...res.data.result]);
      //     setFilter([...res.data.result]);
      //   })
      //   .catch((error) => {
      //     console.log(error);
      //   });
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
      axios.delete(`/testimonial/${id}`);
      getdata();
    } catch (error) {
      console.log(error);
    }
  };

  console.log(terms);

  const handlesearch = (event) => {
    const getSearch = event.target.value;
    setQuery(getSearch);
    if (getSearch.length > 0) {
      const searchdata = terms.filter((item) =>
        item.name.toLowerCase().includes(getSearch)
      );
      setTerms(searchdata);
    } else {
      setTerms(filter);
    }

    setQuery(getSearch);
  };

  return (
    <div className="lg:ml-60">
      <div className=" mt-20">
        <input
          type="text"
          name="name"
          value={query}
          className=" border-2 border-black  rounded"
          onChange={(e) => handlesearch(e)}
          placeholder="search here"
        />
      </div>

      <Link to={"/addterms"}>
        <div className="  top-20 lg:right-10 right-4 absolute">
          <button className="lg:h-10  w-24 bg-red-700 text-white text-lg font-semibold  rounded-md ">
            Add New
          </button>
        </div>
      </Link>

      {terms && <Table data={terms} columns={columns} />}

      
   
    </div>
  );
}

export default TermsTable;
