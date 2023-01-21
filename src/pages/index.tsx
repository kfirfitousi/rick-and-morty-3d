import Head from 'next/head';
import dynamic from 'next/dynamic';
import { Filter } from '@/components/dom/filter';

const Scene = dynamic(
  () => import('@/components/canvas/scene').then((mod) => mod.Scene),
  {
    ssr: false,
    loading() {
      return (
        <div className="row-start-2 flex h-full animate-pulse items-center justify-center text-center text-2xl text-zinc-300">
          Loading...
        </div>
      );
    },
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
        <div className="absolute top-0 left-0 z-10 flex w-full flex-col items-center justify-between space-y-4 p-8 sm:flex-row">
          <h1 className="text-center text-xl font-semibold text-zinc-300 sm:text-2xl">
            Rick and Morty
            <span className="text-rose-200"> 3D Gallery</span>
          </h1>
          <Filter />
        </div>
        <Scene className="row-start-2" />
      </div>
    </>
  );
}
