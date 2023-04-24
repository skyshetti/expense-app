import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import "./Login.css";
import { startLoginUser } from "../Redux/Actions/userAction";
import { useDispatch } from "react-redux";
import { Alert, Space } from "antd";
import Button from "./Button";

const Login = props => {
  const dispatch = useDispatch();

  // Formik
  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .required("Password is required")
      .min(8, "Password must be at least 8 characters long"),
  });

  const onSubmit = formData => {
    // dispatch formdata
    dispatch(startLoginUser(formData, props));
  };

  return (
    <div className='Main'>
      <img
        src='https://images.pexels.com/photos/1084510/pexels-photo-1084510.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
        alt=''
      />

      <div className='LoginContainer'>
        <div className='login-text'>
          <h1 className='title'>Login here</h1>
        </div>
        <div className='layoutz'>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
          >
            {({ errors, touched }) => (
              <Form>
                <div className='formContainer'>
                  <div className='form-group'>
                    <label className='labelBox' htmlFor='email'>
                      Email
                    </label>
                    <Field name='email' type='email' className='form-control' />
                    <ErrorMessage name='email' className='error-message' />
                  </div>
                  <div className='form-group'>
                    <label className='labelBox' htmlFor='password'>
                      Password
                    </label>
                    <Field
                      name='password'
                      type='password'
                      className='form-control'
                    />
                    <ErrorMessage name='password' className='error-message' />
                  </div>
                </div>
                <div className='Btnz'>
                  <Button buttonName={"Log in"} className='btn btn-primary' />
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default Login;
