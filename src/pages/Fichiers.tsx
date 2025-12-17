import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchFichiers } from "../store/fichiersSlice";
import { RootState, AppDispatch } from "../store/store";
import { Fichier } from "../types";
import { exportPDF } from "../utils/exportPdf";

export default function Fichiers() {
  const dispatch = useDispatch<AppDispatch>();
  const { items, loading, error } = useSelector(
    (state: RootState) => state.fichiers
  );

  useEffect(() => {
    dispatch(fetchFichiers());
  }, [dispatch]);

  if (loading) return <p>Chargement…</p>;
  if (error) return <p className="text-red-600">{error}</p>;

  return (
    
    <div className="max-w-5xl mx-auto mt-10 px-4">
      
      
      <h1 className="text-2xl font-bold mb-6">Fichiers</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
        {items.map((f: Fichier) => (
          <div
            key={f.id}
            className="bg-white border rounded-lg p-4 shadow-sm hover:shadow-md transition"
          >
            <h2 className="font-semibold text-lg">{f.libelle}</h2>

            <p className="text-gray-600 text-sm mt-2">
              ID : {f.identifiant_fichier}
            </p>

            <p className="text-gray-600 text-sm">Type MIME : {f.type_contenu}</p>
            <p className="text-gray-600 text-sm">Taille : {f.taille} octets</p>

            <p className="text-gray-700 text-sm mt-2">
              <span className="font-medium">Jeu associé :</span> {f.jeu}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
