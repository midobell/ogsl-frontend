import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchFichiers } from "../store/fichiersSlice";
import { RootState, AppDispatch } from "../store/store";
import { Fichier } from "../types";

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

export default function Fichiers() {
  const dispatch = useDispatch<AppDispatch>();
  const { items, loading, error } = useSelector(
    (state: RootState) => state.fichiers
  );

  useEffect(() => {
    dispatch(fetchFichiers());
  }, [dispatch]);

  /* Chargement */
  if (loading) {
    return (
      <div className="max-w-5xl mx-auto mt-10 px-4 space-y-4">
        <Skeleton className="h-8 w-40" />
        <Skeleton className="h-32 w-full" />
        <Skeleton className="h-32 w-full" />
        <Skeleton className="h-32 w-full" />
      </div>
    );
  }

  /* Erreur */
  if (error) {
    return (
      <div className="max-w-5xl mx-auto mt-10 px-4">
        <Alert variant="destructive">
          <AlertTitle>Erreur</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto mt-10 px-4">

      <h1 className="text-2xl font-bold mb-6">
        Fichiers
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
        {items.map((f: Fichier) => (
          <Card key={f.id}>
            <CardHeader>
              <CardTitle>
                {f.libelle}
              </CardTitle>
            </CardHeader>

            <CardContent className="text-sm text-muted-foreground space-y-1">
              <p>
                <span className="font-medium">ID :</span>{" "}
                {f.identifiant_fichier}
              </p>

              <p>
                <span className="font-medium">Type MIME :</span>{" "}
                {f.type_contenu}
              </p>

              <p>
                <span className="font-medium">Taille :</span>{" "}
                {f.taille} octets
              </p>

              <p className="pt-2 text-foreground">
                <span className="font-medium">Jeu associé :</span>{" "}
                {f.jeu}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
