import axiosClient from "../axiosClient";

export interface LoginResponse {
  access: string;
  refresh: string;
}

export async function loginApi(
  username: string,
  password: string
): Promise<LoginResponse> {
  const res = await axiosClient.post<LoginResponse>("token/", {
    username,
    password,
  });

  return res.data;
}
