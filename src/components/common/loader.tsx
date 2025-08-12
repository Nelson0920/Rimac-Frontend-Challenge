type LoaderProps = {
  size?: number
  color?: string
}

export function Loader({ size = 32, color = 'text-blue-500' }: LoaderProps) {
  return (
    <div className="flex items-center justify-center w-full h-full">
      <div
        className={`animate-spin rounded-full border-4 border-t-transparent ${color}`}
        style={{
          width: size,
          height: size,
        }}
      />
    </div>
  )
}
