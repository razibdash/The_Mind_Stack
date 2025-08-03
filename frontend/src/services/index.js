import axiosInstance from "@/api/axiosInstance";

export async function registerService(formData) {
  const { data } = await axiosInstance.post("api/auth/register", {
    ...formData,
    role: "user",
  });

  return data;
}

export async function loginService(formData) {
  const { data } = await axiosInstance.post("api/auth/login", formData);

  return data;
}

export async function checkAuthService() {
  const { data } = await axiosInstance.get("api/auth/check-auth");

  return data;
}