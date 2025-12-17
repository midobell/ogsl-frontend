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

import { Button } from "../components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "../components/ui/card";
import { Skeleton } from "../components/ui/skeleton";
import {
  Alert,
  AlertTitle,
  AlertDescription,
} from "../components/ui/alert";

export default function Stats() {
  const { loading, error, data } = useStatsGraphQL();

  /* Chargement */
  if (loading) {
    return (
      <div className="max-w-6xl mx-auto mt-10 px-4 space-y-4">
        <Skeleton className="h-10 w-1/3" />
        <Skeleton className="h-24 w-full" />
        <Skeleton className="h-80 w-full" />
      </div>
    );
  }

  /* Erreur */
  if (error) {
    return (
      <div className="max-w-6xl mx-auto mt-10 px-4">
        <Alert variant="destructive">
          <AlertTitle>Erreur</AlertTitle>
          <AlertDescription>{error.message}</AlertDescription>
        </Alert>
      </div>
    );
  }

  if (!data) return null;

  const stats = data.statsJeux;

  const repMime = stats.repartitionMime;
  const repAnnees = stats.repartitionAnnee;
  const repSource = stats.repartitionSource;
  const evolution = stats.evolutionTaille;

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  return (
    <div className="max-w-6xl mx-auto mt-10 px-4 space-y-6">

      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">
          Statistiques (GraphQL)
        </h1>

        <Button
          variant="outline"
          onClick={() => exportPDF("pdf-stats", "statistiques")}
        >
          Exporter en PDF
        </Button>
      </div>

      <div id="pdf-stats" className="space-y-6">

        {/* Statistiques globales */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

          <Card>
            <CardHeader>
              <CardTitle>Total jeux</CardTitle>
            </CardHeader>
            <CardContent className="text-2xl font-semibold">
              {stats.totalJeux}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Total fichiers</CardTitle>
            </CardHeader>
            <CardContent className="text-2xl font-semibold">
              {stats.totalFichiers}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Taille totale</CardTitle>
            </CardHeader>
            <CardContent className="text-2xl font-semibold">
              {(stats.tailleTotaleOctets / 1_000_000).toFixed(2)} Mo
            </CardContent>
          </Card>

        </div>

        {/* Répartition MIME */}
        <Card>
          <CardHeader>
            <CardTitle>Répartition MIME</CardTitle>
          </CardHeader>
          <CardContent className="h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
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
          </CardContent>
        </Card>

        {/* Jeux par année */}
        <Card>
          <CardHeader>
            <CardTitle>Jeux par année</CardTitle>
          </CardHeader>
          <CardContent className="h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={repAnnees}>
                <XAxis dataKey="annee" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="n" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Répartition par source */}
        <Card>
          <CardHeader>
            <CardTitle>Répartition des jeux par source</CardTitle>
          </CardHeader>
          <CardContent className="h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={repSource}>
                <XAxis dataKey="source_nom" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="n" fill="#ff7722" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Évolution */}
        <Card>
          <CardHeader>
            <CardTitle>Évolution de la taille cumulée par année</CardTitle>
          </CardHeader>
          <CardContent className="h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={evolution}>
                <XAxis dataKey="annee" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="taille"
                  stroke="#0ea5e9"
                  strokeWidth={3}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

      </div>
    </div>
  );
}
