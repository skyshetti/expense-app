import axios from "axios";
// REGISTER
export const startRegisterUser = (formdata, props) => {
  return dispatch => {
    // api
    axios
      .post("http://localhost:5555/api/users/register", formdata)
      .then(response => {
        const result = response.data;
        if (result.hasOwnProperty("errors")) {
          dispatch(setErrors(result.errors));
        } else {
          dispatch(setErrors({}));
          alert("Registered successfully");
          props.history.push("/login");
        }
      })
      .catch(err => {
        alert(err.message);
      });
  };
};

const setErrors = data => {
  return {
    type: "SET_ERRORS",
    payload: data,
  };
};

// LOGIN
export const startLoginUser = (formData, props) => {
  return dispatch => {
    // api call
    axios
      .post("http://localhost:5555/api/users/login", formData)
      .then(response => {
        console.log(response.data);

        // show alert antd comp for successful login in green color
        localStorage.setItem("token", response.data.token);

        if (localStorage.getItem("token")) {
          // 2nd axios call to fetch user info
          dispatch(startGetUser(props));
          alert("Successful login");
          props.history.push("/settings");
        }
      })
      .catch(err => {
        alert("Invalid Email or Password");
      });
  };
};

// 2nd api call
export const startGetUser = props => {
  return dispatch => {
    axios
      .get("http://localhost:5555/api/users/account", {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      })
      .then(response => {
        const result = response.data;
        // set user info into store
        dispatch(setUserInfo(result));
        // props.history.push("/home");
      })
      .catch(err => {
        alert(err.message);
      });
  };
};

export const setUserInfo = user => {
  return {
    type: "SET_USER_INFO",
    payload: user,
  };
};

export const logoutUser = () => {
  return {
    type: "LOGOUT_USER",
  };
};

// MULTER
export const startUpdateProfilePic = formData => {
  return dispatch => {
    // api call to update profile pic
    axios
      .put(`http://localhost:5555/api/users/register`, formData, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      })
      .then(response => {
        const result = response.data;
        console.log(result);
        // update profile pic
        dispatch(updateProfilePic(result));
      })
      .catch(err => {
        alert(err.message);
      });
  };
};

const updateProfilePic = data => {
  return {
    type: "UPDATE_PROFILE_PIC",
    payload: data,
  };
};
