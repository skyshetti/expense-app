const budgetInitialState = {
  data: {},
  errors: {},
};
const budgetReducer = (state = budgetInitialState, action) => {
  switch (action.type) {
    case "SET_USER_BUDGET": {
      return { ...state, ...{ data: action.payload } };
    }
    case "UPDATE_BUDGET": {
      return { ...state, ...{ data: action.payload } };
    }
    default: {
      return { ...state };
    }
  }
};

export default budgetReducer;
