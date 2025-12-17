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

  /* Chargement */
  if (loading) {
    return (
      <div className="max-w-2xl mx-auto mt-10 px-4 space-y-4">
        <Skeleton className="h-10 w-1/2" />
        <Skeleton className="h-32 w-full" />
        <Skeleton className="h-32 w-full" />
      </div>
    );
  }

  /* Erreur */
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
        Mon Profil
      </h1>

      {/* Informations personnelles */}
      <Card>
        <CardHeader>
          <CardTitle>
            Informations personnelles
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-muted-foreground">
          <p>
            <span className="font-medium text-foreground">
              Nom d'utilisateur :
            </span>{" "}
            {profile.username}
          </p>
          <p>
            <span className="font-medium text-foreground">
              Email :
            </span>{" "}
            {profile.email}
          </p>
        </CardContent>
      </Card>

      {/* Modifier email */}
      <Card>
        <CardHeader>
          <CardTitle>
            Modifier l’email
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <Button
            onClick={() => dispatch(updateEmail({ email }))}
          >
            Mettre à jour l'email
          </Button>
        </CardContent>
      </Card>

      {/* Modifier mot de passe */}
      <Card>
        <CardHeader>
          <CardTitle>
            Changer le mot de passe
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
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
