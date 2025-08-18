import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addRequest } from "../utils/requestSlice";

const Requests = () => {
  const requests = useSelector((store) => store.requests);
  const dispatch = useDispatch();
  const fetchRequests = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/requests/received", {
        withCredentials: true,
      });
      dispatch(addRequest(res.data.data));
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    fetchRequests();
  }, []);

  if (!requests) return null;

  if (requests.length === 0)
    return (
      <h1 className="text-center text-xl font-semibold text-gray-600 mt-10">
        No requests found
      </h1>
    );


  return (
  <div className="max-w-6xl mx-auto px-4 py-10">
    <h2 className="text-3xl font-bold text-center mb-8">
      Connection Requests
    </h2>

    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
      {requests.map((request) => {
        const { _id, firstName, lastName, photoUrl, age, gender, skills } =
          request.fromUserId;

        return (
          <div
            key={_id}
            className="p-6 rounded-xl bg-base-200 shadow-md hover:shadow-xl transition duration-300 flex flex-col items-center text-center"
          >
            <img
              alt="profile"
              className="w-24 h-24 rounded-full object-cover border-2 border-white shadow-md mb-4"
              src={photoUrl}
            />

            <h2 className="font-bold text-xl mb-1">
              {firstName + " " + lastName}
            </h2>

            {age && gender && (
              <p className="text-sm text-gray-600 mb-1">
                {age} • {gender}
              </p>
            )}

            <p className="text-sm text-gray-700 mb-4">
              {skills?.join(", ") || "N/A"}
            </p>

            {/* Buttons inside the box under details */}
            <div className="flex gap-3">
              <button className="btn btn-outline btn-error">Reject</button>
              <button className="btn btn-primary">Accept</button>
            </div>
          </div>
        );
      })}
    </div>
  </div>
);

};

export default Requests;
