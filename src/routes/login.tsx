import { useState } from "react";
import { Default } from "../components/layout";
import { useNavigate } from "react-router-dom";
import { Button, Input } from "../components/common";
import CardSummary from '../components/common/cardSummary'
import BackButton from '../components/common/backButton'

import "../styles/components/loginPage.scss";
import { useAuth } from "../context/auth/AuthContext";

export default function Login() {
  const [phone, setPhone] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleInputChange = (value: string) => {
    setPhone(value)
    console.log('Telefono:', value)
  }

  const handleSubmit = () => {
    const Token = "token123456";

    login(Token);
    navigate("/home");
  };

  return (
    <Default withFooter>
      <div>
        <div className='absolute inset-0 -z-10 flex containerBackground'>
          <div className={`w-1/2 h-full circleLeft`} />
          <div className={`w-1/2 h-full circleRight`} />
        </div>
        <BackButton />
        <CardSummary>
          <CardSummary.Title>
            <h3 className='text-xs font-bold'>PRECIOS CALCULADOS PARA:</h3>
            <div className='flex flex-row space-x-2'>

            <img src='/icons/Iconfamily.svg' alt='Logo' className='h-6 w-auto' />
            <p>EXAMPLE</p>
            </div>
          </CardSummary.Title>
          <CardSummary.Divider />
          <CardSummary.Description>
            <div className='flex flex-col'>
              <h3 className='text-sm font-bold'>Responsable de pago</h3>
              <p>{'DNI:'}</p>
              <p>{'Celular:'}</p>
              <h3 className='text-sm font-bold'>PLan elegido</h3>
              <p>{'Plan en Casa y Clinica:'}</p>
              <p>{'Costo del Plan:'}</p>
            </div>
          </CardSummary.Description>
        </CardSummary>

        <div className='relative w-full p-4 max-w-md mx-auto'>
          <Button label="Cotiza aquí" onClick={() => handleSubmit()} />

          <Input
            type='tel'
            placeholder='Celular'
            value={phone}
            onChange={handleInputChange}
          >
            <Input.Label />
            <Input.Field pattern='[0-9]{7,12}' />
          </Input>

          <p className='mt-4 text-white'>Telefono: {phone}</p>
        </div>
      </div>
    </Default>
  )
}
