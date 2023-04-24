import React from "react";
import { Route, Redirect } from "react-router-dom";

const PrivateRoute = ({ component: Component, ...rest }) => {
  //   console.log(Component);
  return (
    <Route
      {...rest}
      render={props => {
        return localStorage.getItem("token") ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: "/login" }} />
        );
      }}
    />
  );
};

export default PrivateRoute;
