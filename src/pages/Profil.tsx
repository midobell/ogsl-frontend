// src/pages/Profil.tsx
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../store/store";
import {
  fetchUserProfile,
  updateEmail,
  updatePassword,
} from "../store/userSlice";

import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { Skeleton } from "../components/ui/skeleton";
import {
  Alert,
  AlertTitle,
  AlertDescription,
} from "../components/ui/alert";

export default function Profil() {
  const dispatch = useDispatch<AppDispatch>();
  const { profile, loading, error } = useSelector(
    (state: RootState) => state.user
  );

  const [email, setEmail] = useState("");
  const [oldPwd, setOldPwd] = useState("");
  const [newPwd, setNewPwd] = useState("");

  useEffect(() => {
    dispatch(fetchUserProfile());
  }, [dispatch]);

  useEffect(() => {
    if (profile?.email) {
      setEmail(profile.email);
    }
  }, [profile]);

  if (loading) {
    return (
      <div className="max-w-2xl mx-auto mt-10 px-4 space-y-4">
        <Skeleton className="h-8 w-1/3" />
        <Skeleton className="h-28 w-full" />
        <Skeleton className="h-28 w-full" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-2xl mx-auto mt-10 px-4">
        <Alert variant="destructive">
          <AlertTitle>Erreur</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      </div>
    );
  }

  if (!profile) return null;

  return (
    <div className="max-w-2xl mx-auto mt-10 px-4 space-y-6">

      <h1 className="text-3xl font-bold">
        Mon profil
      </h1>

      <Card>
        <CardHeader>
          <CardTitle>
            Informations personnelles
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm">
          <p>
            <span className="text-muted-foreground">
              Nom d’utilisateur :
            </span>{" "}
            {profile.username}
          </p>
          <p>
            <span className="text-muted-foreground">
              Adresse email :
            </span>{" "}
            {profile.email}
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>
            Modifier l’adresse email
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Button className="w-full" onClick={() => dispatch(updateEmail({ email }))}>
            Mettre à jour l’email
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>
            Sécurité du compte
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <Input
            type="password"
            placeholder="Ancien mot de passe"
            value={oldPwd}
            onChange={(e) => setOldPwd(e.target.value)}
          />
          <Input
            type="password"
            placeholder="Nouveau mot de passe"
            value={newPwd}
            onChange={(e) => setNewPwd(e.target.value)}
          />
          <Button
            variant="secondary"
            className="w-full"
            onClick={() =>
              dispatch(
                updatePassword({
                  old_password: oldPwd,
                  new_password: newPwd,
                })
              )
            }
          >
            Changer le mot de passe
          </Button>
        </CardContent>
      </Card>

    </div>
  );
}
