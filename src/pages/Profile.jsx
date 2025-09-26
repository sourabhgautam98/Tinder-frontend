import React, { useState, useEffect } from "react";
import EditProfile from "./EditProfile";
import { useSelector } from "react-redux";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import CreatePost from "../components/CreatePost";

export default function Profile() {
  const user = useSelector((state) => state.user);
  const [isEditing, setIsEditing] = useState(false);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleEditClick = () => setIsEditing(true);
  const handleCloseEdit = () => setIsEditing(false);

  // 👉 Fetch posts created by this user
  const fetchMyPosts = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${BASE_URL}/post/myposts`, {
        withCredentials: true,
      });
      setPosts(res.data);
    } catch (err) {
      console.error("Error fetching my posts:", err);
    } finally {
      setLoading(false);
    }
  };

  // 👉 Delete a post
  const handleDelete = async (postId) => {
    if (!window.confirm("Are you sure you want to delete this post?")) return;

    try {
      await axios.delete(`${BASE_URL}/post/delete/${postId}`, {
        withCredentials: true,
      });
      // Refresh after deletion
      setPosts((prev) => prev.filter((p) => p._id !== postId));
    } catch (err) {
      console.error("Error deleting post:", err);
    }
  };

  useEffect(() => {
    if (user) fetchMyPosts();
  }, [user]);

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-blue-900 flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-blue-900 py-10 px-4">
      {isEditing ? (
        <EditProfile user={user} onClose={handleCloseEdit} />
      ) : (
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-4xl font-bold text-white">My Profile</h1>
              <p className="text-blue-300 mt-2">
                View and manage your profile information
              </p>
            </div>
            <button
              onClick={handleEditClick}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium py-3 px-6 rounded-xl transition-all duration-300 transform hover:-translate-y-1 shadow-lg"
            >
              Edit Profile
            </button>
          </div>

          {/* Profile Info */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 bg-gradient-to-br from-gray-800 to-blue-900/70 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-blue-700/30">
              <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                <div className="relative">
                  <img
                    alt="profile"
                    className="w-32 h-32 rounded-2xl object-cover border-4 border-blue-500/30 shadow-lg"
                    src={user.photoUrl || "/default-avatar.png"}
                  />
                </div>

                <div className="text-center md:text-left flex-1">
                  <h2 className="text-3xl font-bold text-white mb-2">
                    {user.firstName.charAt(0).toUpperCase() +
                      user.firstName.slice(1).toLowerCase()}{" "}
                    {user.lastName.charAt(0).toUpperCase() +
                      user.lastName.slice(1).toLowerCase()}
                  </h2>
                  <div className="flex flex-wrap gap-3 justify-center md:justify-start mb-4">
                    {user.age && (
                      <span className="inline-flex items-center px-3 py-1 rounded-full bg-blue-900/50 text-blue-200 text-sm">
                        {user.age} years
                      </span>
                    )}
                    {user.gender && (
                      <span className="inline-flex items-center px-3 py-1 rounded-full bg-purple-900/50 text-purple-200 text-sm">
                        {user.gender.charAt(0).toUpperCase() +
                          user.gender.slice(1)}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Skills */}
            <div className="bg-gradient-to-br from-gray-800 to-blue-900/70 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-blue-700/30">
              <h3 className="text-2xl font-bold text-white mb-4">Skills</h3>
              <div className="flex flex-wrap gap-2">
                {user.skills && user.skills.length > 0 ? (
                  user.skills.map(
                    (skill, index) =>
                      skill.trim() && (
                        <span
                          key={index}
                          className="border border-blue-400 rounded-full px-3 py-1 text-sm bg-blue-900/20 text-blue-200"
                        >
                          {skill.charAt(0).toUpperCase() +
                            skill.slice(1).toLowerCase()}
                        </span>
                      )
                  )
                ) : (
                  <p className="text-gray-400 italic">No skills added yet</p>
                )}
              </div>
            </div>
          </div>

          {/* Create Post */}
          <div className="mt-8 bg-gradient-to-br from-gray-900/50 to-blue-900/50 rounded-2xl p-6 shadow-xl border border-blue-700/30">
            <CreatePost onPostCreated={fetchMyPosts} />
          </div>

          {/* My Posts */}
          <div className="mt-8 bg-gradient-to-br from-gray-800 to-blue-900/70 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-blue-700/30">
            <h3 className="text-2xl font-bold text-white mb-4">My Posts</h3>

            {loading ? (
              <p className="text-gray-400">Loading posts...</p>
            ) : posts.length === 0 ? (
              <p className="text-gray-400 italic">
                You haven’t created any posts yet
              </p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                {posts.map((post) => (
                  <div
                    key={post._id}
                    className="bg-gradient-to-br from-gray-800 to-blue-900/70 rounded-2xl p-6 shadow-xl border border-blue-700/30"
                  >
                    {post.image && (
                      <img
                        src={post.image}
                        alt="Post"
                        className="w-full h-64 object-cover rounded-2xl mb-4"
                      />
                    )}
                    <p className="text-white font-semibold mb-2">
                      {post.description}
                    </p>
                    <p className="text-xs text-gray-400 mb-4">
                      {new Date(post.createdAt).toLocaleString()}
                    </p>

                    {/* Delete Button */}
                    <button
                      onClick={() => handleDelete(post._id)}
                      className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg shadow-md transition-all"
                    >
                      Delete
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
