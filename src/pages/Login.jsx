import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";

const Login = () => {
  const [emailId, setEmailId] = useState("Sourabh@gmail.com");
  const [password, setPassword] = useState("Sourabh11@");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [isLoginForm, setIsLoginForm] = useState(true);
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/login",
        { emailId, password },
        { withCredentials: true }
      );
      dispatch(addUser(res.data));
      return navigate("/");
    } catch (err) {
      setError(err?.response?.data || "Something went wrong");
    }
  };

  const handleSignUp = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/signup",
        { firstName, lastName, emailId, password },
        { withCredentials: true }
      );
      dispatch(addUser(res.data.data));
      return navigate("/profile");
    } catch (err) {
      setError(err?.response?.data || "Something went wrong");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 p-4">
      {/* Login Box */}
      <div className="w-full max-w-md bg-black shadow-xl rounded-2xl p-8">
        <h2 className="text-2xl font-bold text-center text-white mb-6">
          {isLoginForm ? "Welcome Back 👋" : "Create Your Account ✨"}
        </h2>

        <div className="space-y-4">
          {!isLoginForm && (
            <>
              <div>
                <label className="block text-sm font-medium text-white mb-1">
                  First Name
                </label>
                <input
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="input input-bordered w-full rounded-xl bg-gray-800 text-white placeholder-gray-400 border-gray-600"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-white mb-1">
                  Last Name
                </label>
                <input
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="input input-bordered w-full rounded-xl bg-gray-800 text-white placeholder-gray-400 border-gray-600"
                />
              </div>
            </>
          )}

          <div>
            <label className="block text-sm font-medium text-white mb-1">
              Email
            </label>
            <input
              type="email"
              value={emailId}
              onChange={(e) => setEmailId(e.target.value)}
              className="input input-bordered w-full rounded-xl bg-gray-800 text-white placeholder-gray-400 border-gray-600"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-white mb-1">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input input-bordered w-full rounded-xl bg-gray-800 text-white placeholder-gray-400 border-gray-600"
            />
          </div>
        </div>

        {error && <p className="text-red-400 text-sm mt-3">{error}</p>}

        <button
          className="btn btn-primary w-full mt-6 rounded-xl"
          onClick={isLoginForm ? handleLogin : handleSignUp}
        >
          {isLoginForm ? "Login" : "Sign Up"}
        </button>

        <p
          className="text-sm text-center mt-5 text-gray-300 cursor-pointer hover:text-blue-400 transition"
          onClick={() => setIsLoginForm((value) => !value)}
        >
          {isLoginForm
            ? "New here? Create an account"
            : "Already have an account? Login"}
        </p>
      </div>
    </div>
  );
};

export default Login;
