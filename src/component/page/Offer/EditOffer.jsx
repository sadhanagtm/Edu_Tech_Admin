

// // import React, { useState, useEffect } from "react";
// // import { Link, useLocation } from "react-router-dom";
// // import axios from "../../../Hoc/Axios";
// // import {
// //   TextField,
// //   Button,
// //   CircularProgress,
// //   Grid,
// //   Typography,
// //   Select,
// //   MenuItem,
// //   InputLabel,
// //   FormControl,
// // } from "@mui/material";

// // const OfferForm = () => {
// //   const [name, setName] = useState("");
// //   const [content, setContent] = useState("");
// //   const [selectedCourses, setSelectedCourses] = useState([]);
// //   const [courses, setCourses] = useState([]);
// //   const [loading, setLoading] = useState(true);
// //   const [error, setError] = useState("");
// //   const [success, setSuccess] = useState(false);

// //   const location = useLocation();
// //   const packageId = location.state?.id; // Extract package ID from location state

// //   useEffect(() => {
// //     const fetchCourses = async () => {
// //       try {
// //         const response = await axios.get("/course");
// //         setCourses(response.data.result || []);
// //       } catch (err) {
// //         console.error("Error fetching courses:", err);
// //         setError("Failed to fetch courses");
// //       }
// //     };

// //     fetchCourses();
// //   }, []);

// //   useEffect(() => {
// //     const fetchPackageData = async () => {
// //       if (packageId) {
// //         try {
// //           const response = await axios.get(`/package/${packageId}`);
// //           const packageData = response.data.result[0];
// //           setName(packageData.name || "");
// //           setContent(packageData.content || "");
// //           setSelectedCourses(packageData.course || []);
// //         } catch (err) {
// //           console.error("Error fetching package data:", err);
// //           setError("Failed to fetch package data");
// //         } finally {
// //           setLoading(false);
// //         }
// //       }
// //     };

// //     fetchPackageData();
// //   }, [packageId]);

// //   const handleCourseChange = (event) => {
// //     const { value } = event.target;
// //     setSelectedCourses(value); // Store selected courses in state
// //   };

// //   const handleSubmit = async (event) => {
// //     event.preventDefault();
// //     setSuccess(false);

// //     try {
// //       await axios.patch(`/package/${packageId}`, {
// //         name,
// //         content,
// //         course: selectedCourses, // Send selected courses as an array of IDs
// //       });
// //       setSuccess(true);
// //       setName("");
// //       setContent("");
// //       setSelectedCourses([]);
// //     } catch (error) {
// //       console.error("Error submitting form:", error);
// //       setError("Failed to submit form");
// //     }
// //   };

// //   if (loading) return <CircularProgress />;
// //   if (error) return <Typography color="error">{error}</Typography>;

// //   return (
// //     <div className="h-full mt-20 ml-52">
// //       <form onSubmit={handleSubmit} style={{ margin: "10px", padding: "20px" }}>
// //         <Typography variant="h4" gutterBottom className="text-sm">
// //           <div className="text-2xl font-bold text-purple-700 lg:mb-6 mb-3 font">
// //             OfferForm
// //           </div>
// //         </Typography>

// //         <Link to="/offertable">
// //           <div className="top-20 lg:right-8 right-9 absolute">
// //             <button className="lg:h-10 h-7 w-20 bg-red-700 text-white lg:text-lg font-semibold rounded-xl">
// //               View
// //             </button>
// //           </div>
// //         </Link>

// //         <Grid container spacing={2}>
// //           <Grid item xs={12}>
// //             <TextField
// //               fullWidth
// //               label="Name"
// //               variant="outlined"
// //               value={name}
// //               onChange={(e) => setName(e.target.value)}
// //               required
// //             />
// //           </Grid>
// //           <Grid item xs={12}>
// //             <TextField
// //               fullWidth
// //               label="Content"
// //               variant="outlined"
// //               multiline
// //               rows={4}
// //               value={content}
// //               onChange={(e) => setContent(e.target.value)}
// //               required
// //             />
// //           </Grid>
// //           <Grid item xs={12}>
// //             <FormControl fullWidth variant="outlined">
// //               <InputLabel id="courses-label" className="mb-5">
// //                 Courses
// //               </InputLabel>
// //               <Select
// //                 labelId="courses-label"
// //                 multiple
// //                 value={selectedCourses}
// //                 onChange={handleCourseChange}
// //                 renderValue={(selected) => selected.join(", ")}
// //                 required
// //               >
// //                 {courses.map((course) => (
// //                   <MenuItem key={course.id} value={course.id}>
// //                     {course.name}
// //                   </MenuItem>
// //                 ))}
// //               </Select>
// //             </FormControl>
// //           </Grid>
// //           <Grid item xs={12}>
// //             <Button variant="contained" color="primary" type="submit">
// //               Submit
// //             </Button>
// //           </Grid>
// //         </Grid>
// //         <div className="pt-8 text-green-400">
// //           {success && (
// //             <Typography color="primary">
// //               Form submitted successfully!
// //             </Typography>
// //           )}
// //         </div>
// //       </form>
// //     </div>
// //   );
// // };

// // export default OfferForm;


// // import React, { useState, useEffect } from "react";
// // import { Link, useLocation } from "react-router-dom";
// // import axios from "../../../Hoc/Axios";
// // import {
// //   TextField,
// //   Button,
// //   CircularProgress,
// //   Grid,
// //   Typography,
// //   Select,
// //   MenuItem,
// //   InputLabel,
// //   FormControl,
// // } from "@mui/material";

// // const OfferForm = () => {
// //   const [name, setName] = useState("");
// //   const [content, setContent] = useState("");
// //   const [selectedCourses, setSelectedCourses] = useState([]);
// //   const [courses, setCourses] = useState([]);
// //   const [loading, setLoading] = useState(true);
// //   const [error, setError] = useState("");
// //   const [success, setSuccess] = useState(false);

// //   const location = useLocation();
// //   const packageId = location.state?.id; // Extract package ID from location state

// //   useEffect(() => {
// //     const fetchCourses = async () => {
// //       try {
// //         const response = await axios.get("/course");
// //         setCourses(response.data.result || []);
// //       } catch (err) {
// //         console.error("Error fetching courses:", err);
// //         setError("Failed to fetch courses");
// //       }
// //     };

// //     fetchCourses();
// //   }, []);

// //   useEffect(() => {
// //     const fetchPackageData = async () => {
// //       if (packageId) {
// //         try {
// //           const response = await axios.get(`/package/${packageId}`);
// //           const packageData = response.data.result[0];
// //           setName(packageData.name || "");
// //           setContent(packageData.content || "");
// //           setSelectedCourses(packageData.course || []);
// //         } catch (err) {
// //           console.error("Error fetching package data:", err);
// //           setError("Failed to fetch package data");
// //         } finally {
// //           setLoading(false);
// //         }
// //       }
// //     };

// //     fetchPackageData();
// //   }, [packageId]);

// //   const handleCourseChange = (event) => {
// //     const { value } = event.target;
// //     setSelectedCourses(value); // Store selected courses in state
// //   };

// //   const handleSubmit = async (event) => {
// //     event.preventDefault();
// //     setSuccess(false);

// //     try {
// //       await axios.patch(`/package/${packageId}`, {
// //         name,
// //         content,
// //         course: selectedCourses, // Send selected courses as an array of IDs
// //       });
// //       setSuccess(true);
// //       setName("");
// //       setContent("");
// //       setSelectedCourses([]);
// //     } catch (error) {
// //       console.error("Error submitting form:", error);
// //       setError("Failed to submit form");
// //     }
// //   };

// //   if (loading) return <CircularProgress />;
// //   if (error) return <Typography color="error">{error}</Typography>;

// //   // Helper function to get course name by ID
// //   const getCourseNameById = (id) => {
// //     const course = courses.find((course) => course.id === id);
// //     return course ? course.name : "";
// //   };

// //   return (
// //     <div className="h-full mt-20 ml-52">
// //       <form onSubmit={handleSubmit} style={{ margin: "10px", padding: "20px" }}>
// //         <Typography variant="h4" gutterBottom className="text-sm">
// //           <div className="text-2xl font-bold text-purple-700 lg:mb-6 mb-3 font">
// //             OfferForm
// //           </div>
// //         </Typography>

// //         <Link to="/offertable">
// //           <div className="top-20 lg:right-8 right-9 absolute">
// //             <button className="lg:h-10 h-7 w-20 bg-red-700 text-white lg:text-lg font-semibold rounded-xl">
// //               View
// //             </button>
// //           </div>
// //         </Link>

// //         <Grid container spacing={2}>
// //           <Grid item xs={12}>
// //             <TextField
// //               fullWidth
// //               label="Name"
// //               variant="outlined"
// //               value={name}
// //               onChange={(e) => setName(e.target.value)}
// //               required
// //             />
// //           </Grid>
// //           <Grid item xs={12}>
// //             <TextField
// //               fullWidth
// //               label="Content"
// //               variant="outlined"
// //               multiline
// //               rows={4}
// //               value={content}
// //               onChange={(e) => setContent(e.target.value)}
// //               required
// //             />
// //           </Grid>
// //           <Grid item xs={12}>
// //             <FormControl fullWidth variant="outlined">
// //               <InputLabel id="courses-label" className="mb-5">
// //                 Courses
// //               </InputLabel>
// //               <Select
// //                 labelId="courses-label"
// //                 multiple
// //                 value={selectedCourses}
// //                 onChange={handleCourseChange}
// //                 renderValue={(selected) => selected.map(getCourseNameById).join(", ")}
// //                 required
// //               >
// //                 {courses.map((course) => (
// //                   <MenuItem key={course.id} value={course.id}>
// //                     {course.name}
// //                   </MenuItem>
// //                 ))}
// //               </Select>
// //             </FormControl>
// //           </Grid>
// //           <Grid item xs={12}>
// //             <Button variant="contained" color="primary" type="submit">
// //               Submit
// //             </Button>
// //           </Grid>
// //         </Grid>
// //         <div className="pt-8 text-green-400">
// //           {success && (
// //             <Typography color="primary">
// //               Form submitted successfully!
// //             </Typography>
// //           )}
// //         </div>
// //       </form>
// //     </div>
// //   );
// // };

// // export default OfferForm;


// import React, { useState, useEffect } from "react";
// import { Link, useLocation } from "react-router-dom";
// import axios from "../../../Hoc/Axios";
// import {
//   TextField,
//   Button,
//   CircularProgress,
//   Grid,
//   Typography,
//   Select,
//   MenuItem,
//   InputLabel,
//   FormControl,
// } from "@mui/material";

// const OfferForm = () => {
//   const [name, setName] = useState("");
//   const [content, setContent] = useState("");
//   const [selectedCourses, setSelectedCourses] = useState([]);
//   const [courses, setCourses] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [success, setSuccess] = useState(false);

//   const location = useLocation();
//   const packageId = location.state?.id; // Extract package ID from location state

//   // Fetch courses for the dropdown
//   useEffect(() => {
//     const fetchCourses = async () => {
//       try {
//         const response = await axios.get("/course");
//         setCourses(response.data.result || []);
//       } catch (err) {
//         console.error("Error fetching courses:", err);
//         setError("Failed to fetch courses");
//       }
//     };

//     fetchCourses();
//   }, []);

//   // Fetch package data for editing
//   useEffect(() => {
//     const fetchPackageData = async () => {
//       if (packageId) {
//         try {
//           const response = await axios.get(`/package/${packageId}`);
//           const packageData = response.data.result[0];
//           setName(packageData.name || "");
//           setContent(packageData.content || "");
//           setSelectedCourses(packageData.course || []);
//         } catch (err) {
//           console.error("Error fetching package data:", err);
//           setError("Failed to fetch package data");
//         } finally {
//           setLoading(false);
//         }
//       }
//     };

//     fetchPackageData();
//   }, [packageId]);

//   const handleCourseChange = (event) => {
//     const { value } = event.target;
//     setSelectedCourses(value); // Store selected courses IDs in state
//   };

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     setSuccess(false);

//     try {
//       console.log("Submitting Data:", {
//         name,
//         content,
//         course: selectedCourses, // Send selected course IDs
//       });

//       const response = await axios.patch(`/package/${packageId}`, {
//         name,
//         content,
//         course: selectedCourses, // Ensure this is an array of IDs
//       });

//       console.log("Response:", response);
//       setSuccess(true);
//       setName("");
//       setContent("");
//       setSelectedCourses([]);
//     } catch (error) {
//       console.error("Error submitting form:", error.response || error.message);
//       setError("Failed to submit form");
//     }
//   };

//   if (loading) return <CircularProgress />;
//   if (error) return <Typography color="error">{error}</Typography>;

//   // Helper function to get course name by ID
//   const getCourseNameById = (id) => {
//     const course = courses.find((course) => course.id === id);
//     return course ? course.name : "";
//   };

//   return (
//     <div className="h-full mt-20 ml-52">
//       <form onSubmit={handleSubmit} style={{ margin: "10px", padding: "20px" }}>
//         <Typography variant="h4" gutterBottom className="text-sm">
//           <div className="text-2xl font-bold text-purple-700 lg:mb-6 mb-3 font">
//             OfferForm
//           </div>
//         </Typography>

//         <Link to="/offertable">
//           <div className="top-20 lg:right-8 right-9 absolute">
//             <button className="lg:h-10 h-7 w-20 bg-red-700 text-white lg:text-lg font-semibold rounded-xl">
//               View
//             </button>
//           </div>
//         </Link>

//         <Grid container spacing={2}>
//           <Grid item xs={12}>
//             <TextField
//               fullWidth
//               label="Name"
//               variant="outlined"
//               value={name}
//               onChange={(e) => setName(e.target.value)}
//               required
//             />
//           </Grid>
//           <Grid item xs={12}>
//             <TextField
//               fullWidth
//               label="Content"
//               variant="outlined"
//               multiline
//               rows={4}
//               value={content}
//               onChange={(e) => setContent(e.target.value)}
//               required
//             />
//           </Grid>
//           <Grid item xs={12}>
//             <FormControl fullWidth variant="outlined">
//               <InputLabel id="courses-label" className="mb-5">
//                 Courses
//               </InputLabel>
//               <Select
//                 labelId="courses-label"
//                 multiple
//                 value={selectedCourses}
//                 onChange={handleCourseChange}
//                 renderValue={(selected) => selected.map(getCourseNameById).join(", ")}
//                 required
//               >
//                 {courses.map((course) => (
//                   <MenuItem key={course.id} value={course.id}>
//                     {course.name}
//                   </MenuItem>
//                 ))}
//               </Select>
//             </FormControl>
//           </Grid>
//           <Grid item xs={12}>
//             <Button variant="contained" color="primary" type="submit">
//               Submit
//             </Button>
//           </Grid>
//         </Grid>
//         <div className="pt-8 text-green-400">
//           {success && (
//             <Typography color="primary">
//               Form submitted successfully!
//             </Typography>
//           )}
//         </div>
//       </form>
//     </div>
//   );
// };

// export default OfferForm;



import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "../../../Hoc/Axios";
import {
  TextField,
  Button,
  CircularProgress,
  Grid,
  Typography,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@mui/material";

const OfferForm = () => {
  const [name, setName] = useState("");
  const [content, setContent] = useState("");
  const [selectedCourses, setSelectedCourses] = useState([]);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const location = useLocation();
  const packageId = location.state?.id;

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get("/course");
        setCourses(response.data.result || []);
      } catch (err) {
        console.error("Error fetching courses:", err);
        setError("Failed to fetch courses");
      }
    };

    fetchCourses();
  }, []);

  useEffect(() => {
    const fetchPackageData = async () => {
      if (packageId) {
        try {
          const response = await axios.get(`/package/${packageId}`);
          const packageData = response.data.result[0];
          console.log("Fetched Package Data:", packageData);
          setName(packageData.name || "");
          setContent(packageData.content || "");
          setSelectedCourses(packageData.course.map(c => c.id) || []); // Ensure IDs are used
        } catch (err) {
          console.error("Error fetching package data:", err);
          setError("Failed to fetch package data");
        } finally {
          setLoading(false);
        }
      }
    };

    fetchPackageData();
  }, [packageId]);

  const handleCourseChange = (event) => {
    const { value } = event.target;
    setSelectedCourses(value); // Store selected courses IDs in state
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSuccess(false);

    try {
      await axios.patch(`/package/${packageId}`, {
        name,
        content,
        course: selectedCourses, // Ensure this is an array of IDs
      });

      setSuccess(true);
      setName("");
      setContent("");
      setSelectedCourses([]);
    } catch (error) {
      console.error("Error submitting form:", error.response || error.message);
      setError("Failed to submit form");
    }
  };

  if (loading) return <CircularProgress />;
  if (error) return <Typography color="error">{error}</Typography>;

  const getCourseNameById = (id) => {
    const course = courses.find((course) => course.id === id);
    return course ? course.name : "";
  };

  return (
    <div className="h-full mt-20 ml-52">
      <form onSubmit={handleSubmit} style={{ margin: "10px", padding: "20px" }}>
        <Typography variant="h4" gutterBottom className="text-sm">
          <div className="text-2xl font-bold text-purple-700 lg:mb-6 mb-3 font">
            OfferForm
          </div>
        </Typography>

        <Link to="/offertable">
          <div className="top-20 lg:right-8 right-9 absolute">
            <button className="lg:h-10 h-7 w-20 bg-red-700 text-white lg:text-lg font-semibold rounded-xl">
              View
            </button>
          </div>
        </Link>

        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Name"
              variant="outlined"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Content"
              variant="outlined"
              multiline
              rows={4}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth variant="outlined">
              <InputLabel id="courses-label" className="mb-5">
                Courses
              </InputLabel>
              <Select
                labelId="courses-label"
                multiple
                value={selectedCourses}
                onChange={handleCourseChange}
                renderValue={(selected) => selected.map(getCourseNameById).join(", ")}
                required
              >
                {courses.map((course) => (
                  <MenuItem key={course.id} value={course.id}>
                    {course.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" color="primary" type="submit">
              Submit
            </Button>
          </Grid>
        </Grid>
        <div className="pt-8 text-green-400">
          {success && (
            <Typography color="primary">
              Form submitted successfully!
            </Typography>
          )}
        </div>
      </form>
    </div>
  );
};

export default OfferForm;
