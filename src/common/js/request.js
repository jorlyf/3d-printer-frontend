import { getJWT } from "./jwt";

const API_PATH_PREFIX = "http://localhost:8000";

const request = (url, options) => {
  const jwt = getJWT();

  let headers = {
    Authorization: jwt != null ? `Bearer ${jwt}` : null,
  }
  if (options?.headers != null) {
    headers = {
      ...headers,
      ...options.headers,
    }
  }

  return fetch(`${API_PATH_PREFIX}/${url}`, {
    ...options,
    headers,
  });
}

export default request;