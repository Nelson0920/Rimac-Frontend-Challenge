export const Footer = () => {
  return (
    <div className="bg-black px-4 py-8 flex items-center justify-between">
      <img src='/icons/LogoFooter.svg' alt='Logo' className='h-10 w-auto' />
      <span className="text-softWhite">
        &copy; { new Date().getFullYear() } &nbsp;
        RIMAC Seguros y Reaseguros.
      </span>
    </div>
  )
}