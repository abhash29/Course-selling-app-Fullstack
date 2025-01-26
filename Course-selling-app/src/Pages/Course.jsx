import '../Styles/Course.css'

import { useEffect, useState } from "react";

import { BASE_URL } from '../../../config';
import axios from "axios";
import { useNavigate } from "react-router";

function Course() {
  const [courses, setCourses] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`${BASE_URL}/admin/courses`, {
      headers: {
        "Authorization": "Bearer " + localStorage.getItem("token"),
      },
    })
    .then((res) => {
      setCourses(res.data.courses);
    })
    .catch((err) => {
      console.error("Error fetching courses:", err);
    });
  }, []);

  return (
    <div className="courses">
      <div>
        <button className="add-course-btn" onClick={() => navigate('/AddCourse')}>
          Add Courses
        </button>
      </div>
      <h1>Course Details</h1>
      <div className="Card">
        {courses.length > 0 ? (
          courses.map((data) => (
            <div key={data._id}>
              <div className="details">
                <span>Title: {data.title}</span>
                <span>Description: {data.description}</span>
                <span>Price: {data.price}</span>
                <img src="../rightImage.jpg" alt="" className="course-image"/>
              </div>
              <button className="update-course-btn" onClick={() => navigate(`/course/${data._id}`)}>
                Update Course
              </button>
              <button
                className="delete-course-btn"
                onClick={() => {
                  const id = data._id;
                  axios.delete(`${BASE_URL}/admin/course/${id}`, {
                    headers: {
                      "Content-Type": "application/json",
                      Authorization: "Bearer " + localStorage.getItem("token"),
                    },
                  })
                  .then(() => {
                    setCourses(courses.filter((course) => course._id !== id));
                    navigate('/courses')
                    console.log("Course deleted successfully");
                  })
                  .catch(() => {
                    console.error("Failed to delete course");
                  });
                }}
              >
                Delete Course
              </button>
            </div>
          ))
        ) : (
          <div className="no-courses">
            <h2>No courses available</h2>
          </div>
        )}
      </div>
    </div>
  );
}

export default Course;
