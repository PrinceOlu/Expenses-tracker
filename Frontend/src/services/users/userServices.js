import { BASE_URL } from "../../utils/urls";
import axios from "axios";

// login
export const loginAPI = async (userData) => {
  try {
    const response = await axios.post(`${BASE_URL}/users/login`, {
      email: userData.email,
      password: userData.password,
    });

    // If the login is successful and you receive a token
    const { token } = response.data;
    if (token) {
      // Store the token in localStorage or sessionStorage
      localStorage.setItem("authToken", token);
    }

    // Return the response data
    return response.data;
  } catch (error) {
    // Handle error
    console.error("Login API error:", error);
    throw error;
  }
};
// Register
export const registerAPI = async (userData) => {
  try {
    const response = await axios.post(`${BASE_URL}/users/register`, {
      email: userData.email,
      password: userData.password,
      username: userData.username,
    });

    // If the login is successful and you receive a token
    const { token } = response.data;
    if (token) {
      // Store the token in localStorage or sessionStorage
      localStorage.setItem("authToken", token);
    }

    // Return the response data
    return response.data;
  } catch (error) {
    // Handle error
    console.error("Login API error:", error);
    throw error;
  }
};
