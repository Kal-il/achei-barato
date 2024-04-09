export const setToken = (token) => {
  console.log("token: ", token);
};

export const fetchToken = () => {
  return localStorage.getItem("jwt-token");
};
