// import React, { useState, useEffect } from "react";
// import Table from "../../page component/Table";
// import axios from "../../../Hoc/Axios";

// import { MdDelete } from "react-icons/md";
// import { MdModeEdit } from "react-icons/md";
// import { Link } from "react-router-dom";
// import Modal from "../../../Delete/Modal";

// function VisionTable() {
//   const [showdelete, setShowDelete] = useState(false);
//   const [deleteid, setdeleteid] = useState(null);
//   const [vision, setVision] = useState([]);


//   const columns = [
//     {
//       name: "title",
//       sortable: true,

//       cell: (row) => {
//         console.log(row);
//         return (
//           <div className="">
//             <Link to={`/mission/${row.id}`}>{row.title}</Link>
//           </div>
//         );
//       },

//       selector: (row) => row.title,
//     },

//     { name: "Icon",sortable: true,selector: (row) => row.icon, },

//     { name: "Description", sortable: true, selector: (row) => row.description },

//     {
//       name: "Action",
//       cell: (row) => (
//         <div className="gap-4 flex items-center justify-center text-xl ">
//           <Link
//             to={"/editvision"}
//             state={{
//               id: row.id,
//             }}
//           >
//             <button className="  " id={row.id}>
//               <MdModeEdit />
//             </button>
//           </Link>

//           <button
//             className=" "
//             onClick={() => {
//               setShowDelete(true);
//               setdeleteid(row.id);
//             }}
//             // onClick={() => handleDelete(row.id)}
//             id={row.id}
//           >
//             <MdDelete />
//           </button>
//         </div>
//       ),
//       selector: (row) => row.action,
//     },
//   ];

//   const [filter, setFilter] = useState([]);
//   const [query, setQuery] = useState("");

//   const getdata = (id) => {
//     try {
//       axios
//         .get(`/vision`)
//         .then((res) => {
//           console.log(res);
//           setVision([...res.data.result]);
//           setFilter([...res.data.result]);
//         })
//         .catch((error) => {
//           console.log(error);
//         });
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   useEffect(() => {
//     getdata();
//   }, []);

//   const data = [];

//   const handleEdit = () => {};

//   const handleDelete = (id) => {
//     try {
//       axios.delete(`/vision/${id}`);
//       getdata();
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   console.log(vision);

//   const handlesearch = (event) => {
//     const getSearch = event.target.value;
//     setQuery(getSearch);
//     if (getSearch.length > 0) {
//       const searchdata = vision.filter((item) =>
//         item.name.toLowerCase().includes(getSearch)
//       );
//       setVision(searchdata);
//     } else {
//       setVision(filter);
//     }

//     setQuery(getSearch);
//   };

//   return (
//     <div className="lg:ml-52 -ml-3">
//       {showdelete && (
//         <Modal
//           handleDelete={() => handleDelete()}
//           setShowDelete={() => {
//             setShowDelete(false);
//           }}
//         />
//       )}

//       <div className=" mt-24">
//         <input
//           type="text"
//           name="name"
//           value={query}
//           className=" border-2 border-black rounded-xl sm:h-8 w-32   sm:w-56 pl-3 pr-3 "
//           onChange={(e) => handlesearch(e)}
//           placeholder="search here"
//         />
//       </div>

//       <Link to={"/vision"}>
//         <div className="  top-20 lg:right-10 right-4 absolute mt-4">
//           <button className="lg:h-10 h-7 w-24 bg-red-700 text-white lg:text-lg font-semibold  rounded-xl ">
//             Add New
//           </button>
//         </div>
//       </Link>

//       {vision && <Table data={vision} columns={columns} />}

//     </div>
//   );
// }

// export default VisionTable;
import React, { useState, useEffect } from "react";
import Table from "../../page component/Table";
import axios from "../../../Hoc/Axios";
import { MdDelete, MdModeEdit } from "react-icons/md";
import { Link } from "react-router-dom";
import Modal from "../../../Delete/Modal";

function VisionTable() {
  const [showDelete, setShowDelete] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [vision, setVision] = useState([]);
  const [filter, setFilter] = useState([]);
  const [query, setQuery] = useState("");

  const columns = [
    {
      name: "Title",
      sortable: true,
      cell: (row) => (
        <div>
          <Link to={`/mission/${row.id}`}>{row.title}</Link>
        </div>
      ),
      selector: (row) => row.title,
    },
    { name: "Icon", sortable: true, selector: (row) => row.icon },
    { name: "Description", sortable: true, selector: (row) => row.description },
    {
      name: "Action",
      cell: (row) => (
        <div className="gap-4 flex items-center justify-center text-xl">
          <Link to={"/editvision"} state={{ id: row.id }}>
            <button id={row.id}>
              <MdModeEdit />
            </button>
          </Link>
          <button
            onClick={() => {
              setShowDelete(true);
              setDeleteId(row.id);
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

  const getData = () => {
    try {
      axios
        .get(`/mission`)
        .then((res) => {
          setVision(res.data.result);
          setFilter(res.data.result);
        })
        .catch((error) => {
          console.error(error);
        });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const handleDelete = (id) => {
    try {
      axios.delete(`/mission/${id}`);
      getData();
    } catch (error) {
      console.error(error);
    }
  };

  const handleSearch = (event) => {
    const getSearch = event.target.value;
    setQuery(getSearch);
    if (getSearch.length > 0) {
      const searchData = vision.filter((item) =>
        item.title.toLowerCase().includes(getSearch.toLowerCase())
      );
      setVision(searchData);
    } else {
      setVision(filter);
    }
    setQuery(getSearch);
  };

  return (
    <div className="lg:ml-52 -ml-3">
      {showDelete && (
        <Modal
          handleDelete={() => handleDelete(deleteId)}
          setShowDelete={() => setShowDelete(false)}
        />
      )}
      <div className="mt-24">
        <input
          type="text"
          name="name"
          value={query}
          className="border-2 border-black rounded-xl sm:h-8 w-32 sm:w-56 pl-3 pr-3"
          onChange={(e) => handleSearch(e)}
          placeholder="Search here"
        />
      </div>
      <Link to={"/vision"}>
        <div className="top-20 lg:right-10 right-4 absolute mt-4">
          <button className="lg:h-10 h-7 w-24 bg-red-700 text-white lg:text-lg font-semibold rounded-xl">
            Add New
          </button>
        </div>
      </Link>
      {vision.length > 0 && <Table data={vision} columns={columns} />}
    </div>
  );
}

export default VisionTable;

