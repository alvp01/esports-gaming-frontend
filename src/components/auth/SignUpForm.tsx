import React, { useState } from 'react';
import { useNavigate, Link, Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { SignUpFunction } from '../../types/types';

interface SignUpFormProps {
  signUp: SignUpFunction;
}

const SignUpForm: React.FC<SignUpFormProps> = ({ signUp }) => {
  const [userState, setUserState] = useState({
    email: '',
    password: '',
    passwordConfirmation: '',
  });
  const [isError, setIsError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);


  const navigate = useNavigate();
  const { getAuthUser, getAuthToken } = useAuth();

  if (getAuthUser() && getAuthToken()) return <Navigate to="/test_component" />;

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setIsLoading(true);

    signUp({
      user: {
        email: userState.email,
        password: userState.password,
        password_confirmation: userState.passwordConfirmation
      }
    }).then((response) => {
      console.log(response);
      navigate('/login');
    }).catch((error) => {
      setIsError(error.message || "An error occurred");
    }).finally(() => {
      setIsLoading(false);
    });
  };

  if (isError) return <p>{isError}</p>;

  return (
    <main className="registration-container">
      <h2 className="registration-title">Register</h2>
      <form onSubmit={handleSubmit} className="registration-form">
        <label htmlFor="emailId">
          Email:
          <input
            type="email"
            value={userState.email}
            id="emailId"
            onChange={(e) => setUserState({ ...userState, email: e.target.value })}
          />
        </label>
        <label htmlFor="passwordId">
          Password:
          <input
            type="password"
            value={userState.password}
            id="passwordId"
            onChange={(e) => setUserState({ ...userState, password: e.target.value })}
          />
        </label>
        <label htmlFor="passwordConfirmationId">
          Confirm Password:
          <input
            type="password"
            value={userState.passwordConfirmation}
            id="passwordConfirmationId"
            onChange={(e) => setUserState({ ...userState, passwordConfirmation: e.target.value })}
          />
        </label>
        <button type="submit" disabled={isLoading}>Register</button>
      </form>
      <p>
        Already have an account?
        <Link to="/login">Login here</Link>
      </p>
    </main>
  );
}

export default SignUpForm;
