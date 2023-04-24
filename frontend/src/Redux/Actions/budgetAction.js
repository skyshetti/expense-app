import axios from "axios";

//
export const startGetUserBudget = () => {
  return dispatch => {
    // api call
    axios
      .get("http://localhost:5555/api/users/budget", {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      })
      .then(response => {
        const data = response.data;
        console.log(data);
        // set user budget into store
        dispatch(setUserBudgetAmount(data));
      })
      .catch(err => {
        alert(err.message);
      });
  };
};

const setUserBudgetAmount = budget => {
  return {
    type: "SET_USER_BUDGET",
    payload: budget,
  };
};

export const startUpdateBudget = formdata => {
  const id = formdata._id;
  const amount = Number(formdata.amount);
  // console.log(id, amount);
  return dispatch => {
    // api call to update budget
    axios
      .put(
        `http://localhost:5555/api/users/budget/${id}`,
        { amount },
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      )
      .then(response => {
        const data = response.data;
        console.log(data);
        // update user budget into store
        dispatch(setUpdateBudgetAmount(data));
      })
      .catch(err => {
        alert(err.message);
      });
  };
};

const setUpdateBudgetAmount = newBudget => {
  return {
    type: "UPDATE_BUDGET",
    payload: newBudget,
  };
};
