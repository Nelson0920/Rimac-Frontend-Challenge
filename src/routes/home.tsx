import { useEffect, useState } from 'react'
import { CardPlan, CardSelectPlan, ProgressBar } from '../components/common'
import { Default } from '../components/layout'

import IconProtectionLight from '/icons/IconProtectionLight.svg'
import IconAddUserLight from '/icons/iconAddUserLight.svg'
import CardSummary from '../components/common/cardSummary'

export default function Home() {
  const [selectedOption, setSelectedOption] = useState(1)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 4000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <Default>
      <h1>Home</h1>

      <ProgressBar
        currentStep={2}
        totalSteps={2}
        stepLabels={['Planes y coberturas', 'Resumen']}
      />

      <CardSelectPlan
        option={1}
        selectedOption={selectedOption}
        onSelect={setSelectedOption}
        title='Para mi'
        description='Cotiza tu seguro de salud y agrega familiares si así lo deseas.'
        icon={IconProtectionLight}
      />
      <CardSelectPlan
        option={2}
        selectedOption={selectedOption}
        onSelect={setSelectedOption}
        title='Para alguien más'
        description='Realiza una cotización para uno de tus familiares o cualquier persona.'
        icon={IconAddUserLight}
      />
      <CardPlan loading={loading}
        plan={{
          name: 'Plan Básico',
          price: 100,
          description: [
            'Cobertura básica',
            'Atención médica general',
            'Emergencias incluidas',
          ],
          age: 23,
        }}
        previous_price={49}
        recommended={true}
        setPlanSelected={(plan) => console.log('Plan seleccionado:', plan)}
      />
      <CardSummary loading={loading}>
        <CardSummary.Title>
          <h3 className='text-xs font-bold'>PRECIOS CALCULADOS PARA:</h3>
          <div className='flex flex-row space-x-2'>
            <img
              src='/icons/Iconfamily.svg'
              alt='Logo'
              className='h-6 w-auto'
            />
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
    </Default>
  )
}
