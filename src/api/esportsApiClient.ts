import axios, { AxiosInstance, AxiosResponse, AxiosError } from "axios";

// Define the type for the environment variable
const baseURL = import.meta.env.VITE_APP_BASE_API_URL as string;

// Create an Axios instance with typed configuration
const esportsApiClient: AxiosInstance = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add response interceptor to handle errors
esportsApiClient.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

export default esportsApiClient;