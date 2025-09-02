import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { removeUserFromFeed } from "../utils/feedSlice";
import { useState } from "react";

const UserCard = ({ user, onActionComplete }) => {
  const { _id, firstName, lastName, photoUrl, age, gender, skills } = user;
  const dispatch = useDispatch();
  const [processing, setProcessing] = useState(false);
  const [actionType, setActionType] = useState(null);

  const handleSendRequest = async (status, userId) => {
    try {
      setProcessing(true);
      setActionType(status);
      await axios.post(
        `${BASE_URL}/requests/send/${status}/${userId}`,
        {},
        { withCredentials: true }
      );
      dispatch(removeUserFromFeed(userId));
      if (onActionComplete) {
        onActionComplete();
      }
    } catch (err) {
      console.error("Request failed", err);
    } finally {
      setProcessing(false);
      setActionType(null);
    }
  };
  const formattedSkills =
    typeof skills === "string"
      ? skills
          .split(",")
          .map((skill) => skill.trim())
          .filter((skill) => skill.length > 0)
      : Array.isArray(skills)
      ? skills
      : [];

  return (
    <div className="bg-gradient-to-br from-gray-800 to-blue-900/70 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-blue-700/30 hover:border-blue-500/50 transition-all duration-300 transform hover:-translate-y-1 h-full flex flex-col w-full max-w-2xl mx-auto">
      <div className="flex flex-col md:flex-row gap-8 mb-6">
        <div className="flex-shrink-0">
          <div className="relative">
            <img
              src={photoUrl}
              alt={firstName}
              className="w-40 h-40 rounded-2xl object-cover border-4 border-blue-500/30 shadow-lg"
            />
          </div>
        </div>

        <div className="flex-grow">
          <h2 className="text-3xl font-bold text-white mb-3">
            {firstName} {lastName}
          </h2>

          {(age || gender) && (
            <div className="flex flex-wrap gap-3 mb-5">
              {age && (
                <span className="inline-flex items-center px-3 py-1 rounded-full bg-blue-900/50 text-blue-200 text-sm">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 mr-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  {age} years
                </span>
              )}

              {gender && (
                <span className="inline-flex items-center px-3 py-1 rounded-full bg-purple-900/50 text-purple-200 text-sm">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 mr-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                  {gender.charAt(0).toUpperCase() +
                    gender.slice(1).toLowerCase()}
                </span>
              )}
            </div>
          )}

          {formattedSkills.length > 0 && (
            <div>
              <h3 className="font-semibold text-white mb-3 flex items-center text-lg">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-2 text-blue-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
                Skills
              </h3>
              <div className="flex flex-wrap gap-2">
                {formattedSkills.slice(0, 6).map((skill, index) => (
                  <span
                    key={index}
                    className="border border-blue-400 rounded-full px-3 py-1 text-sm bg-blue-900/20 text-blue-200"
                  >
                    {skill.charAt(0).toUpperCase() +
                      skill.slice(1).toLowerCase()}
                  </span>
                ))}
                {formattedSkills.length > 6 && (
                  <span className="border border-blue-400 rounded-full px-3 py-1 text-sm bg-blue-900/20 text-blue-200">
                    +{formattedSkills.length - 6} more
                  </span>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 mt-auto pt-6 border-t border-gray-700">
        <button
          className={`flex-1 px-6 py-4 rounded-xl font-semibold flex items-center justify-center transition-all duration-300 ${
            processing && actionType === "ignored"
              ? "bg-gray-700 text-gray-400 cursor-not-allowed"
              : "bg-gradient-to-r from-gray-700 to-gray-800 hover:from-gray-800 hover:to-gray-900 text-white shadow-md hover:shadow-lg border border-gray-600"
          }`}
          onClick={() => handleSendRequest("ignored", _id)}
          disabled={processing}
        >
          {processing && actionType === "ignored" ? (
            <>
              <svg
                className="animate-spin -ml-1 mr-2 h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Processing...
            </>
          ) : (
            <>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
              Ignore
            </>
          )}
        </button>
        <button
          className={`flex-1 px-6 py-4 rounded-xl font-semibold flex items-center justify-center transition-all duration-300 ${
            processing && actionType === "interested"
              ? "bg-gray-700 text-gray-400 cursor-not-allowed"
              : "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-md hover:shadow-lg"
          }`}
          onClick={() => handleSendRequest("interested", _id)}
          disabled={processing}
        >
          {processing && actionType === "interested" ? (
            <>
              <svg
                className="animate-spin -ml-1 mr-2 h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Sending...
            </>
          ) : (
            <>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
              Interested
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default UserCard;
