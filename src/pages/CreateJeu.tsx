import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createJeu } from "../store/jeuxSlice";
import { AppDispatch } from "../store/store";

// ---- Interface du formulaire ----
interface CreateJeuInput {
  source_id: string;
  identifiant_permanent: string;
  titre: string;
  url_page?: string;
  date_publication?: string;
  auteurs?: string;
  personne_ressource?: string;
  description?: string;
  sujet?: string;
}

export default function CreateJeu() {
  const dispatch = useDispatch<AppDispatch>();

  const [form, setForm] = useState<CreateJeuInput>({
    source_id: "",
    identifiant_permanent: "",
    titre: "",
    url_page: "",
    date_publication: "",
    auteurs: "",
    personne_ressource: "",
    description: "",
    sujet: ""
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(createJeu(form));
  };

  return (
    <div style={{ maxWidth: "600px", margin: "40px auto" }}>
      <h1>Créer un Jeu via GraphQL</h1>

      <form onSubmit={handleSubmit}>
        <input name="source_id" placeholder="ID Source" onChange={handleChange} />
        <input name="identifiant_permanent" placeholder="DOI" onChange={handleChange} />
        <input name="titre" placeholder="Titre" onChange={handleChange} />
        <input name="url_page" placeholder="URL" onChange={handleChange} />
        <input name="date_publication" type="datetime-local" onChange={handleChange} />
        <input name="auteurs" placeholder="Auteurs" onChange={handleChange} />
        <input name="personne_ressource" placeholder="Contact" onChange={handleChange} />
        <textarea name="description" placeholder="Description" onChange={handleChange} />
        <textarea name="sujet" placeholder="Sujet" onChange={handleChange} />

        <button type="submit">Créer le jeu</button>
      </form>
    </div>
  );
}
