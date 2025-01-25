import '../Styles/Course.css'

import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";

function Course() {
  const [courses, setCourses] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:3000/admin/courses", {
      method: "GET",
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
    <div className="courses">
      <div><button style={{
                padding: "10px 16px",
                backgroundColor: "#007BFF",
                color: "#fff",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
                margin: "10px"
              }} onClick={() => {
        navigate('/AddCourse')
      }}>Add Courses</button></div>
      <h1>Course Details</h1>
      <div className='Card'>
      {courses.length > 0 ? (
        courses.map((data) => (
          <div key={data._id}>
            <div className="details">
              <span>Title: {data.title}</span>
              <span>Description: {data.description}</span>
              <span>Price: {data.price}</span>
              <img src="../rightImage.jpg" alt="" style={{height: "25vh"}}/>
            </div>
            <button
              onClick={() => {
                navigate(`/course/${data._id}`);
              }}
              style={{
                padding: "10px 16px",
                backgroundColor: "#007BFF",
                color: "#fff",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              Update Course
            </button>
            <button
  onClick={() => {
    const id = data._id;
    fetch(`http://localhost:3000/admin/course/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((res) => {
        if (res.ok) {
          console.log("Course deleted successfully");
          // Optionally refresh the course list after deletion
          setCourses(courses.filter((course) => course._id !== id));
        } else {
          console.error("Failed to delete course");
        }
      })
  }}
  style={{
    padding: "10px 16px",
    backgroundColor: "red",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  }}
>
  Delete Course
</button>

          </div>
        ))
      ) : (
        <div style={{ textAlign: "center", marginTop: "20px" }}>
          <h2>No courses available</h2>
        </div>
      )}
      </div>
      </div>
  );
}

export default Course;