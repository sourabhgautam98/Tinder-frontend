import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { removeUserFromFeed } from "../utils/feedSlice";

const UserCard = ({ user }) => {
  const { _id, firstName, lastName, photoUrl, age, gender, skills } = user;
  const dispatch = useDispatch();

  const handleSendRequest = async (status, userId) => {
    try {
      await axios.post(
        `${BASE_URL}/request/send/${status}/${userId}`,
        {},
        { withCredentials: true }
      );
      dispatch(removeUserFromFeed(userId));
    } catch (err) {
      console.error("Request failed", err);
    }
  };

  // Format skills
  const formattedSkills =
    typeof skills === "string"
      ? skills.split(",").map((skill) => skill.trim()).filter((skill) => skill.length > 0)
      : Array.isArray(skills)
      ? skills
      : [];

  return (
    <div className="card w-96 bg-gradient-to-br from-base-200 to-base-300 shadow-xl hover:shadow-2xl transition-all rounded-2xl overflow-hidden">
      {/* User Image */}
      <figure className="h-60 w-full overflow-hidden">
        <img
          src={photoUrl}
          alt={firstName}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />
      </figure>

      {/* Card Content */}
      <div className="card-body">
        <h2 className="card-title text-2xl font-extrabold text-white">
          {firstName} {lastName}
        </h2>

        {age && gender && (
          <p className="text-sm text-white">
            {age} years • {gender}
          </p>
        )}

        {formattedSkills.length > 0 && (
          <div className="mt-3">
            <h3 className="text-sm font-semibold text-white mb-1">Skills:</h3>
            <div className="flex flex-wrap gap-2">
              {formattedSkills.map((skill, index) => (
                <span
                  key={index}
                  className="badge badge-primary badge-outline badge-sm py-1.5 px-2.5 rounded-md"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="card-actions justify-center mt-4 gap-3">
          <button
            className="btn btn-outline btn-error w-1/2 rounded-xl hover:scale-105 transition-transform flex items-center gap-2"
            onClick={() => handleSendRequest("ignored", _id)}
          >
            🚫 Ignore
          </button>
          <button
            className="btn btn-primary w-1/2 rounded-xl hover:scale-105 transition-transform flex items-center gap-2"
            onClick={() => handleSendRequest("interested", _id)}
          >
            ⭐ Interested
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
