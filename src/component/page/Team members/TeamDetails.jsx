import React, {useEffect, useState } from "react";
import axios from "../../../Hoc/Axios";
import { useParams } from "react-router-dom";

function TeamDetails() {
  const [Show, setShow] = useState("CategoryInfo");
  const [hero, setHero] = useState([]);

  const params = useParams();
  const getdata = (id) => {
    try {
      axios
        .get(`/team/${id}`)

        .then((res) => {
          console.log(res);
          setHero([res.data.data]);
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
      <div className="  bg-white shadow-2xl border border-tale-100 mt-1  prifont font-semibold  lg:mx-4  py-2 hover:bg-zinc-50 item-center  h-10 rounded-xl text-center ">
        {" "}
        Team Member Information
      </div>

      <div className=" ">
        <div className="flex flex-col ">
          <div className="lg:mx-4 mt-3 lg:shadow-2xl shadow-lg  border border-tale-100   ">
            {hero?.map((val, i) => {
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
                    <div className="mx-1 ml-8 mt-8 grid sm:grid-cols-2 sm:gap-5 gap-3">
                    <div className="   ">
                      <div className="  text-purple-700 text-lg sefont font-semibold ">
                        Name
                      </div>
                      <div className=" text-xs sm:text-base  trifont capitalize  ">
                        {val.name}
                      </div>
                    </div>

                    <div>
                      <div className=" text-lg text-purple-700 font-semibold ">
                        Facebook
                      </div>
                      <div className=" text-xs sm:text-base  trifont capitalize  "> {val.facebook}</div>
                    </div>

                    <div>
                      <div className=" text-lg text-purple-700 font-semibold ">
                        Position
                      </div>
                      <div className=" text-xs sm:text-base  trifont capitalize  "> {val.position}</div>
                    </div>

                    <div>
                      <div className=" text-lg text-purple-700 font-semibold">
                      Instagram
                      </div>
                      <div className=" text-xs sm:text-base  trifont capitalize "> {val.instagram}</div>
                    </div>

                    
                    <div>
                      <div className=" text-lg text-purple-700 font-semibold">
                      Lindekin
                      </div>
                      <div className=" text-xs sm:text-base  trifont capitalize "> {val.lindekin}</div>
                    </div>

{/*                     
                    <div>
                      <div className=" text-lg text-purple-700 font-semibold">
                      Description
                      </div>
                      <div className=" text-xs sm:text-base  trifont capitalize "> {val.desc}</div>
                    </div> */}

                    {/* <div>
                      <div className=" text-lg text-purple-700 font-semibold">
                      Testimonial
                      </div>
                      <div className=" uppercatext-xs sm:text-base  trifont capitalize se"> {val.testo}</div>
                    </div> */}

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

export default TeamDetails;
