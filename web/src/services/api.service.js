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
export function createList(data) {
  return http.post("/lists", data);
}

// // TASKS

// export function createTask(data) {
//   return http.post("lists/:listId/tasks", data);
// }

// // CARDS

// export function createCard(data) {
//   return http.post("lists/:listId/cards", data);
// }
