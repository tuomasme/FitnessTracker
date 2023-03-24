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
        <HeaderComponent />
      </div>
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: "40%",
          transform: "translate(-50%, -50%)",
          width: "50%",
        }}
      >
        <FormComponent />
        <LinkComponent />
      </div>
    </div>
  );
};

const HeaderComponent = () => {
  return (
    <div>
      <h1>Register to Fitness Tracker</h1>
    </div>
  );
};

const FormComponent = () => {
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    username: "",
    password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };

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
        <div className="form-margin">
          <input
            className="form-control form-outline "
            type="text"
            placeholder="First Name"
            name="firstName"
            onChange={handleChange}
            value={data.firstName}
            required
          />
        </div>
        <div className="form-margin">
          <input
            className="form-control form-outline"
            type="text"
            placeholder="Last Name"
            name="lastName"
            onChange={handleChange}
            value={data.lastName}
            required
          />
        </div>
        <div className="form-margin">
          <input
            className="form-control form-outline"
            type="email"
            placeholder="Email"
            name="email"
            onChange={handleChange}
            value={data.email}
            required
          />
        </div>
        <div className="form-margin">
          <input
            className="form-control form-outline"
            type="username"
            placeholder="Username"
            name="username"
            onChange={handleChange}
            value={data.username}
            required
          />
        </div>
        <div className="form-margin">
          <input
            className="form-control form-outline"
            type="password"
            placeholder="Password"
            name="password"
            onChange={handleChange}
            value={data.password}
            required
          />
        </div>
        {error && <div>{error}</div>}
        <div className="form-margin">
          <button
            className="form-control form-outline btn btn-primary"
            type="submit"
          >
            Register
          </button>
        </div>
      </form>
    </div>
  );
};

const LinkComponent = () => {
  return (
    <div className="form-margin">
      <Link to="/">
        <div type="button">Already have an account? Login here.</div>
      </Link>
    </div>
  );
};

export default Register;
