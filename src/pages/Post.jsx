import { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import CreatePost from "../components/CreatePost";

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const res = await axios.get(BASE_URL + "/post/allpost", {
        withCredentials: true,
      });
      setPosts(res.data);
      setError("");
    } catch (err) {
      console.error("Error fetching posts:", err);
      setError("Failed to fetch posts");
    } finally {
      setLoading(false);
    }
  };

  const getUserDisplayName = (post) => {
    if (!post.userId) return "Unknown User";
    if (typeof post.userId === "object" && post.userId !== null) {
      const firstName = post.userId.firstName || "";
      const lastName = post.userId.lastName || "";
      return `${firstName} ${lastName}`.trim() || "Unknown User";
    }
    return "Unknown User";
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen bg-black">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-blue-900 py-10 px-4">
      <div className="max-w-5xl mx-auto">
        <CreatePost onPostCreated={fetchPosts} />

        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-white">All Posts</h2>
          <button
            onClick={fetchPosts}
            disabled={loading}
            className="flex items-center gap-2 bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-lg transition"
          >
            <svg
              className={`w-4 h-4 ${loading ? "animate-spin" : ""}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
              />
            </svg>
            Refresh
          </button>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-900/50 border border-red-700 rounded-lg text-red-200">
            {error}
          </div>
        )}

        {posts.length === 0 ? (
          <div className="text-center py-10">
            <p className="text-blue-200 text-lg">
              No posts yet. Be the first to create one!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {posts.map((post) => (
              <div
                key={post._id}
                className="bg-gradient-to-br from-gray-800 to-blue-900/70 rounded-2xl p-6 shadow-xl border border-blue-700/30 hover:border-blue-500/50 transition-all duration-300"
              >
                {post.image && (
                  <img
                    src={post.image}
                    alt="Post"
                    className="w-full h-64 object-cover rounded-2xl mb-4"
                    onError={(e) => (e.target.style.display = "none")}
                  />
                )}
                <p className="text-white font-semibold mb-2">
                  {post.description}
                </p>
                <div className="flex items-center text-blue-200 mb-1">
                  <span className="mr-2">👤</span>
                  <span>
                    {getUserDisplayName(post)
                      ? getUserDisplayName(post).charAt(0).toUpperCase() +
                        getUserDisplayName(post).slice(1).toLowerCase()
                      : ""}
                  </span>
                </div>

                <p className="text-xs text-gray-400">
                  {new Date(post.createdAt).toLocaleString()}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Posts;
