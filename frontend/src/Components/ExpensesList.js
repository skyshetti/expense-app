import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { StartgetExpenses } from "../Redux/Actions/expenseAction";
import AntTable, { MyTable } from "./MyTable";

const ExpensesList = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    // get all expenses
    dispatch(StartgetExpenses());
  }, [dispatch]);

  return (
    <div>
      <MyTable />
    </div>
  );
};

export default ExpensesList;
