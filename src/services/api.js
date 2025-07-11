import store from "@/redux/store/store";
import axios from "axios";


const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL, // Replace with actual API URL
});

export const setupInterceptors = (setLoading) => {
  api.interceptors.request.use((config) => {
    const state = store.getState();
    const token = state.auth.token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }  

    setLoading(true);
    return config;
  });

  api.interceptors.response.use(
    (response) => {
      setLoading(false);
      return response;
    },
    (error) => {
      setLoading(false);
      return Promise.reject(error);
    }
  );
};

export default api;
