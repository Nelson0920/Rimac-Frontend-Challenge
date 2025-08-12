export default function NotFoundPage() {
  return (
    <div className='relative flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-slateBlue to-darkBlue1 text-white p-4 overflow-hidden'>
      <h1 className='text-[10rem] font-extrabold opacity-90 animate-pulse'>
        404
      </h1>
      <p className='text-2xl mb-6'>Página no encontrada</p>
      <p className='text-lg text-white mb-8 text-center max-w-md'>
        Puede que la página que buscas haya sido movida, eliminada o nunca
        existió.
      </p>
      <a
        href='/'
        className='px-6 py-3 bg-slateBlue hover:bg-blue rounded-full text-lg font-semibold transition-transform transform hover:scale-105'
      >
        Volver al inicio
      </a>
    </div>
  )
}
