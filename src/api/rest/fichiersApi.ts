import axiosClient from "../axiosClient";
import { Fichier } from "../../types";

export async function getFichiersApi(): Promise<Fichier[]> {
  const res = await axiosClient.get<Fichier[]>("fichiers/");
  return res.data;
}
