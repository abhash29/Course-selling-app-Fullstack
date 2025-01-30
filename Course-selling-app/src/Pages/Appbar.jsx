import "../Styles/Appbar.css"; // Import the external CSS file

import { useRecoilValue, useSetRecoilState } from "recoil";

import { BASE_URL } from "../../../config";
import Button from "@mui/material/Button";
import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import { userEmailState } from "../../store/selectors/userEmail.js";
import { userState } from "../../store/atoms/user.js";

function Appbar() {
  const navigate = useNavigate();
  const userEmail = useRecoilValue(userEmailState); // Read user email from Recoil selector
  const setUser = useSetRecoilState(userState); // Set user state

  useEffect(() => {
    axios
      .get(`${BASE_URL}/admin/me`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((res) => {
        const data = res.data;
        if (data.username) {
          setUser({ email: data.username, name: data.name }); // Store both email and name
          localStorage.setItem("userEmail", data.username); // Optional: Persist
          localStorage.setItem("userName", data.name); 
        }
      })
      .catch((err) => {
        console.error("Error fetching user data:", err);
      });
  }, [setUser]); // Ensure useEffect runs only when setUser changes

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("userName");
    setUser(null);
    navigate("/signIn");
  };

  return (
    <div className="appbar">
      {userEmail ? (
        <>
          <div className="user-info">{`Welcome, ${userEmail}`}</div>
          <button className="logout-button" onClick={handleLogout}>
            Logout
          </button>
        </>
      ) : (
        <>
          <div className="name">Course Selling App</div>
          <div className="buttons">
            <Button variant="contained" onClick={() => navigate("/signUp")}>
              Admin SignUp
            </Button>
            <Button variant="contained" color="success" onClick={() => navigate("/signIn")}>
              Admin Login
            </Button>
          </div>
        </>
      )}
    </div>
  );
}

export default Appbar;
