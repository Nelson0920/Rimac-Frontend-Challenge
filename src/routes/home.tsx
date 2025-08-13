import { useEffect, useState } from 'react'
import { CardPlan, CardSelectPlan, ProgressBar, Loader } from '../components/common'
import { Default } from '../components/layout'
import { useMediaQuery } from 'react-responsive'
import { useGetPlans } from '../lib/api/routes/plan'
import { type User, type Plan } from '../lib/types/types'
import Cookies from 'js-cookie'
import { useNavigate } from 'react-router-dom'
import IconProtectionLight from '/icons/IconProtectionLight.svg'
import IconAddUserLight from '/icons/iconAddUserLight.svg'
import BackButton from '../components/common/backButton'
import CardSummary from '../components/common/cardSummary'
import { base64ToUtf8, getAgeFromBirthDay } from '../lib/util/functions'
import { useAuth } from '../context/auth/authContext'
import { SYSTEM_ROUTES } from '../lib/api/cache'

interface TUser extends User {
  phoneNumber: string;
  dniNumber: string;
}

export default function Home() {
  const [selectedOption, setSelectedOption] = useState(0)
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState<TUser>()
  const [plansUser, setPlansUser] = useState<Plan[]>()
  const isMobile = useMediaQuery({ maxWidth: 1000 })
  const navigate = useNavigate()
  const [page, setPage] = useState(0)
  const [progressBar, setProgressBar] = useState(1)
  const cardsPerPage = isMobile ? 1 : plansUser?.length
  const totalPages = Math.ceil((plansUser?.length || 0) / (cardsPerPage || 0))
  const { logout } = useAuth()
  const {
    data: resPlansData,
    isLoading,
    refetch,
  } = useGetPlans()

  useEffect(() => {
    if (resPlansData && user?.birthDay) {
      const userAge = getAgeFromBirthDay(user.birthDay);
      const filtered = resPlansData?.list?.filter(
        (plan) => plan.age >= userAge
      );
      setPlansUser(filtered);
    } else refetch()
  }, [resPlansData, user]);


  useEffect(() => {
    const token = Cookies.get("token") || "";
    const resUserData = base64ToUtf8(token);
    const data = JSON.parse(resUserData);
    setUser(data);
    if (data) {
      setLoading(false);
    }
  }, []);

  const handleSelectPlan = (plan: Plan | null) => {
    if (plan) {
      setProgressBar(2);
    }
  };

  useEffect(() => {
    setPage(0);
  }, [isMobile]);

  const handlePrev = () => {
    setPage((p) => Math.max(p - 1, 0));
  };

  const handleNext = () => {
    setPage((p) => Math.min(p + 1, totalPages - 1));
  };

  const visiblePlans = plansUser?.slice(
    page * (cardsPerPage || 0),
    page * (cardsPerPage || 0) + (cardsPerPage || 0)
  );

  
  const handleBackButton = () => {
    if (progressBar === 2) {
      setProgressBar(1)
      setSelectedOption(0)
    } else {
      logout()
    }
  }
  if (isLoading || !plansUser) {
    return <Loader />
  } else {
    return (
      <Default
        withAdditional={
          <ProgressBar
            currentStep={progressBar}
            totalSteps={2}
            stepLabels={['Planes y coberturas', 'Resumen']}
            backButton={handleBackButton}
          />
        }
      >
        {!isMobile && (
          <div className="ml-26">
            <BackButton
              onClick={() => {
                if (progressBar === 2) {
                  setProgressBar(1);
                } else {
                  logout();
                  navigate(SYSTEM_ROUTES.login)
                }
              }}
            />
          </div>
        )}
  
        <div className="flex flex-col items-center justify-center mt-14 w-full">
          {progressBar === 1 ? (
            <>
              <div className={`mb-8 text-center`}>
                <div className={`w-full flex justify-center`}>
                  <div
                    className={`${
                      isMobile ? "w-full px-6 text-left" : "w-[544px] text-center"
                    }`}
                  >
                    <h1
                      className={`${
                        isMobile ? "text-[28px]" : "text-[40px]"
                      } font-bold mb-2`}
                    >
                      {user?.name} ¿Para quién deseas cotizar?
                    </h1>
                    <p
                      className={`text-darkBlue1 text-[16px] mb-4 ${
                        isMobile ? "text-left" : "text-center"
                      }`}
                    >
                      Selecciona la opción que se ajuste más a tus necesidades.
                    </p>
                  </div>
                </div>
              </div>
  
              <div className="flex flex-col md:flex-row flex-nowrap gap-8 mb-5">
                <CardSelectPlan
                  option={1}
                  selectedOption={selectedOption}
                  onSelect={setSelectedOption}
                  title="Para mi"
                  description="Cotiza tu seguro de salud y agrega familiares si así lo deseas."
                  icon={IconProtectionLight}
                />
                <CardSelectPlan
                  option={2}
                  selectedOption={selectedOption}
                  onSelect={setSelectedOption}
                  title="Para alguien más"
                  description="Realiza una cotización para uno de tus familiares o cualquier persona."
                  icon={IconAddUserLight}
                />
              </div>
  
              <div className="flex flex-col items-center w-full max-w-6xl">
                <div className="flex gap-8 justify-center flex-wrap">
                  {visiblePlans?.map(
                    (plan, index) =>
                      selectedOption != 0 && (
                        <CardPlan
                          key={index}
                          plan={plan}
                          recommended={index == 1 && true}
                          setPlanSelected={(plan: any) => handleSelectPlan(plan)}
                          loading={loading}
                          selectedOption={selectedOption}
                        />
                      )
                  )}
                </div>
                {isMobile && selectedOption != 0 ? (
                  <div className="mt-6 flex items-center gap-6">
                    <button
                      className="px-4 py-2 rounded  text-blue disabled:text-softGray"
                      disabled={page === 0}
                      onClick={handlePrev}
                    >
                      <span className="flex items-center justify-center pb-1 pe-0.5 rounded-full w-8 h-8 border-3 text-2xl">
                        {"<"}
                      </span>
                    </button>
                    <span>
                      {page + 1} / {totalPages}
                    </span>
                    <button
                      className="px-4 py-2 rounded text-blue disabled:text-softGray"
                      disabled={page === totalPages - 1}
                      onClick={handleNext}
                    >
                      <span className="flex items-center justify-center pb-1 ps-0.5 rounded-full w-8 h-8 border-3 text-2xl">
                        {">"}
                      </span>
                    </button>
                  </div>
                ) : null}
              </div>
            </>
          ) : (
            <CardSummary loading={loading}>
              <CardSummary.Title>
                <h3 className="text-xs font-bold">PRECIOS CALCULADOS PARA:</h3>
                <div className="flex flex-row space-x-2">
                  <img
                    src="/icons/Iconfamily.svg"
                    alt="Logo"
                    className="h-6 w-auto"
                  />
                  <p>
                    {user?.name} {user?.lastName}
                  </p>
                </div>
              </CardSummary.Title>
              <CardSummary.Divider />
              <CardSummary.Description>
                <div className="flex flex-col">
                  <h3 className="text-sm font-bold">Responsable de pago</h3>
                  <p>
                    {"DNI:"} {user?.dniNumber}
                  </p>
                  <p>
                    {"Celular:"} {user?.phoneNumber}
                  </p>
                  <h3 className="text-sm font-bold">PLan elegido</h3>
                  <p>{"Plan en Casa y Clinica:"}</p>
                  <p>{"Costo del Plan:"}</p>
                </div>
              </CardSummary.Description>
            </CardSummary>
          )}
        </div>
      </Default>
    );
  }
}
