import NavBar from "../navbar";
import axios from "axios";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setWorkouts } from "../../state/index.js";
import { useNavigate } from "react-router-dom";
import "./styles.css";

const CreateWorkout = () => {
  return (
    <div>
      <NavBar />
      <CreateWorkoutHeader />
      <CreateWorkoutForm />
    </div>
  );
};

const CreateWorkoutHeader = () => {
  return (
    <div className="center margin-header">
      <h1>Create workout</h1>
    </div>
  );
};

const CreateWorkoutForm = () => {
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const { _id } = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
  const navigate = useNavigate();
  const [workoutsList, setWorkoutsList] = useState([]);

  // Data fields of exercises of a workout
  const [exerciseData, setExerciseData] = useState([
    {
      exerciseName: "",
      exerciseSets: "",
      exerciseReps: "",
      exerciseWeight: "",
    },
  ]);

  // Data fields of a workout
  const [workoutData, setWorkoutData] = useState({
    userId: _id,
    workoutName: "",
    workoutType: "",
    workoutDate: "",
    workoutExercises: [],
  });

  // Handle changes in workout fields
  const handleWorkoutFieldChange = ({ currentTarget: input }) => {
    setWorkoutData({ ...workoutData, [input.name]: input.value });
  };

  // Handle changes in exercise fields
  const handleExerciseFieldChange = (event, index) => {
    let exerciseFormData = [...exerciseData];
    exerciseFormData[index][event.target.name] = event.target.value;
    setExerciseData(exerciseFormData);
  };

  // Add a workout to the database
  const handleSubmit = async (e) => {
    workoutData.workoutExercises = exerciseData;
    e.preventDefault();
    try {
      let res = await axios.post(
        `http://localhost:5000/workouts/${_id}/`,
        workoutData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      dispatch(
        setWorkouts({
          workouts: Array.from(res.data),
        })
      );
      setWorkoutsList(Array.from(res.data));
      navigate("/workouts");
    } catch (error) {
      setError(error.res.data.message);
      console.log(error);
    }
  };

  // Add fields for one exercise
  const addExerciseFields = (event) => {
    event.preventDefault();
    let exerciseObject = {
      exerciseName: "",
      exerciseSets: "",
      exerciseReps: "",
      exerciseWeight: "",
    };
    setExerciseData([...exerciseData, exerciseObject]);
  };

  // Delete fields of one exercise
  const deleteExerciseFields = (index) => {
    let exerciseFormData = [...exerciseData];
    exerciseFormData.splice(index, 1);
    setExerciseData(exerciseFormData);
  };

  // Prevent default when submitting
  const submitHandler = (event) => {
    event.preventDefault();
  };

  return (
    <div>
      <div>
        <form onSubmit={submitHandler}>
          <div className="center margin">
            <input
              className="form-control form-outline w-25"
              type="text"
              placeholder="Workout name"
              name="workoutName"
              onChange={handleWorkoutFieldChange}
              value={workoutData.workoutName}
              required
            />
          </div>
          <div className="center margin">
            <input
              className="form-control form-outline w-25"
              type="text"
              placeholder="Workout type"
              name="workoutType"
              onChange={handleWorkoutFieldChange}
              value={workoutData.workoutType}
              required
            />
          </div>
          <div className="center margin">
            <input
              className="form-control form-outline w-25"
              type="date"
              name="workoutDate"
              onChange={handleWorkoutFieldChange}
              value={workoutData.workoutDate}
              required
            />
          </div>
          <div className="margin-workouts-exercises">
            <div>
              {exerciseData &&
                Array.from(exerciseData).map((exerciseField, index) => {
                  return (
                    <div key={index}>
                      <div className="center margin">
                        <input
                          className="form-control form-outline w-25"
                          type="text"
                          placeholder="Exercise name"
                          name="exerciseName"
                          onChange={(event) =>
                            handleExerciseFieldChange(event, index)
                          }
                          value={exerciseField.exerciseName}
                        />
                      </div>
                      <div className="center margin">
                        <input
                          className="form-control form-outline w-25"
                          type="number"
                          placeholder="Exercise weight"
                          name="exerciseWeight"
                          onChange={(event) =>
                            handleExerciseFieldChange(event, index)
                          }
                          value={exerciseField.exerciseWeight}
                        />
                      </div>
                      <div className="center margin">
                        <input
                          className="form-control form-outline w-25"
                          type="number"
                          placeholder="Exercise sets"
                          name="exerciseSets"
                          onChange={(event) =>
                            handleExerciseFieldChange(event, index)
                          }
                          value={exerciseField.exerciseSets}
                        />
                      </div>
                      <div className="center margin">
                        <input
                          className="form-control form-outline w-25"
                          type="number"
                          placeholder="Exercise reps"
                          name="exerciseReps"
                          onChange={(event) =>
                            handleExerciseFieldChange(event, index)
                          }
                          value={exerciseField.exerciseReps}
                        />
                      </div>
                      <div className="center margin">
                        <button
                          className="form-control form-outline w-25 btn btn-danger"
                          onClick={() => deleteExerciseFields(index)}
                        >
                          x
                        </button>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
          <div className="center">
            <button
              className="form-control form-outline w-25 btn btn-primary"
              onClick={addExerciseFields}
            >
              Add exercise
            </button>
          </div>
          {error && <div className="center">{error}</div>}
          <div className="center margin-create-button">
            <button
              className="form-control btn btn-lg btn-success form-outline w-25"
              type="submit"
              onClick={handleSubmit}
            >
              Create workout
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateWorkout;
