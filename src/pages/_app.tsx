import '../globals.scss'

import type { AppProps } from 'next/app'
import { Inter } from 'next/font/google'

import HeroProvider from '@/providers/hero'

const inter = Inter({ subsets: ['latin'] })

export default function App({ Component, pageProps }: AppProps) {
  return (
    <HeroProvider>
      <main className={inter.className}>
        <Component {...pageProps} />
      </main>
    </HeroProvider>
  )
}
