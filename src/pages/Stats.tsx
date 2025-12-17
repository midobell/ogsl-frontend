import React from "react";
import { useStatsGraphQL } from "../api/graphql/useStatsGraphQL";

import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";

import { exportPDF } from "../utils/exportPdf";

export default function Stats() {
  const { loading, error, data } = useStatsGraphQL();

  if (loading) return <p>Chargement…</p>;
  if (error) return <p style={{ color: "red" }}>{error.message}</p>;
  if (!data) return null;

  const stats = data.statsJeux;

  // === Les datasets typés selon StatsJeux ===
  const repMime = stats.repartitionMime;
  const repAnnees = stats.repartitionAnnee;
  const repSource = stats.repartitionSource;
  const evolution = stats.evolutionTaille;

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  return (
    <div style={{ maxWidth: "1100px", margin: "40px auto" }}>
      {/* Bouton PDF */}
                        <button
  onClick={() => exportPDF("pdf-stats", "statistiques_ogsl")}
  className="mb-6 bg-blue-600 text-white px-4 py-2 rounded shadow hover:bg-blue-700 transition"
>
  Exporter en PDF
</button>

      <div id="pdf-stats">
        <h1>Statistiques (GraphQL)</h1>

        {/* KPI */}
        <div style={{ display: "flex", gap: "20px", marginBottom: "40px" }}>
          <div style={{ padding: 20, background: "#f0f0f0", borderRadius: 8 }}>
            <h3>Total jeux</h3>
            <p>{stats.totalJeux}</p>
          </div>

          <div style={{ padding: 20, background: "#f0f0f0", borderRadius: 8 }}>
            <h3>Total fichiers</h3>
            <p>{stats.totalFichiers}</p>
          </div>

          <div style={{ padding: 20, background: "#f0f0f0", borderRadius: 8 }}>
            <h3>Taille totale</h3>
            <p>{(stats.tailleTotaleOctets / 1_000_000).toFixed(2)} Mo</p>
          </div>
        </div>

        {/* PIE CHART MIME */}
        <h2>Répartition MIME</h2>
        <ResponsiveContainer width="100%" height={350}>
          <PieChart>
            <Pie
              data={repMime}
              dataKey="n"
              nameKey="type_contenu"
              cx="50%"
              cy="50%"
              outerRadius={120}
            >
              {repMime.map((_: any, i: number) => (
                <Cell key={i} fill={COLORS[i % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>

        {/* ANNÉES */}
        <h2>Jeux par année</h2>
        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={repAnnees}>
            <XAxis dataKey="annee" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="n" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>

        {/* SOURCES */}
        <h2>Répartition des jeux par source</h2>
        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={repSource}>
            <XAxis dataKey="source_nom" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="n" fill="#ff7722" />
          </BarChart>
        </ResponsiveContainer>

        {/* EVOLUTION */}
        <h2>Évolution de la taille cumulée par année</h2>
        <ResponsiveContainer width="100%" height={350}>
          <LineChart data={evolution}>
            <XAxis dataKey="annee" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="taille" stroke="#0099ff" strokeWidth={3} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
