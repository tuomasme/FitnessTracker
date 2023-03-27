import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLogin } from "../../state/index.js";
import "./styles.css";

const Login = () => {
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
        <LoginHeader />
      </div>
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: "40%",
          transform: "translate(-50%, -50%)",
          width: "35%",
        }}
      >
        <LoginForm />
        <LoginLink />
      </div>
    </div>
  );
};

const LoginHeader = () => {
  return (
    <div>
      <h1>Login to Fitness Tracker</h1>
    </div>
  );
};

const LoginForm = () => {
  const [data, setData] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };

  // Login request
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = "http://localhost:5000/authorization/login";
      const res = await axios.post(url, data);
      if (res) {
        dispatch(
          setLogin({
            user: res.data.user,
            token: res.data.token,
          })
        );
        navigate("/workouts");
      }
    } catch (error) {
      setError(error.response.data.message);
      console.log(error);
    }
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <table>
          <tr>
            <td style={{ width: "10%" }}>
              <label htmlFor="username">Username</label>
            </td>
            <td>
              <input
                className="form-control form-outline input"
                type="text"
                placeholder="Username"
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
                placeholder="Password"
                name="password"
                onChange={handleChange}
                value={data.password}
                required
              />
            </td>
          </tr>
          <tr>
            <td colSpan={2}>
              {error && <div className="form-margin error-color">{error}</div>}
            </td>
          </tr>
          <tr>
            <td>&nbsp;</td>
            <td>
              <button
                className="form-control form-outline btn btn-primary input"
                type="submit"
              >
                Login
              </button>
            </td>
          </tr>
        </table>
      </form>
    </div>
  );
};

const LoginLink = () => {
  return (
    <div className="form-margin">
      <Link to="/register">
        <div type="button">Don't have an account? Sign Up here.</div>
      </Link>
    </div>
  );
};

export default Login;
