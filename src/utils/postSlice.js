import { createSlice } from "@reduxjs/toolkit";

const postSlice = createSlice({
  name: "posts",
  initialState: [], // default empty array for posts
  reducers: {
    // Add all posts (replace the feed)
    setPosts: (state, action) => {
      return action.payload;
    },

    // Add a single new post to the top of the feed
    addPost: (state, action) => {
      state.unshift(action.payload); // add at beginning
    },

    // Remove a post by ID
    removePost: (state, action) => {
      return state.filter((post) => post._id !== action.payload);
    },

    // Update a post (optional)
    updatePost: (state, action) => {
      const index = state.findIndex((post) => post._id === action.payload._id);
      if (index !== -1) {
        state[index] = action.payload;
      }
    },
  },
});

export const { setPosts, addPost, removePost, updatePost } = postSlice.actions;
export default postSlice.reducer;
