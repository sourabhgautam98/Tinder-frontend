import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addConnection } from "../utils/connectionsSlice";

const Connections = () => {
  const connections = useSelector((store) => store.connections);
  const dispatch = useDispatch();

  const fetchConnections = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });
      dispatch(addConnection(res.data.data));
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  if (!connections) return null;

  if (connections.length === 0)
    return (
      <h1 className="text-center text-xl font-semibold text-gray-600 mt-10">
        No connections found
      </h1>
    );

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold text-center mb-8">Connections</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {connections.map((connection) => {
          const { _id, firstName, lastName, photoUrl, age, gender, skills } =
            connection;
          return (
            <div
              key={_id}
              className="flex items-center p-6 rounded-xl bg-base-200 shadow-md hover:shadow-xl transition duration-300"
            >
              <img
                alt="photo"
                className="w-24 h-24 rounded-full object-cover border-2 border-white shadow-md"
                src={photoUrl}
              />
              <div className="text-left ml-6">
                <h2 className="font-bold text-xl mb-1">
                  {firstName + " " + lastName}
                </h2>
                {age && gender && (
                  <p className="text-sm text-white-600">
                    {age} • {gender}
                  </p>
                )}
                <p className="mt-2 text-sm text-white-700">
                  {skills?.join(", ") || "N/A"}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Connections;
