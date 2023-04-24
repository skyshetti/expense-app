import axios from "axios";
export const startAddExpense = formData => {
  return dispatch => {
    // api call to create expense
    axios
      .post("http://localhost:5555/api/users/expense", formData, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      })
      .then(response => {
        const data = response.data;
        console.log("server", data);
        // dispatch(addExpense(data));
      })
      .catch(err => {
        alert(err.message);
      });
  };
};

const addExpense = expense => {
  return {
    type: "ADD_EXPENSE",
    payload: expense,
  };
};

export const StartgetExpenses = () => {
  // api call to get all expenses
  return dispatch => {
    axios
      .get("http://localhost:5555/api/users/expense", {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      })
      .then(response => {
        const data = response.data;
        // console.log(data);
        dispatch(setExpense(data));
      })
      .catch(err => {
        alert(err.message);
      });
  };
};

const setExpense = expenses => {
  return {
    type: "SET_EXPENSES",
    payload: expenses,
  };
};

export const startEditExpense = (editedFormData, id) => {
  return dispatch => {
    // api call to edit expense
    axios
      .put(`http://localhost:5555/api/users/expense/${id}`, editedFormData, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      })
      .then(response => {
        const data = response.data;
        console.log(data);
        // update expense into store
        dispatch(setUpdateExpense(data));
      })
      .catch(err => {
        alert(err.message);
      });
  };
};

const setUpdateExpense = data => {
  return {
    type: "SET_EXPENSE_UPDATE",
    payload: data,
  };
};

// DELETE
export const startDeleteExpense = id => {
  return dispatch => {
    // api call to soft delete expense
    axios
      .delete(`http://localhost:5555/api/users/expense/${id}`, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      })
      .then(response => {
        // const data = response.data;
        // console.log(data);
        // update expense into store
        dispatch(setDeleteExpense(id));
      })
      .catch(err => {
        alert(err.message);
      });
  };
};

const setDeleteExpense = id => {
  return {
    type: "SET_DELETE_EXPENSE",
    payload: id,
  };
};

export const startGetSoftDeletedExpenses = () => {
  // api call to GET softDeleted Expenses
  return dispatch => {
    axios
      .get("http://localhost:5555/api/users/expense/res", {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      })
      .then(response => {
        const data = response.data;
        dispatch(setSoftDeletedData(data));
      })
      .catch(err => {
        alert(err.message);
      });
  };
};

const setSoftDeletedData = data => {
  return {
    type: "SET_SOFT_DELETED_EXPENSE",
    payload: data,
  };
};

export const startPermanentDeleteExpense = id => {
  //api call to permanently delete expense
  return dispatch => {
    axios
      .delete(`http://localhost:5555/api/users/expense/permanent/${id}`, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      })
      .then(response => {
        const data = response.data;
        // console.log("aaya data", data);
        dispatch(setDeletedData(data));
      })
      .catch(err => {
        alert(err.message);
      });
  };
};

const setDeletedData = deleted => {
  return {
    type: "REMOVE_EXPENSE",
    payload: deleted,
  };
};

export const startRestoreExpense = id => {
  return dispatch => {
    // axios call to restore expense (no body needed-{})
    axios
      .put(
        `http://localhost:5555/api/users/expense/undo/${id}`,
        {},
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      )
      .then(response => {
        const data = response.data;
        console.log("aaya restore data", data);
        dispatch(setRestoreData(data));
      })
      .catch(err => {
        alert(err.message);
      });
  };
};

const setRestoreData = data => {
  return {
    type: "RESTORE_EXPENSE",
    payload: data,
  };
};

export const search_expense = arr => {
  console.log("in action", arr);
  return {
    type: "SEARCH_EXPENSE",
    payload: arr,
  };
};

export const removeCategoryExpenses = id => {
  return {
    type: "REMOVE_CATEGORY_EXPENSES",
    payload: id,
  };
};

// MULTER PDF
export const startUpdatePdf = (id, formData) => {
  return dispatch => {
    // axios call to restore expense (no body needed-{})
    axios
      .put(`http://localhost:5555/api/users/pdf/${id}`, formData, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      })
      .then(response => {
        const data = response.data;
        // console.log("aaya restore data", data);
        dispatch(setUpdateExpense(data));
      })
      .catch(err => {
        alert(err.message);
      });
  };
};

// const setPdf = data => {
//   return {
//     type: "PDF",
//     payload: data,
//   };
// };
