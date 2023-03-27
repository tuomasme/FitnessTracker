import NavBar from "../navbar";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setRecord } from "../../state/index.js";
import { useNavigate, useParams } from "react-router-dom";
import "./styles.css";

const UpdateRecord = () => {
  return (
    <div>
      <NavBar />
      <UpdateRecordHeader />
      <UpdateRecordForm />
    </div>
  );
};

const UpdateRecordHeader = () => {
  return (
    <div className="center margin-header">
      <h1>Update record</h1>
    </div>
  );
};

const UpdateRecordForm = () => {
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const { _id } = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
  const params = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    userId: _id,
    recordName: "",
    recordWeight: "",
  });

  // Fetch data about the record to be updated
  const getRecord = async () => {
    try {
      let response = await fetch(
        `http://localhost:5000/records/${_id}/${params.id}`,
        {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      let result = await response.json();
      console.log(" Result: ", result);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getRecord();
  }, []);

  // Handle change in fields
  const handleChange = ({ currentTarget: input }) => {
    setFormData({ ...formData, [input.name]: input.value });
  };

  // Update the record
  const updateRecord = async (e) => {
    console.log(params.id);
    console.log(_id);
    e.preventDefault();
    try {
      const res = await fetch(
        `http://localhost:5000/records/${_id}/${params.id}`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
      const updatedRecord = await res.json();
      dispatch(setRecord({ record: updatedRecord }));
      console.log(updatedRecord);
      navigate("/records");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <form onSubmit={updateRecord}>
        <div className="center margin">
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
        <div className="center margin">
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
        {error && <div className="center">{error}</div>}
        <div className="center margin">
          <button
            className="form-control btn btn-warning form-outline w-25"
            type="submit"
          >
            Update record
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateRecord;
