import React, { useState, useEffect } from "react";
import Table from "../../page component/Table";
import axios from "../../../Hoc/Axios";

import { MdDelete } from "react-icons/md";
import { MdModeEdit } from "react-icons/md";
import { Link } from "react-router-dom";

function TeamTable() {
  const columns = [
    {
      name: "Name",
      sortable: true,

      cell: (row) => {
        console.log(row);
        return (
          <div className="">
            <Link to={`/testimonial/${row.id}`}>{row.name}</Link>
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

    { name: "Position", sortable: true, selector: (row) => row.position },
    { name: "Facebook", sortable: true, selector: (row) => row.facebook },
    { name: "Twitter", sortable: true, selector: (row) => row.twitter },
    { name: "linkedin", sortable: true, selector: (row) => row.Linkedin },
    { name: "Testimonial", sortable: true, selector: (row) => row.testimonial },

    {
      name: "Action",
      cell: (row) => (
        <div className="gap-4 flex items-center justify-center text-xl ">
          <Link
            to={"/edit"}
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

  const [team, setTeam] = useState([]);
  const [filter, setFilter] = useState([]);
  const [query, setQuery] = useState("");

  const getdata = (id) => {
    try {
      //   axios
      //     .get(`/testimonial`)
      //     .then((res) => {
      //       console.log(res);
      //       setTestimonial([...res.data.result]);
      //       setFilter([...res.data.result]);
      //     })
      //     .catch((error) => {
      //       console.log(error);
      //     });
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

  console.log(team);

  const handlesearch = (event) => {
    const getSearch = event.target.value;
    setQuery(getSearch);
    if (getSearch.length > 0) {
      const searchdata = team.filter((item) =>
        item.name.toLowerCase().includes(getSearch)
      );
      setTeam(searchdata);
    } else {
      setTeam(filter);
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

      <Link to={"/Addteammember"}>
        <div className="  top-20 lg:right-10 right-4 absolute">
          <button className="lg:h-10 h-7 w-24 bg-red-700 text-white lg:text-lg font-semibold  rounded-md ">
            Add New
          </button>
        </div>
      </Link>

      {team && <Table data={team} columns={columns} />}

      {/* <div className=" text-xl ">
        <button onClick={handleEdit}></button>

        <button onClick={handleDelete(Course._id)}></button>
      </div> */}
    </div>
  );
}

export default TeamTable;
