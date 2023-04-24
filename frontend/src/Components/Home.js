import React from "react";
import "./Home.css";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Space, Button } from "antd";
import { startAddExpense } from "../Redux/Actions/expenseAction";
import ExpenseForm from "./ExpenseForm";
import ExpensesList from "./ExpensesList";
import CategoryChart from "./CategoryChart";
import ExpenseChart from "./ExpenseChart";
import Stats from "./Stats";
import Search from "./Search";

//
const Home = () => {
  const [showForm, setShowForm] = useState(false);
  const [filteredArr, setFilteredArr] = useState([]);
  const dispatch = useDispatch();

  const [category, expenses] = useSelector(state => {
    return [state.category, state.expenses];
  });

  const toggle = () => {
    setShowForm(!showForm);
  };

  const addData = formData => {
    dispatch(startAddExpense(formData));
  };

  //
  return (
    <div className='homePage'>
      {category.data.length > 0 ? (
        <div>
          <div className='stats'>
            <Stats />
          </div>
          <div className='chartsContainer'>
            <div className='chart1Container'>
              <CategoryChart />
            </div>
            <div className='chart2Container'>
              <ExpenseChart />
            </div>
          </div>
        </div>
      ) : (
        <h2>Add your first category inorder to start adding expenses</h2>
      )}

      {showForm ? (
        <div>
          <ExpenseForm toggle={toggle} addData={addData} />
        </div>
      ) : (
        <div>
          {category.data.length > 0 && (
            <div>
              <Space wrap>
                <Button onClick={toggle}>Add Expense</Button>
              </Space>
            </div>
          )}

          <div>
            <ExpensesList />
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
