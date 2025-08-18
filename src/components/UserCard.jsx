const UserCard = ({ user }) => {
  const { firstName, lastName, photoUrl, age, gender, skills } = user;

  return (
    <div className="card w-96 bg-base-300 shadow-xl rounded-2xl hover:shadow-2xl transition duration-300">
      {/* Profile Image */}
      <figure className="h-64 overflow-hidden">
        <img
          src={photoUrl || "https://via.placeholder.com/400x400?text=No+Image"}
          alt={firstName + " " + lastName}
          className="h-full w-full object-cover"
        />
      </figure>

      {/* Card Body */}
      <div className="card-body items-center text-center">
        {/* Name */}
        <h2 className="card-title text-xl font-bold">
          {firstName} {lastName}
        </h2>

        {/* Age + Gender */}
        {(age || gender) && (
          <p className="text-gray-500">
            {age ? age : ""} 
            {age && gender ? " • " : ""} 
            {gender ? gender : ""}
          </p>
        )}

        {/* Skills */}
        {skills?.length > 0 && (
          <div className="flex flex-wrap justify-center gap-2 mt-3">
            {skills.map((skill, index) => (
              <span
                key={index}
                className="badge badge-primary badge-outline px-3 py-1 text-sm rounded-full"
              >
                {skill}
              </span>
            ))}
          </div>
        )}

        {/* Action Buttons */}
        <div className="card-actions justify-center mt-4 space-x-4">
          <button className="btn btn-outline btn-error px-6 rounded-full">
            Ignore
          </button>
          <button className="btn btn-primary px-6 rounded-full">
            Interested
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
