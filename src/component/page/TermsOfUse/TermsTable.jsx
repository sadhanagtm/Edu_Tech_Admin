import React, { useState, useEffect } from "react";
import Table from "../../page component/Table";
import axios from "../../../Hoc/Axios";

import { MdDelete } from "react-icons/md";
import { MdModeEdit } from "react-icons/md";
import { Link } from "react-router-dom";

function TermsTable () {
  const columns = [
    { name: "Privacy Policy", sortable: true, selector: (row) => row.privacyPolicy },
    { name: "Pricing Policy", sortable: true, selector: (row) => row.pricingPolicy },
    { name: "Instructor Terms", sortable: true, selector: (row) => row.instructorTerms },
    { name: "Terms OfUse", sortable: true, selector: (row) => row.termsOfUse },
    { name: "Launch Services", sortable: true, selector: (row) => row.launchServices },
    { name: "Affiliate Terms Conditions", sortable: true, selector: (row) => row.affiliateTermsConditions },
    { name: "Business Terms Conditions", sortable: true, selector: (row) => row.businessTermConditions },
    { name: "Business Privacy Statement", sortable: true, selector: (row) => row.businessPrivacyStatement },
    { name: "Master Service Agreement", sortable: true, selector: (row) => row.masterServicesAgreement },
    
    {
      name: "Action",
      cell: (row) => (
        <div className="gap-4 flex items-center justify-center text-xl ">
          <Link to={"/editterms"} state={{
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
      axios
        .get(`/terms`)
        .then((res) => {
          console.log(res);
          setTerms([...res.data.result]);
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
      axios.delete(`/terms/${id}`);
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
    <div className="lg:ml-52">
      <div className=" mt-24">
      <input
          type="text"
          name="name"
          autoComplete="off"
          value={query}
          className=" border-2 border-black rounded-xl h-8 pl-3 pr-3 "
          onChange={(e) => handlesearch(e)}
          placeholder="search here"
        />
      </div>

      <Link to={"/terms"}>
        <div className="  top-20 lg:right-10  right-4 absolute mt-4">
          <button className="lg:h-10 w-24 h-7 bg-red-700 text-white lg:text-lg font-semibold  rounded-xl  ">
            Add New
          </button>
        </div>
      </Link>

      {terms && <Table data={terms} columns={columns} />}

      
   
    </div>
  );
}

export default TermsTable;
