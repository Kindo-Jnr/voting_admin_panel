import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import {
  BsPerson,
  BsLock,
  BsEye,
  BsEyeSlash
} from "react-icons/bs";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      if (username === "admin" && password === "123456") {
        toast.success("Login successful!");
        navigate("/admin");
      } else {
        toast.error("Invalid credentials");
      }
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 via-black/40 to-purple-500 transition-all duration-300">
      <form
        onSubmit={handleSubmit}
        className="bg-opacity-20 backdrop-blur-2xl border border-gray/20 shadow-xl hover:shadow-2xl hover:backdrop-blur-2xl hover:bg-opacity-20 
        transition-all duration-300 animate-fadeIn rounded-xl p-10 w-full max-w-lg space-y-5"
      >
        <h1 className="text-3xl font-bold text-center text-gray-800">
          Admin Login
        </h1>

        {/* Username */}
        <div className="flex items-center gap-2 border rounded-md px-3 py-2 bg-white text-3xl">
          <BsPerson className="text-black-400" />
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full bg-transparent outline-none text-2xl"
            required
          />
        </div>

        {/* Password */}
        <div className="flex items-center border rounded-md px-3 py-2 bg-white text-3xl">
          <BsLock className="text-black-400 mr-2" />
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-transparent outline-none text-2xl"
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="ml-2 text-gray-400 hover:text-gray-600 transition hover:cursor-pointer"
          >
            {showPassword ? <BsEyeSlash /> : <BsEye />}
          </button>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-gradient-to-tr from-gray-900 to-indigo-500 hover:bg-gray-900 hover:text-black cursor-pointer text-white py-2 rounded-md font-semibold flex items-center justify-center gap-2 transition"
        >
          {isLoading ? (
            <>
              <AiOutlineLoading3Quarters className="animate-spin" />
              Logging in...
            </>
          ) : (
            "Login"
          )}
        </button>
      </form>
    </div>
  );
}
