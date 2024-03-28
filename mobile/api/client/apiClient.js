import axios from "axios";
import Config from "../../config.json";

const baseURL = Config.BACKEND_URL;

const apiClient = axios.create({
  baseURL,
  timeout: 5000,
});

const defaultHeaders = {
  "Content-Type": "application/json",
};

const get = async (url, params = {}, options = { ...defaultHeaders }) => {
  try {
    const response = await apiClient.get(url, { params }, options);
    return response.data;
  } catch (error) {
    console.error(`Error fetching data from ${url}:`, error);
    throw error;
  }
};

const post = async (url, data = {}, options = { ...defaultHeaders }) => {
  try {
    const response = await apiClient.post(url, data, options);
    return response.data;
  } catch (error) {
    console.error(`Error posting data to ${url}:`, error);
    throw error;
  }
};

export { get, post };
