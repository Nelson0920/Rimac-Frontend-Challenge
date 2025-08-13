import Button from "./button";
import type { Plan } from "../../lib/types/types";
import IconHomeLight from "/icons/IconHomeLight.svg";
import { Loader } from "./"; 
import React from "react";

interface TProps {
  plan: Plan;
  previous_price?: number;
  recommended?: boolean;
  setPlanSelected: React.Dispatch<React.SetStateAction<Plan | null>>;
  loading?: boolean;
}

const CardPlan: React.FC<TProps> = ({
  plan,
  previous_price,
  recommended = false,
  setPlanSelected,
  loading = false,
}) => {
  const { description, name, price } = plan;

  return (
    <div className="mt-5 flex flex-wrap items-start gap-8 relative">
      <div
        className="relative w-[288px] h-[680px] px-8 pt-16 pb-[26px] bg-white shadow-[0px_1px_32px_rgba(174,172,243,0.35)] rounded-[24px] flex flex-col"
        style={{ pointerEvents: loading ? "none" : "auto" }}
      >
        {loading && (
          <div className="absolute inset-0 bg-white bg-opacity-70 rounded-[24px] flex items-center justify-center z-10">
            <Loader size={48} />
          </div>
        )}

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
            <img
              src={IconHomeLight}
              alt="Home icon"
              className="w-[80px]"
            />
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
          disabled={loading}
        />
      </div>
    </div>
  );
};

export default CardPlan;
