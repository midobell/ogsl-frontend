import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSources } from "../store/sourcesSlice";
import { RootState, AppDispatch } from "../store/store";
import { Source } from "../types";
import { exportPDF } from "../utils/exportPdf";

export default function Sources() {
  const dispatch = useDispatch<AppDispatch>();
  const { items, loading, error } = useSelector(
    (state: RootState) => state.sources
  );

  useEffect(() => {
    dispatch(fetchSources());
  }, [dispatch]);

  return (
    <div className="max-w-4xl mx-auto mt-10 px-4">
      {/* Bouton PDF */}
                  <button
                    onClick={() => exportPDF("pdf-liste-jeux", "liste_des_jeux")}
                    className="mb-6 bg-blue-600 text-white px-4 py-2 rounded shadow hover:bg-blue-700 transition"
                  >
                    Exporter en PDF
                  </button>
      <h1 className="text-2xl font-bold mb-6">Sources</h1>

      {loading && <p>Chargement...</p>}
      {error && <p className="text-red-600">{error}</p>}

      <div className="space-y-3">
        {items.map((src: Source) => (
          <div
            key={src.id}
            className="bg-white p-4 border rounded-lg shadow-sm hover:shadow-md transition"
          >
            <p className="font-semibold text-lg">{src.nom}</p>
            <p className="text-sm text-gray-600">{src.type}</p>
            <p className="text-sm text-blue-600">{src.base_url}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
