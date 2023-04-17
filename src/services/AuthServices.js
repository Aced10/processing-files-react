import axios_core from "axios";
import { global } from "global.js";

export async function login(credentials) {
  const globalLocal = global();
  const axios = axios_core.create({
    baseURL: globalLocal.SERVER_NAME,
    headers: {
      "Content-Type": "application/json",
    },
  });

  const response = await axios.post(
    `${globalLocal.API_AUTH}/login`,
    credentials
  );
  return response;
}
