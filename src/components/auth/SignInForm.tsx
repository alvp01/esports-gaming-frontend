import { AxiosResponse } from 'axios';
import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import {
  useNavigate,
  Link,
  Navigate
} from 'react-router-dom';
import {
  LoginRequest,
  LogInFunction,
  LoginResponse
} from '../../types/types';
import styles from './Signin.module.css'

interface SignInFormProps {
  logIn: LogInFunction;
}

const SignInForm: React.FC<SignInFormProps> = ({ logIn }) => {
  const navigate = useNavigate();
  const {
    setTokenCookie,
    setUserCookie,
    getAuthUser,
    getAuthToken
  } = useAuth();
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
    <main className={styles['login-container']}>
      <h2 className={styles['login-title']}>Login</h2>
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
      <section className={styles['text-holder']}>
        <p>
          Do not have an account?
        </p>
        <Link to="/signup">Sign up here</Link>
      </section>
    </main>
  );
}

export default SignInForm;
