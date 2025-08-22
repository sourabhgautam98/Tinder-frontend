import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/connectionsSlice";

const Connections = () => {
  const connections = useSelector((store) => store.connections);
  const dispatch = useDispatch();

  const fetchConnections = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });
      dispatch(addConnections(res.data.data));
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  if (connections === null) return <div>Loading...</div>;

  if (connections.length === 0) return <h1>No Connections Found</h1>;

  return (
    <div className="text-center my-10">
      <h1 className="text-bold text-white text-3xl mb-6">Connections</h1>

      {connections.map((connection) => {
        if (!connection || typeof connection !== 'object') {
          return null;
        }
        
        const { _id, firstName, lastName, photoUrl, age, gender, skills } = connection;

        return (
          <div
            key={_id}
            className="flex m-4 p-6 rounded-lg bg-base-300 w-3/4 mx-auto shadow-md hover:shadow-lg transition-shadow"
          >
            <div className="flex-shrink-0">
              <img
                alt="profile"
                className="w-20 h-20 rounded-full object-cover border-2 border-white"
                src={photoUrl} 
              />
            </div>
            <div className="text-left ml-6 flex-grow">
              <h2 className="font-bold text-2xl text-white">
                {(firstName || '') + " " + (lastName || '')}
              </h2>
              
              {/* Modified age and gender display */}
              {(age || gender) && (
                <div className="my-2">
                  {age && <p className="text-gray-300">Age: {age}</p>}
                  {gender && <p className="text-gray-300">Gender: {gender}</p>}
                </div>
              )}
              
              {/* Skills section with label */}
              <div className="mt-4">
                <h3 className="font-semibold text-white mb-2">Skills:</h3>
                <div className="flex flex-wrap gap-2">
                  {skills && Array.isArray(skills) && skills.length > 0 ? (
                    skills.map((skill, index) => (
                      <span 
                        key={index} 
                        className="border border-blue-400 rounded-full px-3 py-1 text-sm bg-blue-900/20 text-blue-200"
                      >
                        {skill}
                      </span>
                    ))
                  ) : (
                    <p className="text-gray-400 italic">No skills listed</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Connections;