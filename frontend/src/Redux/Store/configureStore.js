import React from "react";
import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import usersReducer from "../Reducers/usersReducer";
import budgetReducer from "../Reducers/budgetReducer";
import categoryReducer from "../Reducers/categoryReducer";
import expensesReducer from "../Reducers/expenseReducer";
const configureStore = () => {
  const store = createStore(
    combineReducers({
      users: usersReducer,
      budget: budgetReducer,
      category: categoryReducer,
      expenses: expensesReducer,
    }),
    applyMiddleware(thunk)
  );
  return store;
};

export default configureStore;
