import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Cormorant_Garamond, EB_Garamond, Jost } from 'next/font/google'
import './globals.css'

const cormorant = Cormorant_Garamond({ subsets: ['latin'], weight: ['300', '400', '500', '600', '700'], style: ['normal', 'italic'], variable: '--font-cormorant', display: 'swap' })
const ebGaramond = EB_Garamond({ subsets: ['latin'], weight: ['400', '500', '600', '700'], style: ['normal', 'italic'], variable: '--font-eb-garamond', display: 'swap' })
const jost = Jost({ subsets: ['latin'], variable: '--font-jost', display: 'swap' })

export const metadata: Metadata = {
  metadataBase: new URL('https://brandon-photography.vercel.app'),
  title: {
    default: 'Brandon Photography — Nigeria · The Art of Remembering',
    template: '%s | Brandon Photography',
  },
  description:
    'A luxury fine-art, editorial photography studio for couples and brands in Lagos, Nigeria and worldwide. Weddings, portraits, and campaigns.',
  applicationName: 'Brandon Photography',
  authors: [{ name: 'Brandon' }],
  creator: 'Brandon Photography',
  publisher: 'Brandon Photography',
  openGraph: {
    type: 'website',
    locale: 'en_NG',
    url: 'https://brandon-photography.vercel.app',
    siteName: 'Brandon Photography',
    title: 'Brandon Photography — Nigeria · The Art of Remembering',
    description:
      'A luxury fine-art, editorial photography studio for couples and brands. Weddings, portraits and campaigns made across Nigeria and beyond.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Brandon Photography — BP Gold Monogram Emblem',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Brandon Photography — Nigeria · The Art of Remembering',
    description:
      'A luxury fine-art, editorial photography studio for couples and brands. Weddings, portraits and campaigns made across Nigeria and beyond.',
    images: ['/og-image.png'],
  },
  icons: {
    icon: [
      { url: '/icon.svg', type: 'image/svg+xml' },
      { url: '/icon-dark-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: '/apple-icon.png',
  },
}

export const viewport: Viewport = {
  colorScheme: 'dark',
  themeColor: '#15120F',
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${cormorant.variable} ${ebGaramond.variable} ${jost.variable}`}>
      <body className="antialiased">{children}{process.env.NODE_ENV === 'production' && <Analytics />}</body>
    </html>
  )
}
