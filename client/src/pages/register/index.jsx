import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
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
      <div>
        <div>
          <form onSubmit={handleSubmit}>
            <div className="d-flex justify-content-center">
              <h1>Register</h1>
            </div>
            <div className="d-flex justify-content-center">
              <input
                className="form-control form-outline w-25"
                type="text"
                placeholder="First Name"
                name="firstName"
                onChange={handleChange}
                value={data.firstName}
                required
              />
            </div>
            <div className="d-flex justify-content-center">
              <input
                className="form-control form-outline w-25"
                type="text"
                placeholder="Last Name"
                name="lastName"
                onChange={handleChange}
                value={data.lastName}
                required
              />
            </div>
            <div className="d-flex justify-content-center">
              <input
                className="form-control form-outline w-25"
                type="email"
                placeholder="Email"
                name="email"
                onChange={handleChange}
                value={data.email}
                required
              />
            </div>
            <div className="d-flex justify-content-center">
              <input
                className="form-control form-outline w-25"
                type="username"
                placeholder="Username"
                name="username"
                onChange={handleChange}
                value={data.username}
                required
              />
            </div>
            <div className="d-flex justify-content-center">
              <input
                className="form-control form-outline w-25"
                type="password"
                placeholder="Password"
                name="password"
                onChange={handleChange}
                value={data.password}
                required
              />
            </div>
            {error && <div>{error}</div>}
            <div className="d-flex justify-content-center">
              <button
                className="form-control form-outline w-25 btn btn-primary"
                type="submit"
              >
                Register
              </button>
            </div>
          </form>
        </div>
        <br />
        <div className="d-flex justify-content-center">
          <Link to="/">
            <div type="button btn btn-primary">
              Already have an account? Login here.
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
