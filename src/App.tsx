import { Routes, Route } from 'react-router-dom'
import Home from './routes/home.tsx'
import Login from './routes/login.tsx'
import NotFound from './routes/notFound.tsx'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/home" element={<Home />} />

      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}
