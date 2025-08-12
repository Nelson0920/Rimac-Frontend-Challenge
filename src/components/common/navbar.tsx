import { type ReactNode } from 'react'
import '../../styles/components/navbar.scss'

type NavbarProps = {
  brand: ReactNode
  links: ReactNode
}

export function Navbar({ brand, links }: NavbarProps) {
  return (
    <nav
      className='navbar bg-white text-grey100'
    >
      <div className='container mx-auto flex items-center justify-between p-4'>
        {brand}

        <div className='flex gap-4'>{links}</div>
      </div>
    </nav>
  )
}

Navbar.Brand = function NavbarBrand({ children }: { children?: ReactNode }) {
  return (
    <div className='navbar__brand flex items-center gap-2'>
      <img src='src/public/icons/logo.svg' alt='Logo' className='h-10 w-auto' />
      {children && <span className='font-bold text-lg'>{children}</span>}
    </div>
  )
}

Navbar.Item = function NavbarItem({ children }: { children: ReactNode }) {
  return (
    <div
      className='navbar__item px-3 py-2 rounded cursor-pointer text-grey100'
    >
      {children}
    </div>
  )
}

Navbar.Link = function NavbarLink({
  to,
  children,
}: {
  to: string
  children: ReactNode
}) {
  return (
    <a
      href={to}
      className='navbar__link font-bold px-3 py-2 rounded text-grey100'
    >
      {children}
    </a>
  )
}
