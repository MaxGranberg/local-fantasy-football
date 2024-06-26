import React, {
  useState, useEffect, useContext
} from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Navigation from './components/Navigation';
import Home from './components/Home';
import ProtectedRoute from './components/ProtectedRoute';
import AdminDashboard from './components/AdminDashboard';
import LoginForm from './components/LoginForm'
import RegisterForm from './components/RegisterForm'
import MyTeam from './components/MyTeam'
import League from './components/League'
import Fixtures from './components/Fixtures'
import AuthContext from './components/AuthContext'
import Footer from './components/Footer';

function App() {
  const [isRegistered, setIsRegistered] = useState(false)
  const [flashMessage, setFlashMessage] = useState(null)

  const { isAuthenticated, setIsAuthenticated, logout } = useContext(AuthContext)

  useEffect(() => {
    const timeout = setTimeout(() => {
      setFlashMessage(null)
    }, 3000)

    return () => clearTimeout(timeout)
  }, [flashMessage])

  const handleLogin = () => {
    setIsAuthenticated(true)
  }

  const handleRegister = () => {
    setIsRegistered(true)
  }

  const switchToLogin = () => {
    setIsRegistered(false)
  }

  return (
    <>
      <Router>
        <div className="App min-h-screen flex flex-col">
          <Header />
          <main className="flex-grow">
            {flashMessage && (
              <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative text-center">
                {flashMessage}
              </div>
            )}
            {isAuthenticated ? (
              <>
                <Navigation />
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/myTeam" element={<MyTeam />} />
                  <Route path="/league" element={<League />} />
                  <Route path="/fixtures" element={<Fixtures />} />
                  <Route path="/admin" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
                </Routes>
                <button
                  type="button"
                  className="logout-button absolute top-0 right-0 m-4 bg-red-800 hover:bg-red-900 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  onClick={logout}>
                  Logga ut
                </button>
              </>
            ) : (
              <div className="login-container">
                {!isRegistered ? (
                  <LoginForm
                    onLogin={handleLogin}
                    onRegister={handleRegister}
                    setGlobalFlashMessage={setFlashMessage}
                  />
                ) : (
                  <RegisterForm
                    onBackToLogin={switchToLogin}
                    setGlobalFlashMessage={setFlashMessage}
                  />
                )}
              </div>
            )}
          </main>
          <Footer />
        </div>
      </Router>
    </>
  );
}

export default App;
