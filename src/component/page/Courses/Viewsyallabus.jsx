import React, { Fragment, useEffect, useState } from "react";
import axios from "../../../Hoc/Axios";

import {  useParams } from "react-router-dom";


function Viewsyllabus() {
 


  const [Show, setShow] = useState("SyllabusInfo");
  const [syllabus, setSyllabus] = useState([]);
  const params = useParams();
  const getdata = (id) => {
    try {
      axios
        .get(`/syllabus/${id}`)
        .then((res) => {
          console.log(res);
          setSyllabus([res.data.result]);
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (params && params.id) {
      getdata(params.id);
    }
  }, [params]);

  

  return (
    
     
        <div className="  h-full lg:ml-52  pb-10 mt-20  flex flex-col ">
         
           
          
          <div className="  bg-white shadow-2xl border border-red-100 mt-1  prifont font-semibold  lg:mx-4  py-2 hover:bg-zinc-50 item-center  h-10 rounded-xl text-center "> Syllabus Information</div> 
            
         
            <div className=" ">
              <div className="flex flex-col ">
                <div className="lg:mx-4 mt-3 lg:shadow-2xl shadow-lg  border border-red-100   ">
                  {syllabus?.map((val, i) => {
                    console.log(val);
                    let image = `${import.meta.env.VITE_API_URL}/public/${val.image}`;

                    return (
                      <div className=" my-12  flex flex-col    ">
                        <div className=" ml-8 ">
                          <img
                            src={image}
                            alt="/"
                            className="h-48  w-48 border border-black"
                             
                          />
                        </div>   

                        <div className="mx-1 ml-7 gap-5 grid grid-cols-2 mt-16  ">
                           
                          <div className="   ">
                            <div className="  text-purple-700 text-lg sefont font-semibold ">
                              Title
                            </div>
                            <div className=" text-xs sm:text-base  trifont capitalize  ">{val.title}</div>
                          </div>

                          <div className=" ">
                            <div className=" text-lg text-purple-700 sefont font-semibold ">
                              Subtitle
                              
                            </div>
                            <div className=" text-xs  sm:text-base  capitalize"> {val.subtitle}</div>
                          </div>
                          

                         
                          <div >
                            <div className=" text-lg font-semibold sefont text-purple-700">
                              Description
                            </div>
                            <div className=" text-xs sm:text-base capitalize"> {val.description}</div>
                          </div>

                          <div className=" ">
                            <div className=" text-lg font-semibold sefont text-purple-700">
                              Video
                            </div>
                            <div className=" text-xs sm:text-base capitalize"> {val.video}</div>
                          </div>
                         
                         

                          
                          

                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

            
           </div>
          
      </div>
      
    
  );
}

export default Viewsyllabus;