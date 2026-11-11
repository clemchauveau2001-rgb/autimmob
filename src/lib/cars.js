/**
 * Convention photos 360° — valable pour TOUTES les voitures.
 * Déposer les fichiers dans /public/360/<slug>/ :
 *   exterieur.jpg  et  interieur.jpg   (JPG équirectangulaire 2:1, ex. 7680×3840)
 * puis, dans la voiture :  media: { ..., views360: photos360('<slug>') }
 */
export function photos360(slug, vues = ['exterieur', 'interieur']) {
  const LABELS = { exterieur: 'Extérieur', interieur: 'Intérieur' }
  return vues.map((v) => ({
    id: v,
    label: LABELS[v] ?? v,
    type: 'photo',
    panorama: `/360/${slug}/${v}.jpg`,
  }))
}

/* Stock réel : ajouter ici les véhicules au fur et à mesure (voir photos360 ci-dessus).
   `enLigne: false` = fiche prête mais masquée du site (liste, Nouveautés, sitemap, page directe).
   Pour publier : supprimer la ligne `enLigne: false` du véhicule. */
const toutesLesVoitures = [
  {
    id: 'opel-meriva',
    slug: 'opel-meriva',
    dossierDrive: 'Opel Meriva', // sous-dossier Drive AUTIMMOB/voiture/ (utilisé par l'agent annonceur)
    ajoutee: '2026-11-11', // date de mise en ligne : sert à la page Nouveautés (30 jours)
    marque: 'Opel',
    modele: 'Meriva 1.6 105 Cosmo',
    annee: 2008,
    prix: 3790,
    km: 113406, // relevé au compteur, non garanti (à vérifier)
    moteur: '1.6 essence',
    puissance: 105,
    boite: 'Manuelle',
    couleur: 'Gris argent',
    category: 'standard',
    vendeur: 'autimmob',
    description:
      "Opel Meriva 1.6 105 ch de 2008 en finition Cosmo, gris argent, boîte manuelle.\nMonospace compact et très pratique\u00a0: habitacle modulable, banquette arrière coulissante, grand volume pour la famille et les trajets du quotidien. Historique complet. Quatre freins à disques neufs. Très bien équipée\u00a0: climatisation automatique, grand écran avec radio intégrée et GPS, ordinateur de bord, commandes au volant, 4 vitres électriques, rétroviseurs électriques, jantes alu et vitres surteintées. Kilométrage relevé au compteur, non garanti. Visite et essai sur rendez-vous à Saint-Martin-de-Crau.",
    points_forts: [
      'Historique complet',
      'Quatre freins à disques neufs',
      'Climatisation automatique, grand écran avec radio intégrée et GPS',
      'Ordinateur de bord, commandes au volant',
      '4 vitres électriques, rétroviseurs électriques',
      'Jantes alu, vitres surteintées',
      'Moteur essence 1.6 de 105 ch, boîte manuelle',
      'Essai possible sur rendez-vous à Saint-Martin-de-Crau',
    ],
    garanties: ['Garantie selon conditions de vente Autimmob', 'Contrôle sur 133 points'],
    media: {
      photos: [
        { url: '/cars/opel-meriva/face.jpg', alt: 'Opel Meriva, vue de face' },
        { url: '/cars/opel-meriva/trois-quarts-avant.jpg', alt: 'Opel Meriva, trois-quarts avant gauche' },
        { url: '/cars/opel-meriva/habitacle.jpg', alt: 'Opel Meriva, poste de conduite et sièges avant' },
        { url: '/cars/opel-meriva/banquette.jpg', alt: 'Opel Meriva, banquette arrière' },
        { url: '/cars/opel-meriva/coffre.jpg', alt: 'Opel Meriva, coffre' },
        { url: '/cars/opel-meriva/moteur.jpg', alt: 'Opel Meriva, compartiment moteur 1.6' },
      ],
      views360: [],
      videos: [],
    },
  },
  {
    id: 'porsche-cayenne-turbo',
    enLigne: false, // masquée pour l'instant
    ajoutee: '2026-11-08', // date de mise en ligne : sert à la page Nouveautés (30 jours)
    slug: 'porsche-cayenne-turbo',
    dossierDrive: 'Porsche Cayenne Turbo', // sous-dossier Drive AUTIMMOB/voiture/ (utilisé par l'agent annonceur)
    marque: 'Porsche',
    modele: 'Cayenne Turbo',
    annee: null, // à renseigner (carte grise, case B)
    prix: null, // à renseigner : affiche "Sur demande"
    km: null, // à relever au compteur
    moteur: 'V8 4.5 Turbo',
    puissance: null, // à confirmer (carte grise, case P.2)
    boite: 'Automatique',
    couleur: 'Gris',
    category: 'sportive',
    vendeur: 'autimmob',
    description:
      "Porsche Cayenne Turbo gris, V8 biturbo, présenté avec sa visite à 360° de l'habitacle. Un SUV sportif au caractère rare, avec l'échappement quadruple et les jantes 5 branches. Photos non retouchées, essai et visite sur rendez-vous à Saint-Martin-de-Crau.",
    points_forts: [
      'Moteur V8 biturbo, la version Turbo du Cayenne',
      'Visite à 360° de l\'habitacle',
      'Attelage monté',
      'Essai possible sur rendez-vous à Saint-Martin-de-Crau',
    ],
    garanties: ['Garantie selon conditions de vente Autimmob', 'Contrôle sur 133 points'],
    media: {
      photos: [
        { url: '/cars/porsche-cayenne-turbo/01-face.jpg', alt: 'Porsche Cayenne Turbo, vue de face' },
        { url: '/cars/porsche-cayenne-turbo/02-trois-quarts-avant.jpg', alt: 'Porsche Cayenne Turbo, trois-quarts avant' },
        { url: '/cars/porsche-cayenne-turbo/03-profil.jpg', alt: 'Porsche Cayenne Turbo, profil' },
        { url: '/cars/porsche-cayenne-turbo/04-trois-quarts-arriere.jpg', alt: 'Porsche Cayenne Turbo, trois-quarts arrière' },
        { url: '/cars/porsche-cayenne-turbo/05-moteur.jpg', alt: 'Porsche Cayenne Turbo, moteur V8' },
      ],
      views360: photos360('porsche-cayenne-turbo', ['interieur']),
      videos: [],
    },
  },
  {
    id: 'ford-fiesta-2014',
    ajoutee: '2026-11-11', // date de mise en ligne : sert à la page Nouveautés (30 jours)
    slug: 'ford-fiesta-2014',
    dossierDrive: 'Ford Fiesta', // sous-dossier Drive AUTIMMOB/voiture/ (utilisé par l'agent annonceur)
    marque: 'Ford',
    modele: 'Fiesta 1.25 82 Trend',
    annee: 2014,
    prix: 4600,
    km: 123762,
    moteur: '1.25 essence',
    puissance: 82,
    boite: 'Manuelle',
    couleur: 'Blanc',
    category: 'standard',
    vendeur: 'autimmob',
    description:
      "Ford Fiesta 1.25 82 ch en finition Trend, 5 portes, première mise en circulation en mars 2014, blanche, 123 762 km au compteur. Citadine simple, économique et facile à vivre, idéale pour la ville comme pour les trajets quotidiens. Courroie de distribution changée à 90 000 km. Équipée\u00a0: climatisation automatique, autoradio intégré avec Bluetooth, ordinateur de bord, rétroviseurs électriques et nouvelles jantes. Véhicule présenté en l'état réel, photos non retouchées. Contactez-nous pour l'essayer à Saint-Martin-de-Crau.",
    points_forts: [
      'Citadine 5 portes, pratique au quotidien',
      'Courroie de distribution changée à 90 000 km',
      'Climatisation automatique, Bluetooth, ordinateur de bord',
      'Nouvelles jantes',
      'Moteur essence, entretien et assurance abordables',
      'Compartiment moteur propre, photos à l\'appui',
      'Essai possible sur rendez-vous à Saint-Martin-de-Crau',
    ],
    garanties: ['Garantie selon conditions de vente Autimmob', 'Contrôle sur 133 points'],
    media: {
      photos: [
        { url: '/cars/ford-fiesta-2014/face.jpg', alt: 'Ford Fiesta 2014, vue de face' },
        { url: '/cars/ford-fiesta-2014/trois-quarts-avant.jpg', alt: 'Ford Fiesta 2014, trois-quarts avant avec les nouvelles jantes' },
        { url: '/cars/ford-fiesta-2014/trois-quarts-arriere.jpg', alt: 'Ford Fiesta 2014, trois-quarts arrière' },
        { url: '/cars/ford-fiesta-2014/arriere-gauche.jpg', alt: 'Ford Fiesta 2014, arrière gauche' },
        { url: '/cars/ford-fiesta-2014/moteur.jpg', alt: 'Ford Fiesta 2014, compartiment moteur' },
      ],
      views360: photos360('ford-fiesta-2014', ['interieur']),
      videos: [],
    },
  },
]

export const cars = toutesLesVoitures.filter((c) => c.enLigne !== false)

export function getCar(slug) {
  return cars.find((c) => c.slug === slug) ?? null
}

export const stockCars = cars

/** Véhicules mis en ligne depuis moins de `jours` jours (champ `ajoutee: 'AAAA-MM-JJ'`), les plus récents d'abord. */
export function getNouveautes(jours = 30) {
  const limite = Date.now() - jours * 24 * 60 * 60 * 1000
  return cars
    .filter((c) => c.ajoutee && new Date(c.ajoutee).getTime() >= limite)
    .sort((a, b) => new Date(b.ajoutee) - new Date(a.ajoutee))
}

export function getCarsByCategory(category) {
  if (!category || category === 'tout') return stockCars
  return stockCars.filter((c) => c.category === category)
}

export const CATEGORIES = [
  { id: 'tout',        label: 'Tout'        },
  { id: 'immanquable', label: 'Immanquables' },
  { id: 'standard',   label: 'Standard'    },
  { id: 'sportive',   label: 'Sportives'   },
  { id: 'youngtimer', label: 'Youngtimers' },
  { id: 'utilitaire', label: 'Utilitaires' },
]

export const CATEGORY_META = {
  porsche:     { label: 'Porsche',     color: '#C0392B', bg: '#fef2f2' },
  immanquable: { label: 'Immanquable', color: '#C0392B', bg: '#fef2f2' },
  youngtimer:  { label: 'Youngtimer',  color: '#92400e', bg: '#fffbeb' },
  sportive:    { label: 'Sportive',    color: '#1e3a5f', bg: '#eff6ff' },
  standard:    { label: 'Standard',   color: '#374151', bg: '#f3f4f6' },
  utilitaire:  { label: 'Utilitaire',  color: '#374151', bg: '#f3f4f6' },
  accessible:  { label: 'Accessible',  color: '#14532d', bg: '#f0fdf4' },
}
