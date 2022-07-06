import { Route, Routes } from "react-router-dom";
import Invoices from "./pages/Invoices";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { AuthProvider } from "./context"
import { ProtectedRoute } from "./components/ProtectedRoute";
import NotFound from "./pages/404";
import Payment from "./pages/Payment";
import Payments from "./pages/Payments";

function App() {
  return (
    <>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="invoices" element={
            <ProtectedRoute><Invoices /></ProtectedRoute>}
          />
          <Route path="payment" element={<Payments />}>
            <Route path=":invoiceId" element={<Payment />} />
          </Route>
          <Route path="*" element={<NotFound />}></Route>
        </Routes>
      </AuthProvider>
    </>
  )
}

export default App;
