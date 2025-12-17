import React, { useState } from "react";

import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";

interface JeuxFiltersProps {
  onFilter: (filters: Record<string, any>) => void;
}

export default function JeuxFilters({ onFilter }: JeuxFiltersProps) {
  const [search, setSearch] = useState("");
  const [source, setSource] = useState("");
  const [auteur, setAuteur] = useState("");
  const [sujet, setSujet] = useState("");
  const [dateMin, setDateMin] = useState("");
  const [dateMax, setDateMax] = useState("");

  const handleApply = () => {
    const filters: Record<string, any> = {};

    if (search.trim()) filters.search = search;
    if (source.trim()) filters.source = source;
    if (auteur.trim()) filters.auteurs = auteur;
    if (sujet.trim()) filters.sujet = sujet;
    if (dateMin) filters.date_min = dateMin;
    if (dateMax) filters.date_max = dateMax;

    onFilter(filters);
  };

  return (
    <Card className="mb-6">
      <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-6">

        <Input
          placeholder="Recherche…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <Input
          placeholder="Source…"
          value={source}
          onChange={(e) => setSource(e.target.value)}
        />

        <Input
          placeholder="Auteur…"
          value={auteur}
          onChange={(e) => setAuteur(e.target.value)}
        />

        <Input
          placeholder="Sujet / Thématique…"
          value={sujet}
          onChange={(e) => setSujet(e.target.value)}
        />

        <Input
          type="date"
          value={dateMin}
          onChange={(e) => setDateMin(e.target.value)}
        />

        <Input
          type="date"
          value={dateMax}
          onChange={(e) => setDateMax(e.target.value)}
        />

        <Button
          onClick={handleApply}
          className="md:col-span-3"
        >
          Filtrer
        </Button>

      </CardContent>
    </Card>
  );
}
