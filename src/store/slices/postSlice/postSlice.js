import { createSlice } from "@reduxjs/toolkit";

export const postSlice = createSlice({
  name: "post",
  initialState: {
    isSaving: false,
    messageSaved: "",
    posts: [],
    activePost: null,
    // post: {
    //     id: 'ABC123',
    //     title: '',
    //     description
    //     description
    //     content
    //     autor
    //     imageUrl: '',
    // }
  },
  reducers: {
    savingNewpost: (state) => {
      state.isSaving = true;
    },
    addNewEmptypost: (state) => {
      // state.post.push(action.payload);
      state.isSaving = false;
    },
    setActivepost: (state, action) => {
      state.activePost = action.payload;
    },
    setPosts: (state, action) => {
      state.posts = action.payload;
    },
    setSaving: (state) => {
      state.isSaving = true;
      state.messageSaved = "";
    },
    setPhotoToActivepost: (state, action) => {
      state.activePost.imageUrl = action.payload;
      state.isSaving = false;
    },
    clearpostOnLogout: (state) => {
      (state.isSaving = false),
        (state.messageSaved = ""),
        (state.posts = []),
        (state.activePost = null);
    },
    postUpdated: (state, action) => {
      state.isSaving = false;
      state.posts = state.posts.map((post) => {
        if (post.id === action.payload.id) {
          return action.payload;
        }
        return post;
      });
      state.messageSaved = `:D`;
    },
    addNewPost: (state, action) => {
      console.log('action.payload: ', action.payload);
      state.isSaving = false,
      state.posts.push(action.payload);
      state.messageSaved = `:D`;
    },
    deletepostById: (state, action) => {
      state.activePost = null;
      state.posts = state.posts.filter(
        (post) => post.id !== action.payload
      );
    },
    deleteActivepost: (state) => {
      state.activePost = null;
    },
    updateFormatedName: (state, action) => {
      state.activePost.formatedName = action.payload;
    },
    setActivePost: (state, action) => {
      state.activePost = action.payload;
    },
    clearMessage: (state) => {
        state.messageSaved = '';
      }
  },
});

// Action creators are generated for each case reducer function
export const {
  setPosts,
    clearMessage,
  addNewPost,
  updateFormatedName,
  addNewEmptypost,
  postUpdated,
  clearpostOnLogout,
  setActivePost,
  deleteActivepost,
  deletepostById,
  savingNewpost,
  setActivepost,
  setPhotoToActivepost,
  setSaving,
} = postSlice.actions;
