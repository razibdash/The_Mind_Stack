import axiosInstance from "@/api/axiosInstance";

export async function registerService(formData) {
  const { data } = await axiosInstance.post("/auth/register", {
    ...formData,
    role: "user",
  });

  return data;
}

export async function loginService(formData) {
  const { data } = await axiosInstance.post("/auth/login", formData);

  return data;
}

export async function checkAuthService() {
  const { data } = await axiosInstance.get("/auth/check-auth");

  return data;
}
// ai text generation service
export async function generateAiTextService(topic) {
  const { data } = await axiosInstance.post("api/ai/generate-course-description", {
    topic,
  });

  return data;
}

export async function uploadVideo(videoFormData) {
  const { data } = await axiosInstance.post("/api/media/upload", videoFormData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return data;
}
