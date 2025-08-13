import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./context/auth/protectedRoute";
import PublicRoute from "./context/auth/publicRoute";

import Home from "./routes/home";
import Login from "./routes/login";
import NotFound from "./routes/notFound";

export default function App() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route element={<PublicRoute />}>
        <Route path="/" element={<Login />} />
      </Route>

      {/* Private Routes */}
      <Route element={<ProtectedRoute />}>
        <Route path="/home" element={<Home />} />
      </Route>

      {/* NotFound */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
