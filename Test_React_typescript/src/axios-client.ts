import axios, { AxiosRequestConfig, AxiosInstance } from "axios";

//import {useStateContext} from "./context/ContextProvider.jsx";

const axiosClient: AxiosInstance = axios.create({
  baseURL: `${import.meta.env.VITE_API_BASE_URL}`,
  withCredentials: true,
});

export default axiosClient;
