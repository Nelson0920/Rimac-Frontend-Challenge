import React from 'react'

type ButtonProps = {
  label: string
  onClick?: () => void
  type?: 'button' | 'submit' | 'reset'
  disabled?: boolean
  className?: string
  color?: 'primary' | 'secondary'
  size?: 'small' | 'large'
}

const Button: React.FC<ButtonProps> = ({
  label,
  onClick,
  type = 'button',
  disabled = false,
  className = '',
  color = 'primary',
  size = 'large'
}) => {

  const sizeStyles =
    size === 'large'
      ? {
          fontSize: '20px',
          padding: '20px 40px',
        }
      : {
          fontSize: '18px',
          padding: '14px 32px',
        }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      style={{ ...sizeStyles }}
      className={`rounded-[40px] text-white hover:opacity-90
        ${color == 'primary' ? 'bg-darkBlue1' : 'bg-pinkRed'}
        disabled:opacity-50 ${className}`}
    >
      {label}
    </button>
  )
}

export default Button
