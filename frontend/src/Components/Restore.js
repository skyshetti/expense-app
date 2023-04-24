import React from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button } from "antd";
import Swal from "sweetalert2";
import {
  startGetSoftDeletedExpenses,
  startPermanentDeleteExpense,
  startRestoreExpense,
} from "../Redux/Actions/expenseAction";

// and d
import { Space, Table, Tag } from "antd";
const { Column, ColumnGroup } = Table;
const Restore = () => {
  const dispatch = useDispatch();

  const [expenses, category] = useSelector(state => {
    return [state.expenses.data, state.category.data];
  });

  useEffect(() => {
    dispatch(startGetSoftDeletedExpenses());
  }, []);

  //
  const data = expenses.map((ele, i) => {
    const categoryName = category.find(cat => cat._id == ele.categoryId);
    if (categoryName) {
      return { ...ele, key: i, categoryName: categoryName.name };
    } else {
      return { ...ele, key: "i" };
    }
  });

  const handleDeleteClick = id => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(result => {
      if (result.isConfirmed) {
        dispatch(startPermanentDeleteExpense(id));
        Swal.fire("Deleted!", "Your file has been deleted.", "success");
      }
    });
  };

  const handleRestoreClick = id => {
    dispatch(startRestoreExpense(id));
  };

  //
  return (
    <div>
      <h1>Restore Deleted Expenses</h1>

      <Table dataSource={data}>
        <Column
          title='Category'
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
          title='Item Name'
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
          title='Action'
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
          title='Action'
          key='action'
          render={(_, record) => (
            <Space size='middle'>
              <Space wrap>
                <Button
                  onClick={() => {
                    handleRestoreClick(record._id);
                  }}
                >
                  Restore
                </Button>
              </Space>
            </Space>
          )}
        />
      </Table>
    </div>
  );
};

export default Restore;
