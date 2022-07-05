import { Route, Routes } from "react-router-dom";
import Invoices from "./pages/Invoices";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { AuthProvider } from "./context"

function App() {
  return (
    <>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="invoices" element={<Invoices />} />
        </Routes>
      </AuthProvider>
    </>
  )
}

export default App;
