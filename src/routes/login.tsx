import { useState } from 'react'
import { Default } from '../components/layout'
import { useNavigate } from 'react-router-dom'
import { Button, Checkbox, Input, Modal, Select } from '../components/common'
import '../styles/components/loginPage.scss'
import { useAuth } from '../context/auth/authContext'
import { useGetUser } from '../lib/api/routes/user'
import { useGetPlans } from '../lib/api/routes/plan'
import { useMediaQuery } from "react-responsive"

export default function Login() {
  const [phone, setPhone] = useState('')
  const [document, setDocument] = useState('')
  const [privacyPolicyAccepted, setPrivacyPolicyAccepted] = useState(false)
  const [commsPolicyAccepted, setCommsPolicyAccepted] = useState(false)
  const { login } = useAuth()
  const navigate = useNavigate()
  const [isOpen, setIsOpen] = useState(false)
  const isMobile = useMediaQuery({ maxWidth: 768 })

  console.log(isMobile)

  const { data: dataUSer } = useGetUser()
  const { data: dataPlans } = useGetPlans()
  console.log(dataPlans, dataUSer)

  const handleDocumentInputChange = (value: string) => {
    setDocument(value)
  }

  const handlePhoneInputChange = (value: string) => {
    setPhone(value)
  }

  const handleSubmit = () => {
    if (!privacyPolicyAccepted || !commsPolicyAccepted) {
      alert('Debes aceptar las Políticas de Privacidad')
      return
    }

    const Token = 'token123456'
    login(Token)
    navigate('/home')
  }

  return (
    <Default withFooter>
      <div className='w-full h-full flex items-center justify-center'>
        <div className='absolute inset-0 -z-10 flex containerBackground'>
          <div className={`w-1/2 h-full circleLeft`} />
          <div className={`w-1/2 h-full circleRight`} />
        </div>

        <div className={`${isMobile
          ? 'flex flex-col'
          : 'grid grid-cols-2 w-full py-4 mx-auto'
        }`}>
          {
            !isMobile
              &&
            <div className='flex w-full items-center justify-center'>
              <img src='/images/portada-login-desktop.webp' alt='' className='rounded-2xl'/>
            </div>
          }

          <div className='flex flex-col w-full p-4 max-w-md mx-auto space-y-4'>
            {
              isMobile
                &&
              <>
                <div className='flex items-center justify-between gap-8'>
                  <div className='w-[50%]'>
                    <span className='bg-gradient-to-r from-cyan-300 to-green-400 font-bold min-w-0 max-w-min text-nowrap rounded px-2'>
                      Seguro Salud Flexible
                    </span>
                    <h2 className='text-2xl font-bold'>Creado para ti y tu familia</h2>
                  </div>
                  <div className='w-[50%] h-[10rem]'>
                    <img src='/images/portada-login-desktop.webp' alt='' className='rounded-2xl w-full h-full object-contain'/>
                  </div>
                </div>
                <div className="w-full border-[1px] border-gray-softened my-4" />
                <p className='font-semibold'>
                  Tú eliges cuánto pagar. Ingresa tus datos, cotiza y recibe nuestra
                  asesoría. 100% online.
                </p>
              </>
            }

            {
              !isMobile
                &&
              <>
                <span className='bg-gradient-to-r from-cyan-300 to-green-400 font-bold min-w-0 max-w-min text-nowrap rounded px-2'>
                  Seguro Salud Flexible
                </span>
                <h2 className='text-4xl font-bold'>Creado para ti y tu familia</h2>
                <p className='font-semibold'>
                  Tú eliges cuánto pagar. Ingresa tus datos, cotiza y recibe nuestra
                  asesoría. 100% online.
                </p>
              </>
            }

            <div className='w-full flex flex-row'>
              <div className='w-[40%]'>
                <Select
                  placeholder='DNI'
                  rounded='left'
                >
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
                  <Input.Field pattern='[0-9]{7,12}' />
                </Input>
              </div>
            </div>
            <Input
              type='tel'
              placeholder='Celular'
              value={phone}
              onChange={handlePhoneInputChange}
              rounded='full'
            >
              <Input.Label />
              <Input.Field pattern='[0-9]{7,12}' />
            </Input>
            <Checkbox
              checked={privacyPolicyAccepted}
              onChange={setPrivacyPolicyAccepted}
            >
              <Checkbox.Label>Acepto la Política de Privacidad</Checkbox.Label>
              <Checkbox.Field />
            </Checkbox>
            <Checkbox
              checked={commsPolicyAccepted}
              onChange={setCommsPolicyAccepted}
            >
              <Checkbox.Label>
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
                <h2 className='text-center font-bold'>Aplican Términos y Condiciones</h2>
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
