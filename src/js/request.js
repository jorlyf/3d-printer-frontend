const API_PATH_PREFIX = "http://localhost:8000";

const request = (url, options) => {
  return fetch(`${API_PATH_PREFIX}/${url}`, {
    ...options,
  });
}

export default request;
