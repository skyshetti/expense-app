const usersInitialState = {
  isLoading: true,
  data: [],
  errors: "",
};

const usersReducer = (state = usersInitialState, action) => {
  switch (action.type) {
    case "SET_ERRORS": {
      return { ...state, errors: action.payload };
    }

    case "SET_USER_INFO": {
      return { ...state, data: [action.payload] };
    }
    case "LOGOUT_USER": {
      return { ...usersInitialState };
    }

    case "UPDATE_PROFILE_PIC": {
      return { ...state, data: [action.payload] };
    }
    default: {
      return { ...state };
    }
  }
};

export default usersReducer;
