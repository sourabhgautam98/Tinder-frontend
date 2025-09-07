import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addFeed, removeUserFromFeed } from "../utils/feedSlice";
import { useEffect, useState } from "react";
import UserCard from "../components/UserCard";

const Feed = () => {
  const feed = useSelector((store) => store.feed);
  const dispatch = useDispatch();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  const getFeed = async () => {
    try {
      setLoading(true);
      const res = await axios.get(BASE_URL + "/users/feed", {
        withCredentials: true,
      });
      dispatch(addFeed(res?.data?.data));
      setCurrentIndex(0);
    } catch (err) {
      console.error("Error fetching feed:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveUser = (userId) => {
    dispatch(removeUserFromFeed(userId));
    if (currentIndex < feed.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  useEffect(() => {
    getFeed();
  }, []);

  useEffect(() => {
    if (feed && currentIndex >= feed.length && feed.length > 0) {
      getFeed();
    }
  }, [currentIndex, feed]);

  if (loading) {
    return (
      <div className="flex justify-center items-center my-10">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!feed || feed.length <= 0) {
    return (
      <div className="flex items-center justify-center h-screen bg-black">
        <h1 className="text-white text-xl text-center">
          TrueMatch Find the Friends
        </h1>
      </div>
    );
  }

  if (currentIndex >= feed.length) {
    return (
      <div className="flex justify-center my-10">
        <div className="text-white text-center">
          <p className="text-lg mb-4">You've seen all available users!</p>
          <button
            onClick={getFeed}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg text-white font-semibold"
          >
            Check for new users
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-gray-900 to-blue-900 py-10 px-4">
      <UserCard
        user={feed[currentIndex]}
        onActionComplete={() => {
          if (currentIndex < feed.length - 1) {
            setCurrentIndex(currentIndex + 1);
          } else {
            getFeed();
          }
        }}
        onRemoveUser={() => handleRemoveUser(feed[currentIndex]._id)}
      />
    </div>
  );
};

export default Feed;
