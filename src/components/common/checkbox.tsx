import { createContext, useContext, useState, type ReactNode } from 'react'

const CheckboxContext = createContext<{
  checked: boolean
  toggleChecked: () => void
}>({
  checked: false,
  toggleChecked: () => {},
})

interface CheckboxProps {
  children: ReactNode
  initialChecked?: boolean
}

const Checkbox = ({ children, initialChecked = false }: CheckboxProps) => {
  const [checked, setChecked] = useState(initialChecked)

  const toggleChecked = () => setChecked(!checked)

  const value = {
    checked,
    toggleChecked,
  }

  return (
    <CheckboxContext.Provider value={value}>
      <div className={'flex items-center space-x-4'}>{children}</div>
    </CheckboxContext.Provider>
  )
}

const CheckboxInput = () => {
  const { checked, toggleChecked } = useContext(CheckboxContext)
  return (
    <input
      type='checkbox'
      checked={checked}
      onChange={toggleChecked}
      className={'h-6 w-6 text-indigo-600 cursor-pointer'}
    />
  )
}

const CheckboxLabel = ({ children }: { children: ReactNode }) => {
  const { toggleChecked } = useContext(CheckboxContext)
  return (
    <label
      onClick={toggleChecked}
      className={'text-black cursor-pointer select-none'}
    >
      {children}
    </label>
  )
}

Checkbox.Input = CheckboxInput
Checkbox.Label = CheckboxLabel

export default Checkbox
