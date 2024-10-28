export const getUserFromStorage = () => {
  const token = JSON.parse(localStorage.getItem("UserInfo") || "null");

  return token?.token;
};


