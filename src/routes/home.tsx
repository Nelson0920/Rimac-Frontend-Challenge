import { useState } from "react";
import { CardSelectPlan } from "../components/common/cardSelectPlan";
import IconProtectionLight from "../public/icons/IconProtectionLight.svg";
import IconAddUserLight from "../public/icons/iconAddUserLight.svg";

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
    </div>
  );
}
