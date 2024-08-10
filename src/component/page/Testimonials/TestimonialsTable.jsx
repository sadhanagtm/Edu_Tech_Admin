// import React, { useState, useEffect } from "react";
// import Table from "../../page component/Table";
// import axios from "../../../Hoc/Axios";

// import { MdDelete } from "react-icons/md";
// import { MdModeEdit } from "react-icons/md";
// import { Link } from "react-router-dom";
// import Modal from "../../../Delete/Modal";

// function TestimonialsTable() {
//   const [showdelete, setShowDelete] = useState(false);
//   const [deleteid, setdeleteid] = useState(null);

//   const columns = [
//     {
//       name: "Name",
//       sortable: true,

//       cell: (row) => {
//         console.log(row);
//         return (
//           <div className="">
//             <Link to={`/testomonial/${row.id}`}>{row.name}</Link>
//           </div>
//         );
//       },

//       selector: (row) => row.name,
//     },

//     {
//       name: "Image",
//       sortable: true,
//       cell: (row) => {
//         let image = `${import.meta.env.VITE_API_URL}/public/${row.image}`;
//         return (
//           <div className="h-8 w-8">
//             <img src={image} />
//           </div>
//         );
//       },

//       selector: (row) => row.image,
//     },

//     { name: "Description", sortable: true,   selector: (row) => row.desc },
//     { name: "Linkedin", sortable: true, selector: (row) => row.linkedin},
//     { name: "Instagram", sortable: true, selector: (row) => row.instagram},
//     { name: "Facebook", sortable: true, selector: (row) => row.facebook},

//     {
//       name: "Action",
//       cell: (row) => (
//         <div className="gap-4 flex items-center justify-center text-xl ">
//           <Link
//             to={"/edittestimonial"}
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

//   const [testimonial, setTestimonial] = useState([]);
//   const [filter, setFilter] = useState([]);
//   const [query, setQuery] = useState("");

//   const getdata = (id) => {
//     try {
//       axios
//         .get(`/testomonial`)
//         .then((res) => {
//           console.log(res);
//           setTestimonial([...res.data.result]);
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
//       axios.delete(`/testomonial/${id}`);
//       getdata();
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   console.log(testimonial);

//   const handlesearch = (event) => {
//     const getSearch = event.target.value;
//     setQuery(getSearch);
//     if (getSearch.length > 0) {
//       const searchdata = testimonial.filter((item) =>
//         item.name.toLowerCase().includes(getSearch)
//       );
//       setTestimonial(searchdata);
//     } else {
//       setTestimonial(filter);
//     }

//     setQuery(getSearch);
//   };

//   return (
//     <div className="lg:ml-52">
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

//       <Link to={"/testimonials"}>
//         <div className="  top-20 lg:right-10 right-4 absolute mt-4">
//           <button className="lg:h-10 h-7 w-24 bg-red-700 text-white lg:text-lg font-semibold  rounded-xl ">
//             Add New
//           </button>
//         </div>
//       </Link>

//       {testimonial && <Table data={testimonial} columns={columns} />}

//     </div>
//   );
// }

// export default TestimonialsTable;

import React, { useState, useEffect } from "react";
import Table from "../../page component/Table";
import axios from "../../../Hoc/Axios";
import { MdDelete, MdModeEdit } from "react-icons/md";
import { Link } from "react-router-dom";
import Modal from "../../../Delete/Modal";

function TestimonialsTable() {
  const [showDelete, setShowDelete] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const columns = [
    {
      name: "Name",
      sortable: true,
      cell: (row) => {
        return (
          <div className="">
            <Link to={`/testomonial/${row.id}`}>{row.name}</Link>
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
            <img src={image} alt="testimonial" />
          </div>
        );
      },
      selector: (row) => row.image,
    },
    { name: "Description", sortable: true, selector: (row) => row.desc },
    { name: "Linkedin", sortable: true, selector: (row) => row.linkedin },
    { name: "Instagram", sortable: true, selector: (row) => row.instagram },
    { name: "Facebook", sortable: true, selector: (row) => row.facebook },
    {
      name: "Action",
      cell: (row) => (
        <div className="gap-4 flex items-center justify-center text-xl">
          <Link
            to={"/edittestimonial"}
            state={{ id: row.id }}
          >
            <button className="" id={row.id}>
              <MdModeEdit />
            </button>
          </Link>
          <button
            className=""
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

  const [testimonial, setTestimonial] = useState([]);
  const [filter, setFilter] = useState([]);
  const [query, setQuery] = useState("");

  const getData = () => {
    axios
      .get(`/testomonial`)
      .then((res) => {
        setTestimonial([...res.data.result]);
        setFilter([...res.data.result]);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getData();
  }, []);

  const handleDelete = (id) => {
    axios
      .delete(`/testomonial/${id}`)
      .then(() => {
        setShowDelete(false);
        getData(); // Refresh data after deletion
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleSearch = (event) => {
    const getSearch = event.target.value;
    setQuery(getSearch);
    if (getSearch.length > 0) {
      const searchData = filter.filter((item) =>
        item.name.toLowerCase().includes(getSearch.toLowerCase())
      );
      setTestimonial(searchData);
    } else {
      setTestimonial(filter);
    }
  };

  return (
    <div className="lg:ml-52">
      {showDelete && (
        <Modal
          handleDelete={() => handleDelete(deleteId)}
          setShowDelete={() => {
            setShowDelete(false);
          }}
        />
      )}
      <div className="mt-24">
        <input
          type="text"
          name="name"
          value={query}
          className="border-2 border-black rounded-xl sm:h-8 w-32 sm:w-56 pl-3 pr-3"
          onChange={handleSearch}
          placeholder="search here"
        />
      </div>
      <Link to={"/testimonials"}>
        <div className="top-20 lg:right-10 right-4 absolute mt-4">
          <button className="lg:h-10 h-7 w-24 bg-red-700 text-white lg:text-lg font-semibold rounded-xl">
            Add New
          </button>
        </div>
      </Link>
      {testimonial && <Table data={testimonial} columns={columns} />}
    </div>
  );
}

export default TestimonialsTable;
