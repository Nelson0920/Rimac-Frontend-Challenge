import { useState } from "react";
import { CardPlan, CardSelectPlan, ProgressBar } from "../components/common";
import { Default } from "../components/layout";
import { useMediaQuery } from "react-responsive";

import IconProtectionLight from "/icons/IconProtectionLight.svg";
import IconAddUserLight from "/icons/iconAddUserLight.svg";
import BackButton from "../components/common/backButton";

export default function Home() {
  const [selectedOption, setSelectedOption] = useState(0);

  const isMobile = useMediaQuery({ maxWidth: 768 });

  return (
    <Default>
      <ProgressBar
        currentStep={1}
        totalSteps={2}
        stepLabels={["Planes y coberturas", "Resumen"]}
      />
      {!isMobile && <BackButton />}
      

      <div className="flex flex-col items-center justify-center mt-14">
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
                Rocío ¿Para quién deseas cotizar?
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

        <div className="flex flex-col md:flex-row gap-8 mb-[20px]">
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

        <div className="flex flex-col md:flex-row gap-8 mb-8">
          <CardPlan
            plan={{
              name: "Plan Básico",
              price: 100,
              description: [
                "Cobertura básica",
                "Atención médica general",
                "Emergencias incluidas",
              ],
              age: 23,
            }}
            previous_price={49}
            recommended={true}
            setPlanSelected={(plan) => console.log("Plan seleccionado:", plan)}
          />

          <CardPlan
            plan={{
              name: "Plan Básico",
              price: 100,
              description: [
                "Cobertura básica",
                "Atención médica general",
                "Emergencias incluidas",
              ],
              age: 23,
            }}
            previous_price={49}
            recommended={true}
            setPlanSelected={(plan) => console.log("Plan seleccionado:", plan)}
          />

          <CardPlan
            plan={{
              name: "Plan Básico",
              price: 100,
              description: [
                "Cobertura básica",
                "Atención médica general",
                "Emergencias incluidas",
              ],
              age: 23,
            }}
            previous_price={49}
            recommended={true}
            setPlanSelected={(plan) => console.log("Plan seleccionado:", plan)}
          />
        </div>
      </div>
    </Default>
  );
}
