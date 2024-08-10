// // import React, { Fragment, useEffect, useState } from "react";
// // import axios from "../../../Hoc/Axios";

// // import { useParams } from "react-router-dom";

// // function HeroDetails() {
// //   const [Show, setShow] = useState("CategoryInfo");
// //   // const [category, setCategory] = useState([]);
// //   const [hero, setHero] = useState([]);

// //   const params = useParams();
// //   const getdata = (id) => {
// //     try {
// //       axios
// //         .get(`/banner/${type}/${id}`)
// //         .then((res) => {
// //           console.log(res);
// //           setHero([res.data.result]);
// //         })
// //         .catch((error) => {
// //           console.log(error);
// //         });
// //     } catch (error) {
// //       console.log(error);
// //     }
// //   };

// //   useEffect(() => {
// //     if (params && params.id) {
// //       getdata(params.id);
// //     }
// //   }, [params]);

// //   return (
// //     <div className="  h-full lg:ml-52  pb-10 mt-20  flex flex-col ">
// //       <div className="  bg-white shadow-2xl border border-tale-100 mt-1  prifont font-semibold  lg:mx-4  py-2 hover:bg-zinc-50 item-center  h-10 rounded-xl text-center ">
// //         {" "}
// //         HeroSection Information
// //       </div>

// //       <div className=" ">
// //         <div className="flex flex-col ">
// //           <div className="lg:mx-4 mt-3 lg:shadow-2xl shadow-lg  border border-tale-100   ">
// //             {hero?.map((val, i) => {
// //               console.log(val);
// //               let image = `${import.meta.env.VITE_API_URL}/public/${val.image}`;

// //               return (
// //                 <div className=" my-12  flex flex-col    ">
// //                   <div className=" ml-8 ">
// //                     <img
// //                       src={image}
// //                       alt="/"
// //                       className="h-48  w-48 border border-black"
// //                     />
// //                   </div>

// //                   <div className="mx-1 ml-8 mt-8  ">
// //                     <div>
// //                       <div className="  text-purple-700 text-lg sefont font-semibold ">
// //                       Title
// //                       </div>
// //                       <div className=" text-xs sm:text-base  trifont capitalize  ">
// //                         {val.title}
// //                       </div>
// //                     </div>

// //                     <div>
// //                       <div className="  text-purple-700 text-lg sefont font-semibold ">
// //                       Subtitle
// //                       </div>
// //                       <div className=" text-xs sm:text-base  trifont capitalize  ">
// //                         {val.subtitle}
// //                       </div>
// //                     </div>
// //                   </div>

// //                   <div className="mx-1 ml-8 mt-5  ">
// //                     <div className="   ">
// //                       <div className="  text-purple-700 text-lg sefont font-semibold ">
// //                       Description
// //                       </div>
// //                       <div className=" text-xs sm:text-base  trifont capitalize  ">
// //                         {val.description}
// //                       </div>
// //                     </div>
// //                   </div>

// //                 </div>
// //               );
// //             })}
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }

// // export default HeroDetails;
// import React, { useEffect, useState } from "react";
// import axios from "../../../Hoc/Axios";
// import { useParams } from "react-router-dom";

// function HeroDetails() {
//   const [hero, setHero] = useState([]);
//   const params = useParams();

//   const getdata = (type, id) => {
//     try {
//       axios
//         .get(`/banner/${type}/${id}`)
//         .then((res) => {
//           console.log(res);
//           setHero([res.data.result]); // Assuming the result is an object
//         })
//         .catch((error) => {
//           console.log(error);
//         });
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   useEffect(() => {
//     if (params && params.id && params.type) {
//       getdata(params.type, params.id);
//     }
//   }, [params]);

//   return (
//     <div className="h-full lg:ml-52 pb-10 mt-20 flex flex-col">
//       <div className="bg-white shadow-2xl border border-tale-100 mt-1 prifont font-semibold lg:mx-4 py-2 hover:bg-zinc-50 item-center h-10 rounded-xl text-center">
//         HeroSection Information
//       </div>

//       <div className="">
//         <div className="flex flex-col">
//           <div className="lg:mx-4 mt-3 lg:shadow-2xl shadow-lg border border-tale-100">
//             {hero?.map((val, i) => {
//               console.log(val);
//               let image = `${import.meta.env.VITE_API_URL}/public/${val.image}`;

//               return (
//                 <div key={i} className="my-12 flex flex-col">
//                   <div className="ml-8">
//                     <img
//                       src={image}
//                       alt="banner"
//                       className="h-48 w-48 border border-black"
//                     />
//                   </div>

//                   <div className="mx-1 ml-8 mt-8">
//                     <div>
//                       <div className="text-purple-700 text-lg sefont font-semibold">
//                         Title
//                       </div>
//                       <div className="text-xs sm:text-base trifont capitalize">
//                         {val.title}
//                       </div>
//                     </div>

//                     <div>
//                       <div className="text-purple-700 text-lg sefont font-semibold">
//                         Subtitle
//                       </div>
//                       <div className="text-xs sm:text-base trifont capitalize">
//                         {val.subtitle}
//                       </div>
//                     </div>
//                   </div>

//                   <div className="mx-1 ml-8 mt-5">
//                     <div>
//                       <div className="text-purple-700 text-lg sefont font-semibold">
//                         Description
//                       </div>
//                       <div className="text-xs sm:text-base trifont capitalize">
//                         {val.description}
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               );
//             })}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default HeroDetails;
import React, { useEffect, useState } from "react";
import axios from "../../../Hoc/Axios";
import { useParams } from "react-router-dom";

function HeroDetails() {
  const [hero, setHero] = useState([]);
  const params = useParams();

  const getdata = (type, id) => {
    try {
      axios
        .get(`/banner/${type}/${id}`)
        .then((res) => {
          console.log(res);
          setHero([res.data.result]); // Assuming the result is an object
        })
        .catch((error) => {
          console.error(error);
        });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (params && params.id && params.type) {
      getdata(params.type, params.id);
    }
  }, [params]);

  return (
    <div className="h-full lg:ml-52 pb-10 mt-20 flex flex-col">
      <div className="bg-white shadow-2xl border border-tale-100 mt-1 prifont font-semibold lg:mx-4 py-2 hover:bg-zinc-50 item-center h-10 rounded-xl text-center">
        HeroSection Information
      </div>

      <div>
        <div className="flex flex-col">
          <div className="lg:mx-4 mt-3 lg:shadow-2xl shadow-lg border border-tale-100">
            {hero?.map((val, i) => {
              let image = `${import.meta.env.VITE_API_URL}/public/${val.image}`;

              return (
                <div key={i} className="my-12 flex flex-col">
                  <div className="ml-8">
                    <img
                      src={image}
                      alt="banner"
                      className="h-48 w-48 border border-black"
                    />
                  </div>

                  <div className="mx-1 ml-8 mt-8">
                    <div>
                      <div className="text-purple-700 text-lg sefont font-semibold">
                        Title
                      </div>
                      <div className="text-xs sm:text-base trifont capitalize">
                        {val.title}
                      </div>
                    </div>

                    <div>
                      <div className="text-purple-700 text-lg sefont font-semibold">
                        Subtitle
                      </div>
                      <div className="text-xs sm:text-base trifont capitalize">
                        {val.subtitle}
                      </div>
                    </div>
                  </div>

                  <div className="mx-1 ml-8 mt-5">
                    <div>
                      <div className="text-purple-700 text-lg sefont font-semibold">
                        Description
                      </div>
                      <div className="text-xs sm:text-base trifont capitalize">
                        {val.description}
                      </div>
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

export default HeroDetails;
