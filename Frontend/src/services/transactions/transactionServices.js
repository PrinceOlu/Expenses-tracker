// Import necessary modules
import { BASE_URL } from "../../utils/urls";
import axios from "axios";
import { getUserFromStorage } from "../../utils/getUserFromStorage";

// Function to get the token from storage
const getToken = () => {
  const token = getUserFromStorage();
  return token;
};

// Add Category
export const addTransactionAPI = async (transactionsData) => {
  const token = getToken();

  if (!token) {
    throw new Error("No token found. Please log in again.");
  }

  try {
    const response = await axios.post(
      `${BASE_URL}/transactions/create`,
      {
        category: transactionsData.category,
        type: transactionsData.type,
        description: transactionsData.description,
        amount: transactionsData.amount,
        date: transactionsData.date,
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
export const deleteCategoryAPI = async ({ id }) => {
  const token = getToken();

  if (!token) {
    throw new Error("No token found. Please log in again.");
  }

  try {
    const response = await axios.delete(`${BASE_URL}/categories/delete/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    return response.data;
  } catch (error) {
    console.error(
      "Delete Category API error:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};


// List Transactions
export const listTransactionsAPI = async ({ category, type, startDate, endDate }) => {
  const token = getToken();

  if (!token) {
    throw new Error("No token found. Please log in again.");
  }

  try {
    const response = await axios.get(`${BASE_URL}/transactions/lists`, {
      params: { category, type, startDate, endDate },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error("List Transactions API error:", error.response ? error.response.data : error.message);
    throw error;
  }
};
