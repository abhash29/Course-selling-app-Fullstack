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

  const styles = {
    container: {
      fontFamily: "Arial, sans-serif",
      padding: "20px",
      border: "1px solid #ddd",
      borderRadius: "10px",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
      maxWidth: "400px",
      margin: "20px auto",
      textAlign: "center",
    },
    header: {
      color: "#333",
      fontSize: "24px",
      marginBottom: "10px",
    },
    details: {
      marginTop: "10px",
      textAlign: "left",
    },
    spanTitle: {
      fontWeight: "bold",
      fontSize: "18px",
      color: "#555",
      display: "block",
      marginBottom: "5px",
    },
    spanContent: {
      display: "block",
      marginBottom: "10px",
      color: "#777",
    },
  };

  return (
    <>
      <h1 style={styles.header}>Course Details</h1>
      {courses.length > 0 ? (
        courses.map((data) => (
          <div style={styles.container} key={data._id}>
            <div style={styles.details}>
              <span style={styles.spanTitle}>Title: {data.title}</span>
              <span style={styles.spanContent}>Description: {data.description}</span>
              <span style={styles.spanContent}>Price: {data.price}</span>
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
    </>
  );
}

export default Course;