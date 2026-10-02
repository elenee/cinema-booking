import { api } from "./client";
import type { ApiResponse, AuthResponse, User } from "./types";

interface LoginData {
  email: string;
  password: string;
}

interface RegisterData {
  username: string;
  email: string;
  password: string;
  password_confirmation: string;
  avatar?: File;
}

export async function login(data: LoginData) {
  const response = await api.post<ApiResponse<AuthResponse>>("/login", data);
  return response.data.data;
}

export async function register(data: RegisterData) {
  const formData = new FormData();

  formData.append("username", data.username);
  formData.append("email", data.email);
  formData.append("password", data.password);
  formData.append("password_confirmation", data.password_confirmation);

  if (data.avatar) {
    formData.append("avatar", data.avatar);
  }

  const response = await api.post<ApiResponse<AuthResponse>>(
    "/register",
    formData,
  );

  return response.data.data;
}

export async function logout() {
  await api.post("/logout");
}

export async function getCurrentUser() {
  const response = await api.get<ApiResponse<User>>("/me");
  return response.data.data;
}