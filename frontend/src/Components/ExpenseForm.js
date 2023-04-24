import React from "react";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { startAddExpense } from "../Redux/Actions/expenseAction";
import { Space, Button } from "antd";
import "./ExpenseForm.css";
const ExpenseForm = props => {
  const { name: newName, date: newDate, amount: newAmount, categoryId } = props;

  console.log(newName, newDate, newAmount, categoryId);
  const { toggle, addData } = props;
  const [name, setName] = useState(newName ? newName : "");
  const [amount, setAmount] = useState(newAmount ? newAmount : "");
  const [date, setDate] = useState(newDate ? newDate : "");
  const [category, setCategory] = useState(categoryId ? categoryId : "");

  const dispatch = useDispatch();

  const categories = useSelector(state => {
    return state.category.data;
  });

  useEffect(() => {
    setCategory(categoryId ? categoryId : "");
  }, [categoryId]);

  const handleChange = e => {
    if (e.target.name == "name") {
      setName(e.target.value);
    } else if (e.target.name == "amount") {
      setAmount(e.target.value);
    } else if (e.target.name == "date") {
      setDate(e.target.value);
    } else {
      setCategory(e.target.value);
    }
  };

  const handleSubmit = e => {
    e.preventDefault();
    const formData = {
      name,
      amount,
      date,
      categoryId: category,
    };
    console.log(formData);

    addData(formData);
    toggle(false);
  };

  return (
    <div className='formContainer'>
      <form onSubmit={handleSubmit}>
        <label>Name</label>
        <input type='text' value={name} name='name' onChange={handleChange} />

        <label>Amount</label>
        <input
          type='Number'
          value={amount}
          name='amount'
          onChange={handleChange}
        />

        <label>Date</label>
        <input type='Date' value={date} name='date' onChange={handleChange} />

        <label> Category</label>
        <select value={category} onChange={handleChange}>
          <option value=''>select category</option>
          {categories.map(ele => {
            return (
              <option key={ele._id} value={ele._id}>
                {ele.name}
              </option>
            );
          })}
        </select>
        <input className='inputBtn' type='submit' />
      </form>
      <div className='cancelBtn'>
        <Space wrap>
          <Button
            onClick={() => {
              toggle();
            }}
          >
            Cancel
          </Button>
        </Space>
      </div>
    </div>
  );
};

export default ExpenseForm;
