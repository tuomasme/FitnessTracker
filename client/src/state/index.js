import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  token: null,
  workouts: [],
  records: [],
};

export const authorizationSlice = createSlice({
  name: "authorization",
  initialState,
  reducers: {
    setLogin: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    setLogout: (state) => {
      state.user = null;
      state.token = null;
    },
    setWorkouts: (state, action) => {
      if (state.user) {
        state.user.workouts = action.payload.workouts;
      } else {
        console.error("User workouts don't exist");
      }
    },
    setWorkout: (state, action) => {
      const updatedWorkout = state.user.workouts.map((workout) => {
        if (workout._id === action.payload.workout._id)
          return action.payload.workout;
        return workout;
      });
      state.user.workouts = updatedWorkout;
    },
    setRecords: (state, action) => {
      if (state.user) {
        state.user.records = action.payload.records;
      } else {
        console.error("User records don't exist");
      }
    },
    /*     setRecord: (state, action) => {
      const updatedRecord = state.user.records.map((record) => {
        if (record._id === action.payload.records._id) {
          return action.payload.record;
        }
        return record;
      });
      state.user.records = updatedRecord;
    }, */
    setRecord: (state, action) => {
      const updatedRecord = state.user.records.map((record) => {
        if (record._id === action.payload.record._id)
          return action.payload.record;
        return record;
      });
      state.user.records = updatedRecord;
    },
  },
});

export const {
  setLogin,
  setLogout,
  setWorkouts,
  setWorkout,
  setRecords,
  setRecord,
} = authorizationSlice.actions;
export default authorizationSlice.reducer;
