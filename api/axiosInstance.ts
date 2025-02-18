import axios from "axios";

let isRefreshing = false;
let refreshSubscribers: Array<() => void> = []; // ⬅️ Ustawienie poprawnego typu

const axiosInstance = axios.create({
  baseURL: "http://localhost:4000",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

// Funkcja dodająca callback do kolejki
function subscribeTokenRefresh(callback: () => void) {
  refreshSubscribers.push(callback);
}

// Funkcja wywołująca wszystkie zapisane callbacki
function onTokenRefreshed() {
  refreshSubscribers.forEach((callback) => callback());
  refreshSubscribers = [];
}

// Interceptor odpowiedzi
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if ((error.response?.status === 401 || error.response?.status === 403) && !originalRequest._retry) {
      if (!isRefreshing) {
        isRefreshing = true;
        try {
          await axiosInstance.post("/auth/refresh");
          isRefreshing = false;
          onTokenRefreshed(); // Powiadomienie wszystkich oczekujących żądań
        } catch (err) {
          isRefreshing = false;
          return Promise.reject(err);
        }
      }

      return new Promise((resolve) => {
        subscribeTokenRefresh(() => {
          resolve(axiosInstance(originalRequest));
        });
      });
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
