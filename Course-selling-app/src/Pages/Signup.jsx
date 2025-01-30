import '../Styles/Signup.css'

import { BASE_URL } from '../../../config';
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import {useSetRecoilState} from "recoil";
import { useState } from 'react';
import {userState} from "../../store/atoms/user";

function Signup() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  //Recoil
  const setUser = useSetRecoilState(userState);
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
        const response = await axios.post(`${BASE_URL}/admin/signup`, {
          username: username,
          password: password
    })
   let data = response.data;
   localStorage.setItem("token", data.token);
   setUsername(username)
   navigate('/courses')
}}
>
  Admin Signup
</Button>

      </div>
    </div>
  );
}
export default Signup;
