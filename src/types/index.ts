export interface Source {
  id: number;
  nom: string;
  type: string;
  base_url: string;
  sous_arborescence?: string;
  cle_api?: string;
}

export interface Fichier {
  id: number;
  identifiant_fichier: string;
  libelle: string;
  type_contenu: string;
  taille: number;
  restreint?: boolean;
  jeu: number;
}

export interface Jeu {
  id: number;
  identifiant_permanent: string;
  url_page?: string;
  date_publication?: string;
  titre: string;
  auteurs?: string;
  personne_ressource?: string;
  description?: string;
  sujet?: string;
  fichiers: Fichier[];
}

export interface StatsMime {
  type_contenu: string;
  n: number;
  taille: number;
}

export interface StatsAnnee {
  annee: number;
  n: number;
}

export interface StatsSource {
  source: string;
  n: number;
}

export interface StatsEvolutionTaille {
  annee: number;
  taille: number;
}

export interface Chartable {
  [key: string]: string | number;
}

export interface StatsJeux {
  totalJeux: number;
  totalFichiers: number;
  tailleTotaleOctets: number;

  repartitionMime: Chartable[];
  repartitionAnnee: Chartable[];
  repartitionSource: Chartable[];
  evolutionTaille: Chartable[];
}

