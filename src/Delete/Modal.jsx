import React, { useState } from "react";

function Modal({ handleDelete, setShowDelete }) {
  const handleYesClick = () => {
    handleDelete();
    setShowDelete(false);
  };

  return (
    <div className="fixed inset-0 z-20 backdrop-blur-sm bg-opacity-30">
      <div className="h-52 w-96 bg-gray-50 shadow-2xl border border-gray-100 m-auto mt-32 rounded-xl">
        <div className="text-xl font-bold text-black text-center py-10">
          Are you sure you want to delete?
        </div>

        <div className="text-white gap-6 flex justify-center text-xl">
          <button
            onClick={handleYesClick}
            className="h-12 w-20 bg-green-600 rounded-3xl"
          >
            Yes
          </button>

          <button
            onClick={() => setShowDelete(false)}
            className="h-12 w-20 bg-red-600 rounded-3xl"
          >
            No
          </button>
        </div>
      </div>
    </div>
  );
}

export default Modal;
;
