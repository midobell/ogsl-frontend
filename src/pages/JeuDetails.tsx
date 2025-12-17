import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchJeuDetails } from "../store/jeuDetailsSlice";
import { RootState, AppDispatch } from "../store/store";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
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

export default function JeuDetails() {
  const { id } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const { item, loading, error } = useSelector(
    (state: RootState) => state.jeuDetails
  );

  useEffect(() => {
    if (id) {
      dispatch(fetchJeuDetails({ id: Number(id), mode: "graphql" }));
    }
  }, [dispatch, id]);

  /* Chargement */
  if (loading) {
    return (
      <div className="max-w-4xl mx-auto mt-10 px-4 space-y-4">
        <Skeleton className="h-10 w-2/3" />
        <Skeleton className="h-24 w-full" />
        <Skeleton className="h-64 w-full" />
      </div>
    );
  }

  /* Erreur */
  if (error) {
    return (
      <div className="max-w-4xl mx-auto mt-10 px-4">
        <Alert variant="destructive">
          <AlertTitle>Erreur</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      </div>
    );
  }

  if (!item) return null;

  const chartData = item.fichiers.map((f) => ({
    name: f.libelle.substring(0, 15),
    taille: f.taille,
  }));

  return (
    <div className="max-w-4xl mx-auto mt-10 px-4 space-y-6">

      <Button
        onClick={() => exportPDF("pdf-jeu-details", `jeu_${item.id}`)}
        className="mb-2"
      >
        Exporter en PDF
      </Button>

      <div id="pdf-jeu-details" className="space-y-6">

        {/* Infos générales */}
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">
              {item.titre}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-muted-foreground">
            <p>
              <span className="font-medium text-foreground">
                Description :
              </span>{" "}
              {item.description}
            </p>
            <p>
              <span className="font-medium text-foreground">
                Auteurs :
              </span>{" "}
              {item.auteurs}
            </p>
            <p>
              <span className="font-medium text-foreground">
                DOI :
              </span>{" "}
              {item.identifiant_permanent}
            </p>
          </CardContent>
        </Card>

        {/* Fichiers associés */}
        <Card>
          <CardHeader>
            <CardTitle>
              Fichiers associés
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {item.fichiers.map((f) => (
                <li key={f.id}>
                  <span className="font-medium text-foreground">
                    {f.libelle}
                  </span>{" "}
                  — {f.type_contenu} — {f.taille} octets
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* Graphique */}
        <Card>
          <CardHeader>
            <CardTitle>
              Graphique : tailles des fichiers
            </CardTitle>
          </CardHeader>
          <CardContent className="h-[320px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="taille" fill="#0ea5e9" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

      </div>
    </div>
  );
}
