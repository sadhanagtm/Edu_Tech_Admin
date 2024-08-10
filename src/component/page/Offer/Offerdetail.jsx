// import React, { Fragment, useEffect, useState } from "react";
// import axios from "../../../Hoc/Axios";

// import { useParams } from "react-router-dom";

// function Offerdetail() {
//   const [Show, setShow] = useState("CategoryInfo");
//   // const [category, setCategory] = useState([]);
//   const [hero, setHero] = useState([]);

//   const params = useParams();
//   const getdata = (id) => {
//     try {
//       axios
//         .get(`/package/${id}`)
//         .then((res) => {
//           console.log(res);
//           setHero([res.data.result]);
//         })
//         .catch((error) => {
//           console.log(error);
//         });
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   useEffect(() => {
//     if (params && params.id) {
//       getdata(params.id);
//     }
//   }, [params]);

//   return (
//     <div className="  h-full lg:ml-52  pb-10 mt-20  flex flex-col ">
//       <div className="  bg-white shadow-2xl border border-tale-100 mt-1  prifont font-semibold  lg:mx-4  py-2 hover:bg-zinc-50 item-center  h-10 rounded-xl text-center ">
//         {" "}
//         HeroSection Information
//       </div>

//       <div className=" ">
//         <div className="flex flex-col ">
//           <div className="lg:mx-4 mt-3 lg:shadow-2xl shadow-lg  border border-tale-100   ">
//             {hero?.map((val, i) => {
//             //   console.log(val);
//             //   let image = `${import.meta.env.VITE_API_URL}/public/${val.image}`;

//               return (
//                 <div className=" my-12  flex flex-col    ">
//                   {/* <div className=" ml-8 ">
//                     <img
//                       src={image}
//                       alt="/"
//                       className="h-48  w-48 border border-black"
//                     />
//                   </div> */}

//                   <div className="mx-1 ml-8 mt-8  ">
//                     <div>
//                       <div className="  text-purple-700 text-lg sefont font-semibold ">
//                       Name
//                       </div>
//                       <div className=" text-xs sm:text-base  trifont capitalize  ">
//                         {val.name}
//                       </div>
//                     </div>

//                     <div>
//                       <div className="  text-purple-700 text-lg sefont font-semibold ">
//                       Course
//                       </div>
//                       <div className=" text-xs sm:text-base  trifont capitalize  ">
//                         {val.course}
//                       </div>
//                     </div>



//                     <div>
//                       <div className="  text-purple-700 text-lg sefont font-semibold ">
//                       Content
//                       </div>
//                       <div className=" text-xs sm:text-base  trifont capitalize  ">
//                         {val.content}
//                       </div>
//                     </div>
//                   </div>

                  
            


// {/* 
//                   <div className="mx-1 ml-8 mt-5  ">
//                     <div className="   ">
//                       <div className="  text-purple-700 text-lg sefont font-semibold ">
//                       Description
//                       </div>
//                       <div className=" text-xs sm:text-base  trifont capitalize  ">
//                         {val.description}
//                       </div>
//                     </div>
//                   </div> */}

//                 </div>
//               );
//             })}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Offerdetail;
import React, { useEffect, useState } from "react";
import axios from "../../../Hoc/Axios";
import { useParams } from "react-router-dom";

function Offerdetail() {
  const [show, setShow] = useState("CategoryInfo");
  const [hero, setHero] = useState(null);

  const params = useParams();

  const getdata = (id) => {
    axios
      .get(`/package/${id}`)
      .then((res) => {
        setHero(res.data.result[0]); // Assuming result is an array and we need the first item
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    if (params && params.id) {
      getdata(params.id);
    }
  }, [params]);

  return (
    <div className="h-full lg:ml-52 pb-10 mt-20 flex flex-col">
      <div className="bg-white shadow-2xl border border-tale-100 mt-1 prifont font-semibold lg:mx-4 py-2 hover:bg-zinc-50 item-center h-10 rounded-xl text-center">
        HeroSection Information
      </div>

      <div className="">
        <div className="flex flex-col">
          <div className="lg:mx-4 mt-3 lg:shadow-2xl shadow-lg border border-tale-100">
            {hero && (
              <div className="my-12 flex flex-col">
                <div className="mx-1 ml-8 mt-8">
                  <div>
                    <div className="text-purple-700 text-lg sefont font-semibold">
                      Name
                    </div>
                    <div className="text-xs sm:text-base trifont capitalize">
                      {hero.name}
                    </div>
                  </div>

                  <div>
                    <div className="text-purple-700 text-lg sefont font-semibold">
                      Content
                    </div>
                    <div className="text-xs sm:text-base trifont capitalize">
                      {hero.content}
                    </div>
                  </div>

                  <div>
                    <div className="text-purple-700 text-lg sefont font-semibold">
                      Courses
                    </div>
                    <div className="text-xs sm:text-base trifont capitalize">
                      {hero.course && hero.course.map((course, i) => (
                        <div key={i}>{course.name}</div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Offerdetail;
