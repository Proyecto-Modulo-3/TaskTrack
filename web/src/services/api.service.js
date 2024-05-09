import axios from "axios";

const http = axios.create({ baseURL: "http://localhost:3000/api" });

http.interceptors.request.use(function (config) {
  config.headers.authorization = `BEARER ${localStorage.getItem("token")}`;
  return config;
});

http.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    if (
      error.response.status === 401 &&
      location.pathname !== "/login" &&
      location.pathname !== "/register"
    ) {
      localStorage.removeItem("token");
      window.location.replace("/login");
    }

    return Promise.reject(error);
  }
);

// USERS
export function createUser(data) {
  return http.post("/users", data);
}

export function login(data) {
  return http.post("/login", data).then((response) => {
    localStorage.setItem("token", response.data.accessToken);
    return response;
  });
}

export function getProfile() {
  return http.get("/profile");
}

export function logout() {
  localStorage.removeItem("token");
}

// LISTS
export function CreateList(data) {
  return http.post("/lists", data);
}

export function getLists(params) {
  return http.get("/lists", { params });
}

export function listDetails(id) {
  return http.get(`/lists/${id}`);
}

export function deleteList(id) {
  return http.delete(`/lists/${id}`);
}

// // TASKS
export function createTask(id, data) {
  return http.post(`lists/${id}/tasks`, data);
}

export function getTasks(params, id) {
  return http.get(`/lists/${id}/tasks`, { params, id })
}

export function deleteTask(listId, taskId) {
  return http.delete(`/lists/${listId}/tasks/${taskId}`);
}

// // CARDS

export function createCard(listId, taskId, data) {
  return http.post(`/lists/${listId}/tasks/${taskId}/cards`, data);
}

export function getCards(listId, taskId, params) {
  return http.get(`/lists/${listId}/tasks/${taskId}/cards`, { params, listId, taskId})
}