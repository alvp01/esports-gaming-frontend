import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

interface ProtectedRouteProps {
  element: JSX.Element;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ element }): JSX.Element => {
  const { cookies } = useAuth();
  return cookies.user && cookies.token ? element : <Navigate to="/login" />;
};

export default ProtectedRoute;