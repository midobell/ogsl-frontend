import axiosClient from "../axiosClient";
import { Jeu } from "../../types";

export async function getJeuDetailsREST(id: number): Promise<Jeu> {
  const res = await axiosClient.get<Jeu>(`jeux/${id}/`);
  return res.data;
}
