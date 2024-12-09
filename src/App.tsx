import {
  BrowserRouter as Router, Route, Routes,
} from 'react-router-dom';
import Session from './components/auth/Session';
import AuthProvider from './context/AuthContext';
import SignInForm from './components/auth/SignInForm';
import SignUpForm from './components/auth/SignUpForm';
import TestComponent from './components/TestComponent';
import ProtectedRoute from './components/ProtectedRoute';
import { sessionServices } from './services/sessionServices';
import './App.css'
import './assets/css/variables.css'

function App() {

  const routes = [
    {
      path: '/',
      element: <Session />,
      requiresAuth: false,
    },
    {
      path: '/login',
      element: <SignInForm logIn={sessionServices.logIn} />,
      requiresAuth: false,
    },
    {
      path: '/signup',
      element: <SignUpForm signUp={sessionServices.signUp} />,
      requiresAuth: false,
    },
    {
      path: '/test_component',
      element: <TestComponent />,
      requiresAuth: true,
    }
  ]

  return (
    <AuthProvider>
      <Router>
        <Routes>
          {routes.map((route) => {
            return route.requiresAuth ? (
              <Route
                key={route.path}
                path={route.path}
                element={
                  <ProtectedRoute element={route.element} />
                }
              />
            ) : (
              <Route
                key={route.path}
                path={route.path}
                element={route.element}
              />
            );
          })}
        </Routes>
      </Router>
    </AuthProvider>
  )
}

export default App;
