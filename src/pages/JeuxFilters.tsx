import React, { useState } from "react";

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
    <div style={{ marginBottom: 20 }}>

      <input placeholder="Recherche…" value={search} onChange={(e) => setSearch(e.target.value)} />
      <input placeholder="Source…" value={source} onChange={(e) => setSource(e.target.value)} />
      <input placeholder="Auteur…" value={auteur} onChange={(e) => setAuteur(e.target.value)} />
      <input placeholder="Sujet / Thématique…" value={sujet} onChange={(e) => setSujet(e.target.value)} />

      <input type="date" value={dateMin} onChange={(e) => setDateMin(e.target.value)} />
      <input type="date" value={dateMax} onChange={(e) => setDateMax(e.target.value)} />

      <button onClick={handleApply}>Filtrer</button>
    </div>
  );
}
