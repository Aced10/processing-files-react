export const global = (token) => {
  const SERVER_NAME = "http://localhost:5000";
  return {
    SERVER_NAME,
    HEADERS: {
      "Content-Type": "application/json",
    },
    PRIVATE_HEADERS: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    PRIVATE_FILE_HEADERS: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },

    API_AUTH: `${SERVER_NAME}/api/auth`,
    API_USERS: `${SERVER_NAME}/api/users`,
    API_FILES: `${SERVER_NAME}/api/files`,
  };
};
