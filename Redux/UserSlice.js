import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "",
  email: "",
  photo: "",
  workAt: "Student",
  livesIn: "Dhaka, Bangladesh",
  from: "Dhaka, Bangladesh",
  relationshipStatus: "Single",
  follower: "12002 people",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      const { name, email, photo } = action.payload;
      state.name = name;
      state.email = email;
      state.photo = photo;
    },
    clearUser: (state) => {
      state.name = "";
      state.email = "";
      state.photo = "";
    },
    setWorkAt: (state, action) => {
      state.workAt = action.payload;
    },
    setLivesIn: (state, action) => {
      state.livesIn = action.payload;
    },
    setFrom: (state, action) => {
      state.from = action.payload;
    },
    setRelationshipStatus: (state, action) => {
      state.relationshipStatus = action.payload;
    },
    setFollower: (state, action) => {
      state.follower = action.payload;
    },
  },
});

export const {
  setUser,
  clearUser,
  setWorkAt,
  setLivesIn,
  setFrom,
  setRelationshipStatus,
  setFollower,
} = userSlice.actions;

export default userSlice.reducer;
