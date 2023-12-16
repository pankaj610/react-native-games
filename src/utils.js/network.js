import axios, { Axios } from "axios";
import BASE_URL from "./environment";
import { Storage } from "./utils";

export const VERSION = {
  V1: "/api/v1",
  V2: "/api/v2",
};

export const METHOD = {
  GET: "GET",
  PUT: "PUT",
  POST: "POST",
  DELETE: "DELETE",
};

export const API_URL = {
  LOGIN: `${VERSION.V1}/login`,
};

export const DEFAULT_ERROR_MESSAGE =
  "Something went wrong. Please check your activity and try again.";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
});

axiosInstance.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    if (error.response.code === 401) {
      alert("logout");
    }
    return Promise.reject(error);
  },
);

export function fetchAPI(request) {
  const opts = {
    url: request.url,
    method: request.method || METHOD.GET,
  };
  if (request.data) {
    opts.data = request.data;
  }
  if (request.headers) {
    opts.headers = {
      ...request?.headers,
      "Access-Control-Allow-Origin": "*",
    };
  }
  return axiosInstance(opts);
}

export const extractErrorStr = (error) => {
  return (
    (error &&
      error.responseJSON &&
      error.responseJSON.data &&
      error.responseJSON.data[0]) ||
    (error && error.message) ||
    DEFAULT_ERROR_MESSAGE
  );
};
