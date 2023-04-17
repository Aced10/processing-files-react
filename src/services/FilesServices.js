import axios_core from "axios";
import { global } from "global.js";

export function processingFiles(data) {
  console.log(data)
  const { axios, globalLocal } = getToken();
  return axios.post(`${globalLocal.API_FILES}/processing-data`, data);
}

const getToken = () => {
  const globalLocal = global(window.sessionStorage.getItem("userToken"));
  const axios = axios_core.create({
    baseURL: globalLocal.SERVER_NAME,
    headers: globalLocal.PRIVATE_FILE_HEADERS,
  });
  return { axios, globalLocal };
};
