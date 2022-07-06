import { Navigate } from "react-router-dom";
import { useAuthState } from "../context";

export const ProtectedRoute = ({ children }) => {
    const userDetails = useAuthState()
    if (!userDetails.token) {
        // user is not authenticated
        return <Navigate to="/" />;
    }
    return children;
};
