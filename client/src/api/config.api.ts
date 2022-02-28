import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  withCredentials: true,
});

export async function apiHealthcheckRequest() {
  try {
    const response = await axiosInstance.get("/healthcheck");
    if (response.status === 200) return true;
    return false;
  } catch (error) {
    return false;
  }
}

export default axiosInstance;
