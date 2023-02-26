import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLogin } from "../../state/index.js";
import "./styles.css";

const Login = () => {
  const [data, setData] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };

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
    <div className="h-100">
      <div>
        <div>
          <h1 className="center">Login</h1>
        </div>
        <div>
          <form onSubmit={handleSubmit}>
            <div className="center">
              <input
                className="form-control form-outline w-25"
                type="text"
                placeholder="Username"
                name="username"
                onChange={handleChange}
                value={data.username}
                required
              />
            </div>
            <div className="center">
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
            {error && <div className="center">{error}</div>}
            <div className="center">
              <button
                className="form-control form-outline w-25 btn btn-primary"
                type="submit"
              >
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
      <br />
      <div className="center">
        <Link to="/register">
          <div type="button">Don't have an account? Sign Up here.</div>
        </Link>
      </div>
    </div>
  );
};

export default Login;
