export const getJWT = () => {
  const jwt = localStorage.getItem("AuthorizationToken");
  return jwt;
}

export const saveJWT = (token) => {
  localStorage.setItem("AuthorizationToken", token);
}
