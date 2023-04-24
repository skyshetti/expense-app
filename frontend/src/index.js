import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import configureStore from "./Redux/Store/configureStore";
import { startGetUser, startLoginUser } from "./Redux/Actions/userAction";
import { startGetUserCategories } from "./Redux/Actions/categoryAction";
import { startGetSoftDeletedExpenses } from "./Redux/Actions/expenseAction";
import { startGetUserBudget } from "./Redux/Actions/budgetAction";

const store = configureStore();
// console.log(store.getState());

store.subscribe(() => {
  console.log("state updated", store.getState());
});

if (localStorage.getItem("token")) {
  store.dispatch(startGetUser());
  store.dispatch(startGetUserCategories());
  store.dispatch(startGetSoftDeletedExpenses());
  store.dispatch(startGetUserBudget());
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);

reportWebVitals();
