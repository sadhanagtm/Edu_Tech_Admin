import React, { useState, useEffect } from "react";
import Table from "../../page component/Table";
import axiosinstance from "../../../Hoc/Axios";
import { MdDelete } from "react-icons/md";
import { MdModeEdit } from "react-icons/md";
import { Link } from "react-router-dom";
import Modal from "../../../Delete/Modal";

function Student() {
 
  
  const [showdelete, setShowDelete] = useState(false);
  const [deleteid, setdeleteid] = useState(null);

  const columns = [
    { name: "First Name", sortable: true,
    
    cell:(row) =>{
      console.log(row);
      return(
        <div>
          <Link to={`/student/${row.id}`}>{row.firstName}</Link>
        </div>
      )
    },

    selector: (row) => row.firstName,
   },
   
   { name: "Middle Name",sortable: true, selector: (row) => row.middleName },
   { name: "Last Name",sortable: true, selector: (row) => row.lastName },
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
    { name: "Email",sortable: true, selector: (row) => row.email },
    { name: "Address", sortable: true, selector: (row) => row.address },
    { name: "Phone", sortable: true, selector: (row) => row.phone },

    {
      name: "Action",
      cell: (row) => (
        <div className="gap-4 flex items-center justify-center text-xl ">
          <Link 
          to={"/editstudent"}
          state={{
            id: row.id,
          }}
          >
          
          <button className="  "  id={row.id}>
            <MdModeEdit />
          </button>
          </Link>

          <button
           className=" " 
           onClick={() => {
            setShowDelete (true)
            setdeleteid(row.id)
          }}
          //  onClick={() => handleDelete(row.id)}
            id={row.id}
            >
            <MdDelete />
          </button>
        </div>
      ),
      selector: (row) => row.action,
    },
  ];

  const [students, setStudents] = useState([]);
  const [filter, setFilter] = useState([]);
  const [query, setQuery] = useState("");

  const getdata = (id) => {
    try {
      axiosinstance
        .get(`/student`)
        .then((res) => {
          console.log(res);
          setStudents([...res.data.result]);
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

  const handleEdit = () => {
 
  };
  const handleDelete = (id) => {
  try{
    axiosinstance.delete(`/student/${deleteid}`);
    getdata();
  } catch (error){
    console.log(error)
  }
  };

  console.log(students);

  const handlesearch = (event) => {
    const getSearch = event.target.value;
    setQuery(getSearch);
    if (getSearch.length > 0) {
      const searchdata = students.filter((item) =>
        item.name.toLowerCase().includes(getSearch)
      );
      setStudents(searchdata);
    } else {
      setStudents(filter);
    }

    setQuery(getSearch);
  };


  return (
    <div className="lg:ml-52">
           {showdelete && <Modal handleDelete={()=>handleDelete()}  setShowDelete={()=>{
            setShowDelete(false)
          }} />}
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

      <Link to={"/addstudent"}>
        <div className=" top-20 lg:right-10  right-4 absolute mt-4">
          <button className="lg:h-10 w-24 h-7 bg-red-700 text-white lg:text-lg font-semibold  rounded-xl  ">
            Add New
          </button>
        </div>
      </Link>

      {students && <Table data={students} columns={columns} />}
    </div>
  );
}

export default Student;


