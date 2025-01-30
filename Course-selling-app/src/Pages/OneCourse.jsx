import '../Styles/UpdateCourse.css';

import {coursePrice, courseTitle} from "../../store/selectors/course";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"; // Fixed import
import {useRecoilState, useRecoilValue, useSetRecoilState} from "recoil";

import { BASE_URL } from '../../../config';
import TextField from "@mui/material/TextField";
import axios from 'axios';
import { courseState } from '../../store/atoms/course';

function OneCourse() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");

  const navigate = useNavigate();
  const { courseId } = useParams();

  const setCourse = useSetRecoilState(courseState);

  useEffect(() => {
    axios.get(`${BASE_URL}/admin/course/${courseId}`, {
      headers: {
        "Authorization": "Bearer " + localStorage.getItem("token"),
      },
    })
    .then((res) => {
      setTitle(res.data.title || ""); 
      setDescription(res.data.description || "");
      setPrice(res.data.price || "");
    })
    .catch((err) => {
      console.error("Error fetching course:", err);
    });
  }, [courseId]);

  const handleUpdate = () => {
    axios.put(`${BASE_URL}/admin/course/${courseId}`, 
      { title, description, price }, // Fixed payload
      {
        headers: {
          "Authorization": "Bearer " + localStorage.getItem("token"),
        },
      }
    )
    .then(() => {
      navigate("/courses");
    })
    .catch((err) => {
      console.error("Error updating course:", err);
    });
  };

  return (
    <div className="updateCourse">
      <div className='majburi'>
        <div className="inputs">
          <TextField 
            label="Title" 
            variant="outlined" 
            value={title} 
            onChange={(e) => setTitle(e.target.value)} 
            fullWidth
            style={{ marginBottom: "8px" }}
          />
          <TextField 
            label="Description" 
            variant="outlined" 
            value={description} 
            onChange={(e) => setDescription(e.target.value)} 
            fullWidth
            style={{ marginBottom: "8px" }}
          />
          <TextField 
            label="Price" 
            variant="outlined" 
            value={price} 
            onChange={(e) => setPrice(e.target.value)} 
            fullWidth
            style={{ marginBottom: "8px" }}
          />
          <button onClick={handleUpdate}>Update Course</button>
        </div>
      
        <div className='courseDetails'>
          <h2>Update this course</h2>
          <div className="details">
            <span><strong>Title:</strong> {title || "Loading..."}</span>
            <span><strong>Description:</strong> {description || "Loading..."}</span>
            <span><strong>Price:</strong> {price || "Loading..."}</span>
            <img src="../rightImage.jpg" alt="Course" style={{ height: "25vh" }} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default OneCourse;
