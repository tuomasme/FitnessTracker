import NavBar from "../navbar";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setRecord, setRecords } from "../../state/index.js";
import { Link } from "react-router-dom";
import "./styles.css";

const RecordsPage = () => {
  return (
    <div>
      <NavBar />
      <HeaderComponent />
      <FormComponent />
    </div>
  );
};

const HeaderComponent = () => {
  return (
    <div className="center margin-header">
      <h1>Records</h1>
    </div>
  );
};

const FormComponent = () => {
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const { _id } = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
  const records = useSelector((state) => state.user.records);
  const [formData, setFormData] = useState({
    userId: _id,
    recordName: "",
    recordWeight: "",
  });
  const [recordsList, setRecordsList] = useState([]);
  const [weightUnit, setWeightUnit] = useState("kg");

  // Fetch records from the database
  const getRecords = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/records/${_id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      dispatch(
        setRecords({
          records: res.data,
        })
      );
      setRecordsList(res.data);
      console.log("res: ", res.data);
      console.log("Records: ", records);
    } catch (error) {
      setError(error.res.data.message);
      console.log(error);
    }
  };

  useEffect(() => {
    getRecords();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChange = ({ currentTarget: input }) => {
    setFormData({ ...formData, [input.name]: input.value });
  };

  // Post a record to the database
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let res = await axios.post(
        `http://localhost:5000/records/${_id}`,
        formData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      dispatch(
        setRecords({
          records: Array.from(res.data),
        })
      );
      setRecordsList(Array.from(res.data));
      console.log("After post: ", recordsList);
      setFormData({
        userId: _id,
        recordName: "",
        recordWeight: "",
      });
      getRecords();
    } catch (error) {
      setError(error.res.data.message);
      console.log(error);
    }
  };

  // Delete a record from the database
  const deleteRecord = async (id) => {
    try {
      let res = await axios.delete(
        `http://localhost:5000/records/${_id}/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const newRecordsList = recordsList.filter((record) => record._id !== id);
      setRecordsList(newRecordsList);
      getRecords();
    } catch (error) {
      setError(error.res.data.message);
      console.log(error);
    }
  };

  return (
    <div>
      <div>
        <form onSubmit={handleSubmit}>
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
          {error && <div className="center margin">{error}</div>}
          <div className="center margin">
            <button
              className="form-control btn btn-success form-outline w-25"
              type="submit"
            >
              Add record
            </button>
          </div>
        </form>
      </div>
      <div className="margin-header center">
        <table
          className="table table-light form-outline"
          style={{ width: "35%" }}
        >
          <thead>
            <tr>
              <th scope="col">Exercise</th>
              <th scope="col">Weight</th>
              <th scope="col">&nbsp;</th>
              <th scope="col">&nbsp;</th>
            </tr>
          </thead>
          {recordsList &&
            recordsList.map((record) => (
              <tbody>
                <tr key={record._id}>
                  <td className="table-cell">{record.recordName}</td>
                  <td className="table-cell">
                    {record.recordWeight} {weightUnit}
                  </td>
                  <td className="table-cell">
                    <Link to={"/updaterecord/" + record._id}>
                      <button className="btn btn-warning btn-sm">Update</button>
                    </Link>
                  </td>
                  <td className="table-cell">
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => {
                        deleteRecord(record._id);
                      }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              </tbody>
            ))}
        </table>
      </div>
    </div>
  );
};

export default RecordsPage;
