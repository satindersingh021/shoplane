import { Field, Form, Formik, useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import React, { useState } from "react";
import axios from "axios";
import Endpoints from "../api/endpoints";
import Navbar from "../components/Navbar";

function Login() {
  const navigate = useNavigate();
  const [requestResponse, setRequestResponse] = useState({
    textMessage: "",
    alertClass: "",
  });

  const initialValues = {
    username: "jimmie_k",
    password: "klein*#%*",
  };

  const onSubmit = (values) => {
    axios
      .post(Endpoints.LOGIN_URL, values)
      .then(
        (response) => {
          setRequestResponse({
            textMessage: `You are Successfully logged in with token ${response.data.token}`,
            alertClass: "alert alert-success",
          });
          setTimeout(() => {
            navigate("/");
          }, 2000);
          localStorage.setItem("token", response.data.token);
          localStorage.setItem("user", JSON.stringify(response.config.data));
        },
        (error) => {
          setRequestResponse({
            textMessage: `${error.message} Incorrect login`,
            alertClass: "alert alert-danger",
          });
        }
      )
      .catch((error) => {
        console.log(error.message);
      });
  };

  const validationSchema = Yup.object().shape({
    username: Yup.string().required("Please enter your username"),
    password: Yup.string()
      .required("Please enter your password")
      .min(6, "Password must be at least 6 characters"),
  });

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
    // validateOnMount: true,
  });

  return (
    <div>
      <div className="container">
        <Navbar />
        <div className="row">
          <div className="col-md-3"></div>
          <div className="col-md-6">
            <div className="card">
              <div className="card-body">
                <h1 className="text-center display-4">Login</h1>
                <hr />
                <div className={requestResponse.alertClass} role="alert">
                  {requestResponse.textMessage}
                </div>
                <Formik>
                  <Form onSubmit={formik.handleSubmit}>
                    <div className="mb-3">
                      <Field
                        name="username"
                        type="text"
                        value={formik.values.username}
                        placeholder="Username"
                        className="form-control form-control-lg"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                      {formik.errors.username && formik.touched.username ? (
                        <small className="text-danger">
                          {formik.errors.username}
                        </small>
                      ) : null}
                    </div>
                    <div className="mb-3">
                      <Field
                        name="password"
                        type="password"
                        value={formik.values.password}
                        placeholder="Password"
                        className="form-control form-control-lg"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                      {formik.errors.password && formik.touched.password ? (
                        <small className="text-danger">
                          {formik.errors.password}
                        </small>
                      ) : null}
                    </div>
                    <p className="text-center">
                      Don't have an account? Sign Up &nbsp;
                      <Link to="/register">here</Link>
                    </p>
                    <div className="d-grid gap-2">
                      <input
                        type="submit"
                        value="Login"
                        className="btn btn-primary btn-lg"
                        // disabled={!formik.isValid}
                      />
                    </div>
                  </Form>
                </Formik>
              </div>
            </div>
          </div>
          <div className="col-md-3"></div>
        </div>
      </div>
    </div>
  );
}

export default Login;
