import { Cormorant_Garamond, Inter } from 'next/font/google'
import './globals.css'
import ScrollProgress from '@/components/ScrollProgress'
import ClientShell from '@/components/ClientShell'

const cormorant = Cormorant_Garamond({
  variable: '--font-cormorant',
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
})

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  display: 'swap',
})

export const metadata = {
  metadataBase: new URL('https://autimmob.fr'),
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    siteName: 'Autimmob',
    url: 'https://autimmob.fr',
    title: 'Autimmob | Garage Automobile Saint-Martin-de-Crau',
    description:
      'Achat, vente et mandataire automobile à Saint-Martin-de-Crau. Tout type de véhicule, à la demande.',
  },
  robots: { index: true, follow: true },
  title: 'Autimmob | Garage Automobile Saint-Martin-de-Crau',
  description:
    'Achat, vente et mandataire automobile à Saint-Martin-de-Crau. Tout type de véhicule, à la demande.',
  keywords: 'mandataire automobile saint-martin-de-crau, achat vente voiture, véhicule à la demande',
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'AutoDealer',
  name: 'Autimmob',
  url: 'https://autimmob.fr',
  image: 'https://autimmob.fr/opengraph-image.png',
  telephone: '+33649507141',
  email: 'autimmob.contact@gmail.com',
  address: {
    '@type': 'PostalAddress',
    streetAddress: '22 rue Folco de Baroncelli',
    postalCode: '13310',
    addressLocality: 'Saint-Martin-de-Crau',
    addressCountry: 'FR',
  },
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      opens: '09:00',
      closes: '19:00',
    },
  ],
}

export default function RootLayout({ children }) {
  return (
    <html lang="fr" className={`${cormorant.variable} ${inter.variable}`}>
      <body className="min-h-screen flex flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <ScrollProgress />
        <ClientShell>
          {children}
        </ClientShell>
      </body>
    </html>
  )
}
