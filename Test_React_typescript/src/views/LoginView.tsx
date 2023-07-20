import React, { useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axiosClient from "../axios-client";
import "bootstrap/dist/css/bootstrap.min.css";
import Cookies from "universal-cookie";
import { useStateContext } from "../ContextProvider";
import { useNavigate } from "react-router-dom";

interface LoginForm {
  email: string;
  password: string;
}

const LoginView: React.FC = () => {
  const cookies = new Cookies();
  const { token, setToken, setUser } = useStateContext();
  const navigate = useNavigate();

  if (token) {
    navigate("/");
  }

  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, []);

  const initialValues: LoginForm = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  const handleSubmit = async (values: LoginForm) => {
    try {
      const response = await axiosClient.post("/auth/login", values);
      console.log("token");
      console.log(response.data); // Handle successful login response
      setToken(response.data.authentication.sessionToken);
      console.log("token" + token);
      console.log("token");
      setUser(response.data.username);
      cookies.set("AUTH-TOKEN", response.data.authentication.sessionToken, {
        path: "/",
        domain: "localhost",
      });
    } catch (error) {
      console.error(error); // Handle login error
    }
  };

  return (
    <div className="container my-5">
      {/* Apply Bootstrap 'container' and 'my-5' classes */}
      <h2 className="text-center">Login</h2>{" "}
      {/* Apply Bootstrap 'text-center' class */}
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form className="mt-4">
          {/* Apply Bootstrap 'mt-4' class */}
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email:
            </label>
            <Field
              type="email"
              className="form-control"
              id="email"
              name="email"
            />
            <ErrorMessage
              name="email"
              component="div"
              className="text-danger"
            />{" "}
            {/* Apply Bootstrap 'text-danger' class */}
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password:
            </label>
            <Field
              type="password"
              className="form-control"
              id="password"
              name="password"
            />
            <ErrorMessage
              name="password"
              component="div"
              className="text-danger"
            />{" "}
            {/* Apply Bootstrap 'text-danger' class */}
          </div>
          <button type="submit" className="btn btn-primary">
            Login
          </button>{" "}
          {/* Apply Bootstrap 'btn' and 'btn-primary' classes */}
        </Form>
      </Formik>
    </div>
  );
};

export default LoginView;
