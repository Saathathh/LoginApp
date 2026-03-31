import { apiRequest } from "./apiClient";

export function registerUser(payload) {
  return apiRequest("/api/auth/signup", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export function loginUser(payload) {
  return apiRequest("/api/auth/login", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}
