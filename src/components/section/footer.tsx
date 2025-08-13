import { useMediaQuery } from "react-responsive"

export const Footer = () => {
  const isMobile = useMediaQuery({ maxWidth: 768 })

  return (
    <div className={`bg-black px-4 py-8 ${isMobile
      ? 'flex flex-col items-center py-8 text-[12px] gap-8'
      : 'flex items-center justify-between'
    }`}>
      <img src='/icons/LogoFooter.svg' alt='Logo' className='h-10 w-auto' />
      { isMobile && <div className="w-[75%] border-[1px] border-gray-softened" /> }
      <span className="text-softWhite">
        &copy; { new Date().getFullYear() } &nbsp;
        RIMAC Seguros y Reaseguros.
      </span>
    </div>
  )
}