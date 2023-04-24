import React from "react";
import "..//CategoryList.css";
import { useEffect } from "react";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import {
  startGetUserCategories,
  startDeleteCategory,
} from "../../Redux/Actions/categoryAction";
import { removeCategoryExpenses } from "../../Redux/Actions/expenseAction";

import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
  ToolOutlined,
  SmileOutlined,
  HomeOutlined,
  DeleteOutlined,
} from "@ant-design/icons";

//
const CategoryList = () => {
  const dispatch = useDispatch();

  const category = useSelector(state => {
    return state.category.data;
  });

  const handleDelete = id => {
    Swal.fire({
      title: "Are you sure?",
      text: "All Expenses belonging to this category will also be deleted! You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(result => {
      if (result.isConfirmed) {
        dispatch(startDeleteCategory(id));
        removeCategoryExpenses(id);
        Swal.fire("Deleted!", "Your file has been deleted.", "success");
      }
    });
  };
  //
  return (
    <div className='categoriesContainer'>
      <div></div>
      <ul>
        <div className='ListBox'>
          {category.map(ele => {
            return (
              <div className='inner-container' key={ele._id}>
                <li>
                  <span className='listItem'>{ele.name}</span>

                  <button
                    className='ListBtn'
                    onClick={() => {
                      handleDelete(ele._id);
                    }}
                  >
                    <span>
                      <DeleteOutlined className='icon' />
                    </span>
                  </button>
                </li>
              </div>
            );
          })}
        </div>
      </ul>
    </div>
  );
};

export default CategoryList;
