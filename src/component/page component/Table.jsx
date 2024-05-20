import React, { useState } from "react";
import DataTable from "react-data-table-component";
function Table({ data, columns }) {

  
console.log(data)
  return (

    
    <div className="container mt-5 w-full ">
      
      <DataTable
        columns={columns}
        data={data}
        fixedHeader
        selectableRows
        pagination
    
    
      ></DataTable>
    </div>
  );
}

export default Table;
