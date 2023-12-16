import {
  API_FAILED,
  API_STARTED,
  RESTORE_TOKEN,
  SAVE_TOKEN,
  SIGN_OUT,
  TOKEN,
} from "../constants";
import { verifyGoogleToken } from "../services/appService";
import { extractErrorStr } from "../utils.js/network";
import { actionCreator, Storage } from "../utils.js/utils";

export const restoreToken = (token) => (dispatch) => {
  return dispatch(actionCreator(RESTORE_TOKEN, token));
};

export const signIn = (token) => (dispatch) => {
  dispatch(actionCreator(API_STARTED));
  return verifyGoogleToken(token)
    .then((json) => {
      dispatch(actionCreator(SAVE_TOKEN, token));
      Storage.save(TOKEN, token);
    })
    .catch((error) => {
      dispatch(actionCreator(API_FAILED, extractErrorStr(error)));
    });
};

export const signOut = () => (dispatch) => {
  return dispatch(actionCreator(SIGN_OUT, null));
};
