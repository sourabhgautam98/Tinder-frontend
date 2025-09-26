import { useState } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constants";

const CreatePost = ({ onPostCreated }) => {
  const [description, setDescription] = useState("");
  const [url, setUrl] = useState("");
  const [creatingPost, setCreatingPost] = useState(false);
  const [error, setError] = useState("");

  const createPost = async (e) => {
    e.preventDefault();

    if (!description.trim() || !url.trim()) {
      setError("Both description and image URL are required");
      return;
    }

    setCreatingPost(true);
    setError("");

    try {
      const res = await axios.post(
        BASE_URL + "/post/create",
        {
          description: description.trim(),
          image: url.trim(),
        },
        { withCredentials: true }
      );

      setDescription("");
      setUrl("");

      if (onPostCreated) onPostCreated(res.data); // refresh posts in parent
    } catch (err) {
      console.error("Error creating post:", err);
      setError(err.response?.data?.error || "Failed to create post");
    } finally {
      setCreatingPost(false);
    }
  };

  const cancelPost = () => {
    setDescription("");
    setUrl("");
    setError("");
  };

  return (
    <form
      onSubmit={createPost}
      className="mb-10 p-6 rounded-2xl bg-gradient-to-br from-gray-800 to-blue-900 shadow-xl border border-blue-700/30"
    >
      <h2 className="text-xl font-bold text-white mb-4">Create Post</h2>

      {error && (
        <div className="mb-3 p-3 bg-red-900/50 border border-red-700 rounded-lg text-red-200">
          {error}
        </div>
      )}

      <textarea
        placeholder="What's on your mind?"
        value={description}
        onChange={(e) => {
          setDescription(e.target.value);
          if (error) setError("");
        }}
        className="block w-full mb-3 p-3 rounded-lg text-white border border-gray-700 resize-none"
        rows="3"
        disabled={creatingPost}
      />

      <input
        type="url"
        placeholder="Image URL"
        value={url}
        onChange={(e) => {
          setUrl(e.target.value);
          if (error) setError("");
        }}
        className="block w-full mb-4 p-3 rounded-lg text-white border border-gray-700"
        disabled={creatingPost}
      />

      <div className="flex gap-3 justify-end">
        {(description.trim() || url.trim()) && (
          <button
            type="button"
            onClick={cancelPost}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium py-2 px-5 rounded-xl transition-all duration-300"
            disabled={creatingPost}
          >
            Cancel
          </button>
        )}

        <button
          type="submit"
          disabled={!description.trim() || !url.trim() || creatingPost}
          className={`px-5 py-2 rounded-lg transition ${
            !description.trim() || !url.trim() || creatingPost
              ? "bg-gray-600 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          } text-white`}
        >
          {creatingPost ? "Posting..." : "Post"}
        </button>
      </div>
    </form>
  );
};

export default CreatePost;
