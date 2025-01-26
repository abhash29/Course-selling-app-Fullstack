import '../Styles/AddCourse.css'

import {BASE_URL} from '../../../config';
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import axios from 'axios'
import { useNavigate } from "react-router";
import { useState } from "react";

function AddCourse() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async () => {
  try {
    await axios.post(
      `${BASE_URL}/admin/course`,
      {
        title: title,
        description: description,
        price: price,
      },
      {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      }
    );
    navigate('/courses');
  } catch (error) {
    console.error("Error adding course:", error);
  }
};


  return (
    <div className="addCourse">
      <h2>Add a New Course</h2>
      <div>
        <TextField
          fullWidth
          label="Title"
          variant="outlined"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={{margin: '10px'}}
        />
        <TextField
          fullWidth
          label="Description"
          variant="outlined"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
           style={{margin: '10px'}}
        />
        <TextField
          fullWidth
          label="Price"
          variant="outlined"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
           style={{margin: '10px'}}
        />
      </div>
      <Button
        variant="contained"
        color="primary"
        onClick={handleSubmit}
        style={{margin: '10px'}}
      >
        Submit
      </Button>
      <Button
        variant="contained"
        color="primary"
        onClick={() => {
          navigate('/courses')
        }}
      >
        Courses
      </Button>
    </div>
  );
}

export default AddCourse;
