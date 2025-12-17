import { useQuery } from "@apollo/client/react";
import { STATS_JEUX_QUERY } from "./queries";
import { StatsJeux } from "../../types";

export function useStatsGraphQL() {
  const { loading, error, data } = useQuery<{ statsJeux: StatsJeux }>(
    STATS_JEUX_QUERY
  );

  if (!data) return { loading, error, data: null };

  // --- Convertir les chaînes JSON en objets utilisables ---
  const fix = (arr: any[]) => {
    if (!arr) return [];
    return arr.map((item) => {
      if (typeof item === "string") {
        try {
          return JSON.parse(item);
        } catch {
          return item;
        }
      }
      return item;
    });
  };

  const stats = {
    ...data.statsJeux,
    repartitionMime: fix(data.statsJeux.repartitionMime),
    repartitionAnnee: fix(data.statsJeux.repartitionAnnee),
    repartitionSource: fix(data.statsJeux.repartitionSource),
    evolutionTaille: fix(data.statsJeux.evolutionTaille),
  };

  return { loading, error, data: { statsJeux: stats } };
}
