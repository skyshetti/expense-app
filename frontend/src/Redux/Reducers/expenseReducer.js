const expensesInitialState = {
  errors: {},
  data: [],
  isLoading: true,
};
const expensesReducer = (state = expensesInitialState, action) => {
  switch (action.type) {
    case "ADD_EXPENSE": {
      return { ...state, data: [...state.data, action.payload] };
    }

    case "SET_EXPENSES": {
      return { ...state, data: [...action.payload] };
    }

    case "SET_EXPENSE_UPDATE": {
      return {
        ...state,
        data: state.data.map(ele => {
          if (ele._id == action.payload._id) {
            return { ...ele, ...action.payload };
          } else {
            return { ...ele };
          }
        }),
      };
    }

    case "SET_DELETE_EXPENSE": {
      return {
        ...state,
        data: state.data.filter(ele => ele._id != action.payload),
      };
    }

    case "SET_SOFT_DELETED_EXPENSE": {
      return { ...state, data: action.payload };
    }

    case "REMOVE_EXPENSE": {
      return {
        ...state,
        data: state.data.filter(ele => ele._id != action.payload._id),
      };
    }

    case "RESTORE_EXPENSE": {
      // return {
      //   ...state,
      //   data: state.data.map(ele => {
      //     if (ele._id == action.payload._id) {
      //       return { ...ele, ...action.payload };
      //     } else {
      //       return { ...ele };
      //     }
      //   }),
      // };

      return {
        ...state,
        data: state.data.filter(ele => ele._id != action.payload._id),
      };
    }

    case "SEARCH_EXPENSE": {
      let new_arr = [];
      console.log("in reducer", action.payload);
      action.payload.forEach(ele => {
        state.data.forEach(obj => {
          if (ele._id === obj.categoryId) {
            new_arr = [...new_arr, obj];
          }
        });
      });

      return { ...state, data: new_arr };
    }

    case "REMOVE_CATEGORY_EXPENSES": {
      return {
        ...state,
        data: state.filter(ele => ele.categoryId !== action.payload),
      };
    }

    case "PDF": {
      return {};
    }

    default: {
      return { ...state };
    }
  }
};

export default expensesReducer;
