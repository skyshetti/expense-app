import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import "./Registration.css";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { startRegisterUser } from "../Redux/Actions/userAction";
import { useSelector } from "react-redux";
import Button from "./Button";

const SignupForm = props => {
  const dispatch = useDispatch();

  const errors = useSelector(state => {
    return state.users.errors;
  });

  // Formik
  const initialValues = {
    username: "",
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    username: Yup.string().required("Username is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .required("Password is required")
      .min(8, "Password must be at least 8 characters long"),
  });

  const onSubmit = formdata => {
    // dispatch formdata
    console.log(formdata, props);
    dispatch(startRegisterUser(formdata, props));
  };

  return (
    <div className='Main'>
      <img
        src='https://images.pexels.com/photos/1084510/pexels-photo-1084510.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
        alt=''
      />
      <div className='LoginContainer'>
        <div className='signup-text'>
          <h1 className='title'>Register here</h1>
        </div>

        {Object.keys(errors).includes("username") &&
          alert(errors.username.message)}
        {Object.keys(errors).includes("email") && alert(errors.email.message)}
        {Object.keys(errors).includes("password") &&
          alert(errors.password.message)}

        <div className='layoutzq'>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
          >
            {({ errors, touched }) => (
              <Form>
                <div className='formContainer'>
                  <div className='form-group'>
                    <label className='labelBox' htmlFor='username'>
                      Username
                    </label>
                    <Field name='username' type='text' className='field' />
                    <ErrorMessage name='username' />
                  </div>

                  <div className='form-group'>
                    <label className='labelBox' htmlFor='email'>
                      Email
                    </label>
                    <Field name='email' type='email' className='field' />
                    <ErrorMessage name='email' />
                  </div>

                  <div className='form-group'>
                    <label className='labelBox' htmlFor='password'>
                      Password
                    </label>
                    <Field name='password' type='password' className='field' />
                    <ErrorMessage name='password' />
                  </div>

                  <Button buttonName={"Register"} />
                </div>
              </Form>
            )}
          </Formik>
        </div>

        <div className='sub-text'>
          <span>
            Already registered?{" "}
            <Link to='/Login'>
              {" "}
              <span style={{ color: "Blue" }}>Login</span>{" "}
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default SignupForm;
