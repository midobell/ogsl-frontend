import { gql } from "@apollo/client";

export const GET_JEU_DETAILS = gql`
  query GetJeuDetails($id: ID!) {
    jeu(id: $id) {
      id
      titre
      description
      auteurs
      identifiant_permanent
      sujet
      fichiers {
        id
        libelle
        taille
        type_contenu
      }
    }
  }
`;

export const STATS_JEUX_QUERY = gql`
  query StatsJeux {
    statsJeux {
      totalJeux
      totalFichiers
      tailleTotaleOctets

      repartitionMime
      repartitionAnnee

      repartitionSource
      evolutionTaille
    }
  }
`;
