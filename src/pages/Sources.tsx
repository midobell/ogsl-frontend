import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSources } from "../store/sourcesSlice";
import { RootState, AppDispatch } from "../store/store";
import { Source } from "../types";

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

export default function Sources() {
  const dispatch = useDispatch<AppDispatch>();
  const { items, loading, error } = useSelector(
    (state: RootState) => state.sources
  );

  useEffect(() => {
    dispatch(fetchSources());
  }, [dispatch]);

  /* Chargement */
  if (loading) {
    return (
      <div className="max-w-4xl mx-auto mt-10 px-4 space-y-4">
        <Skeleton className="h-8 w-32" />
        <Skeleton className="h-24 w-full" />
        <Skeleton className="h-24 w-full" />
        <Skeleton className="h-24 w-full" />
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

  return (
    <div className="max-w-4xl mx-auto mt-10 px-4 space-y-6">

      <h1 className="text-2xl font-bold">
        Sources
      </h1>

      <div className="space-y-4">
        {items.map((src: Source) => (
          <Card key={src.id}>
            <CardHeader>
              <CardTitle>
                {src.nom}
              </CardTitle>
            </CardHeader>

            <CardContent className="text-sm text-muted-foreground space-y-1">
              <p>
                <span className="font-medium text-foreground">
                  Type :
                </span>{" "}
                {src.type}
              </p>

              <p className="text-blue-600 break-all">
                {src.base_url}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
