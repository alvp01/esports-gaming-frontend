import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { ReactNode } from "react";

interface ProtectedRouteProps {
  element: ReactNode;
  layout?: React.ComponentType<{ children?: ReactNode }>;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ element, layout: Layout }): JSX.Element => {
  const { getAuthToken, getAuthUser } = useAuth();

  if (getAuthToken() && getAuthUser()) {
    return Layout ? <Layout>{element}</Layout> : <>{element}</>;
  }

  return <Navigate to="/login" />;
};

export default ProtectedRoute;
