import { useEffect, useState } from 'react'
import { CardPlan, CardSelectPlan, ProgressBar } from '../components/common'
import { Default } from '../components/layout'
import { useMediaQuery } from 'react-responsive'

import IconProtectionLight from '/icons/IconProtectionLight.svg'
import IconAddUserLight from '/icons/iconAddUserLight.svg'
import BackButton from '../components/common/backButton'
import CardSummary from '../components/common/cardSummary'

const plansData = [
  {
    name: 'Plan Básico',
    price: 100,
    description: [
      'Cobertura básica',
      'Atención médica general',
      'Emergencias incluidas',
    ],
    age: 23,
  },
  {
    name: 'Plan Medio',
    price: 100,
    description: [
      'Cobertura básica',
      'Atención médica general',
      'Emergencias incluidas',
    ],
    age: 23,
  },
  {
    name: 'Plan Avanzado',
    price: 100,
    description: [
      'Cobertura básica',
      'Atención médica general',
      'Emergencias incluidas',
    ],
    age: 23,
  },
]

export default function Home() {
  const [selectedOption, setSelectedOption] = useState(0)
  const [loading, setLoading] = useState(true)
  const isMobile = useMediaQuery({ maxWidth: 1000 })

  const [page, setPage] = useState(0)
  const cardsPerPage = isMobile ? 1 : plansData.length
  const totalPages = Math.ceil(plansData.length / cardsPerPage)

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 4000)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    setPage(0)
  }, [isMobile])

  const handlePrev = () => {
    setPage((p) => Math.max(p - 1, 0))
  }

  const handleNext = () => {
    setPage((p) => Math.min(p + 1, totalPages - 1))
  }

  const visiblePlans = plansData.slice(
    page * cardsPerPage,
    page * cardsPerPage + cardsPerPage
  )

  return (
    <Default>
      <ProgressBar
        currentStep={2}
        totalSteps={2}
        stepLabels={['Planes y coberturas', 'Resumen']}
      />
      {!isMobile && <BackButton />}

      <div className='flex flex-col items-center justify-center mt-14'>
        <div className={`mb-8 text-center`}>
          <div className={`w-full flex justify-center`}>
            <div
              className={`${
                isMobile ? 'w-full px-6 text-left' : 'w-[544px] text-center'
              }`}
            >
              <h1
                className={`${
                  isMobile ? 'text-[28px]' : 'text-[40px]'
                } font-bold mb-2`}
              >
                Rocío ¿Para quién deseas cotizar?
              </h1>
              <p
                className={`text-darkBlue1 text-[16px] mb-4 ${
                  isMobile ? 'text-left' : 'text-center'
                }`}
              >
                Selecciona la opción que se ajuste más a tus necesidades.
              </p>
            </div>
          </div>
        </div>

        <div className='flex flex-col md:flex-row flex-nowrap gap-8 mb-[20px]'>
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
        </div>

        <div className='flex flex-col items-center w-full max-w-6xl'>
          <div className='flex gap-8 justify-center flex-wrap'>
            {visiblePlans.map((plan, index) => (
              <CardPlan
                key={index}
                plan={plan}
                previous_price={49}
                recommended={true}
                setPlanSelected={(plan) =>
                  console.log('Plan seleccionado:', plan)
                }
                loading={loading}
              />
            ))}
          </div>
          {isMobile ? (
            <div className='mt-6 flex items-center gap-6'>
              <button
                className='px-4 py-2 rounded  text-blue disabled:text-softGray'
                disabled={page === 0}
                onClick={handlePrev}
              >
                <span className='flex items-center justify-center pb-1 pe-0.5 rounded-full w-8 h-8 border-3 text-2xl'>
                  {'<'}
                </span>
              </button>
              <span>
                {page + 1} / {totalPages}
              </span>
              <button
                className='px-4 py-2 rounded text-blue disabled:text-softGray'
                disabled={page === totalPages - 1}
                onClick={handleNext}
              >
                <span className='flex items-center justify-center pb-1 ps-0.5 rounded-full w-8 h-8 border-3 text-2xl'>
                   {'>'}
                </span>
              </button>
            </div>
          ) : null}
        </div>

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
      </div>
    </Default>
  )
}
