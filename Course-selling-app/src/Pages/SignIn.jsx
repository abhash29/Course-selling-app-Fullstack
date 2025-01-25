//import "./Signup.css";

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useState } from "react";

function Signup() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  return (
    <div className="signup">
      <div>
        <span>Welcome Back!</span>
        <span>Let's get you Login</span>
      </div>
      <div>
        <TextField id="outlined-basic" label="email" variant="outlined" onChange={(e) => setUsername(e.target.value)} />
        <br />
        <TextField id="outlined-basic" label="password" variant="outlined" onChange={(e) => setPassword(e.target.value)} />
        <br />
        <Button variant="contained" onClick={() => {
          fetch('http://localhost:3000/admin/login', {
            method: "POST",
            body: JSON.stringify({
              username,
              password
            }),
            headers: {
              "Content-type": "application/json"
            }
          })
          .then(res => res.json())
          .then(data => {
            console.log(data);
          })
        }}>Login</Button>
      </div>
    </div>
  );
}
export default Signup;
