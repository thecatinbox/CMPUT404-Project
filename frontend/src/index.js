import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home/Home";
import Inbox from "./Pages/Inbox/Inbox";
import Friends from "./Pages/Friends/Friends";
import Profile from "./Pages/Profile/Profile";
import SignIn from "./Pages/SignUpSignIn/SignIn";
import SignUp from "./Pages/SignUpSignIn/SignUp";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="signin" element={<SignIn />} />
        <Route path="signup" element={<SignUp />} />
        <Route index element={<Home />} />
        <Route path="inbox" element={<Inbox />} />
        <Route path="friends" element={<Friends />} />
        <Route path="profile" element={<Profile />} />
      </Routes>
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);