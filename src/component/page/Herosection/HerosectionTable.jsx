// import React, { useState, useEffect } from "react";
// import Table from "../../page component/Table";
// import axios from "../../../Hoc/Axios";

// import { MdDelete } from "react-icons/md";
// import { MdModeEdit } from "react-icons/md";
// import { Link } from "react-router-dom";
// import Modal from "../../../Delete/Modal";

// function HerosectionTable() {
//   const [showdelete, setShowDelete] = useState(false);
//   const [deleteid, setdeleteid] = useState(null);

//   const columns = [
//     {
//       name: "title",
//       sortable: true,

//       cell: (row) => {
//         console.log(row);
//         return (
//           <div className="">
//             <Link to={`/banner/${row.id}`}>{row.title}</Link>
//           </div>
//         );
//       },

//       selector: (row) => row.title,
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
//     { name: "Subtitle", sortable: true, selector: (row) => row.subtitle },
//     { name: "Description", sortable: true, selector: (row) => row.description },

//     {
//       name: "Action",
//       cell: (row) => (
//         <div className="gap-4 flex items-center justify-center text-xl ">
//           <Link
//             to={"/edithero"}
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

//   const [hero, setHero] = useState([]);
//   const [filter, setFilter] = useState([]);
//   const [query, setQuery] = useState("");

//   const getdata = (id) => {
//     try {
//       axios
//         .get(`/banner`)
//         .then((res) => {
//           console.log(res);
//           setHero([...res.data.result]);
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
//       axios.delete(`/banner/${deleteid}`);
//       getdata();
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   console.log(hero);

//   const handlesearch = (event) => {
//     const getSearch = event.target.value;
//     setQuery(getSearch);
//     if (getSearch.length > 0) {
//       const searchdata = hero.filter((item) =>
//         item.name.toLowerCase().includes(getSearch)
//       );
//       setHero(searchdata);
//     } else {
//       setHero(filter);
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

//       <Link to={"/herosection"}>
//         <div className="  top-20 lg:right-10 right-4 absolute mt-4">
//           <button className="lg:h-10 h-7 w-24 bg-red-700 text-white lg:text-lg font-semibold  rounded-xl ">
//             Add New
//           </button>
//         </div>
//       </Link>

//       {hero && <Table data={hero} columns={columns} />}

//       {/* <div className=" text-xl ">
//             <button onClick={handleEdit}></button>
    
//             <button onClick={handleDelete(Course._id)}></button>
//           </div> */}
//     </div>
//   );
// }

// export default HerosectionTable;




import React, { useState, useEffect } from "react";
import Table from "../../page component/Table"; // Make sure to import your Table component
import axios from "../../../Hoc/Axios"; // Adjust the import according to your setup
import { Link } from "react-router-dom";


function HerosectionTable() {
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState([]);
  const [query, setQuery] = useState("");

  useEffect(() => {
    // Fetch all the data
    const fetchData = async () => {
      try {
        const response = await axios.get("/banner/all");
        const { banners, whyUsData, discoverData, welcomeData } = response.data;

        // Aggregate all data
        const allData = [
          ...banners,
          ...whyUsData,
          ...discoverData,
          ...welcomeData
        ];

        setData(allData);
        setFilter(allData);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const columns = [
    { name: "Title",  sortable: true,

            cell: (row) => {
        console.log(row);
        return (
          <div className="">
            <Link to={`/banner/${row.id}`}>{row.title}</Link>
          </div>
        );
      },
      
      
      selector: row => row.title },
    { name: "Subtitle", selector: row => row.subtitle || "N/A", sortable: true },
    { name: "Description", selector: row => row.description || "N/A", sortable: true },
    { name: "Image", cell: row => (
        row.image ? (
          <img
            src={`${import.meta.env.VITE_API_URL}/public/${row.image}`}
            alt={row.title}
            className="h-8 w-8 object-cover"
          />
        ) : "No Image"
      ), sortable: false
    },
    { name: "Page Location", selector: row => row.pagelocation, sortable: true }
  ];

  const handlesearch = (event) => {
    const getSearch = event.target.value;
    setQuery(getSearch);
    if (getSearch.length > 0) {
      const searchdata = filter.filter((item) =>
        item.title.toLowerCase().includes(getSearch.toLowerCase())
      );
      setData(searchdata);
    } else {
      setData(filter);
    }
  };

  return (
    <div className="lg:ml-52 -ml-3">
      <div className="mt-24">
        <input
          type="text"
          name="search"
          value={query}
          className="border-2 border-black rounded-xl sm:h-8 w-32 sm:w-56 pl-3 pr-3"
          onChange={handlesearch}
          placeholder="Search here"
        />
      </div>

      <div className="top-20 lg:right-10 right-4 absolute mt-4">
        <button className="lg:h-10 h-7 w-24 bg-red-700 text-white lg:text-lg font-semibold rounded-xl">
          Add New
        </button>
      </div>

      {data.length > 0 && <Table data={data} columns={columns} />}
    </div>
  );
}

export default HerosectionTable;
