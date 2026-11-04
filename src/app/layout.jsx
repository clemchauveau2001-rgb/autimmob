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
  title: 'Autimmob — Garage Automobile Saint-Martin-de-Crau',
  description:
    'Achat, vente et mandataire automobile à Saint-Martin-de-Crau. Tout type de véhicule, à la demande.',
  keywords: 'mandataire automobile saint-martin-de-crau, achat vente voiture, véhicule à la demande',
}

export default function RootLayout({ children }) {
  return (
    <html lang="fr" className={`${cormorant.variable} ${inter.variable}`}>
      <body className="min-h-screen flex flex-col">
        <ScrollProgress />
        <ClientShell>
          {children}
        </ClientShell>
      </body>
    </html>
  )
}
