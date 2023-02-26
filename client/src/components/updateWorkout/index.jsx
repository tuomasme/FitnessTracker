import NavBar from "../navbar";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setWorkout } from "../../state/index.js";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import "./styles.css";

const UpdateWorkout = () => {
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const { _id } = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
  const params = useParams();
  const workout = useSelector((state) => state.user.workout);
  const loggedInUserId = useSelector((state) => state.user._id);
  const navigate = useNavigate();

  // Data fields of exercises of the workout
  const [exerciseData, setExerciseData] = useState([
    {
      userId: _id,
      exerciseName: "",
      exerciseSets: "",
      exerciseReps: "",
      exerciseWeight: "",
    },
  ]);

  //Data fields of the workout
  const [workoutData, setWorkoutData] = useState({
    userId: _id,
    workoutName: "",
    workoutType: "",
    workoutDate: "",
    workoutExercises: [],
  });

  // Fetch the workout to be updated from the database
  const getWorkout = async () => {
    const response = await fetch(
      `http://localhost:5000/workout/${_id}/${params.id}`,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const data = await response.json();
    dispatch(setWorkout({ workout: data }));
  };

  useEffect(() => {
    getWorkout();
  }, []);

  const handleWorkoutFormChange = ({ currentTarget: input }) => {
    setWorkoutData({ ...workoutData, [input.name]: input.value });
  };

  const handleExerciseFormChange = (event, index) => {
    let exerciseFormData = [...exerciseData];
    exerciseFormData[index][event.target.name] = event.target.value;
    setExerciseData(exerciseFormData);
  };

  const deleteExerciseFields = (event, index) => {
    let exerciseFormData = [...exerciseData];
    exerciseFormData.splice(index, 1);
    setExerciseData(exerciseFormData);
  };

  const addExerciseFields = (event) => {
    event.preventDefault();
    let exerciseObject = {
      userId: _id,
      exerciseName: "",
      exerciseSets: "",
      exerciseReps: "",
      exerciseWeight: "",
    };
    setExerciseData([...exerciseData, exerciseObject]);
  };

  // Update the workout
  const updateWorkout = async (e) => {
    console.log(params.id);
    e.preventDefault();
    const res = await fetch(
      `http://localhost:5000/workouts/${_id}/${params.id}`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: loggedInUserId }),
      }
    );
    const updatedWorkout = await res.json();
    dispatch(setWorkout({ record: updatedWorkout }));
    console.log(updatedWorkout);
    navigate("/workouts");
  };

  return (
    <div>
      <div>
        <h1 className="center">Update workout</h1>
        <NavBar />
      </div>
      <form onSubmit={updateWorkout}>
        <div className="center">
          <input
            className="form-control form-outline w-25"
            type="text"
            placeholder="Workout name"
            name="workoutName"
            onChange={handleWorkoutFormChange}
            value={workoutData.workoutName}
            required
          />
        </div>
        <div className="center">
          <input
            className="form-control form-outline w-25"
            type="text"
            placeholder="Workout type"
            name="workoutType"
            onChange={handleWorkoutFormChange}
            value={workoutData.workoutType}
            required
          />
        </div>
        <div className="center">
          <input
            className="form-control form-outline w-25"
            type="text"
            placeholder="Workout date"
            name="workoutDate"
            onChange={handleWorkoutFormChange}
            value={workoutData.workoutDate}
            required
          />
        </div>
        <div>
          <br />
          <div>
            {Array.from(exerciseData).map((exerciseField, index) => {
              return (
                <div key={index}>
                  <div className="center">
                    <input
                      className="form-control form-outline w-25"
                      type="text"
                      placeholder="Exercise name"
                      name="exerciseName"
                      onChange={(event) =>
                        handleExerciseFormChange(event, index)
                      }
                      value={exerciseField.exerciseName}
                    />
                  </div>
                  <div className="center">
                    <input
                      className="form-control form-outline w-25"
                      type="text"
                      placeholder="Exercise weight"
                      name="exerciseWeight"
                      onChange={(event) =>
                        handleExerciseFormChange(event, index)
                      }
                      value={exerciseField.exerciseWeight}
                    />
                  </div>
                  <div className="center">
                    <input
                      className="form-control form-outline w-25"
                      type="text"
                      placeholder="Exercise sets"
                      name="exerciseSets"
                      onChange={(event) =>
                        handleExerciseFormChange(event, index)
                      }
                      value={exerciseField.exerciseSets}
                    />
                  </div>
                  <div className="center">
                    <input
                      className="form-control form-outline w-25"
                      type="text"
                      placeholder="Exercise reps"
                      name="exerciseReps"
                      onChange={(event) =>
                        handleExerciseFormChange(event, index)
                      }
                      value={exerciseField.exerciseReps}
                    />
                  </div>
                  <div className="center">
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
        <div className="center">
          <button
            className="form-control btn btn-warning form-outline w-25"
            type="submit"
          >
            Update workout
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateWorkout;
