import type { AppProps } from 'next/app'
import { Header } from '../components/header'
import { Hydrate, QueryClient, QueryClientProvider } from '@tanstack/react-query'

import '../styles/globals.css'

export default function App ({ Component, pageProps }: AppProps) {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false
      }
    }
  })

  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <main className="min-h-screen bg-slate-800">
          <Header />
          <Component {...pageProps} />
        </main>
      </Hydrate>
    </QueryClientProvider>
  )
}
