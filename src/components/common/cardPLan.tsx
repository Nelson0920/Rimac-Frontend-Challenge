import Button from "./button";
import type { Plan } from "../../lib/types/types";

interface TProps {
  plan: Plan;
  previous_price?: number;
  recommended?: boolean;
  setPlanSelected: React.Dispatch<React.SetStateAction<Plan | null>>;
}

const CardPlan: React.FC<TProps> = ({
  plan,
  previous_price,
  recommended = false,
  setPlanSelected,
}) => {
  const { description, name, price } = plan;

  return (
    <div className="mt-5 w-full flex flex-wrap items-start gap-8">
      <div
        className="relative w-[288px] h-[680px] px-8 pt-16 pb-[26px] bg-white shadow-[0px_1px_32px_rgba(174,172,243,0.35)] rounded-[24px] flex flex-col"
      >
        {recommended && (
          <div className="absolute text-xs ml-2 top-8 left-6 bg-mintGreen font-bold px-3 py-1 rounded-[6px]">
            <p>Plan recomendado</p>
          </div>
        )}
        <div className="flex-1">
          <div className="w-full grid grid-cols-[1fr_56px] items-start gap-4">
            <div className="flex flex-col text-grayBlue">
              <p
                className="text-2xl font-bold leading-8 tracking-[-0.2px] text-darkBlue1"
              >
                {name}
              </p>
              <p
                className="text-xs font-extrabold leading-4 tracking-[0.6px] uppercase mt-6 mb-1"
              >
                COSTO DEL PLAN
              </p>
              <p
                className="text-[14px] leading-4 tracking-[0.6px] mb-2 line-through"
              >
                ${previous_price} antes
              </p>
              <span
                className="text-xl font-bold leading-7 tracking-[-0.2px] text-darkBlue1"
              >
                ${price} al mes
              </span>
            </div>
            <img src="/public/icons/iconHomeLight.svg" alt="Home icon" className="w-[80px]" />
          </div>

          <div
            className="w-full border my-6 border-lightBlueGray"
          />

          <ul className="flex flex-col gap-6 list-inside list-disc">
            {description.map((text, index) => (
              <li
                key={index}
                className="text-base font-normal leading-7 tracking-[0.1px] text-darkBlue1"
              >
                {text}
              </li>
            ))}
          </ul>
        </div>

        <Button
          color={"secondary"}
          label="Seleccionar Plan"
          size="small"
          onClick={() => setPlanSelected(plan)}
        />
      </div>
    </div>
  );
};

export default CardPlan;
