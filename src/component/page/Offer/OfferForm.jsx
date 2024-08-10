import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

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

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get("/course");
        setCourses(response.data.result || []);
      } catch (err) {
        console.error("Error fetching courses:", err);
        setError("Failed to fetch courses");
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  const handleCourseChange = (event) => {
    const { value } = event.target;
    setSelectedCourses(value); // Store selected courses in state
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSuccess(false);

    try {
      await axios.post("/package", {
        name,
        content,
        course: selectedCourses, // Send selected courses as an array
      });
      setSuccess(true);
      setName("");
      setContent("");
      setSelectedCourses([]);
    } catch (error) {
      console.error("Error submitting form:", error);
      setError("Failed to submit form");
    }
  };

  if (loading) return <CircularProgress />;
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <div className="h-full mt-20  ml-52 ">
      <form onSubmit={handleSubmit} style={{ margin: "10px", padding: "20px" }}>
        <Typography variant="h4" gutterBottom className="text-sm">
          <div className="text-2xl font-bold  text-purple-700 lg:mb-6 mb-3 font">
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
                renderValue={(selected) => selected.join(", ")}
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
        </div>{" "}
      </form>
    </div>
  );
};

export default OfferForm;
