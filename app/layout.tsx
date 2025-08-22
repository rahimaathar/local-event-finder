import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Event Finder',
  description: 'Discover local events happening near you',
  icons: {
    icon: [
      {
        url: '/favicon.ico',
        sizes: '32x32',
      },
      {
        url: '/calendar-search-svgrepo-com.svg', // ✅ custom svg in /public
        type: 'image/svg+xml',
        sizes: 'any',
      },
    ],
    apple: {
      url: '/apple-touch-icon.png',
      sizes: '180x180',
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
