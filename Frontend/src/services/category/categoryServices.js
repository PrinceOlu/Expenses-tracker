// Import necessary modules
import { BASE_URL } from "../../utils/urls";
import axios from "axios";
import { getUserFromStorage } from "../../utils/getUserFromStorage";

// Function to get the token from storage
const getToken = () => {
  const token = getUserFromStorage();
  console.log("Retrieved token:", token);  // Debugging line
  return token;
};

// Add Category
export const addCategoryAPI = async (categoryData) => {
  const token = getToken();

  if (!token) {
    throw new Error("No token found. Please log in again.");
  }

  try {
    const response = await axios.post(
      `${BASE_URL}/categories/create`,
      {
        name: categoryData.name,
        type: categoryData.type,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error(
      "Add Category API error:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};
// Update Category
export const updateCategoryAPI = async (categoryData) => {
  const token = getToken();

  if (!token) {
    throw new Error("No token found. Please log in again.");
  }

  try {
    const response = await axios.put(`${BASE_URL}/categories/update/${categoryData.id}`,
      {
        name: categoryData.name,
        type: categoryData.type,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error(
      "Add Category API error:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};
// delete Category
export const deleteCategoryAPI = async (categoryData) => {
  const token = getToken();

  if (!token) {
    throw new Error("No token found. Please log in again.");
  }

  try {
    const response = await axios.delete(`${BASE_URL}/categories/delete/${categoryData.id}`,
           {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error(
      "Add Category API error:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};

// List Categories
export const listCategoriesAPI = async () => {
  const token = getToken();

  if (!token) {
    throw new Error("No token found. Please log in again.");
  }

  try {
    const response = await axios.get(`${BASE_URL}/categories/lists`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error(
      "List Categories API error:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};
