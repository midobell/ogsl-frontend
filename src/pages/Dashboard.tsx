// src/pages/Dashboard.tsx
import React from "react";
import {
  Database,
  FileText,
  BarChart2,
  User,
  ArrowUpRight,
} from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Link } from "react-router-dom";

export default function Dashboard() {
  return (
    <div className="space-y-8">

      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-800">
          Tableau de bord
        </h1>
        <span className="text-sm text-muted-foreground">
          Vue d’ensemble du système OGSL
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

        <Card>
          <CardContent className="flex items-center justify-between p-5">
            <div className="flex items-center gap-4">
              <Database className="text-blue-600" size={32} />
              <div>
                <p className="text-sm text-muted-foreground">
                  Total des Jeux
                </p>
                <p className="text-2xl font-semibold">
                  128
                </p>
              </div>
            </div>
            <ArrowUpRight className="text-muted-foreground" />
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center justify-between p-5">
            <div className="flex items-center gap-4">
              <FileText className="text-green-600" size={32} />
              <div>
                <p className="text-sm text-muted-foreground">
                  Fichiers importés
                </p>
                <p className="text-2xl font-semibold">
                  412
                </p>
              </div>
            </div>
            <ArrowUpRight className="text-muted-foreground" />
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center justify-between p-5">
            <div className="flex items-center gap-4">
              <BarChart2 className="text-purple-600" size={32} />
              <div>
                <p className="text-sm text-muted-foreground">
                  Sources actives
                </p>
                <p className="text-2xl font-semibold">
                  38
                </p>
              </div>
            </div>
            <ArrowUpRight className="text-muted-foreground" />
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center justify-between p-5">
            <div className="flex items-center gap-4">
              <User className="text-orange-600" size={32} />
              <div>
                <p className="text-sm text-muted-foreground">
                  Profil actif
                </p>
                <p className="text-2xl font-semibold">
                  Admin
                </p>
              </div>
            </div>
            <ArrowUpRight className="text-muted-foreground" />
          </CardContent>
        </Card>

      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        <Card>
          <CardHeader>
            <CardTitle>
              Activités récentes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3 text-sm">
              <li className="border-l-4 border-blue-500 pl-3">
                Nouveau jeu ajouté : Dataset Climat Québec 2024
              </li>
              <li className="border-l-4 border-green-500 pl-3">
                Importation de 12 fichiers terminée
              </li>
              <li className="border-l-4 border-purple-500 pl-3">
                Mise à jour de la source Borealis Montréal
              </li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>
              Accès rapide
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-3">
            <Button asChild variant="outline">
              <Link to="/stats">
                Consulter les statistiques
              </Link>
            </Button>
            <Button asChild variant="outline">
              <Link to="/jeux">
                Parcourir les jeux
              </Link>
            </Button>
            <Button asChild variant="outline">
              <Link to="/sources">
                Voir les sources
              </Link>
            </Button>
          </CardContent>
        </Card>

      </div>
    </div>
  );
}
