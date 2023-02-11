import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  token: null,
  workouts: [],
  records: [],
  exercises: [],
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
    setRecord: (state, action) => {
      const updatedRecord = state.user.records.map((record) => {
        if (record._id === action.payload.record._id)
          return action.payload.record;
        return record;
      });
      state.user.records = updatedRecord;
    },
    setExercises: (state, action) => {
      if (state.user.workout) {
        state.user.workout.exercises = action.payload.exercises;
      } else {
        console.error("User exercises don't exist");
      }
    },
    setExercise: (state, action) => {
      const updatedExercise = state.user.workout.exercises.map((exercise) => {
        if (exercise._id === action.payload.exercise._id)
          return action.payload.exercise;
        return exercise;
      });
      state.user.workout.exercises = updatedExercise;
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
  setExercises,
  setExercise,
} = authorizationSlice.actions;
export default authorizationSlice.reducer;
