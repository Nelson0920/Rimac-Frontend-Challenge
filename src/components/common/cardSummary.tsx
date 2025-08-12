import { useMediaQuery } from 'react-responsive'
import { type ReactNode } from 'react'

type TProps = {
  children: ReactNode
}

const CardSummary: React.FC<TProps> & {
  Title: typeof Title
  Description: typeof Description
  Divider: typeof Divider
} = ({ children }) => {

  return (
    <div
      className={`
        relative
        flex flex-col
        rounded-[1.5rem] border-[3px]
        bg-white
        shadow-[0_1px_32px_rgba(174,172,243,0.35)]
        border-transparent
        max-w-4xl w-full mx-auto
      `}
      style={{
        padding: '2.5rem 1.5rem',
      }}
    >
      {children}
    </div>
  )
}

type TitleProps = {
  children: ReactNode
}

const Title: React.FC<TitleProps> = ({ children }) => {
  const isMobile = useMediaQuery({ maxWidth: 768 })

  return (
    <div
      className={`flex gap-2 ${
        isMobile ? 'flex-row items-center' : 'flex-col'
      }`}
    >
      <div className='text-darkBlue1 text-xl font-bold leading-7 tracking-[-0.2px]'>
        {children}
      </div>
    </div>
  )
}

type DescriptionProps = {
  children: ReactNode
}

const Description: React.FC<DescriptionProps> = ({ children }) => {
  return <div className='text-darkBlue1 text-[12px]'>{children}</div>
}

const Divider: React.FC = () => {
  return <div className='border-t border-softGray my-3' />
}

CardSummary.Title = Title
CardSummary.Description = Description
CardSummary.Divider = Divider

export default CardSummary
