import { createContext, useContext, useState, type ReactNode } from 'react'

type CheckboxContextType = {
  checked: boolean
  setChecked: (val: boolean) => void
}

const CheckboxContext = createContext<CheckboxContextType | null>(null)

const useCheckboxContext = () => {
  const context = useContext(CheckboxContext)
  if (!context) throw new Error("Checkbox components must be used within <Checkbox>")
  return context
}

interface CheckboxProps {
  children: ReactNode
  checked?: boolean
  onChange?: (checked: boolean) => void
}

interface CheckboxLabelProps {
  children?: ReactNode
}

const Checkbox = ({ children, checked: controlledChecked, onChange }: CheckboxProps) => {
  const [internalChecked, setInternalChecked] = useState(false)

  const isControlled = controlledChecked !== undefined
  const checked = isControlled ? controlledChecked : internalChecked

  const handleChange = (newChecked: boolean) => {
    if (!isControlled) {
      setInternalChecked(newChecked)
    }
    onChange?.(newChecked)
  }

  const value = {
    checked,
    setChecked: handleChange
  }

  return (
    <CheckboxContext.Provider value={value}>
      <div className="flex items-center space-x-2">
        {children}
      </div>
    </CheckboxContext.Provider>
  )
}

const CheckboxLabel = ({ children }: CheckboxLabelProps) => {
  const { checked, setChecked} = useCheckboxContext()

  return (
    <label
      className={`flex items-center cursor-pointer select-none text-gray-999`}
      onClick={() => setChecked(!checked)}
    >
      <div
        className={`w-6 h-6 rounded border-2 flex items-center justify-center mr-2 ${
          checked && 'bg-grey100 border-grey100'
        }`}
      >
        {checked && (
          <svg
            className="w-4 h-4 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
          </svg>
        )}
      </div>
      <span>{children}</span>
    </label>
  )
}


const CheckboxField = ({ ...props }: React.HTMLAttributes<HTMLInputElement>) => {
  const { checked, setChecked } = useCheckboxContext()

  return (
    <input
      type="checkbox"
      checked={checked}
      onChange={(e) => setChecked(e.target.checked)}
      className="sr-only"
      {...props}
    />
  )
}

Checkbox.Label = CheckboxLabel
Checkbox.Field = CheckboxField

export default Checkbox