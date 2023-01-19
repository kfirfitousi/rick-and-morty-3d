// import dynamic from 'next/dynamic'
import Gallery from '@/components/canvas/Gallery'
import Filter from '@/components/dom/Filter'
import Scene from '@/components/canvas/Scene'

// // Dynamic import is used to prevent a payload when the website starts, that includes threejs, r3f etc..
// // WARNING ! errors might get obfuscated by using dynamic import.
// // If something goes wrong go back to a static import to show the error.
// // https://github.com/pmndrs/react-three-next/issues/49
// const Gallery = dynamic(() => import('@/components/canvas/Gallery'), { ssr: false })

export default function Page() {
  return (
    <div className='h-screen bg-zinc-800'>
      <div className='absolute top-0 left-0 z-10 flex flex-col items-center justify-between w-full p-8 sm:flex-row'>
        <h1 className='text-2xl font-semibold text-center text-zinc-300'>Rick and Morty 3D Gallery</h1>
        <Filter />
      </div>
      <Scene gl={{ antialias: false }} dpr={[1, 1.5]} className='row-start-2'>
        <Gallery />
      </Scene>
    </div>
  )
}
