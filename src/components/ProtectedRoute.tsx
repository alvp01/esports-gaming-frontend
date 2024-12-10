import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

interface ProtectedRouteProps {
  element: JSX.Element;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ element }): JSX.Element => {
  const { getAuthToken, getAuthUser } = useAuth();
  return getAuthToken() && getAuthUser() ? element : <Navigate to="/login" />;
};

export default ProtectedRoute;