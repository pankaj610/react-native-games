import {
  API_FAILED,
  API_STARTED,
  API_SUCCESS,
  SAVE_DEVOTEE,
} from "../constants";
import { registerDevoteeAPI } from "../services/appService";
import { extractErrorStr } from "../utils.js/network";
import { actionCreator } from "../utils.js/utils";

export const registerDevotee = (data) => (dispatch) => {
  dispatch(actionCreator(API_STARTED));
  return registerDevoteeAPI(data)
    .then((response) => {
      dispatch(actionCreator(API_SUCCESS, response));
    })
    .catch((err) => {
      dispatch(actionCreator(API_FAILED, extractErrorStr(err)));
    });
};
