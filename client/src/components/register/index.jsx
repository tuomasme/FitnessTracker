import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "./styles.css";

const Register = () => {
  return (
    <div>
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: "15%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <RegisterHeader />
      </div>
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: "40%",
          transform: "translate(-50%, -50%)",
          width: "40%",
        }}
      >
        <RegisterForm />
        <RegisterLink />
      </div>
    </div>
  );
};

const RegisterHeader = () => {
  return (
    <div>
      <h1>Register to Fitness Tracker</h1>
    </div>
  );
};

const RegisterForm = () => {
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    username: "",
    password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Handle change in fields
  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };

  // Registration request
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = "http://localhost:5000/authorization/register";
      const { data: res } = await axios.post(url, data);
      navigate("/");
      console.log(res.message);
    } catch (error) {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        setError(error.response.data.message);
      }
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <table style={{ width: "100%" }}>
          <tr>
            <td style={{ width: "10%" }}>
              <label htmlFor="firstName">First name</label>
            </td>
            <td>
              <input
                className="form-control form-outline input"
                type="text"
                placeholder="First Name"
                name="firstName"
                onChange={handleChange}
                value={data.firstName}
                required
              />
            </td>
          </tr>
          <tr>
            <td style={{ width: "10%" }}>
              <label htmlFor="lastName">Last name</label>
            </td>
            <td>
              <input
                className="form-control form-outline input"
                type="text"
                placeholder="Last Name"
                name="lastName"
                onChange={handleChange}
                value={data.lastName}
                required
              />
            </td>
          </tr>
          <tr>
            <td style={{ width: "10%" }}>
              <label htmlFor="email">Email</label>
            </td>
            <td>
              <input
                className="form-control form-outline input"
                type="email"
                placeholder="Email"
                name="email"
                onChange={handleChange}
                value={data.email}
                required
              />
            </td>
          </tr>
          <tr>
            <td style={{ width: "10%" }}>
              <label htmlFor="username">Username</label>
            </td>
            <td>
              <input
                className="form-control form-outline input"
                type="username"
                placeholder="Username (6-16 characters)"
                name="username"
                onChange={handleChange}
                value={data.username}
                required
              />
            </td>
          </tr>
          <tr>
            <td style={{ width: "10%" }}>
              <label htmlFor="password">Password</label>
            </td>
            <td>
              <input
                className="form-control form-outline input"
                type="password"
                placeholder="Password (8-50 characters)"
                name="password"
                onChange={handleChange}
                value={data.password}
                required
              />
            </td>
          </tr>
          <tr>
            <td>&nbsp;</td>
            <td style={{ width: "100%" }}>
              <button
                className="form-control form-outline btn btn-primary input"
                type="submit"
              >
                Register
              </button>
            </td>
          </tr>
        </table>
      </form>
    </div>
  );
};

const RegisterLink = () => {
  return (
    <div className="form-margin">
      <Link to="/">
        <div type="button">Already have an account? Login here.</div>
      </Link>
    </div>
  );
};

export default Register;
