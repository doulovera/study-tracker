import type { AppProps } from 'next/app'
import { Hydrate, QueryClient, QueryClientProvider } from '@tanstack/react-query'

import '../styles/globals.css'
import MainLayout from '../layouts/main'

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
        <MainLayout>
          <main className="h-full">
            <div className="max-w-3xl w-4/5 min-w-[300px] mx-auto h-full">
              <Component {...pageProps} />
            </div>
          </main>
        </MainLayout>
      </Hydrate>
    </QueryClientProvider>
  )
}
