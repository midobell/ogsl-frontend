// src/pages/Sources.tsx
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSources } from "../store/sourcesSlice";
import { RootState, AppDispatch } from "../store/store";
import { Source } from "../types";

import { Card, CardHeader, CardTitle, CardContent } from "../components/ui/card";
import { Skeleton } from "../components/ui/skeleton";
import { Alert, AlertTitle, AlertDescription } from "../components/ui/alert";

export default function Sources() {
  const dispatch = useDispatch<AppDispatch>();
  const { items, loading, error } = useSelector((s: RootState) => s.sources);

  useEffect(() => {
    dispatch(fetchSources());
  }, [dispatch]);

  if (loading) {
    return (
      <div className="max-w-5xl mx-auto mt-10 px-4 space-y-4">
        <Skeleton className="h-8 w-32" />
        <Skeleton className="h-24 w-full" />
        <Skeleton className="h-24 w-full" />
      </div>
    );
  }

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
    <div className="max-w-5xl mx-auto mt-10 px-4 space-y-6">
      <h1 className="text-2xl font-bold">Sources</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {items.map((src: Source) => (
          <Card key={src.id}>
            <CardHeader>
              <CardTitle>{src.nom}</CardTitle>
            </CardHeader>
            <CardContent className="text-sm space-y-1">
              <p><span className="font-medium">Type :</span> {src.type}</p>
              <a
                href={src.base_url}
                target="_blank"
                rel="noreferrer"
                className="text-blue-600 break-all hover:underline"
              >
                {src.base_url}
              </a>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
