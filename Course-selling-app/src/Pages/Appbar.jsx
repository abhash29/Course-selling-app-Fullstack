import "./Appbar.css"; // Import the external CSS file

import { useEffect, useState } from "react";

import Button from "@mui/material/Button";
import { useNavigate } from "react-router";

function Appbar() {
  const navigate = useNavigate();
  const [userEmail, setUserEmail] = useState(null);

  useEffect(() => {
    fetch("http://localhost:3000/admin/me", {
      method: "GET",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.username) {
          setUserEmail(data.username);
        }
        console.log(data);
      })
      .catch((err) => {
        console.error("Error fetching user data:", err);
      });
  }, []);

  if (userEmail) {
    return (
      <div className="appbar">
        <div className="user-info">{`Welcome, ${userEmail}`}</div>
        <button
          className="logout-button"
          onClick={() => {
            localStorage.removeItem("token");
            setUserEmail(null);
            localStorage.setItem("token", null);
            navigate("/signIn");
          }}
        >
          Logout
        </button>
      </div>
    );
  } else {
    return (
      <div className="appbar">
        <div>My App</div>
        <div className="buttons">
          <Button
            variant="contained"
            onClick={() => {
              navigate("/signUp");
            }}
          >
            SignUp
          </Button>
          <Button
            variant="contained"
            color="success"
            onClick={() => {
              navigate("/signIn");
            }}
          >
            LogIn
          </Button>
        </div>
      </div>
    );
  }
}

export default Appbar;
