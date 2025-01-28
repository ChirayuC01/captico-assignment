import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({ email: "", password: "" }); // Track field errors
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        setMessage(""); // Clear the message after 3 seconds
      }, 3000);

      return () => clearTimeout(timer); // Cleanup timer if `message` changes
    }
  }, [message]);

  const validate = () => {
    const newErrors = {};
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)
    ) {
      newErrors.email = "Invalid email address";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters long";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Return true if no errors
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: "" }); // Clear the error for the current field
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return; // Validate before submitting

    setLoading(true);
    setMessage(""); // Clear previous messages
    try {
      const res = await API.post("/auth/login", formData);
      localStorage.setItem("token", res.data.token);
      setMessage("Login successful!");
      navigate("/courses");
    } catch (err) {
      setMessage(err.response?.data?.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-4">
          Login
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring ${
                errors.email
                  ? "border-red-500 focus:ring-red-300"
                  : "focus:ring-blue-300"
              }`}
            />
            {errors.email && (
              <p className="text-sm text-red-500 mt-1">{errors.email}</p>
            )}
          </div>
          <div>
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring ${
                errors.password
                  ? "border-red-500 focus:ring-red-300"
                  : "focus:ring-blue-300"
              }`}
            />
            {errors.password && (
              <p className="text-sm text-red-500 mt-1">{errors.password}</p>
            )}
          </div>
          {message && <p className="text-center text-red-500">{message}</p>}
          <button
            type="submit"
            className={`w-full px-4 py-2 font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors duration-300 cursor-pointer ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
          <div className="flex justify-center items-center">
            <p className="text-[15px]">
              Don't have an account?{" "}
              <span
                className="text-blue-600 hover:text-blue-700 hover:underline decoration-1 underline-offset-2 cursor-pointer transition-colors duration-300"
                onClick={() => navigate("/register")}
              >
                Click Here
              </span>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
