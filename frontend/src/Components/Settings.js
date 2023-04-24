import React from "react";
import "./Settings.css";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { startGetUserBudget } from "../Redux/Actions/budgetAction";
import { startGetUserCategories } from "../Redux/Actions/categoryAction";
import BudgetForm from "./BudgetForm";
import Category from "./Category/Category";
import CategoryList from "./Category/CategoryList";

const Settings = () => {
  const dispatch = useDispatch();
  const [toggle, setToggle] = useState(true);

  useEffect(() => {
    // dispatch action to get user budget
    dispatch(startGetUserBudget());
    dispatch(startGetUserCategories());
  }, []);

  const budgetInfo = useSelector(state => {
    return state.budget.data;
  });

  const handleToggle = () => {
    setToggle(!toggle);
  };
  return (
    <div className='SettingsPage'>
      <div className='container'>
        {toggle ? (
          <div className='budgetContainer'>
            <div className='budgetHeading'>
              <div className='amountTitle'>Total Budget</div>
              <div className='amount'>{budgetInfo.amount}</div>
            </div>
            <div>
              <button className='Btn' onClick={handleToggle}>
                Update
              </button>
            </div>
          </div>
        ) : (
          <div className='budgetContainer'>
            <BudgetForm budget={budgetInfo} handleToggle={handleToggle} />
            <div>
              <button
                className='Btn'
                onClick={() => {
                  setToggle(!toggle);
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        )}
        <div className='budgetContainer'>
          <Category />
        </div>
      </div>
      <div className='categoryList'>
        <CategoryList />
      </div>
    </div>
  );
};

export default Settings;
