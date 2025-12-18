// src/pages/Stats.tsx
import React from "react";
import { useStatsGraphQL } from "../api/graphql/useStatsGraphQL";
import {
  PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis,
  Tooltip, Legend, ResponsiveContainer, LineChart, Line,
  AreaChart, Area, CartesianGrid
} from "recharts";

import { exportPDF } from "../utils/exportPdf";
import { Button } from "../components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "../components/ui/card";
import { Skeleton } from "../components/ui/skeleton";
import { Alert, AlertTitle, AlertDescription } from "../components/ui/alert";

export default function Stats() {
  const { loading, error, data } = useStatsGraphQL();
  if (loading) {
    return (
      <div className="max-w-6xl mx-auto mt-10 px-4 space-y-4">
        <Skeleton className="h-10 w-1/3" />
        <Skeleton className="h-80 w-full" />
      </div>
    );
  }
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
  const { repartitionMime, repartitionAnnee, repartitionSource, evolutionTaille } = stats;
  const COLORS = ["#2563eb", "#16a34a", "#f59e0b", "#ef4444"];

  return (
    <div className="max-w-6xl mx-auto mt-10 px-4 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Statistiques</h1>
        <Button variant="outline" onClick={() => exportPDF("pdf-stats", "stats")}>
          Exporter PDF
        </Button>
      </div>

      <div id="pdf-stats" className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card><CardHeader><CardTitle>Total jeux</CardTitle></CardHeader><CardContent className="text-2xl">{stats.totalJeux}</CardContent></Card>
          <Card><CardHeader><CardTitle>Total fichiers</CardTitle></CardHeader><CardContent className="text-2xl">{stats.totalFichiers}</CardContent></Card>
          <Card><CardHeader><CardTitle>Taille totale</CardTitle></CardHeader><CardContent className="text-2xl">{(stats.tailleTotaleOctets/1_000_000).toFixed(2)} Mo</CardContent></Card>
        </div>

        <Card>
          <CardHeader><CardTitle>Répartition MIME</CardTitle></CardHeader>
          <CardContent className="h-[320px]">
            <ResponsiveContainer>
              <PieChart>
                <Pie data={repartitionMime} dataKey="n" nameKey="type_contenu" outerRadius={110}>
                  {repartitionMime.map((_: any, i: number) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                </Pie>
                <Tooltip /><Legend />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle>Jeux par année</CardTitle></CardHeader>
          <CardContent className="h-[320px]">
            <ResponsiveContainer>
              <BarChart data={repartitionAnnee}>
                <XAxis dataKey="annee" /><YAxis /><Tooltip /><Legend />
                <Bar dataKey="n" fill="#2563eb" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle>Évolution cumulée</CardTitle></CardHeader>
          <CardContent className="h-[320px]">
            <ResponsiveContainer>
              <AreaChart data={evolutionTaille}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="annee" /><YAxis /><Tooltip />
                <Area dataKey="taille" stroke="#16a34a" fill="#16a34a" fillOpacity={0.3} />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle>Répartition par source</CardTitle></CardHeader>
          <CardContent className="h-[320px]">
            <ResponsiveContainer>
              <PieChart>
                <Pie data={repartitionSource} dataKey="n" nameKey="source_nom" outerRadius={110}>
                  {repartitionSource.map((_: any, i: number) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                </Pie>
                <Tooltip /><Legend />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
