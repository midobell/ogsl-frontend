import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../store/store";
import {
  fetchUserProfile,
  updateEmail,
  updatePassword,
} from "../store/userSlice";

export default function Profil() {
  const dispatch = useDispatch<AppDispatch>();
  const { profile, loading, error } = useSelector(
    (state: RootState) => state.user
  );

  const [email, setEmail] = useState("");
  const [oldPwd, setOldPwd] = useState("");
  const [newPwd, setNewPwd] = useState("");

  /** Charger le profil au montage */
  useEffect(() => {
    dispatch(fetchUserProfile());
  }, [dispatch]);

  /** Préremplir l’email */
  useEffect(() => {
    if (profile?.email) {
      setEmail(profile.email);
    }
  }, [profile]);

  if (loading) {
    return (
      <div className="text-center text-gray-600 mt-10 text-xl">
        Chargement…
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-600 mt-10 text-lg">
        Erreur : {error}
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="text-center text-red-600 mt-10 text-lg">
        Impossible de charger le profil.
      </div>
    );
  }

  // === Affichage principal ===
  return (
    <div className="max-w-2xl mx-auto bg-white shadow-md rounded-lg p-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">
        Mon Profil
      </h1>

      {/* Infos utilisateur */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-3 text-gray-700">
          Informations personnelles
        </h2>

        <div className="space-y-2 text-gray-800">
          <p>
            <span className="font-semibold">Nom d'utilisateur :</span>{" "}
            {profile.username}
          </p>
          <p>
            <span className="font-semibold">Email :</span>{" "}
            {profile.email}
          </p>
        </div>
      </section>

      <hr className="my-6" />

      {/* Modifier l'email */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-3 text-gray-700">
          Modifier l’email
        </h2>

        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border p-2 rounded mb-3"
        />

        <button
          onClick={() => dispatch(updateEmail({ email }))}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
        >
          Mettre à jour l'email
        </button>
      </section>

      <hr className="my-6" />

      {/* Modifier mot de passe */}
      <section>
        <h2 className="text-xl font-semibold mb-3 text-gray-700">
          Changer le mot de passe
        </h2>

        <input
          type="password"
          placeholder="Ancien mot de passe"
          value={oldPwd}
          onChange={(e) => setOldPwd(e.target.value)}
          className="w-full border p-2 rounded mb-3"
        />

        <input
          type="password"
          placeholder="Nouveau mot de passe"
          value={newPwd}
          onChange={(e) => setNewPwd(e.target.value)}
          className="w-full border p-2 rounded mb-3"
        />

        <button
          onClick={() =>
            dispatch(
              updatePassword({
                old_password: oldPwd,
                new_password: newPwd,
              })
            )
          }
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
        >
          Changer le mot de passe
        </button>
      </section>
    </div>
  );
}
