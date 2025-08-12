import { useState } from "react";
import { CardPlan, CardSelectPlan } from "../components/common";

import IconProtectionLight from "/icons/IconProtectionLight.svg";
import IconAddUserLight from "/icons/iconAddUserLight.svg";

export default function Home() {
  const [selectedOption, setSelectedOption] = useState(1);

  return (
    <div>
      <h1>Home</h1>

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
      <CardPlan
        plan={{
          name: "Plan Básico",
          price: 100,
          description: ["Cobertura básica", "Atención médica general", "Emergencias incluidas"],
          age: 23,
        }}
        previous_price={49}
        recommended={true}
        setPlanSelected={(plan) => console.log("Plan seleccionado:", plan)}
      />
    </div>
  );
}
