import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export const metadata = {
  title: 'Conditions générales de vente | Autimmob',
  description:
    "Conditions générales de vente d'Autimmob SAS pour la vente de véhicules d'occasion, avec option de garantie commerciale payante.",
}

const ARTICLES = [
  {
    titre: "Article 1 : Champ d'application et modalités de vente",
    paragraphes: [
      "Les présentes Conditions Générales de Vente (CGV) s'appliquent de plein droit à l'ensemble des ventes de véhicules automobiles d'occasion (VO) conclues par la société AUTIMMOB SAS.",
      "Les véhicules sont commercialisés au siège de la société ou sur place. La signature du bon de commande emporte acceptation sans réserve des présentes CGV.",
    ],
  },
  {
    titre: 'Article 2 : Commande et bon de commande',
    paragraphes: [
      "Toute vente fait l'objet d'un Bon de Commande ou d'une facture de vente signée par l'Acheteur et AUTIMMOB. La vente est ferme et définitive dès la signature et le versement de l'acompte.",
    ],
  },
  {
    titre: 'Article 3 : Prix et paiement',
    paragraphes: [
      "1. Prix : Les prix des véhicules sont indiqués en Euros TTC (ou sous le régime de la TVA sur marge conformément à l'article 297 A du CGI). Les frais d'immatriculation et les options souscrites restent à la charge de l'Acheteur.",
      "2. Paiement : Le règlement du prix s'effectue au plus tard le jour de la prise de possession du véhicule par virement bancaire ou chèque de banque certifié.",
    ],
  },
  {
    titre: "Article 4 : Livraison, enlèvement et aucun droit de rétractation",
    paragraphes: [
      "1. Enlèvement : La livraison s'effectue au siège social d'AUTIMMOB. L'Acheteur s'engage à enlever le véhicule à la date convenue.",
      "2. Vente ferme sur place : Absence de droit de rétractation : Les ventes étant conclues directement dans les locaux professionnels d'AUTIMMOB après examen physique du véhicule par l'Acheteur, aucun droit de rétractation ne s'applique, conformément aux dispositions du Code de la consommation.",
    ],
  },
  {
    titre: 'Article 5 : État du véhicule et garantie commerciale en option (payante)',
    paragraphes: [
      "1. Vente en l'état par défaut : Sauf souscription d'une option payante, le véhicule est vendu d'occasion dans l'état où il se trouve lors de la vente, avec son contrôle technique réglementaire à jour si exigé par la loi, et SANS GARANTIE COMMERCIALE CONTRACTUELLE INCLUSE.",
      "2. Option Garantie Commerciale Payante (en supplément) : L'Acheteur a la possibilité de souscrire, en supplément du prix de vente du véhicule, une garantie commerciale complémentaire (ex. garantie mécanique Moteur / Boîte / Pont de 3, 6, 12 ou 24 mois). La durée, la couverture, le tarif et le contrat spécifique de cette garantie optionnelle sont détaillés et mentionnés de manière explicite sur le Bon de Commande.",
      "3. Garanties légales : Dans tous les cas, s'appliquent les garanties légales d'ordre public prévues par la loi (garantie des vices cachés au sens de l'article 1641 du Code civil et garantie légale de conformité pour les consommateurs au sens de l'article L. 217-3 du Code de la consommation).",
    ],
  },
  {
    titre: 'Article 6 : Réserve de propriété et transfert des risques',
    paragraphes: [
      "AUTIMMOB conserve la propriété du véhicule jusqu'au paiement intégral du prix et des options souscrites. Le transfert des risques intervient dès la remise des clés de la voiture à l'Acheteur, à qui il appartient de l'assurer immédiatement.",
    ],
  },
  {
    titre: 'Article 7 : Juridiction et droit applicable',
    paragraphes: [
      "Les présentes CGV sont soumises au droit français. En cas de contestation, le tribunal du ressort du siège social d'AUTIMMOB (RCS Tarascon) sera seul compétent.",
    ],
  },
]

export default function CGVPage() {
  return (
    <>
      <Navbar />
      <main className="pt-16">
        <section className="bg-[#111] text-white py-20">
          <div className="max-w-3xl mx-auto px-6">
            <span className="text-xs font-medium uppercase tracking-[0.25em] text-[#C0392B]">
              Informations légales
            </span>
            <h1 className="font-serif text-[clamp(2.5rem,5vw,4rem)] font-semibold mt-3 leading-tight">
              Conditions générales de vente
            </h1>
            <p className="mt-4 text-[#888] leading-relaxed">
              Vente de véhicules d&apos;occasion, avec option de garantie commerciale payante.
            </p>
          </div>
        </section>

        <section className="max-w-3xl mx-auto px-6 py-16">
          <div className="border border-[#E8E8E8] bg-[#F5F5F5] p-6 text-sm text-[#555] leading-relaxed">
            <p className="font-medium text-[#111]">AUTIMMOB SAS, capital de 10 000 €</p>
            <p>Siège social : 22 rue Folco de Baroncelli, 13310 Saint-Martin-de-Crau</p>
            <p>RCS Tarascon, SIREN : 130 820 376</p>
            <p>
              Téléphone : 06 49 50 71 41, E-mail :{' '}
              <a href="mailto:autimmob.contact@gmail.com" className="text-[#C0392B] hover:underline">
                autimmob.contact@gmail.com
              </a>
            </p>
          </div>

          <div className="mt-12 space-y-10">
            {ARTICLES.map((a) => (
              <article key={a.titre}>
                <h2 className="font-serif text-2xl font-semibold text-[#111]">{a.titre}</h2>
                <div className="mt-3 space-y-3 text-[#444] leading-relaxed">
                  {a.paragraphes.map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
