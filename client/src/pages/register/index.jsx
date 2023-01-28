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
	const [error, setError] = useState("")
	const navigate = useNavigate()

	const handleChange = ({ currentTarget: input }) => {
		setData({ ...data, [input.name]: input.value })
	}

	const handleSubmit = async (e) => {
		e.preventDefault()
		try {
			const url = "http://localhost:5000/authorization/register"
			const { data: res } = await axios.post(url, data)
			navigate("/")
			console.log(res.message)
		} catch (error) {
			if (
				error.response &&
				error.response.status >= 400 &&
				error.response.status <= 500
			) {
				setError(error.response.data.message)
			}
		}
	};

	return (
		<div>
			<div>
				<div >
					<form onSubmit={handleSubmit}>
						<h1>Register</h1>
						<input
							type="text"
							placeholder="First Name"
							name="firstName"
							onChange={handleChange}
							value={data.firstName}
							required
						/>
						<input
							type="text"
							placeholder="Last Name"
							name="lastName"
							onChange={handleChange}
							value={data.lastName}
							required
						/>
						<input
							type="email"
							placeholder="Email"
							name="email"
							onChange={handleChange}
							value={data.email}
							required
						/>
            <input
							type="username"
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
						<button type="submit" >Register</button>
					</form>
				</div>
          <div>
            <Link to="/">
              <div type="button">Already have an account? Login here.</div>
            </Link>
				  </div>
			</div>
		</div>
	)
}

export default Register