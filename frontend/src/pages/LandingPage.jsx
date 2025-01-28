import React from "react";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600">
      <div className="text-center space-y-8">
        <h1 className="text-4xl md:text-6xl font-extrabold text-white">
          Welcome!!
        </h1>
        <p className="text-lg md:text-xl text-gray-200">
          Please login or register to get started.
        </p>
        <div className="flex justify-center gap-6">
          <button
            onClick={() => navigate("/login")}
            className="px-6 py-3 bg-white text-blue-600 font-semibold rounded-lg shadow-lg hover:shadow-xl hover:bg-blue-200 transition duration-300 cursor-pointer"
          >
            Login
          </button>
          <button
            onClick={() => navigate("/register")}
            className="px-6 py-3 bg-white text-purple-600 font-semibold rounded-lg shadow-lg hover:shadow-xl hover:bg-purple-200 transition duration-300 cursor-pointer"
          >
            Register
          </button>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
