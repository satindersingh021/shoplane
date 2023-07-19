import { Formik, Field, Form, useFormik } from "formik";
import { Link } from "react-router-dom";
import React, { useState } from "react";
import * as Yup from "yup";
// import { hasFormSubmit } from "@testing-library/user-event/dist/utils";
import axios from "axios";
import Endpoints from "../api/endpoints";
import Navbar from "../components/Navbar";

function SignUp() {
  const [requestResponse, setRequestResponse] = useState({
    textMessage: "",
    alertClass: "",
  });

  const initialValues = {
    firstname: "asdf",
    lastname: "asdf",
    email: "asdf@asdf.com",
    password: "123456",
    confirmPassword: "123456",
  };

  const onSubmit = (values) => {
    axios
      .post(Endpoints.REGISTER_URL, values)
      .then(
        (response) => {
          setRequestResponse({
            textMessage: `You are registered successfully ${response.data.id}`,
            alertClass: "alert alert-success",
          });
        },
        (error) => {
          setRequestResponse({
            textMessage: `You are not registered successfully ${error.response.data.id}`,
            alertClass: "alert alert-danger",
          });
        }
      )
      .catch((error) => {
        console.error(error);
      });
  };

  const validationSchema = Yup.object().shape({
    firstname: Yup.string().required("First Name is required"),
    lastname: Yup.string().required("Last Name is required"),
    email: Yup.string()
      .email("Email should be in proper format")
      .required("Email is required"),
    password: Yup.string()
      .required("Password is required")
      .min(6, "Password must be at least 6 characters"),
    confirmPassword: Yup.string()
      .required("Please re-enter your password")
      .oneOf([Yup.ref("password")], "Password does not match"),
  });

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
    validateOnMount: true,
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
                <h1 className="text-center display-4">Sign Up</h1>
                <br />
                <div className={requestResponse.alertClass} role="alert">
                  {requestResponse.textMessage}
                </div>

                <Formik>
                  <Form onSubmit={formik.handleSubmit}>
                    <div className="form-group mb-3">
                      <Field
                        name="firstname"
                        placeholder="First Name"
                        type="text"
                        className="form-control form-control-lg"
                        value={formik.values.firstname}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                      {formik.touched.firstname && formik.errors.firstname ? (
                        <small className="text-danger">
                          {formik.errors.firstname}
                        </small>
                      ) : null}
                    </div>
                    <div className="form-group mb-3">
                      <Field
                        name="lastname"
                        type="text"
                        placeholder="Last Name"
                        className="form-control form-control-lg"
                        value={formik.values.lastname}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                      {formik.touched.lastname && formik.errors.lastname ? (
                        <small className="text-danger">
                          {formik.errors.lastname}
                        </small>
                      ) : null}
                    </div>
                    <div className="form-group mb-3">
                      <Field
                        name="email"
                        type="email"
                        placeholder="Email"
                        className="form-control form-control-lg"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                      {formik.touched.email && formik.errors.email ? (
                        <small className="text-danger">
                          {formik.errors.email}
                        </small>
                      ) : null}
                    </div>
                    <div className="form-group mb-3">
                      <Field
                        name="password"
                        type="password"
                        placeholder="Password"
                        className="form-control form-control-lg"
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                      {formik.touched.password && formik.errors.password ? (
                        <small className="text-danger">
                          {formik.errors.password}
                        </small>
                      ) : null}
                    </div>
                    <div className="form-group mb-3">
                      <Field
                        name="confirmPassword"
                        type="password"
                        placeholder="ConfirmPassword"
                        className="form-control form-control-lg"
                        value={formik.values.confirmPassword}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                      {formik.touched.confirmPassword &&
                      formik.errors.confirmPassword ? (
                        <small className="text-danger">
                          {formik.errors.confirmPassword}
                        </small>
                      ) : null}
                    </div>
                    <p className="text-center">
                      Already have an account? Login{" "}
                      <Link to="/login">here</Link>
                    </p>
                    <div className="d-grid gap-2">
                      <input
                        type="submit"
                        value="Sign Up"
                        className="btn btn-primary btn-lg"
                        disabled={!formik.isValid}
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

export default SignUp;
