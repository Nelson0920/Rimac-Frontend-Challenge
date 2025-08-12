import { type ReactNode, useEffect } from 'react'
import '../../styles/components/modal.scss'

type ModalProps = {
  isOpen: boolean
  onClose: () => void
  children: ReactNode
}

export function Modal({ isOpen, onClose, children }: ModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <div
      className='modal-overlay fixed inset-0 backdrop-blur-sm flex justify-center items-center z-50'
      onClick={onClose}
      style={{
        WebkitBackdropFilter: 'blur(8px)',
        backdropFilter: 'blur(8px)',
      }}
    >
      <div
        className='modal-content bg-white rounded-lg p-6 max-w-xl w-full relative'
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  )
}

Modal.Header = function ModalHeader({
  children,
  onClose,
}: {
  children: ReactNode
  onClose: () => void
}) {
  return (
    <div className='modal-header flex items-center justify-start border-b border-gray-300 pb-2 mb-4'>
      <button
        onClick={onClose}
        className='modal-close text-gray-600 hover:text-gray-900 text-xl font-bold mr-4'
        aria-label='Cerrar modal'
      >
        ✕
      </button>
      <div className='modal-title flex-grow text-lg font-semibold'>
        {children}
      </div>
    </div>
  )
}

Modal.Body = function ModalBody({ children }: { children: ReactNode }) {
  return <div className='modal-body'>{children}</div>
}
