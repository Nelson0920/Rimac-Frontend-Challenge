import React from 'react'

type BackButtonProps = {
  onClick?: () => void
}

const BackButton: React.FC<BackButtonProps> = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-1 bg-transparent border-none cursor-pointer p-0`}
      type='button'
    >
      <div
        className={`flex items-center justify-center rounded-full w-5 h-5 border-3 border-blue`}
      >
        <img
          src='/icons/IconArrowLeft.svg'
          alt='Ícono de volver'
          className='h-3 w-auto'
          style={{
            filter:
              'invert(27%) sepia(99%) saturate(7490%) hue-rotate(200deg) brightness(97%) contrast(101%)',
          }}
        />
      </div>
      <span className='text-base font-bold text-blue'>Volver</span>
    </button>
  )
}

export default BackButton
