import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom"

const Login = () => {
	const [data, setData] = useState({ username: "", password: "" })
	const [error, setError] = useState("")
    const navigate = useNavigate()

	const handleChange = ({ currentTarget: input }) => {
		setData({ ...data, [input.name]: input.value })
	};

	const handleSubmit = async (e) => {
		e.preventDefault()
		try {
			const url = "http://localhost:5000/authorization/register"
			const {data: res} = await axios.post(url, data)
			console.log(res.message);
			navigate("/workouts")
		} catch (error) {
			if (
				error.response &&
				error.response.status >= 400 &&
				error.response.status <= 500
			) {
				setError(error.response.data.message)
			}
		}
	}

	return (
		<div>
			<div>
				<div>
					<form onSubmit={handleSubmit}>
						<h1>Login</h1>
						<input
							type="text"
							placeholder="Username"
							name="username"
							onChange={handleChange}
							value={data.username}
							required
						/>
						<input
							type="password"
							placeholder="Password"
							name="password"
							onChange={handleChange}
							value={data.password}
							required
						/>
						{error && <div>{error}</div>}
						<button type="submit">Login</button>
					</form>
				</div>
				<div>
					<Link to="/register">
						<div type="button">Don't have an account? Sign Up here.</div>
					</Link>
				</div>
			</div>
		</div>
	)
}

export default Login