export const cars = [
  {
    id: '1',
    slug: 'porsche-911-sc-targa-1982',
    marque: 'Porsche',
    modele: '911 SC Targa',
    annee: 1982,
    prix: 48500,
    km: 112000,
    moteur: 'Flat-6 3.0L',
    puissance: 204,
    boite: 'Manuelle 5 vitesses',
    couleur: 'Blanc Grand Prix',
    category: 'porsche',
    vendeur: 'autimmob',
    description:
      "Exemplaire d'exception de la légendaire 911 SC en version Targa, produite entre 1978 et 1983. Reconnaissable à son anneau Targa en acier inoxydable brossé et son toit amovible, cette 911 incarne l'élégance sportive de son époque. Moteur 3.0L flat-six entièrement révisé, carrosserie saine sans trace de rouille, intérieur d'époque soigné. Un investissement autant qu'un plaisir de conduite.",
    points_forts: [
      'Kilométrage certifié carnet d\'entretien complet',
      'Moteur flat-6 révisé — distribution, joints, carburation',
      'Carrosserie saine, peinture d\'origine',
      'Intérieur cuir havane d\'origine',
      'Toit Targa et lunette arrière en parfait état',
    ],
    garanties: ['Garantie 6 mois pièces & main d\'œuvre', 'Contrôle technique valide', 'Historique propriétaires vérifié'],
    historique: {
      nb_proprietaires: 3,
      premiere_mise_en_circulation: '15/09/1982',
      pays_origine: 'Allemagne',
      carnet_entretien: true,
      ct_validite: 'Mai 2028',
    },
    timeline: [
      { date: 'Mars 2026', titre: 'Acquisition', description: 'Achat auprès d\'un collectionneur parisien. Carnet d\'entretien complet depuis 1982, trois propriétaires identifiés.' },
      { date: 'Avril 2026', titre: 'Diagnostic complet', description: 'Passage au banc moteur. Contrôle de toutes les soudures, soubassements et points de rouille potentiels.' },
      { date: 'Avril 2026', titre: 'Révision moteur', description: 'Distribution complète, joints, carburation Weber révisée. Le flat-six restitue ses 204 ch d\'origine.' },
      { date: 'Mai 2026', titre: 'Carrosserie & finitions', description: 'Traitement anti-corrosion préventif soubassements. Retouches peinture sur aile arrière gauche pour homogénéité.' },
      { date: 'Mai 2026', titre: 'Contrôle technique', description: 'CT effectué sans réserve. Prête à prendre la route.' },
    ],
    hotspots: [
      { x: 250, y: 78, label: 'Jante Fuchs 16"', description: 'Jantes Fuchs d\'époque en alliage d\'aluminium forgé, état d\'origine impeccable.' },
      { x: 315, y: 110, label: 'Structure magnésium', description: 'Bras en magnésium caracteristique des Fuchs de 1982, inoxydable et léger.' },
      { x: 250, y: 130, label: 'Moyeu central chromé', description: 'Moyeu chromé d\'origine avec logo Porsche, aucune trace d\'impact.' },
    ],
    // ─── Médias ───────────────────────────────────────────────────
    media: {
      photos: [
        { url: '/hero.jpg',                                                                                                           alt: 'Porsche 911 SC Targa — Vue principale' },
        { url: 'https://images.unsplash.com/photo-1580274455191-1c62238fa333?w=1600&q=85&fit=crop', alt: 'Profil gauche — Blanc Grand Prix' },
        { url: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1600&q=85&fit=crop', alt: 'Vue arrière' },
        { url: 'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=1600&q=85&fit=crop', alt: 'Anneau Targa & toit amovible' },
        { url: 'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=1600&q=85&fit=crop',   alt: 'Intérieur cuir havane' },
      ],
      views360: [
        {
          id: 'ext',
          label: 'Extérieur 360°',
          type: 'video',                           // → Viewer360Video (PSV VideoPlugin)
          source: '/videos/porsche-360.mp4',       // déposer dans /public/videos/
          description: 'Exploration complète de la carrosserie en vidéo 360° interactive',
        },
      ],
      videos: [],   // onglet "Vidéo" masqué — à remplir quand une vidéo de présentation sera disponible
    },
  },
  {
    id: '2',
    slug: 'volkswagen-golf-gti-mk3-1996',
    marque: 'Volkswagen',
    modele: 'Golf GTI Mk3',
    annee: 1996,
    prix: 14900,
    km: 87000,
    moteur: '2.0L 16V',
    puissance: 150,
    boite: 'Manuelle 5 vitesses',
    couleur: 'Noir Magnétique',
    category: 'youngtimer',
    vendeur: 'particulier',
    description:
      "La Golf GTI Mk3 est aujourd'hui le youngtimer par excellence. Ce modèle 2.0L 16V de 1996 présente un kilométrage cohérent avec son âge et un état de conservation remarquable pour une voiture de cet âge. Entretenue avec soin par un propriétaire passionné, elle est prête à rouler au quotidien ou à rejoindre une collection.",
    points_forts: [
      'Kilométrage faible et certifié',
      'Boîte de vitesses récemment révisée',
      'Jantes BBS d\'origine présentes',
      'Pas de modification — état d\'origine',
      'Documents complets depuis 1996',
    ],
    garanties: ['Contrôle technique valide', 'Historique vérifié'],
    historique: {
      nb_proprietaires: 2,
      premiere_mise_en_circulation: '03/06/1996',
      pays_origine: 'Allemagne',
      carnet_entretien: true,
      ct_validite: 'Janvier 2027',
    },
    media: {
      photos: [
        { url: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=1600&q=85&fit=crop', alt: 'Golf GTI Mk3 — Face avant' },
        { url: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=1600&q=85&fit=crop', alt: 'Profil — Noir Magnétique' },
        { url: 'https://images.unsplash.com/photo-1609521263047-f8f205293f24?w=1600&q=85&fit=crop', alt: 'Intérieur GTI' },
        { url: 'https://images.unsplash.com/photo-1568605117036-5f715f2ff3c7?w=1600&q=85&fit=crop', alt: 'Vue arrière & jantes BBS' },
      ],
    },
  },
  {
    id: '3',
    slug: 'bmw-m3-e46-2003',
    marque: 'BMW',
    modele: 'M3 E46',
    annee: 2003,
    prix: 29800,
    km: 148000,
    moteur: 'S54B32 3.2L Inline-6',
    puissance: 343,
    boite: 'Manuelle 6 vitesses',
    couleur: 'Gris Titanium',
    category: 'sportive',
    vendeur: 'autimmob',
    description:
      "La BMW M3 E46 est unanimement considérée comme l'une des meilleures berlines sportives jamais construites. Son six cylindres en ligne S54 de 343ch est un chef d'œuvre mécanique. Cet exemplaire a fait l'objet d'une remise en état complète par notre atelier : embrayage neuf, bagues de triangle remplacées, freins neufs sur les 4 roues. Prête à reprendre la route.",
    points_forts: [
      'Embrayage neuf — mai 2026',
      'Bagues de triangle et silent-blocs refaits',
      'Freins neufs 4 roues (disques + plaquettes)',
      'Vanne VANOS et joints culasse vérifiés',
      'Historique d\'entretien complet',
    ],
    garanties: ['Garantie 6 mois pièces & main d\'œuvre', 'Contrôle technique valide', 'Historique propriétaires vérifié'],
    historique: {
      nb_proprietaires: 2,
      premiere_mise_en_circulation: '18/03/2003',
      pays_origine: 'Allemagne',
      carnet_entretien: true,
      ct_validite: 'Avril 2028',
    },
    timeline: [
      { date: 'Février 2026', titre: 'Acquisition', description: 'Reprise auprès d\'un particulier. Historique complet vérifié depuis 2003, deux propriétaires.' },
      { date: 'Mars 2026', titre: 'Diagnostic complet', description: 'Diagnostic électronique S54. Révélation de l\'usure d\'embrayage et des bagues de triangle.' },
      { date: 'Avril 2026', titre: 'Remise en état mécanique', description: 'Embrayage neuf Sachs, bagues de triangle et silent-blocs avant remplacés, freins neufs sur les 4 roues.' },
      { date: 'Mai 2026', titre: 'Vanne VANOS & joints', description: 'Contrôle et nettoyage de la vanne VANOS. Joints de culasse vérifiés, aucune fuite constatée.' },
      { date: 'Mai 2026', titre: 'Contrôle technique', description: 'CT valide sans réserve. Prête à reprendre la route.' },
    ],
    media: {
      photos: [
        { url: 'https://images.unsplash.com/photo-1552519507-da3b142895be?w=1600&q=85&fit=crop', alt: 'BMW M3 E46 — Face avant' },
        { url: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=1600&q=85&fit=crop', alt: 'Profil — Gris Titanium' },
        { url: 'https://images.unsplash.com/photo-1542362567-b07e54358753?w=1600&q=85&fit=crop', alt: 'Vue arrière diffuseur' },
        { url: 'https://images.unsplash.com/photo-1556189031-cdb0b516c9e6?w=1600&q=85&fit=crop', alt: 'Cockpit M3' },
        { url: 'https://images.unsplash.com/photo-1566473965997-3de9c817e938?w=1600&q=85&fit=crop', alt: 'Moteur S54B32 3.2L' },
      ],
    },
  },
  {
    id: '4',
    slug: 'renault-megane-ii-2005',
    marque: 'Renault',
    modele: 'Mégane II',
    annee: 2005,
    prix: 4200,
    km: 156000,
    moteur: '1.6L 16V',
    puissance: 115,
    boite: 'Manuelle 5 vitesses',
    couleur: 'Rouge Vif',
    category: 'immanquable',
    vendeur: 'autimmob',
    description:
      "Une Mégane II fiable et bien entretenue, idéale comme premier véhicule ou véhicule du quotidien. Révisée dans notre atelier avec remplacement des filtres, bougies et courroie de distribution. Carrosserie propre avec quelques traces d'usage normales. Prête à rouler immédiatement.",
    points_forts: [
      'Courroie de distribution neuve',
      'Révision complète effectuée',
      'Climatisation fonctionnelle',
      'Contrôle technique valide 2 ans',
      'Premier prix du marché',
    ],
    garanties: ['Contrôle technique valide', 'Révision atelier certifiée'],
    historique: {
      nb_proprietaires: 1,
      premiere_mise_en_circulation: '22/07/2005',
      pays_origine: 'France',
      carnet_entretien: false,
      ct_validite: 'Juillet 2027',
    },
    timeline: [
      { date: 'Janvier 2026', titre: 'Acquisition', description: 'Reprise d\'un particulier. Première propriétaire depuis l\'origine.' },
      { date: 'Février 2026', titre: 'Révision complète', description: 'Courroie de distribution neuve, filtres air/huile/carburant, bougies, vidange. Climatisation vérifiée et rechargée.' },
      { date: 'Mars 2026', titre: 'Contrôle technique', description: 'CT valide 2 ans. Prête à rouler immédiatement.' },
    ],
    media: {
      photos: [
        { url: 'https://images.unsplash.com/photo-1541899481282-d53bfd47983a?w=1600&q=85&fit=crop', alt: 'Renault Mégane II — Face avant' },
        { url: 'https://images.unsplash.com/photo-1567818735868-e71b99932e29?w=1600&q=85&fit=crop', alt: 'Profil — Rouge Vif' },
        { url: 'https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=1600&q=85&fit=crop',   alt: 'Intérieur Mégane' },
      ],
    },
  },
]

export function getCar(slug) {
  return cars.find((c) => c.slug === slug) ?? null
}

export const stockCars = cars

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
