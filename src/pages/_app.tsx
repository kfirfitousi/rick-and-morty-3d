import { type AppProps } from 'next/app'
// import { useRef } from 'react'
// import dynamic from 'next/dynamic'
import Header from '@/config'
// import Layout from '@/components/dom/Layout'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import '@/styles/index.css'

// const Scene = dynamic(() => import('@/components/canvas/Scene'), { ssr: true })
const queryClient = new QueryClient()

export default function App({ Component, pageProps = { title: 'index' } }: AppProps) {
  // const ref = useRef<HTMLDivElement>(null)
  return (
    <QueryClientProvider client={queryClient}>
      <Header title={pageProps.title} />
      <Component {...pageProps} />

      {/* <Layout ref={ref}> */}
      {/* <div className='h-screen grid grid-rows-[auto,1fr]' ref={ref}>
        <Component {...pageProps} /> */}
      {/* The canvas can either be in front of the dom or behind. If it is in front it can overlay contents.
       * Setting the event source to a shared parent allows both the dom and the canvas to receive events.
       * Since the event source is now shared, the canvas would block events, we prevent that with pointerEvents: none. */}
      {/* {Component?.canvas && (
          <Scene
            gl={{ antialias: false }}
            dpr={[1, 1.5]}
            className='pointer-events-nones row-start-2'
            // style={{ top: '50%', transform: 'translateY(-50%)' }}
            eventSource={ref}>
            {Component.canvas(pageProps)}
          </Scene>
        )} */}
      {/* </Layout> */}
      {/* </div> */}
    </QueryClientProvider>
  )
}
