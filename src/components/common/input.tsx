import {
  createContext,
  useContext,
  useState,
  type ReactNode,
  type InputHTMLAttributes,
} from "react"

type InputContextType = {
  value: string
  setValue: (val: string) => void
  isFocused: boolean
  setIsFocused: (val: boolean) => void
  placeholder: string
  type: string
  rounded: 'full' | 'left' | 'right'
}

const InputContext = createContext<InputContextType | null>(null)

const useInputContext = () => {
  const context = useContext(InputContext)
  if (!context) throw new Error("Input components must be used within <Input>")
  return context
}

type InputProps = {
  children: ReactNode
  placeholder: string
  type?: string
  value?: string
  rounded: 'full' | 'left' | 'right'
  onChange?: (val: string) => void
}

const radius = {
  full: { borderRadius: '6px' },
  left: { borderTopLeftRadius: '6px', borderBottomLeftRadius: '6px', borderTopRightRadius: '0px', borderBottomRightRadius: '0px' },
  right: { borderTopRightRadius: '6px', borderBottomRightRadius: '6px', borderTopLeftRadius: '0px', borderBottomLeftRadius: '0px' }
}

const Input = ({
  children,
  placeholder,
  type = "text",
  value,
  rounded,
  onChange,
}: InputProps) => {
  const [internalValue, setInternalValue] = useState<string>('')
  const [isFocused, setIsFocused] = useState(false)

  const isControlled = value !== undefined
  const currentValue = isControlled ? value : internalValue

  const handleChange = (val: string) => {
    if (!isControlled) {
      setInternalValue(val)
    }
    onChange?.(val)
  }

  return (
    <InputContext.Provider
      value={{
        value: currentValue,
        setValue: handleChange,
        isFocused,
        setIsFocused,
        placeholder,
        type,
        rounded,
      }}
    >
      <div
        className="relative w-full h-[56px] bg-white"
        style={ radius[rounded] }
      >
        {children}
      </div>
    </InputContext.Provider>
  )
}

const Label = () => {
  const { isFocused, value, placeholder, setIsFocused } = useInputContext()
  const isFloating = isFocused || value.length > 0

  return (
    <label
      className={`absolute left-4 transition-all duration-200 w-auto truncate ${
        isFloating ? "text-xs top-1 text-gray-999" : "top-4 text-gray-softened"
      }`}
      onClick={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
    >
      {placeholder}
    </label>
  )
}

const Field = (props: InputHTMLAttributes<HTMLInputElement>) => {
  const {
    value,
    setValue,
    setIsFocused,
    type,
    rounded,
  } = useInputContext()

  return (
    <input
      {...props}
      type={type}
      value={value}
      onChange={(e) => setValue(e.target.value)}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
      className="w-full px-4 h-full bg-transparent outline-none border border-gray-softened focus:text-gray-999 focus:border-gray-999 focus:border-2 focus:px-[15px]"
      style={ radius[rounded] }
    />
  )
}

Input.Label = Label
Input.Field = Field

export default Input
