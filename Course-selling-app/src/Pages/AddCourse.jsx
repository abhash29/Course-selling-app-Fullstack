import '../Styles/AddCourse.css'

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useNavigate } from "react-router";
import { useState } from "react";

function AddCourse() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const navigate = useNavigate();

  const handleSubmit = () => {
    fetch("http://localhost:3000/admin/course", {
      method: "POST",
      body: JSON.stringify({ title, description, price }),
      headers: {
        "Content-type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((res) => {
        navigate('/courses')
      })
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
