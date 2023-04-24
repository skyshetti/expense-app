import React from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import { logoutUser } from "../Redux/Actions/userAction";
const Logout = props => {
  const dispatch = useDispatch();
  useEffect(() => {
    Swal.fire({
      title: "Are you sure you want to Logout?",
      // icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Log out!",
    }).then(result => {
      if (result.isConfirmed) {
        localStorage.removeItem("token");
        dispatch(logoutUser());
        Swal.fire("Logging out", "success");
        props.history.push("/login");
      } else {
        props.history.push("/home");
      }
    });
  }, []);

  return <div></div>;
};

export default Logout;
