import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchJeux } from "../store/jeuxSlice";
import { RootState, AppDispatch } from "../store/store";
import JeuxFilters from "./JeuxFilters";
import { Link } from "react-router-dom";
import { Jeu } from "../types";
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

export default function Jeux() {
  const dispatch = useDispatch<AppDispatch>();
  const { items, loading, error } = useSelector(
    (state: RootState) => state.jeux
  );

  useEffect(() => {
    dispatch(fetchJeux({}));
  }, [dispatch]);

  const handleFilter = (filters: any) => {
    dispatch(fetchJeux(filters));
  };

  return (
    <div className="max-w-5xl mx-auto mt-10 px-4 space-y-6">

      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">
          Liste des Jeux
        </h1>

        
      </div>

      <JeuxFilters onFilter={handleFilter} />

      {/* Chargement */}
      {loading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Skeleton className="h-24 w-full" />
          <Skeleton className="h-24 w-full" />
          <Skeleton className="h-24 w-full" />
          <Skeleton className="h-24 w-full" />
        </div>
      )}

      {/* Erreur */}
      {error && (
        <Alert variant="destructive">
          <AlertTitle>Erreur</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {/* Liste des jeux */}
      {!loading && !error && (
        <div
          id="pdf-liste-jeux"
          className="grid grid-cols-1 sm:grid-cols-2 gap-4"
        >
          {items.map((jeu: Jeu) => (
            <Card key={jeu.id}>
              <CardHeader>
                <CardTitle>
                  <Link
                    to={`/jeux/${jeu.id}`}
                    className="hover:underline"
                  >
                    {jeu.titre}
                  </Link>
                </CardTitle>
              </CardHeader>

              <CardContent className="text-sm text-muted-foreground">
                <p>
                  <span className="font-medium text-foreground">
                    DOI :
                  </span>{" "}
                  {jeu.identifiant_permanent}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
