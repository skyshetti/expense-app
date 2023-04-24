import axios from "axios";
export const startCreateUserCategories = formData => {
  return dispatch => {
    // api call to create user category
    axios
      .post("http://localhost:5555/api/users/category", formData, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      })
      .then(response => {
        // console.log(response.data);
        const category = response.data;
        if (category.hasOwnProperty("errors")) {
          dispatch(setErrors(category.errors));
          alert(category.message);
        } else {
          dispatch(addCategory(category));
          setErrors(dispatch(setErrors({})));
        }
      })
      .catch(err => {
        console.log(err);
      });
  };
};

const setErrors = errors => {
  return {
    type: "SET_ERRORS",
    payload: errors,
  };
};

const addCategory = category => {
  return {
    type: "ADD_CATEGORY",
    payload: category,
  };
};

export const startGetUserCategories = () => {
  return dispatch => {
    // api call to get user category
    axios
      .get("http://localhost:5555/api/users/category", {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      })
      .then(response => {
        console.log(response.data);
        const data = response.data;
        dispatch(getUserCategory(data));
      })
      .catch(err => {
        console.log(err);
      });
  };
};

const getUserCategory = categories => {
  return {
    type: "SET_CATEGORY",
    payload: categories,
  };
};

export const startDeleteCategory = id => {
  return dispatch => {
    // api call to delete category
    axios
      .delete(`http://localhost:5555/api/users/category/${id}`, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      })
      .then(response => {
        // console.log(response.data);
        const data = response.data;
        dispatch(deleteCategory(data));
      })
      .catch(err => {
        alert(err);
      });
  };
};

const deleteCategory = deleted => {
  return {
    type: "DELETE_CATEGORY",
    payload: deleted,
  };
};
