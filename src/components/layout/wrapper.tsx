import { BrowserRouter } from "react-router-dom"

type Props = { children: React.ReactNode }
type Provider = (p: Props) => React.JSX.Element

export const Providers = (...p: Provider[]) =>
  p.reduceRight(
    (Comp, P) => ({ children }: Props) =>
      <P><Comp>{children}</Comp></P>,
    ({ children }: Props) => <>{children}</>
  )

export const AppProviders =
  Providers(
    BrowserRouter,
  )