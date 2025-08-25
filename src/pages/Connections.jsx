import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/connectionsSlice";

const Connections = () => {
  const connections = useSelector((store) => store.connections);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  const fetchConnections = async () => {
    try {
      const res = await axios.get(BASE_URL + "/users/connections", {
        withCredentials: true,
      });
      dispatch(addConnections(res.data.data));
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  if (loading) return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-gray-900 to-blue-900">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
    </div>
  );

  if (connections.length === 0) return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-blue-900 flex flex-col justify-center items-center text-center px-4">
      <div className="bg-gradient-to-br from-purple-900 to-blue-800 p-8 rounded-3xl shadow-2xl max-w-md w-full">
        <div className="mb-6">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-blue-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-white mb-2">No Connections Yet</h2>
        <p className="text-blue-200">Your connections will appear here once you start connecting with others.</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-blue-900 py-10 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-white mb-2">Your Connections</h1>
          <p className="text-blue-300">People you're connected with</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {connections.map((connection) => {
            if (!connection || typeof connection !== 'object') {
              return null;
            }
            
            const { _id, firstName, lastName, photoUrl, age, gender, skills } = connection;

            return (
              <div
                key={_id}
                className="bg-gradient-to-br from-gray-800 to-blue-900/70 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-blue-700/30 hover:border-blue-500/50 transition-all duration-300 transform hover:-translate-y-1"
              >
                <div className="flex flex-col items-center text-center">
                  {/* Profile Image */}
                  <div className="relative mb-4">
                    <img
                      alt="profile"
                      className="w-24 h-24 rounded-2xl object-cover border-4 border-blue-500/30 shadow-lg"
                      src={photoUrl || '/default-avatar.png'} 
                    />
                    <div className="absolute -bottom-2 -right-2 bg-green-500 rounded-full p-1 shadow-md">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  </div>

                  {/* User Info */}
                  <h2 className="text-xl font-bold text-white mb-1">
                    {firstName} {lastName}
                  </h2>
                  
                  {/* Age and Gender */}
                  {(age || gender) && (
                    <div className="flex flex-wrap justify-center gap-3 mb-4">
                      {age && (
                        <span className="inline-flex items-center px-3 py-1 rounded-full bg-blue-900/50 text-blue-200 text-sm">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          {age} years
                        </span>
                      )}
                      
                      {gender && (
                        <span className="inline-flex items-center px-3 py-1 rounded-full bg-purple-900/50 text-purple-200 text-sm">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                          </svg>
                          {gender}
                        </span>
                      )}
                    </div>
                  )}
                  
                  {/* Skills section */}
                  <div className="w-full">
                    <h3 className="font-semibold text-white mb-2 flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                      Skills
                    </h3>
                    <div className="flex flex-wrap justify-center gap-2">
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
                        <p className="text-gray-400 italic text-sm">No skills listed</p>
                      )}
                    </div>
                  </div>

                  {/* Connection Date (if available) */}
                  <div className="mt-4 pt-3 border-t border-gray-700/50 w-full">
                    <p className="text-xs text-gray-400 flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Connected
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Connections;