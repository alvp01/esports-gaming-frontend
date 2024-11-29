import { useCookies } from "react-cookie";
import {
  createContext,
  useContext,
  useMemo,
  ReactNode
} from "react";

interface UserCookie {
  userId: number;
  userEmail: string;
  isAdmin: boolean;
}

interface AuthContextType {
  setUserCookie: (params: UserCookie) => void;
  setTokenCookie: (token: string) => void;
  removeCookies: () => void;
  getAuthUser: () => UserCookie | null;
  getAuthToken: () => string | null;
}

const AuthContext = createContext<AuthContextType | null>(null);

const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cookies, setCookie, removeCookie] = useCookies(["user", "token"]);

  const parsedUser = cookies.user ? cookies.user as UserCookie : null;

  const parsedToken = cookies.token ? cookies.token as string : null;

  const getAuthUser = () => parsedUser;

  const getAuthToken = () => parsedToken;

  const setUserCookie = ({ userId, userEmail, isAdmin }: UserCookie) => {
    setCookie("user", JSON.stringify({ userId, userEmail, isAdmin }));
  };

  const setTokenCookie = (token: string) => {
    setCookie("token", token);
  };

  const removeCookies = () => {
    removeCookie("user");
    removeCookie("token");
  };

  const contextValue = useMemo(
    () => ({
      cookies,
      setUserCookie,
      setTokenCookie,
      removeCookies,
      getAuthUser,
      getAuthToken
    }),
    [cookies]
  );

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within a AuthProvider");
  }
  return context;
};

