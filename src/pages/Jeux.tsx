// src/pages/Jeux.tsx
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchJeux } from "../store/jeuxSlice";
import { RootState, AppDispatch } from "../store/store";
import JeuxFilters from "./JeuxFilters";
import { Link } from "react-router-dom";
import { Jeu } from "../types";

import { Card, CardHeader, CardTitle, CardContent } from "../components/ui/card";
import { Skeleton } from "../components/ui/skeleton";
import { Alert, AlertTitle, AlertDescription } from "../components/ui/alert";

export default function Jeux() {
  const dispatch = useDispatch<AppDispatch>();
  const { items, loading, error } = useSelector((s: RootState) => s.jeux);

  useEffect(() => {
    dispatch(fetchJeux({}));
  }, [dispatch]);

  const handleFilter = (filters: any) => dispatch(fetchJeux(filters));

  return (
    <div className="max-w-6xl mx-auto mt-10 px-4 space-y-6">
      <h1 className="text-2xl font-bold">Liste des Jeux</h1>

      <JeuxFilters onFilter={handleFilter} />

      {loading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-24 w-full" />
          ))}
        </div>
      )}

      {error && (
        <Alert variant="destructive">
          <AlertTitle>Erreur</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {!loading && !error && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {items.map((jeu: Jeu) => (
            <Card key={jeu.id}>
              <CardHeader>
                <CardTitle className="leading-snug">
                  <Link to={`/jeux/${jeu.id}`} className="hover:underline">
                    {jeu.titre}
                  </Link>
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm">
                <p>
                  <span className="font-medium">DOI :</span>{" "}
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
