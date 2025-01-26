import '../Styles/Signup.css'

import { BASE_URL } from '../../../config';
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import { useState } from "react";

function Signup() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  return (
    <div className="signup">
      <div className='text'>
        <span>Welcome Back!</span>
        <span>Let's get you Login</span>
      </div>
      <div className='input'>
        <TextField id="outlined-basic" label="email" variant="outlined" onChange={(e) => setUsername(e.target.value)} style={{margin: '10px'}} />
        <br />
        <TextField id="outlined-basic" label="password" variant="outlined" onChange={(e) => setPassword(e.target.value)} style={{margin: '10px'}} />
        <br />
        <Button variant="contained" onClick={() => {
          axios.post(`${BASE_URL}/admin/login`,
            {username, password},
            {
              headers: {
                "Content-Type": "application/json"
              }
            }
          )
          .then(res => console.log(res.data))
          navigate('/courses')
        }}>Login</Button>
      </div>
    </div>
  );
}
export default Signup;
