import React from "react";
import ExpenseForm from "./ExpenseForm";
import "./Mytable.css";
import { Button } from "antd";
import Swal from "sweetalert2";
import { useDispatch } from "react-redux";
import {
  startEditExpense,
  startDeleteExpense,
  StartgetExpenses,
  search_expense,
  startUpdatePdf,
} from "../Redux/Actions/expenseAction";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import { Space, Table, Tag } from "antd";
const { Column, ColumnGroup } = Table;

export const MyTable = () => {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [expenseId, setExpenseId] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [file, setFile] = useState({});

  const [showForm, setShowForm] = useState(false);
  const dispatch = useDispatch();
  const toggle = (name, amount, categoryId, date, id) => {
    setName(name);
    setAmount(amount);
    setCategoryId(categoryId);
    setDate(date);
    setExpenseId(id);
    setShowForm(!showForm);
  };

  const addData = editedformData => {
    console.log(editedformData);
    dispatch(startEditExpense(editedformData, expenseId));
  };

  //
  const [expenses, category] = useSelector(state => {
    return [state.expenses.data, state.category.data];
  });

  const handleSearchChange = e => {
    const value = e.target.value;
    setSearchTerm(value);
    if (value) {
      const arr = category.filter(ele => {
        return ele.name.toLowerCase().includes(value.toLowerCase());
      });
      dispatch(search_expense(arr));
    } else if (!value) {
      dispatch(StartgetExpenses());
    }
  };
  //
  const data = expenses.map((ele, i) => {
    const categoryName = category.find(cat => cat._id == ele.categoryId);
    if (categoryName) {
      return { ...ele, key: i, categoryName: categoryName.name };
    } else {
      return { ...ele, key: i };
    }
  });

  const handleDeleteClick = id => {
    Swal.fire({
      title: "Are you sure?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(result => {
      if (result.isConfirmed) {
        dispatch(startDeleteExpense(id));
        Swal.fire("Deleted!", "Your file has been deleted.", "success");
      }
    });
  };

  const handleFileChange = e => {
    setFile(e.target.files[0]);
    console.log(e.target.files[0]);
  };

  const handleSubmit = (e, id) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("pdf", file);
    dispatch(startUpdatePdf(id, formData));
  };

  return showForm ? (
    <ExpenseForm
      toggle={toggle}
      addData={addData}
      name={name}
      amount={amount}
      date={date}
      categoryId={categoryId}
    />
  ) : (
    <div>
      <div className='searchBox'>
        <input type='text' placeholder='search' onChange={handleSearchChange} />
      </div>
      <div>
        <Table dataSource={data}>
          <Column
            title='Category Name'
            dataIndex='categoryName'
            sorter={{
              compare: (a, b) =>
                a.categoryName.toLowerCase() > b.categoryName.toLowerCase()
                  ? 1
                  : -1,
              multiple: 1,
            }}
          />
          <Column
            title='Expense Name'
            dataIndex='name'
            sorter={{
              compare: (a, b) =>
                a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1,
              multiple: 1,
            }}
          />

          <Column
            title='Amount'
            dataIndex='amount'
            sorter={{
              compare: (a, b) => a.amount - b.amount,
              multiple: 1,
            }}
          />

          <Column
            title='Date'
            dataIndex='date'
            sorter={{
              compare: (a, b) =>
                a.date.toLowerCase() > b.date.toLowerCase() ? 1 : -1,
              multiple: 1,
            }}
          />

          <Column
            title='Delete Expense'
            key='action'
            render={(_, record) => (
              <Space size='middle'>
                <Space wrap>
                  <Button
                    onClick={() => {
                      handleDeleteClick(record._id);
                    }}
                  >
                    Delete
                  </Button>
                </Space>
              </Space>
            )}
          />

          <Column
            title='Edit Expense'
            key='action'
            render={(_, record) => (
              <Space size='middle'>
                <Space wrap>
                  <Button
                    onClick={() => {
                      toggle(
                        record.name,
                        record.amount,
                        record.categoryId,
                        record.date,
                        record._id
                      );
                    }}
                  >
                    Edit
                  </Button>
                </Space>
              </Space>
            )}
          />

          <Column
            title='View Pdf'
            key='action'
            render={(_, record) => (
              <Space size='middle'>
                {record.invoicePdf ? (
                  <a
                    href={`http://localhost:5555/${record.invoicePdf}`}
                    target='_blank'
                    rel='noreferrer'
                  >
                    view pdf
                  </a>
                ) : (
                  <span style={{ color: "grey" }}>
                    "Plz upload invoice pdf to view"
                  </span>
                )}
              </Space>
            )}
          />

          <Column
            title='Upload Pdf'
            key='action'
            render={(_, record) => (
              <Space size='middle'>
                <form
                  onSubmit={e => {
                    handleSubmit(e, record._id);
                  }}
                  encType='multipart/form-data'
                >
                  <div className='file-input-box'>
                    <input
                      className='custom-file-upload'
                      type='file'
                      onChange={handleFileChange}
                    />
                    <input className='inputBtn' type='submit' />
                  </div>
                </form>
              </Space>
            )}
          />
        </Table>
      </div>
    </div>
  );
};

export default MyTable;
