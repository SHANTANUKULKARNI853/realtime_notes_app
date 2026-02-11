import axios from "axios";
import { useState } from "react";

export default function Login({ setToken }) {
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");

  const login = async ()=>{
    const res = await axios.post(
      "realtimenotesapp-production.up.railway.app/auth/login",
      {email,password}
    );

    localStorage.setItem("token",res.data.token);
    setToken(res.data.token);
  };

  return (
    <div className="h-screen flex justify-center items-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow w-80">
        <h2 className="text-2xl mb-4 font-bold text-center">Login</h2>

        <input
          className="border p-2 w-full mb-3"
          placeholder="Email"
          onChange={e=>setEmail(e.target.value)}
        />

        <input
          className="border p-2 w-full mb-4"
          type="password"
          placeholder="Password"
          onChange={e=>setPassword(e.target.value)}
        />

        <button
          onClick={login}
          className="bg-blue-500 text-white w-full py-2 rounded"
        >
          Login
        </button>
      </div>
    </div>
  );
}
