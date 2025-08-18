import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";

const Login = () => {
  const [emailId, setEmailId] = useState("Sourabhgautam447@gmail.com");
  const [password, setPassword] = useState("Sourabh11@");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      setLoading(true);
      setError("");
      const res = await axios.post(
        BASE_URL + "/login",
        { emailId, password },
        { withCredentials: true }
      );
      dispatch(addUser(res.data));
      navigate("/");
    } catch (err) {
      console.error(err);
      setError("Invalid email or password. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-900">
      <div className="card bg-base-200 w-96 shadow-2xl rounded-2xl">
        <div className="card-body">
          {/* Title */}
          <h2 className="card-title justify-center text-2xl font-bold text-white-500">
            Login
          </h2>

          {/* Error message */}
          {error && (
            <div className="alert alert-error text-sm my-2">
              {error}
            </div>
          )}

          {/* Email */}
          <label className="form-control w-full my-2">
            <span className="label-text font-medium">Email ID</span>
            <input
              type="email"
              value={emailId}
              className="input input-bordered w-full"
              onChange={(e) => setEmailId(e.target.value)}
              placeholder="Enter your email"
            />
          </label>

          {/* Password */}
          <label className="form-control w-full my-2">
            <span className="label-text font-medium">Password</span>
            <input
              type="password"
              value={password}
              className="input input-bordered w-full"
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
            />
          </label>

          {/* Login button */}
          <div className="card-actions justify-center mt-4">
            <button
              className="btn btn-primary w-full"
              onClick={handleLogin}
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </div>

          {/* Extra */}
          <p className="text-center text-sm text-gray-500 mt-3">
            Don’t have an account?{" "}
            <a href="/signup" className="text-white hover:underline">
              Sign up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
