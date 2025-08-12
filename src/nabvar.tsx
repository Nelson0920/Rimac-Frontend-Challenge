import { useState } from 'react'
import { Navbar } from './components/common/navbar'
import { Modal } from './components/common/modal'

export function Nabvar() {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <Navbar
      brand={<Navbar.Brand />}
      links={
        <div className='flex items-center'>
          <Navbar.Item>
            <>
              <button
                onClick={() => setIsOpen(true)}
                className='btn-open-modal'
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
          </Navbar.Item>
          <Navbar.Link to='/about'>
            <div className='flex flex-row flex-nowrap items-center space-x-1 text-lg'>
              <img
                src='/icons/phone.svg'
                alt='Logo'
                className='h-6 w-auto'
              />
              (01) 411 6001
            </div>
          </Navbar.Link>
        </div>
      }
    />
  )
}
