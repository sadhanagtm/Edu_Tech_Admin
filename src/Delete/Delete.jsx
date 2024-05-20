import React from "react";
import { Link } from "react-router-dom";

function Delete() {
  return (
    
    
    <div className="h-60 w-96 bg-gray-50 shadow-2xl border border-gray-100 m-auto mt-20 rounded-xl ">
      <div className="text-xl font-bold text-black text-center py-10 ">
        Are you sure you want to delete
      </div>

      <div className="text-white  gap-6 flex ml-24 text-xl">
       
      
        <button className="h-12 w-20 bg-green-600 rounded-3xl">Yes</button>
        <button className="h-12 w-20 bg-red-600 rounded-3xl">No</button>
        
       
      </div>
    </div>
    
  );
}

export default Delete;
