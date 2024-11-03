import { getUserFromStorage } from "../../utils/getUserFromStorage";
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
      localStorage.setItem("authToken", token);
    }

    return response.data;
  } catch (error) {
    console.error("Login API error:", error);
    throw new Error("Login failed. Please check your credentials."); // More specific error message
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

    const { token } = response.data;
    if (token) {
      localStorage.setItem("authToken", token);
    }

    return response.data;
  } catch (error) {
    console.error("Register API error:", error);
    throw new Error("Registration failed. Please try again."); // More specific error message
  }
};

// Change Password
export const changePasswordAPI = async (userData) => {
  const token = getUserFromStorage(); // Retrieve the token from storage

  try {
    const response = await axios.put(`${BASE_URL}/users/update-password`, {
      newPassword: userData.newPassword
    }, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const { token: newToken } = response.data;
    if (newToken) {
      localStorage.setItem("authToken", newToken);
    }

    return response.data;
  } catch (error) {
    console.error("Password Change API error:", error);
    throw new Error("Password change failed. Please try again."); // More specific error message
  }
};

// Update Profile
export const updateProfileAPI = async (userData) => {
  const token = getUserFromStorage(); // Ensure token is retrieved

  try {
    const response = await axios.put(`${BASE_URL}/users/update-profile`, {
      email: userData.email,
      username: userData.username,
    }, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const { token: newToken } = response.data;
    if (newToken) {
      localStorage.setItem("authToken", newToken);
    }

    return response.data;
  } catch (error) {
    console.error("Profile Update API error:", error);
    throw new Error("Profile update failed. Please try again."); // More specific error message
  }
};
