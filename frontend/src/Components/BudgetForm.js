import React from "react";
import "./Budgetform.css";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { startUpdateBudget } from "../Redux/Actions/budgetAction";

//
const BudgetForm = props => {
  const { budget, handleToggle } = props;
  const [newAmount, setNewAmount] = useState(
    budget.amount ? budget.amount : ""
  );
  console.log(budget, "in budget form");
  const dispatch = useDispatch();

  const handleSubmit = e => {
    e.preventDefault();
    const formData = {
      _id: budget._id,
      amount: newAmount,
    };
    dispatch(startUpdateBudget(formData));
    handleToggle();
  };

  return (
    <form className='BudgetForm' onSubmit={handleSubmit}>
      <input
        type='Number'
        value={newAmount}
        onChange={e => {
          setNewAmount(e.target.value);
        }}
      />
      <input className='SaveButton' type='submit' value='save' />
    </form>
  );
};

export default BudgetForm;
