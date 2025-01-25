import './App.css'

import { BrowserRouter, Route, Routes } from "react-router";

import AddCourse from './Pages/AddCourse';
import Appbar from "./Pages/Appbar";
import Course from "./Pages/Course";
import Home from './Pages/Home';
import OneCourse from './Pages/OneCourse';
import SignIn from "./Pages/SignIn";
import SignUp from './Pages/Signup';

function App() {
  return (
    <BrowserRouter>
      <Appbar />
      <div className="Content">
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path="/courses" element={<Course />} />
          <Route path="/course/:courseId" element={<OneCourse />} />
          <Route path="/addCourse" element={<AddCourse />} />
          <Route path="/signIn" element={<SignIn />} />
          <Route path="/signUp" element={<SignUp />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;