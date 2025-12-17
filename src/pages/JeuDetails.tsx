import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchJeuDetails } from "../store/jeuDetailsSlice";
import { RootState, AppDispatch } from "../store/store";

import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer
} from "recharts";

import { exportPDF } from "../utils/exportPdf";

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

  if (loading) return <p>Chargement…</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;
  if (!item) return null;

  const chartData = item.fichiers.map((f) => ({
    name: f.libelle.substring(0, 15),
    taille: f.taille,
  }));

  return (
    <div style={{ maxWidth: 900, margin: "40px auto" }}>
      
      {/* --- BOUTON EXPORT PDF --- */}
      <button
        onClick={() => exportPDF("pdf-jeu-details", `jeu_${item.id}`)}
        style={{
          marginBottom: 20,
          padding: "6px 12px",
          cursor: "pointer"
        }}
      >
        Exporter en PDF
      </button>

      {/* --- CONTENU À EXPORTER --- */}
      <div id="pdf-jeu-details">
        <h1>{item.titre}</h1>

        <p><strong>Description :</strong> {item.description}</p>
        <p><strong>Auteurs :</strong> {item.auteurs}</p>
        <p><strong>DOI :</strong> {item.identifiant_permanent}</p>

        <h2>Fichiers associés</h2>
        <ul>
          {item.fichiers.map((f) => (
            <li key={f.id}>
              {f.libelle} — {f.type_contenu} — {f.taille} octets
            </li>
          ))}
        </ul>

        <h2>Graphique : tailles des fichiers</h2>

        <div style={{ width: "100%", height: 300 }}>
          <ResponsiveContainer>
            <BarChart data={chartData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="taille" fill="#00aaff" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
