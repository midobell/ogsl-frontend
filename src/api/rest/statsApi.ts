import axiosClient from "../axiosClient";
import { StatsJeux } from "../../types";

export async function getStatsApi(): Promise<StatsJeux> {
  const res = await axiosClient.get<StatsJeux>("stats-jeux/");
  return res.data;
}
