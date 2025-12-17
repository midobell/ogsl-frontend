import axiosClient from "../axiosClient";

export interface UserProfile {
  id: number;
  username: string;
  email: string;
  first_name?: string;
  last_name?: string;
}

export interface UpdateEmailInput {
  email: string;
}

export interface ChangePasswordInput {
  old_password: string;
  new_password: string;
}

export async function getUserProfile(): Promise<UserProfile> {
  const res = await axiosClient.get<UserProfile>("user/me/");
  return res.data;
}

export async function updateUserEmail(input: UpdateEmailInput): Promise<UserProfile> {
  const res = await axiosClient.put<UserProfile>("user/update-email/", input);
  return res.data;
}

export async function changePassword(input: ChangePasswordInput): Promise<{ success: boolean }> {
  const res = await axiosClient.post<{ success: boolean }>("user/change-password/", input);
  return res.data;
}
