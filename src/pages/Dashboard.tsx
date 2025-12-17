import React from "react";
import { Database, FileText, BarChart2, User } from "lucide-react";

export default function Dashboard() {
  return (
    <div className="space-y-8">

      {/* Titre */}
      <h1 className="text-3xl font-bold text-gray-800">Tableau de bord</h1>

      {/* Cartes principales */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        
        <div className="bg-white shadow rounded-xl p-5 flex items-center gap-4">
          <Database className="text-blue-600" size={32} />
          <div>
            <p className="text-sm text-gray-500">Total des Jeux</p>
            <p className="text-2xl font-semibold">128</p>
          </div>
        </div>

        <div className="bg-white shadow rounded-xl p-5 flex items-center gap-4">
          <FileText className="text-green-600" size={32} />
          <div>
            <p className="text-sm text-gray-500">Fichiers Importés</p>
            <p className="text-2xl font-semibold">412</p>
          </div>
        </div>

        <div className="bg-white shadow rounded-xl p-5 flex items-center gap-4">
          <BarChart2 className="text-purple-600" size={32} />
          <div>
            <p className="text-sm text-gray-500">Sources Actives</p>
            <p className="text-2xl font-semibold">38</p>
          </div>
        </div>

        <div className="bg-white shadow rounded-xl p-5 flex items-center gap-4">
          <User className="text-orange-600" size={32} />
          <div>
            <p className="text-sm text-gray-500">Profil Actif</p>
            <p className="text-2xl font-semibold">Admin</p>
          </div>
        </div>

      </div>

      {/* Deuxième section : Aperçu rapide */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* Activités récentes */}
        <div className="bg-white shadow rounded-xl p-6">
          <h2 className="text-xl font-bold mb-4">Activités récentes</h2>

          <ul className="space-y-3">
            <li className="border-l-4 border-blue-500 pl-3">
              Nouveau jeu ajouté : <b>Dataset Climat Québec 2024</b>
            </li>
            <li className="border-l-4 border-green-500 pl-3">
              Importation de 12 fichiers terminée.
            </li>
            <li className="border-l-4 border-purple-500 pl-3">
              Mise à jour : Source Borealis Montréal.
            </li>
          </ul>
        </div>

        {/* Aperçu des statistiques */}
        <div className="bg-white shadow rounded-xl p-6">
          <h2 className="text-xl font-bold mb-4">Aperçu statistique</h2>

          <p className="text-gray-600">
            Consultez la section <b>Statistiques</b> pour visualiser les graphiques
            détaillés générés à partir des données moissonnées.
          </p>
        </div>

      </div>
    </div>
  );
}
