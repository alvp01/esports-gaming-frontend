import React, { useState } from 'react';
import { useNavigate, Link, Navigate } from 'react-router-dom';
import { LoginRequest, LogInFunction } from '../../types/types';
import { useAuth } from '../../context/AuthContext';
import { AxiosResponse } from 'axios';
import { LoginResponse } from '../../types/types';

interface SignInFormProps {
  logIn: LogInFunction;
}

const SignInForm: React.FC<SignInFormProps> = ({ logIn }) => {
  const navigate = useNavigate();
  const { setTokenCookie, setUserCookie, getAuthUser, getAuthToken } = useAuth();
  if (getAuthUser() && getAuthToken()) return <Navigate to="/test_component" />;
  const signIn = (response: AxiosResponse<LoginResponse>) => {
    setTokenCookie(response.data.token);
    setUserCookie({
      userId: response.data.user_id,
      userEmail: response.data.user_email,
      isAdmin: response.data.is_admin,
    });
  }
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isError, setIsError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);


  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const body: LoginRequest = {
      user: {
        email,
        password,
      }
    };

    setIsLoading(true);

    logIn(body)
      .then((response) => {
        signIn(response);
        navigate('/test_component');
      }).catch((error) => {
        setIsError(error.message || "An error occurred");
      }).finally(() => {
        setIsLoading(false);
      });
  };

  if (isError) return <p>{isError}</p>;

  return (
    <main className="body-background">
      <section className="formcontainer">
        <h2 className="login-title">Login</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="emailId">
            Email:
            <input
              type="email"
              value={email}
              id="emailId"
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
          <label htmlFor="passwordId">
            Password:
            <input
              type="password"
              value={password}
              id="passwordId"
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          <button type="submit" disabled={isLoading}>
            {isLoading ? "Logging in..." : "Log In"}
          </button>
        </form>
        <p>
          Do not have an account?
          <Link to="/register">Sign up here</Link>
        </p>
      </section>
    </main>
  );
}

export default SignInForm;
