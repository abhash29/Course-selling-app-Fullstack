import '../Styles/Signup.css'

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import axios from 'axios'
import { useState } from 'react';

;

function Signup() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  return (
    <div className="signup">
      <div className='text'>
        <span>Welcome Back!</span>
        <span>Let's get you signUp</span>
      </div>
      <div className='input'>
        <TextField  label="username" variant="outlined" onChange={(e) => setUsername(e.target.value)} style={{margin: '10px'}}/>
        <br />
        <TextField  label="password" variant="outlined" onChange={(e) => setPassword(e.target.value)} style={{margin: '10px'}}/>
        <br />
        <Button 
  variant="contained" 
  onClick={async () => {
    const response = await axios.post("http://localhost:3000/admin/signup", {
      username: username,
      password: password
    })
   console.log(response.data);
   const data = (await response).data;
   localStorage.setItem("token", data.token);
    window.location = '/courses' 
}}
>
  Admin Signup
</Button>

      </div>
    </div>
  );
}
export default Signup;
