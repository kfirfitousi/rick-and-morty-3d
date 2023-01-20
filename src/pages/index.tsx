import { Suspense } from 'react';
import { Text } from '@react-three/drei';
import { Filter } from '@/components/dom/filter';
import dynamic from 'next/dynamic';
import Head from 'next/head';

const Gallery = dynamic(
  () => import('@/components/canvas/gallery').then((mod) => mod.Gallery),
  {
    ssr: false,
  },
);

const Scene = dynamic(
  () => import('@/components/canvas/scene').then((mod) => mod.Scene),
  {
    ssr: false,
  },
);

export default function Page() {
  return (
    <>
      <Head>
        <title>Rick and Morty 3D Gallery</title>
        <meta
          name="viewport"
          content="width=device-width, minimum-scale=1, initial-scale=1.0"
        />
      </Head>
      <div className="h-screen bg-zinc-800">
        <div className="absolute top-0 left-0 z-10 flex flex-col items-center justify-between w-full p-8 sm:flex-row space-y-4">
          <h1 className="text-xl font-semibold text-center sm:text-2xl text-zinc-300">
            Rick and Morty
            <span className="text-rose-200"> 3D Gallery</span>
          </h1>
          <Filter />
        </div>
        <Scene gl={{ antialias: false }} dpr={[1, 1.5]} className="row-start-2">
          <Suspense
            fallback={
              <Text
                color="#FECDD3"
                font="/Inter.ttf"
                fontSize={0.25}
                position={[0, 0, 0]}
              >
                Loading...
              </Text>
            }
          >
            <Gallery />
          </Suspense>
        </Scene>
      </div>
    </>
  );
}
