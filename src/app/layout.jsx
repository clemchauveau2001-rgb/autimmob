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
  title: 'Autimmob — Garage Automobile Marseille',
  description:
    'Garage automobile indépendant à Marseille. Spécialiste Porsche, youngtimers et sportives. Achat, vente, réparation et mandataire. Photos 360° sur chaque véhicule.',
  keywords: 'garage automobile marseille, porsche, youngtimer, sportive, achat vente voiture',
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
