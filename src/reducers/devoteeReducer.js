import { API_FAILED, API_STARTED, SAVE_DEVOTEE } from "../constants";

const initialState = {
  devotees: "",
  loading: false,
  error: "",
};

const devoteeReducer = (state = initialState, action) => {
  switch (action.type) {
    case SAVE_DEVOTEE:
      return {
        ...state,
        devotees: action.payload,
      };
    default:
      return state;
  }
};

export default devoteeReducer;
