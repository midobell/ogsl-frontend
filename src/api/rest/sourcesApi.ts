import axiosClient from "../axiosClient";
import { Source } from "../../types";

export async function getSourcesApi(): Promise<Source[]> {
  const res = await axiosClient.get<Source[]>("sources/");
  return res.data;
}
