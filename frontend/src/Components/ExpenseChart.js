import React from "react";
import { Chart } from "react-google-charts";
import { useSelector } from "react-redux";

//
//
const ExpenseChart = () => {
  const [budget, expenses] = useSelector(state => {
    return [state.budget.data, state.expenses.data];
  });

  const totalExpense = expenses.reduce((pv, cv) => {
    return pv + cv.amount;
  }, 0);

  const totalBudget = budget.amount;

  const data = [
    ["Task", "Hours per Day"],
    ["Total Budget", totalBudget],
    ["Total Expense", totalExpense], // CSS-style declaration
  ];

  const options = {
    title: "Total Budget VS Total Expenses",
    pieHole: 0.4,
    is3D: false,
  };

  //
  return (
    <Chart
      chartType='PieChart'
      data={data}
      options={options}
      width={"100%"}
      height={"400px"}
    />
  );
};

export default ExpenseChart;
