import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";

import TextField from "@mui/material/TextField";

function OneCourse(props) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const navigate = useNavigate();
  let { courseId } = useParams();

  const [courses, setCourses] = useState([]);
  useEffect(() => {
    fetch("http://localhost:3000/admin/courses", {
      method: "GET",
      body: JSON.stringify({
        title: title,
        description: description,
        price: price
      }),
      headers: {
        "Content-type": "application/json",
        "Authorization": "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setCourses(data.courses);
        console.log(data);
      })
      .catch((err) => {
        console.error("Error fetching courses:", err);
      });
  }, []);

  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          border: "1px solid #ddd",
          borderRadius: "8px",
          padding: "16px",
          margin: "16px",
          width: "300px",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        }}
      >
        <div
          style={{
            marginBottom: "16px",
          }}
        >
          <TextField 
            id="outlined-basic" 
            label="Title" 
            variant="outlined" 
            value={title} 
            onChange={(e) => setTitle(e.target.value)} 
            style={{ marginBottom: "8px", width: "100%" }}
          />
          <TextField 
            id="outlined-basic" 
            label="Description" 
            variant="outlined" 
            value={description} 
            onChange={(e) => setDescription(e.target.value)} 
            style={{ marginBottom: "8px", width: "100%" }}
          />
          <TextField 
            id="outlined-basic" 
            label="Price" 
            variant="outlined" 
            value={price} 
            onChange={(e) => setPrice(e.target.value)} 
            style={{ marginBottom: "8px", width: "100%" }}
          />
        </div>
        <button
          style={{
            padding: "10px 16px",
            backgroundColor: "#007BFF",
            color: "#fff",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
          onClick={() => {
            fetch(`http://localhost:3000/admin/courses/${courseId}`, {
              method: "PUT",
              headers: {
                "Content-type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("token"),
              },
              body: JSON.stringify({ title, description, price }),
            })
              .then((res) => res.json())
              .then((data) => {
                console.log("Course updated:", data);
                navigate("/courses");
              })
              .catch((err) => {
                console.error("Error updating course:", err);
              });
          }}
        >
          Update Course
        </button>
      </div>
    </>
  );
}

export default OneCourse;