import { useState } from "react"
import { Button, TextField, Typography } from "@mui/material"
import { Formik } from "formik"
import * as yup from "yup"
import { useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import { setLogin } from "../../state/index.js"

  const registerSchema = yup.object().shape({
    firstName: yup.string().required("First name is required"),
    lastName: yup.string().required("Last name is required"),
    email: yup.string().email("invalid email").required("Email is required"),
    username: yup.string()    
    .min(6,"Username must have at least 6 characters")
    .max(16, "Username can't be longer than 16 characters")
    .required("Username is required"),
    password: yup.string()    
    .min(8, "Password must have at least 8 characters")
    .max(50, "Password can't be longer than 50 characters")
    .required("Password is required")
  })

  const loginSchema = yup.object().shape({
    username: yup.string()
    .min(6,"Username must have at least 6 characters")
    .max(16, "Username can't be longer than 16 characters")
    .required("Username is required"),
    password: yup.string()
    .min(8, "Password must have at least 8 characters")
    .max(50, "Password can't be longer than 50 characters")
    .required("Password is required")
  })

  const initialValuesRegister = {
    firstName: "",
    lastName: "",
    email: "",
    username: "",
    password: ""
  }

  const initialValuesLogin = {
    username: "",
    password: ""
  } 

const LoginRegisterForm = () => {
  const [pageType, setPageType] = useState("login")
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const isLogin = pageType === "login"
  const isRegister = pageType === "register"

  const register = async (values, onSubmitProps) => {
    const formData = new FormData()
    for (let value in values) {
      formData.append(value, values[value]);
    }

    const savedUserResponse = await fetch(
      "http://localhost:5000/authorization/register",
      {
        method: "POST",
        body: formData,
      }
    );
    const savedUser = await savedUserResponse.json()
    onSubmitProps.resetForm()

    if (savedUser) {
      setPageType("login")
    }
  }

  const login = async (values, onSubmitProps) => {
    const loggedInResponse = await fetch("http://localhost:5000/authorization/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    })
    const loggedIn = await loggedInResponse.json()
    onSubmitProps.resetForm()
    if (loggedIn) {
      dispatch(
        setLogin({
          user: loggedIn.user,
          token: loggedIn.token,
        })
      );
      navigate("/workouts");
    }
  }

  const handleFormSubmit = async (values, onSubmitProps) => {
    if (isLogin) await login(values, onSubmitProps)
    if (isRegister) await register(values, onSubmitProps)
  }

  return (
    <Formik
      onSubmit={handleFormSubmit}
      initialValues={isLogin ? initialValuesLogin : initialValuesRegister}
      validationSchema={isLogin ? loginSchema : registerSchema}>
      {({
        values,
        errors,
        touched,
        handleBlur,
        handleChange,
        handleSubmit,
        resetForm
      }) => (
        <form onSubmit={handleSubmit}>
            {isRegister && (
              <>
                <TextField
                  label="First Name"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.firstName}
                  name="firstName"
                  error={Boolean(touched.firstName) && Boolean(errors.firstName)}
                  helperText={touched.firstName && errors.firstName}/>
                <TextField
                  label="Last Name"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.lastName}
                  name="lastName"
                  error={Boolean(touched.lastName) && Boolean(errors.lastName)}
                  helperText={touched.lastName && errors.lastName}/>
                <TextField
                  label="Email"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.email}
                  name="email"
                  error={Boolean(touched.email) && Boolean(errors.email)}
                  helperText={touched.email && errors.email}/>
              </>
            )}
            <TextField
              label="Username"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.username}
              name="username"
              error={Boolean(touched.username) && Boolean(errors.username)}
              helperText={touched.username && errors.username}/>
            <TextField
              label="Password"
              type="password"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.password}
              name="password"
              error={Boolean(touched.password) && Boolean(errors.password)}
              helperText={touched.password && errors.password}/>
            <Button type="submit">{isLogin ? "LOGIN" : "REGISTER"}</Button>
            <Typography onClick={() => {setPageType(isLogin ? "register" : "login")
              resetForm()}}>{isLogin ? "Don't have an account? Sign Up here." : "Already have an account? Login here."}
            </Typography>
        </form>
      )}
    </Formik>
  )
}

export default LoginRegisterForm