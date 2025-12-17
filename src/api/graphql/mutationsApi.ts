import { gql } from "@apollo/client";
import { graphQLClient } from "./client";
import { Jeu } from "../../types";

export interface CreateJeuInput {
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

/**
 * Typage du retour GraphQL
 */
interface CreateJeuResponse {
  creerJeu: {
    jeu: Jeu;
  };
}

export const CREER_JEU = gql`
  mutation CreerJeu(
    $source_id: ID!,
    $identifiant_permanent: String!,
    $titre: String!,
    $url_page: String,
    $date_publication: DateTime,
    $auteurs: String,
    $personne_ressource: String,
    $description: String,
    $sujet: String
  ) {
    creerJeu(
      sourceId: $source_id,
      identifiantPermanent: $identifiant_permanent,
      titre: $titre,
      urlPage: $url_page,
      datePublication: $date_publication,
      auteurs: $auteurs,
      personneRessource: $personne_ressource,
      description: $description,
      sujet: $sujet
    ) {
      jeu {
        id
        titre
        identifiant_permanent
      }
    }
  }
`;

export async function createJeuGraphQL(
  input: CreateJeuInput
): Promise<Jeu> {

  const res = await graphQLClient.mutate<CreateJeuResponse>({
    mutation: CREER_JEU,
    variables: input,
  });

  if (!res.data?.creerJeu?.jeu) {
    throw new Error("GraphQL mutation creerJeu failed.");
  }

  return res.data.creerJeu.jeu;
}
