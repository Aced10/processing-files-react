import axios_core from "axios";
import { global } from "global.js";

export async function createCustomer(user) {
  const globalLocal = global();
  const axios = axios_core.create({
    baseURL: globalLocal.SERVER_NAME,
    headers: globalLocal.HEADERS,
  });
  let response = await axios.post(`${globalLocal.API_USERS}`, user);
  return response;
}

export async function getCustomers(search) {
  const { axios, globalLocal } = getToken();
  let response = await axios.get(
    `${globalLocal.API_USERS}?search=${search}&fields=["name", "email"]`
  );
  return response;
}

export async function getCustomer(userId) {
  const { axios, globalLocal } = getToken();
  let response = await axios.get(`${globalLocal.API_USERS}/${userId}`);
  return response;
}

export async function updateCustomer(userId, user) {
  const { axios, globalLocal } = getToken();
  let response = await axios.put(`${globalLocal.API_USERS}/${userId}`, user);
  return response;
}

export async function deleteCustomer(userId) {
  const { axios, globalLocal } = getToken();
  let response = await axios.delete(`${globalLocal.API_USERS}/${userId}`);
  return response;
}

const getToken = () => {
  const globalLocal = global(window.sessionStorage.getItem("userToken"));
  const axios = axios_core.create({
    baseURL: globalLocal.SERVER_NAME,
    headers: globalLocal.PRIVATE_HEADERS,
  });
  return { axios, globalLocal };
};
