import NavBar from "../navbar";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setRecord } from "../../state/index.js";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const UpdateRecord = () => {
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const { _id } = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
  const params = useParams();
  const record = useSelector((state) => state.user.record);
  const loggedInUserId = useSelector((state) => state.user._id);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    userId: _id,
    recordName: "",
    recordWeight: "",
  });

  /*   const getRecord = async () => {
    try {
      const res = await axios
        .get(`http://localhost:5000/records/${_id}/${params.id}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          console.log("res: ", res.data);
          console.log("Record: ", record);
          dispatch(
            setRecord({
              record: res.data,
            })
          );
          return res.data;
        });
    } catch (error) {
      setError(error.res.data.message);
      console.log(error);
    }
  }; */

  // Fetch data about the record to be updated
  const getRecord = async () => {
    const response = await fetch(
      `http://localhost:5000/records/${_id}/${params.id}`,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const data = await response.json();
    dispatch(setRecord({ record: data }));
  };

  useEffect(() => {
    getRecord();
  }, []);

  const handleChange = ({ currentTarget: input }) => {
    setFormData({ ...formData, [input.name]: input.value });
  };
  /* 
    const updateRecord = async (e) => {
    e.preventDefault();
    try {
      let res = await axios.put(
        `http://localhost:5000/records/${_id}/${params.id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      dispatch(
        setRecord({
          record: res.data,
        })
      );
    } catch (error) {
      setError(error.res.data.message);
      console.log(error);
    }
  };  */

  // Update the record
  const updateRecord = async (e) => {
    console.log(params.id);
    e.preventDefault();
    const res = await fetch(
      `http://localhost:5000/records/${_id}/${params.id}`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: loggedInUserId }),
      }
    );
    const updatedRecord = await res.json();
    dispatch(setRecord({ record: updateRecord }));
    console.log(updatedRecord);
    navigate("/records");
  };

  return (
    <div>
      <div>
        <h1 className="d-flex justify-content-center">Update record</h1>
        <NavBar />
      </div>
      <div>
        <form onSubmit={updateRecord}>
          <div className="d-flex justify-content-center">
            <input
              className="form-control form-outline w-25"
              type="text"
              placeholder="Record name"
              name="recordName"
              onChange={handleChange}
              value={formData.recordName}
              required
            />
          </div>
          <div className="d-flex justify-content-center">
            <input
              className="form-control form-outline w-25"
              type="text"
              placeholder="Record weight"
              name="recordWeight"
              onChange={handleChange}
              value={formData.recordWeight}
              required
            />
          </div>
          {error && (
            <div className="d-flex justify-content-center">{error}</div>
          )}
          <div className="d-flex justify-content-center">
            <button
              className="form-control btn btn-warning form-outline w-25"
              type="submit"
            >
              Update record
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateRecord;
