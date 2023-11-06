import { useEffect, useState } from "react";
import "./App.css";
import Login from "./components/Login";
import Register from "./components/Register";
import { Route, Routes, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Home from "./components/Home";
import ChatContext from "../ChatContext";

function App() {
  const [user, setUser] = useState(null);

  const navigator = useNavigate();

  const login = (email, password) => {
    fetch("http://localhost:8000/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success == false) {
          toast.error(data.message);
        } else {
          // Store the User in state
          setUser(data);
          //Store the user in localstorage
          localStorage.getItem("chatuser", JSON.stringify(data));
          //redirect to home page
          navigator("/home");
        }
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };

  const signup = (name, email, password) => {
    fetch("http://localhost:8000/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success == false) {
          toast.error(data.message);
        } else {
          toast.success(data.message);
          navigator("/");
        }
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };

  const logout = () => {
    setUser(null);
    localStorage.clear("chatuser");
    navigator("/");
  };

  // check if user is Loggedin already then redirect them to home page
  useEffect(() => {
    if (localStorage.getItem("chatuser")) {
      setUser(JSON.parse(localStorage.getItem("chatuser")));
      navigator("/home");
    }
  }, []);

  const [searchResults, setSearchResults] = useState([]);
  const searchFriends = (query) => {
    fetch(`http://localhost:8000/friends/search-friend`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: user.token,
      },
      body: JSON.stringify({ query }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success == false) {
          //store all the users in state
          setSearchResults(data.users);
        }
      })
      .catch((err) => toast.error(err.message));
  };
  console.log(user);
  return (
    <div>
      <ChatContext.Provider
        value={{ login, signup, logout, user, searchFriends, searchResults }}
      >
        <ToastContainer />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/home" element={<Home />} />
        </Routes>
      </ChatContext.Provider>
    </div>
  );
}

export default App;
