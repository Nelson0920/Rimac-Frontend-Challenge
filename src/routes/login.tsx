import { useState, useEffect } from 'react'
import { Default } from '../components/layout'
import { useNavigate } from 'react-router-dom'
import { Button, Checkbox, Input, Modal, Select, Loader } from '../components/common'
import '../styles/components/loginPage.scss'
import { useAuth } from '../context/auth/authContext'
import { useGetUser } from '../lib/api/routes/user'
import { useMediaQuery } from 'react-responsive'
import { Base64 } from 'js-base64'
import { type User } from '../lib/types/types'
import { SYSTEM_ROUTES } from '../lib/api/cache'

interface UserT extends User {
  phoneNumber: string
  dniNumber: string
}

export default function Login() {
  const { data: dataUser, isLoading, refetch } = useGetUser()

  const [user, setUser] = useState<UserT>()
  const [phone, setPhone] = useState('')
  const [document, setDocument] = useState('')
  const [documentType, setDocumentType] = useState('dni')
  const [privacyPolicyAccepted, setPrivacyPolicyAccepted] = useState(false)
  const [commsPolicyAccepted, setCommsPolicyAccepted] = useState(false)
  const { login } = useAuth()
  const navigate = useNavigate()
  const [isOpen, setIsOpen] = useState(false)
  const isMobile = useMediaQuery({ maxWidth: 768 })
  const [documentError, setDocumentError] = useState('')
  const [phoneError, setPhoneError] = useState('')
  const [privacyPolicyAcceptedError, setPrivacyPolicyAcceptedError] =
    useState(false)
  const [commsPolicyAcceptedError, setCommsPolicyAcceptedError] =
    useState(false)

  const validateDocument = (value: string) => {
    if (!/^\d{8}$/.test(value)) {
      setDocumentError('*El documento ingresado no es válido')
      return false
    }
    setDocumentError('')
    return true
  }

  const validatePhone = (value: string) => {
    if (!/^\d+$/.test(value)) {
      setPhoneError('*El celular ingresado no es válido')
      return false
    }
    setPhoneError('')
    return true
  }

  useEffect(() => {
    if (dataUser) {
      if (!dataUser?.name) refetch()
      else {
        setUser({
          ...dataUser,
          dniNumber: '12345678',
          phoneNumber: '123456789',
        })
      }
    }
  }, [dataUser])

  const handleDocumentInputChange = (value: string) => {
    const filtered = value.replace(/\D/g, '').slice(0, 8)
    setDocument(filtered)
    if (documentError) validateDocument(filtered)
  }

  const handlePhoneInputChange = (value: string) => {
    const filtered = value.replace(/\D/g, '').slice(0, 12)
    setPhone(filtered)
    if (phoneError) validatePhone(filtered)
  }

  const handlePrivacyPolicyInputChange = (value: boolean) => {
    setPrivacyPolicyAccepted(value)
    setPrivacyPolicyAcceptedError(!value)
  }

  const handleCommsPolicyInputChange = (value: boolean) => {
    setCommsPolicyAccepted(value)
    setCommsPolicyAcceptedError(!value)
  }

  const handleSubmit = () => {
    const docValid = validateDocument(document)
    const phoneValid = validatePhone(phone)

    if (!privacyPolicyAccepted) {
      setPrivacyPolicyAcceptedError(true)
    } else {
      setPrivacyPolicyAcceptedError(false)
    }
    if (!commsPolicyAccepted) {
      setCommsPolicyAcceptedError(true)
    } else {
      setCommsPolicyAcceptedError(false)
    }
    if (!docValid || !phoneValid) return
    if (!privacyPolicyAccepted || !commsPolicyAccepted || !phone || !document) {
      alert(
        'Debes aceptar las Políticas de Privacidad y rellenar todos los campos'
      )
      return false
    } else {
      if (phone === user?.phoneNumber && document === user.dniNumber) {
        const Token = Base64.encode(JSON.stringify(user))
        login(Token)
        navigate(SYSTEM_ROUTES.home)
      } else {
        alert('credenciales erroneas')
      }
    }
  }

  if (isLoading) {
    return <Loader />
  }

  return (
    <Default withFooter>
      <div className='w-full h-full flex items-center justify-center'>
        <div className='absolute inset-0 -z-10 flex containerBackground'>
          <div className={`w-1/2 h-full circleLeft`} />
          <div className={`w-1/2 h-full circleRight`} />
        </div>

        <div
          className={`${
            isMobile ? 'flex flex-col' : 'grid grid-cols-2 w-full py-4 mx-auto'
          }`}
        >
          {!isMobile && (
            <div className='flex w-full items-center justify-center'>
              <img
                src='/images/portada-login-desktop.webp'
                alt=''
                className='rounded-2xl'
              />
            </div>
          )}

          <div className='flex flex-col w-full p-4 max-w-md mx-auto space-y-4'>
            {isMobile && (
              <>
                <div className='flex items-center justify-between gap-8'>
                  <div className='w-[50%]'>
                    <span className='bg-gradient-to-r from-cyan-300 to-green-400 font-bold min-w-0 max-w-min text-nowrap rounded px-2'>
                      Seguro Salud Flexible
                    </span>
                    <h2 className='text-2xl font-bold'>
                      Creado para ti y tu familia
                    </h2>
                  </div>
                  <div className='w-[50%] h-[10rem]'>
                    <img
                      src='/images/portada-login-desktop.webp'
                      alt=''
                      className='rounded-2xl w-full h-full object-contain'
                    />
                  </div>
                </div>
                <div className='w-full border-[1px] border-gray-softened my-4' />
                <p className='font-semibold'>
                  Tú eliges cuánto pagar. Ingresa tus datos, cotiza y recibe
                  nuestra asesoría. 100% online.
                </p>
              </>
            )}

            {!isMobile && (
              <>
                <span className='bg-gradient-to-r from-cyan-300 to-green-400 font-bold min-w-0 max-w-min text-nowrap rounded px-2'>
                  Seguro Salud Flexible
                </span>
                <h2 className='text-4xl font-bold'>
                  Creado para ti y tu familia
                </h2>
                <p className='font-semibold'>
                  Tú eliges cuánto pagar. Ingresa tus datos, cotiza y recibe
                  nuestra asesoría. 100% online.
                </p>
              </>
            )}
            <div>
              <div className='w-full flex flex-row'>
                <div className='w-[40%]'>
                  <Select value={documentType} onChange={setDocumentType} placeholder='DNI' rounded='left'>
                    <Select.Label />
                    <Select.Trigger />
                    <Select.Options>
                      <Select.Option value='dni'>DNI</Select.Option>
                      <Select.Option value='ruc'>RUC</Select.Option>
                    </Select.Options>
                  </Select>
                </div>
                <div className='w-[60%]'>
                  <Input
                    type='tel'
                    placeholder='Nro. del documento'
                    value={document}
                    onChange={handleDocumentInputChange}
                    rounded='right'
                  >
                    <Input.Label />
                    <Input.Field required />
                  </Input>
                </div>
              </div>
              {documentError && (
                <span className='text-red'>{documentError}</span>
              )}
            </div>
            <div>
              <Input
                type='tel'
                placeholder='Celular'
                value={phone}
                onChange={handlePhoneInputChange}
                rounded='full'
              >
                <Input.Label />
                <Input.Field required />
              </Input>
              {phoneError && <span className='text-red'>{phoneError}</span>}
            </div>
            <Checkbox
              checked={privacyPolicyAccepted}
              onChange={handlePrivacyPolicyInputChange}
            >
              <Checkbox.Label
                className={`${
                  privacyPolicyAcceptedError ? 'text-red' : 'text-grey100'
                }`}
              >
                Acepto la Política de Privacidad
              </Checkbox.Label>
              <Checkbox.Field />
            </Checkbox>
            <Checkbox
              checked={commsPolicyAccepted}
              onChange={handleCommsPolicyInputChange}
            >
              <Checkbox.Label
                className={`${
                  commsPolicyAcceptedError ? 'text-red' : 'text-grey100'
                }`}
              >
                Acepto la Política de Comunicaciones Comerciales
              </Checkbox.Label>
              <Checkbox.Field />
            </Checkbox>
            <div>
              <button
                onClick={() => setIsOpen(true)}
                className='underline text-sm font-bold'
              >
                Aplican Términos y Condiciones.
              </button>
            </div>
            <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
              <Modal.Header onClose={() => setIsOpen(false)}>
                <h2 className='text-center font-bold'>
                  Aplican Términos y Condiciones
                </h2>
              </Modal.Header>
              <Modal.Body>
                <div className='space-y-4'>
                  <p>
                    Encontrarás información importante sobre tus derechos y
                    obligaciones al utilizar nuestros servicios. Cubren aspectos
                    clave como la privacidad, la seguridad y la conducta
                    esperada. Te recomendamos encarecidamente familiarizarte con
                    estos términos para estar bien informado.
                  </p>
                  <p>
                    Si tienes preguntas o inquietudes sobre los 'Términos y
                    Condiciones', no dudes en ponerte en contacto con nuestro
                    equipo de soporte. Estamos aquí para ayudarte y garantizar
                    que tu experiencia sea transparente y segura.
                  </p>
                </div>
              </Modal.Body>
            </Modal>
            <Button label='Cotiza aquí' onClick={handleSubmit} />
          </div>
        </div>
      </div>
    </Default>
  )
}
