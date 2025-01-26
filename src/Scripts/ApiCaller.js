import axios from "axios";
import AppHelper from "./AppHelper";

const apiClient = axios.create({
  baseURL: AppHelper.getServerUrl(), // Base URL for all API requests
  headers: {
    "Content-Type": "application/json", // Default headers
  },
});

// Request interceptor
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access-token");
    if (token) {
      config.headers["Access-Token"] = token;
    }
    if (config.isMinorLoading) {
    } else {
      AppHelper.firEvent("loadmask:show");
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle errors globally
    console.error("API error:", error.response || error.message);
    return Promise.reject(error);
  }
);

const apiCaller = async (
  method,
  url,
  data = {},
  params = {},
  headers = {},
  isMinorLoading = true
) => {
  try {
    const response = await apiClient({
      method,
      url,
      data,
      params,
      headers,
      isMinorLoading,
    });
    return response.data;
  } catch (error) {
    console.error(`Error in ${method.toUpperCase()} ${url}:`, error);
  } finally {
    if (isMinorLoading) {
    } else {
      AppHelper.firEvent("loadmask:hide");
    }
  }
};

export default apiCaller;
