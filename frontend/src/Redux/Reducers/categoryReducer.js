const initialCategoryState = {
  errors: "",
  data: [],
  isLoading: true,
};
const categoryReducer = (state = initialCategoryState, action) => {
  switch (action.type) {
    case "ADD_CATEGORY": {
      return { ...state, data: [...state.data, action.payload] };
    }

    case "SET_ERRORS": {
      return { ...state, errors: action.payload.name };
    }
    case "SET_CATEGORY": {
      return { ...state, data: [...action.payload] };
    }

    case "DELETE_CATEGORY": {
      return {
        ...state,
        data: state.data.filter(ele => ele._id !== action.payload._id),
      };
    }
    default: {
      return { ...state };
    }
  }
};

export default categoryReducer;
