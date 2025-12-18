// src/pages/Fichiers.tsx
import React, { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchFichiers } from "../store/fichiersSlice";
import { RootState, AppDispatch } from "../store/store";
import { Fichier } from "../types";

import { Card, CardHeader, CardTitle, CardContent } from "../components/ui/card";
import { Skeleton } from "../components/ui/skeleton";
import { Alert, AlertTitle, AlertDescription } from "../components/ui/alert";

function formatSize(bytes: number) {
  if (!bytes) return "—";
  const kb = bytes / 1024;
  if (kb < 1024) return `${kb.toFixed(1)} Ko`;
  return `${(kb / 1024).toFixed(2)} Mo`;
}

export default function Fichiers() {
  const dispatch = useDispatch<AppDispatch>();
  const { items, loading, error } = useSelector((s: RootState) => s.fichiers);

  useEffect(() => {
    dispatch(fetchFichiers());
  }, [dispatch]);

  const totalSize = useMemo(
    () => items.reduce((acc, f) => acc + (f.taille || 0), 0),
    [items]
  );

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto mt-10 px-4 space-y-4">
        <Skeleton className="h-8 w-40" />
        <Skeleton className="h-24 w-full" />
        <Skeleton className="h-24 w-full" />
        <Skeleton className="h-24 w-full" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-6xl mx-auto mt-10 px-4">
        <Alert variant="destructive">
          <AlertTitle>Erreur</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto mt-10 px-4 space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader><CardTitle>Total fichiers</CardTitle></CardHeader>
          <CardContent className="text-2xl font-semibold">{items.length}</CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle>Taille totale</CardTitle></CardHeader>
          <CardContent className="text-2xl font-semibold">{formatSize(totalSize)}</CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle>Types MIME</CardTitle></CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            {[...new Set(items.map(i => i.type_contenu))].join(", ") || "—"}
          </CardContent>
        </Card>
      </div>

      <h1 className="text-2xl font-bold">Fichiers</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.map((f: Fichier) => (
          <Card key={f.id}>
            <CardHeader>
              <CardTitle className="truncate">{f.libelle}</CardTitle>
            </CardHeader>
            <CardContent className="text-sm space-y-1">
              <p><span className="font-medium">ID :</span> {f.identifiant_fichier}</p>
              <p><span className="font-medium">MIME :</span> {f.type_contenu}</p>
              <p><span className="font-medium">Taille :</span> {formatSize(f.taille)}</p>
              <p className="pt-2"><span className="font-medium">Jeu :</span> {f.jeu}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
