import { useState } from 'react'
import { Navbar as Nav } from '../common'
import { Modal } from '../common'

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <Nav
      brand={<Nav.Brand />}
      links={
        <div className='flex items-center'>
          <Nav.Item>
            <>
              <button
                onClick={() => setIsOpen(true)}
                className='btn-open-modal hover:underline'
              >
                ¡Compra por este medio!
              </button>
              <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
                <Modal.Header onClose={() => setIsOpen(false)}>
                  <h2 className='text-center'>Compra por este medio</h2>
                </Modal.Header>
                <Modal.Body>
                  <p className='text-lg font-normal'>
                    Esta opción te permite comprar de manera segura y
                    conveniente en línea. Descubre las ventajas y comienza tu
                    experiencia de compra en nuestra plataforma.
                  </p>
                </Modal.Body>
              </Modal>
            </>
          </Nav.Item>
          <Nav.Link to='/about'>
            <div className='flex flex-row flex-nowrap items-center space-x-1 text-lg'>
              <img
                src='/icons/phone.svg'
                alt='Logo'
                className='h-6 w-auto'
              />
              (01) 411 6001
            </div>
          </Nav.Link>
        </div>
      }
    />
  )
}
