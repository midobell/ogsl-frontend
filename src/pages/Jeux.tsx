import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchJeux } from "../store/jeuxSlice";
import { RootState, AppDispatch } from "../store/store";
import JeuxFilters from "./JeuxFilters";
import { Link } from "react-router-dom";
import { Jeu } from "../types";
import { exportPDF } from "../utils/exportPdf";

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
    <div className="max-w-5xl mx-auto mt-10 px-4">
      {/* Bouton PDF */}
      <button
        onClick={() => exportPDF("pdf-liste-jeux", "liste_des_jeux")}
        className="mb-6 bg-blue-600 text-white px-4 py-2 rounded shadow hover:bg-blue-700 transition"
      >
        Exporter en PDF
      </button>

      <div id="pdf-liste-jeux">
        <h1 className="text-2xl font-bold mb-4">Liste des Jeux</h1>

        <JeuxFilters onFilter={handleFilter} />

        {loading && <p>Chargement...</p>}
        {error && <p className="text-red-600">{error}</p>}

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 mt-6">
          {items.map((jeu: Jeu) => (
            <div
              key={jeu.id}
              className="bg-white border rounded-lg p-4 shadow-sm hover:shadow-md transition"
            >
              <Link
                to={`/jeux/${jeu.id}`}
                className="text-blue-600 font-semibold text-lg hover:underline"
              >
                {jeu.titre}
              </Link>

              <p className="text-gray-500 text-sm mt-2">
                DOI : {jeu.identifiant_permanent}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
