import { gql } from "@apollo/client";

export const CREATE_JEU = gql`
  mutation CreateJeu(
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
