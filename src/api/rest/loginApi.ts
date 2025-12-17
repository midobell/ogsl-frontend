import axios from "axios";

interface LoginPayload {
  username: string;
  password: string;
}

export async function loginApi({ username, password }: LoginPayload) {
  const res = await axios.post("http://localhost:8000/api/token/", {
    username,
    password,
  });

  // Stockage des tokens
  localStorage.setItem("access", res.data.access);
  localStorage.setItem("refresh", res.data.refresh);

  return res.data;
}
