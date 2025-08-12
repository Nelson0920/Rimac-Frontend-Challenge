import { useMediaQuery } from "react-responsive";
import IconCheckWhite from "../../public/icons/check-white.svg";
import { COLORS } from "../../styles/var";

type TProps = {
  option: number;
  selectedOption: number;
  onSelect: (option: number) => void;
  title: string;
  description: string;
  icon?: string;
};

const CardSelectPlan: React.FC<TProps> = ({
  option,
  selectedOption,
  onSelect,
  title,
  description,
  icon,
}) => {
  const isSelected = option === selectedOption;
  const isMobile = useMediaQuery({ maxWidth: 768 });

  return (
    <div
      className={`
        relative
        cursor-pointer 
        flex flex-col
        rounded-[1.5rem] border-[3px]
        bg-white
        shadow-[0_1px_32px_rgba(174,172,243,0.35)]
        ${isSelected ? "shadow-none" : ""}
        ${isSelected ? `border-[${COLORS.grey100}]` : "border-transparent"}
      `}
      style={{
        padding: "2.5rem 1.5rem",
        width: isMobile ? "366px" : "280px",
      }}
      onClick={() => onSelect(option)}
      role="button"
      tabIndex={0}
    >
      <div
        className={`
          absolute w-6 h-6 rounded-full border
          top-[1rem] right-[1.5rem]
          justify-center items-center
          flex
          transition-all duration-300
        `}
        style={{
          borderColor: COLORS.mutedBlue,
          backgroundColor: isSelected ? COLORS.green : COLORS.white,
        }}
      >
        {isSelected && <img src={IconCheckWhite} alt="Check" />}
      </div>

      <div
        className={`flex gap-2 ${isMobile ? "flex-row items-center" : "flex-col"}`}
      >
        <img
          src={icon}
          alt="Protection Icon"
          className="h-[48px] w-[48px]"
        />
        <p
          className={`
            text-[${COLORS.darkBlue1}]
            text-xl font-bold
            leading-7
            tracking-[-0.2px]
          `}
        >
          {title}
        </p>
      </div>

      <p
        className={`
          text-[${COLORS.darkBlue1}]
          text-[12px]
          mt-2
        `}
      >
        {description}
      </p>
    </div>
  );
}

export default CardSelectPlan;