import React from "react";
import "./Category.css";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { startCreateUserCategories } from "../../Redux/Actions/categoryAction";

const Category = props => {
  const [categoryName, setCategoryName] = useState("");
  const dispatch = useDispatch();
  const handleClick = e => {
    setCategoryName(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    const formData = {
      name: categoryName,
    };
    dispatch(startCreateUserCategories(formData));
  };
  const category = useSelector(state => {
    return state.category;
  });
  useEffect(() => {
    setCategoryName("");
  }, [category]);

  //
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type='text'
          placeholder='category name here'
          value={categoryName}
          onChange={handleClick}
        />
        <input
          className='AddBtn'
          type='submit'
          value='Add'
          onSubmit={handleSubmit}
        />
      </form>
    </div>
  );
};

export default Category;
