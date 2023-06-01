const API_URL = process.env.REACT_APP_API_URL || "http://localhost:3100";
export const getBaseURL = () => {
  return typeof window === "undefined"
    ? process.env.REACT_APP_API_URL || API_URL
    : API_URL;
};

export default {
  get: async (url, params = {}) =>
    fetch(
      `${getBaseURL()}${url}${params ? "?" + new URLSearchParams(params) : ""}`,
      {
        credentials: "include",
      }
    ).then((res) => res.json()),

  getSync: async (url, params) => {
    const response = await fetch(
      `${getBaseURL()}${url}${params ? "?" + new URLSearchParams(params) : ""}`,
      {
        credentials: "include",
      }
    );

    const result = await response.json();

    if (result.httpCode >= 400) {
      return Promise.reject(result);
    }
    return Promise.resolve(result);
  },
  post: async (url, data = {}) => {
    const response = await fetch(`${getBaseURL()}${url}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(data),
    });

    const result = await response.json();

    if (result.httpCode >= 400) {
      return Promise.reject(result);
    }
    return Promise.resolve(result);
  },
  put: async (url, data = {}) => {
    const response = await fetch(`${getBaseURL()}${url}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(data),
    });

    const result = await response.json();

    if (result.httpCode >= 400) {
      return Promise.reject(result);
    }
    return Promise.resolve(result);
  },
  postFormData: async (url, data) => {
    const response = await fetch(`${getBaseURL()}${url}`, {
      method: "POST",
      body: data,
      credentials: "include",
      mode: "cors",
    });

    const result = await response.json();

    if (result.httpCode >= 400) {
      return Promise.reject(result);
    }
    return Promise.resolve(result);
  },
};
