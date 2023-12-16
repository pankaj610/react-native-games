import { BASE_URL } from "../utils.js/environment";
import { fetchAPI, METHOD } from "../utils.js/network";

export async function verifyGoogleToken(token) {
  let body = {
    token,
  };
  let options = {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(),
  };
  const url = `${BASE_URL}/api/login`;
  return Promise.resolve(token);
  // return fetchAPI({ url, body, method: METHOD.GET});
}

export async function registerDevoteeAPI(data) {
  let options = {
    url: `${BASE_URL}/devotee/create`,
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    data: data,
  };
  return fetchAPI(options);
}
