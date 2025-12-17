import axiosClient from "../axiosClient";
import { Jeu } from "../../types";

export interface JeuxFilters {
  search?: string;
  source?: string;
}

export async function getJeuxApi(filters: JeuxFilters = {}): Promise<Jeu[]> {
  const params = new URLSearchParams();

  if (filters.search) params.append("search", filters.search);
  if (filters.source) params.append("source__nom", filters.source);

  const res = await axiosClient.get<Jeu[]>("jeux/?" + params.toString());
  return res.data;
}
