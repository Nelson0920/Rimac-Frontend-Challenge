import { BrowserRouter } from "react-router-dom"
import { AuthProvider } from "../../context/auth/authContext"
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

type Props = { children: React.ReactNode | React.ReactElement }
type Provider = (p: Props) => React.JSX.Element

const queryClient = new QueryClient()

export const Providers = (...p: Provider[]) =>
  p.reduceRight(
    (Comp, P) => ({ children }: Props) =>
      <P><Comp>{children}</Comp></P>,
    ({ children }: Props) => <>{children}</>
  )

export const AppProviders =
  Providers(
    ({ children }) => <BrowserRouter>{children}</BrowserRouter>,
    ({ children }) => <AuthProvider>{children}</AuthProvider>,
    ({ children }) => <QueryClientProvider client={ queryClient }>{children}</QueryClientProvider>
  )