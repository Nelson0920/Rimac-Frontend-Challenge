import IconCheckWhite from "/icons/check-white.svg";

type OptionItemProps = {
  option: number;
  selectedOption: number;
  onSelect: (option: number) => void;
  title: string;
  description: string;
  icon?: string;
};

export function CardSelectPlan({
  option,
  selectedOption,
  onSelect,
  title,
  description,
  icon,
}: OptionItemProps) {
  const isSelected = option === selectedOption;

  return (
    <div
      className={`
        relative
        cursor-pointer 
        flex flex-col
        rounded-[1.5rem] border-3
        bg-white
        shadow-[0_1px_32px_rgba(174,172,243,0.35)]
        w-[280px]
        ${
          isSelected
            ? `border-grey100 shadow-none`
            : "border-transparent"
        }
      `}
      style={{ padding: "2.5rem 1.5rem" }}
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
          ${isSelected ? 'bg-green' : 'bg-white'}
        `}
      >
        {isSelected && <img src={IconCheckWhite} alt="Check" />}
      </div>
      <div className="flex flex-col gap-2">
        <img
          src={icon}
          alt="Protection Icon"
          className=" h-[48px] w-[48px]"
        />
        <p
          className={`
              text-darkBlue1
              text-xl font-bold
              leading-7
              tracking-[-0.2px]
            `}
        >
          {title}
        </p>
        <p
          className={`
              text-darkBlue1
              text-[12px]
            `}
        >
          {description}
        </p>
      </div>
    </div>
  );
}
