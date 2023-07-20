import React, { useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axiosClient from "../axios-client";
import { useNavigate } from "react-router-dom";
import { useStateContext } from "../ContextProvider";
import "./viewsStyles.css";
import "bootstrap/dist/css/bootstrap.min.css";

interface RegisterForm {
  username: string;
  email: string;
  password: string;
}

const RegisterView: React.FC = () => {
  const { token } = useStateContext();
  const navigate = useNavigate();
  if (token) {
    navigate("/");
  }
  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, []);

  const initialValues: RegisterForm = {
    username: "",
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    username: Yup.string().required("Username is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  const handleSubmit = async (values: RegisterForm) => {
    try {
      const response = await axiosClient.post("/auth/register", values);
      console.log(response.data); // Handle successful registration response
      navigate("/login");
    } catch (error) {
      console.error(error); // Handle registration error
    }
  };

  return (
    <div className="container my-5">
      {" "}
      {/* Apply Bootstrap 'container' and 'my-5' classes */}
      <h2 className="text-center">Register</h2>{" "}
      {/* Apply Bootstrap 'text-center' class */}
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form className="mt-4">
          {" "}
          {/* Apply Bootstrap 'mt-4' class */}
          <div className="mb-3">
            <label htmlFor="username" className="form-label">
              Username:
            </label>
            <Field
              type="text"
              className="form-control"
              id="username"
              name="username"
            />
            <ErrorMessage
              name="username"
              component="div"
              className="text-danger"
            />{" "}
            {/* Apply Bootstrap 'text-danger' class */}
          </div>
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
            Register
          </button>{" "}
          {/* Apply Bootstrap 'btn' and 'btn-primary' classes */}
        </Form>
      </Formik>
    </div>
  );
};

export default RegisterView;
