import React, { useState } from 'react';
import { useNavigate, Link, Navigate } from 'react-router-dom';
import useSignIn from 'react-auth-kit/hooks/useSignIn';
import useIsAuthenticated from 'react-auth-kit/hooks/useIsAuthenticated';

function SignInForm(): JSX.Element {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const navigate = useNavigate();
  const signIn = useSignIn();
  const isAuthenticated = useIsAuthenticated();

  if (isAuthenticated) return <Navigate to="/games" />;

  try {
    const signInURL = new URL(`${import.meta.env.VITE_APP_BASE_API_URL}/users/sign_in`)

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      try {
        const response = await fetch(signInURL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            user: {
              email,
              password,
            },
          }),
        });

        const data: {
          token: string;
          user_email: string;
          user_id: number;
          is_admin: boolean;
        } = await response.json();

        signIn({
          auth: {
            token: data.token,
            type: 'Bearer',
          },
          userState: {
            userEmail: data.user_email,
            userId: data.user_id,
            isAdmin: data.is_admin,
          },
        });

        navigate('/games');

      } catch (error) {
        console.error('Login Error:', error);
      }
    };

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
            <button type="submit">Login</button>
          </form>
          <p>
            Do not have an account?
            <Link to="/register">Sign up here</Link>
          </p>
        </section>
      </main>
    );
  } catch (error) {
    console.error('Error:', error);
    console.log(import.meta.env.REACT_APP_BASE_API_URL)
  }

  return <h1>derps</h1> // TODO: Add error page
}

export default SignInForm;
