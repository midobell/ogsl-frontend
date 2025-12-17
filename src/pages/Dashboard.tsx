import React from "react";
import { Database, FileText, BarChart2, User } from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "../components/ui/card";

export default function Dashboard() {
  return (
    <div className="space-y-8">

      <h1 className="text-3xl font-bold text-gray-800">
        Tableau de bord
      </h1>

      {/* Cartes statistiques */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

        <Card>
          <CardContent className="flex items-center gap-4 p-5">
            <Database className="text-blue-600" size={32} />
            <div>
              <p className="text-sm text-muted-foreground">
                Total des Jeux
              </p>
              <p className="text-2xl font-semibold">
                128
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center gap-4 p-5">
            <FileText className="text-green-600" size={32} />
            <div>
              <p className="text-sm text-muted-foreground">
                Fichiers Importés
              </p>
              <p className="text-2xl font-semibold">
                412
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center gap-4 p-5">
            <BarChart2 className="text-purple-600" size={32} />
            <div>
              <p className="text-sm text-muted-foreground">
                Sources Actives
              </p>
              <p className="text-2xl font-semibold">
                38
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center gap-4 p-5">
            <User className="text-orange-600" size={32} />
            <div>
              <p className="text-sm text-muted-foreground">
                Profil Actif
              </p>
              <p className="text-2xl font-semibold">
                Admin
              </p>
            </div>
          </CardContent>
        </Card>

      </div>

      {/* Sections bas */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        <Card>
          <CardHeader>
            <CardTitle>
              Activités récentes
            </CardTitle>
          </CardHeader>
          <CardContent>
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
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>
              Aperçu statistique
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Consultez la section <b>Statistiques</b> pour visualiser les graphiques
              détaillés générés à partir des données moissonnées.
            </p>
          </CardContent>
        </Card>

      </div>
    </div>
  );
}
