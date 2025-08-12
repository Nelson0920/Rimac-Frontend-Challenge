import { Navbar } from "../section"
import { Footer } from "../section"

type LayoutProps = {
  children: React.ReactNode
  withFooter?: boolean
}

const Default : React.FC<LayoutProps> = ({
  children,
  withFooter=false,
}) => {
  return (
    <div className="w-full min-h-screen h-full px-5">
      <div className="max-w-6xl mx-auto h-full defaultLayout">
        <Navbar />

        <div className="w-full h-full">
          {children}
        </div>

        {
          withFooter &&
          <Footer />
        }
      </div>
    </div>
  )
}

export default Default