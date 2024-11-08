import {
  BrowserRouter as Router, Route, Routes,
} from 'react-router-dom';
import AuthProvider from 'react-auth-kit';
import Session from './components/auth/Session';
import createStore from 'react-auth-kit/createStore';
import SignInForm from './components/auth/SignInForm';
import TestComponent from './components/TestComponent';
import RequireAuth from '@auth-kit/react-router/RequireAuth'
import './App.css'
import './assets/css/variables.css'

function App() {
  const signInStore = createStore({
    authName: '_auth',
    authType: 'cookie',
    /*cookieDomain: window.location.hostname,
    cookieSecure: window.location.protocol === 'https:',*/
  });

  const routes = [
    {
      path: '/',
      element: <Session />,
      requiresAuth: false,
    },
    {
      path: '/login',
      element: <SignInForm />,
      requiresAuth: false,
    },
    {
      path: '/test_component',
      element: <TestComponent />,
      requiresAuth: true,
    }
  ]

  return (
    <AuthProvider store={signInStore}>
      <Router>
        <Routes>
          {
            routes.map((route) => {
              return (
                <Route
                  key={route.path}
                  path={route.path}
                  element={
                    route.requiresAuth ? <RequireAuth fallbackPath={'/login'}>{route.element}</RequireAuth> : route.element
                  } />
              )
            })
          }
        </Routes>
      </Router>
    </AuthProvider>
  )
}

export default App
