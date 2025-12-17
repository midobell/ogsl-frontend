import axios from "axios";

interface LoginPayload {
  username: string;
  password: string;
}

export async function loginApi({ username, password }: LoginPayload) {
  const res = await axios.post(${import.meta.env.VITE_API_BASE_URL}/api/token/`, {
    username,
    password,
  });

  // Stockage des tokens
  localStorage.setItem("access", res.data.access);
  localStorage.setItem("refresh", res.data.refresh);

  return res.data;
}
