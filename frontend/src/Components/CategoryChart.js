import React from "react";
import { Chart } from "react-google-charts";
import { useSelector } from "react-redux";

//
const CategoryChart = props => {
  const [expenses, category] = useSelector(state => {
    return [state.expenses.data, state.category.data];
  });

  //
  let data = [["Category Name", "Total Expense"]];

  category.forEach(ele => {
    const sum = expenses.reduce((pv, cv) => {
      if (cv.categoryId == ele._id) {
        return cv.amount + pv;
      } else {
        return pv;
      }
    }, 0);

    const newArr = [ele.name, sum];
    data = [...data, newArr];
  });

  console.log(data);

  let count = 0;
  data.forEach(ele => {
    if (ele[1] > 0) {
      count = count + 1;
    }
  });

  console.log(count);

  const options = {
    title: "Category wise Expenses",
    is3D: true,
  };

  //
  return (
    <div>
      {expenses.length > 0 ? (
        <Chart
          chartType={count <= 3 ? "PieChart" : "ColumnChart"}
          data={data}
          options={options}
          width={"100%"}
          height={"400px"}
        />
      ) : (
        <span> Add your first Expense to begin with.</span>
      )}
    </div>
  );
};

export default CategoryChart;
