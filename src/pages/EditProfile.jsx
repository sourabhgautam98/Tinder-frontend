import { useState, useEffect } from "react";
import { Link } from "react-router";
import UserCard from "../components/UserCard";
import "../app.css";
import { BASE_URL } from "../utils/constants";
import axios from "axios";
import { addUser } from "../utils/userSlice";
import { useDispatch } from "react-redux";

const EditProfile = ({ user }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");
  const [age, setAge] = useState();
  const [gender, setGender] = useState("");
  const [skills, setSkills] = useState([]);
  const [error, setError] = useState("");
  const [message, setMessage] = useState(""); 
  const dispatch = useDispatch();

  const saveProfile = async () => {
    setError("");
    setMessage("");
    try {
      const res = await axios.patch(
        BASE_URL + "/profile/edit",
        { firstName, lastName, photoUrl, age, gender, skills },
        { withCredentials: true }
      );
      dispatch(addUser(res?.data?.data));
      setMessage("✅ Profile updated successfully!");
    } catch (err) {
      setError("❌ " + err.message);
    }
    // hide after 3s
    setTimeout(() => {
      setMessage("");
      setError("");
    }, 3000);
  };

  useEffect(() => {
    if (user) {
      setFirstName(user.firstName);
      setLastName(user.lastName);
      setPhotoUrl(user.photoUrl);
      setAge(user.age);
      setGender(user.gender);
      setSkills(user.skills);
    }
  }, [user]);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-900 p-4 sm:p-6 lg:p-10">
      <div className="flex flex-col md:flex-row gap-6 lg:gap-10 w-full max-w-6xl">
        
        {/* Edit Form */}
        <div className="card bg-base-200 w-full md:w-1/2 shadow-2xl rounded-2xl">
          <div className="card-body">
            <h2 className="card-title justify-center text-2xl font-bold text-white">
              Edit Profile
            </h2>

            <label className="form-control w-full my-2">
              <span className="label-text font-medium">First Name</span>
              <input
                type="text"
                value={firstName}
                className="input input-bordered w-full"
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="Enter the firstname"
              />
            </label>

            <label className="form-control w-full my-2">
              <span className="label-text font-medium">Last Name</span>
              <input
                type="text"
                value={lastName}
                className="input input-bordered w-full"
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Enter the last name"
              />
            </label>

            <label className="form-control w-full my-2">
              <span className="label-text font-medium">Photo URL</span>
              <input
                type="text"
                value={photoUrl}
                className="input input-bordered w-full"
                onChange={(e) => setPhotoUrl(e.target.value)}
                placeholder="Enter the photo URL"
              />
            </label>

            <label className="form-control w-full my-2">
              <span className="label-text font-medium">Age</span>
              <input
                type="number"
                value={age}
                className="input input-bordered w-full"
                onChange={(e) => setAge(e.target.value)}
                placeholder="Enter the age"
              />
            </label>

            <label className="form-control w-full my-2">
              <span className="label-text font-medium">Gender</span>
              <select
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                className="select select-bordered w-full"
              >
                <option value="" disabled>
                  Select gender
                </option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </label>

            <label className="form-control w-full my-2">
              <span className="label-text font-medium">Skills</span>
              <input
                type="text"
                value={skills.join(", ")}
                className="input input-bordered w-full"
                onChange={(e) =>
                  setSkills(
                    e.target.value.split(",").map((skill) => skill.trim())
                  )
                }
                placeholder="Enter your skills (comma separated)"
              />
            </label>

            {/* Save Button */}
            <div className="card-actions justify-center mt-4">
              <button className="btn btn-primary" onClick={saveProfile}>
                Save Profile
              </button>
            </div>

            {/* ✅ Notification */}
            {(message || error) && (
              <div className="toast toast-end">
                {message && (
                  <div className="alert alert-success shadow-lg">
                    <span>{message}</span>
                  </div>
                )}
                {error && (
                  <div className="alert alert-error shadow-lg">
                    <span>{error}</span>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Live Preview */}
        <div>
          <UserCard
            user={{ firstName, lastName, photoUrl, age, gender, skills }}
          />
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
