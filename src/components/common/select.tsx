import {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from "react"

type SelectContextType = {
  value: string
  setValue: (val: string) => void
  isFocused: boolean
  setIsFocused: (val: boolean) => void
  isOpen: boolean
  setIsOpen: (val: boolean) => void
  placeholder: string
  rounded: 'full' | 'left' | 'right'
}

const SelectContext = createContext<SelectContextType | null>(null)

const useSelectContext = () => {
  const context = useContext(SelectContext)
  if (!context) throw new Error("Select components must be used within <Select>")
  return context
}

type SelectProps = {
  children: ReactNode
  placeholder: string
  value?: string
  rounded: 'full' | 'left' | 'right'
  onChange?: (val: string) => void
}

const Select = ({
  children,
  placeholder,
  value,
  rounded,
  onChange,
}: SelectProps) => {
  const [internalValue, setInternalValue] = useState<string>('')
  const [isFocused, setIsFocused] = useState(false)
  const [isOpen, setIsOpen] = useState(false)

  const isControlled = value !== undefined
  const currentValue = isControlled ? value : internalValue

  const handleChange = (val: string) => {
    if (!isControlled) {
      setInternalValue(val)
    }
    onChange?.(val)
    setIsOpen(false)
  }

  return (
    <SelectContext.Provider
      value={{
        value: currentValue,
        setValue: handleChange,
        isFocused,
        setIsFocused,
        isOpen,
        setIsOpen,
        placeholder,
        rounded,
      }}
    >
      <div className="relative w-full h-[56px]">
        {children}
      </div>
    </SelectContext.Provider>
  )
}

const SelectLabel = () => {
  const { isFocused, value, placeholder } = useSelectContext()
  const isFloating = isFocused || value.length > 0

  return (
    <label
      className={`absolute left-4 transition-all duration-200 bg-transparent ${
        isFloating ? "text-xs top-1 text-greyborder-grey100" : "top-4 text-slateBlue"
      }`}
    >
      {placeholder}
    </label>
  )
}

const SelectTrigger = () => {
  const {
    value,
    isOpen,
    setIsOpen,
    setIsFocused,
    rounded,
  } = useSelectContext()

  const radius = {
    full: { borderRadius: '6px' },
    left: { borderTopLeftRadius: '6px', borderBottomLeftRadius: '6px', borderTopRightRadius: '0px', borderBottomRightRadius: '0px' },
    right: { borderTopRightRadius: '6px', borderBottomRightRadius: '6px', borderTopLeftRadius: '0px', borderBottomLeftRadius: '0px' }
  }
  
  return (
    <button
      type="button"
      className="w-full px-4 h-full bg-transparent outline-none rounded-md border border-slateBlue focus:text-greyborder-grey100 focus:border-grey100 focus:border-2 focus:px-[15px] text-left flex items-center justify-between"
      style={ radius[rounded] }
      onClick={() => {
        setIsOpen(!isOpen)
        setIsFocused(!isOpen)
      }}
      onBlur={() => {
        setIsFocused(false)
        setTimeout(() => setIsOpen(false), 200)
      }}
    >
      <span className='uppercase'>{value}</span>
      <svg 
        className={`w-5 h-auto text-grey100 transition-transform duration-200 ${isOpen ? 'transform rotate-180' : ''}`}
        fill="none" 
        stroke="currentColor" 
        viewBox="0 0 24 24" 
        xmlns="http://www.w3.org/2000/svg"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
      </svg>
    </button>
  )
}

const SelectOptions = ({ children }: { children: ReactNode }) => {
  const { isOpen } = useSelectContext()
  
  if (!isOpen) return null

  return (
    <div className="absolute z-10 mt-1 w-full bg-white shadow-lg border border-grey100 max-h-60 overflow-auto">
      {children}
    </div>
  )
}

const SelectOption = ({ value, children }: { value: string, children: ReactNode }) => {
  const { setValue } = useSelectContext()
  
  return (
    <div
      className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
      onClick={() => setValue(value)}
    >
      {children}
    </div>
  )
}

Select.Label = SelectLabel
Select.Trigger = SelectTrigger
Select.Options = SelectOptions
Select.Option = SelectOption

export default Select