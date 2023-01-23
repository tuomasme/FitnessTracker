import  {createSlice} from "@reduxjs/toolkit"

const initialState = {
    user: null,
    token: null,
    workouts: [],
    records: [],
    exercises: []
}

export const authorizationSlice = createSlice({
    name: "authorization",
    initialState,
    reducers: {
        setLogin: (state, action) => {
            state.user = action.payload.user
            state.token = action.payload.token
        },
        setLogout: (state) => {
            state.user = null
            state.token = null
        },
        setWorkouts: (state, action) => {
            state.workouts = action.payload.workouts
        },
        setWorkout: (state, action) => {
            const updatedWorkout = state.workouts((workout) => {
                if(workout._id === action.payload.workout._id) return action.payload.workout
                return workout
            })
            state.workouts = updatedWorkout
        },
        setRecords: (state, action) => {
            state.records = action.payload.records
        },
        setRecord: (state, action) => {
            const updatedRecord = state.records((record) => {
                if(record._id === action.payload.record._id) return action.payload.record
                return record
            })
            state.workouts = updatedRecord
        },
        setExercises: (state, action) => {
            state.exercises = state.payload.exercises
        },
        setExercise: (state, action) => {
            const updatedExercise = state.exercises((exercise) => {
                if(exercise._id === action.payload.exercise._id) return action.payload.exercise
                return exercise
            })
            state.exercises = updatedExercise
        }
    }
})

export const { setLogin, setLogout, setWorkouts, setWorkout, setRecords, setRecord, setExercises, setExercise } = authorizationSlice.actions
export default authorizationSlice.reducer