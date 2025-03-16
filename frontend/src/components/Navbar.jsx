import { useState,createContext,useEffect, useContext } from "react";
import axios from "axios";
import { DataContext } from "./Data";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

export default function Navbar({ updateIsAdmin }) {
  const { setCoupons } = useContext(DataContext);
  const [input, updateInput] = useState({ username: "", password: "" });

  function handleInput(e) {
    updateInput((p) => ({ ...p, [e.target.name]: e.target.value }));
  }
  async function handleLogin() {
    if (input.password === "" || input.username === "") {
      alert("Input Credentials");
      return;
    }
    try {
      const response = await axios.post(`${backendUrl}/api/admin`, {
        username: input.username,
        password: input.password,
      });
      if (response.data.success) {
        updateIsAdmin(true);
        setCoupons(response.data);
      }
    } catch (err) {
      alert("Invalid Credentials, Try again");
      updateInput({ username: "", password: "" });
    }
  }
  return (
    <nav className="bg-gray-800/50 backdrop-blur-sm w-full z-50">
      <div className="flex justify-between h-16 px-4">
        <div className="flex items-center">
          <p className="text-xl font-bold ">Claim Your Coupons</p>
        </div>
        <div className="flex items-center h-16">
          <div className="flex flex-col w-35 mr-2">
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={input.username.trim()}
              onChange={handleInput}
              required
              className="px-2 h-6 bg-amber-50/25 rounded-md mb-1"
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={input.password.trim()}
              onChange={handleInput}
              required
              className="px-2 h-6 bg-amber-50/25 rounded-md"
            />
          </div>
          <button
            onClick={handleLogin}
            className="bg-blue-500 h-12 sm:h-8 rounded-md px-2 text-white hover:bg-blue-600 cursor-pointer"
          >
            Admin Login
          </button>
        </div>
      </div>
    </nav>
  );
}
