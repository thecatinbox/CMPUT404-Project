import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./Pages/Home/Home";
import Inbox from "./Pages/Inbox/Inbox";
import Friends from "./Pages/Friends/Friends";
import Profile from "./Pages/Profile/Profile";
import SignIn from "./Pages/SignIn/SignIn";
import SignUp from "./Pages/SignUp/SignUp";
import Search from "./Pages/Search/Search";
import SinglePost from "./Pages/SinglePost/SinglePost";
import './index.css';

export default function App() {
  localStorage.setItem('url', "https://cmput404-project-data.herokuapp.com"); 

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/signin" />} />
        <Route path="signin" element={<SignIn />} />
        <Route path="signup" element={<SignUp />} />
        <Route path="home" element={<Home />} />
        <Route path="inbox" element={<Inbox />} />
        <Route path="friends" element={<Friends />} />
        <Route path="profile" element={<Profile />} />
        <Route path="search" element={<Search />} />
        <Route path="singlepost" element={<SinglePost />} />
      </Routes>
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);