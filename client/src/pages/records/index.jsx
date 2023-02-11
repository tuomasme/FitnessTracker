import NavBar from "../navbar";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setRecord, setRecords } from "../../state/index.js";
import { Link } from "react-router-dom";

const RecordsPage = () => {
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
      <h1 className="d-flex justify-content-center">Records</h1>
      <NavBar />

      <div>
        <form onSubmit={handleSubmit}>
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
              className="form-control btn btn-success form-outline w-25"
              type="submit"
            >
              Add record
            </button>
          </div>
        </form>
      </div>
      <div>
        {recordsList &&
          recordsList.map((record) => (
            <table key={record._id} className="d-flex justify-content-center">
              <tbody>
                <tr>
                  <td
                    style={{
                      fontSize: "24px",
                      padding: "10px 10px",
                      width: "150px",
                    }}
                  >
                    {record.recordName}
                  </td>
                  <td
                    style={{
                      fontSize: "24px",
                      padding: "10px 10px",
                      width: "150px",
                    }}
                  >
                    {record.recordWeight} {weightUnit}
                  </td>
                  <td>
                    <Link to={"/updaterecord/" + record._id}>
                      <button className="btn btn-warning btn-sm">Update</button>
                    </Link>
                  </td>
                  <td>
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
            </table>
          ))}
      </div>
    </div>
  );
};

export default RecordsPage;
