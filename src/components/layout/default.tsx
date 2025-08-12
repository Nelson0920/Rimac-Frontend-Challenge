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
    <div className="w-full min-h-screen defaultLayout">
      <div className="max-w-6xl w-full h-full mx-auto">
        <Navbar />
      </div>

      <div className="max-w-6xl w-full h-full mx-auto">
        {children}
      </div>

      <div className="w-full bg-black">
        <div className="max-w-6xl w-full mx-auto">
          {
            withFooter &&
            <Footer />
          }
        </div>
      </div>
    </div>
  )
}

export default Default