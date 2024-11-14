import "./App.css";
import { AuthContext } from "./context/AuthContext.js";
import { useEffect, useState } from "react";
import Login from "./components/Login.jsx";
import Report from "./components/Report.jsx";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    if (getToken()) {
      setIsAuthenticated(true);
    }
  }, [])

  function login(token) {
    localStorage.setItem('token', token);
    setIsAuthenticated(true);
  }

  function logout() {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
  }

  function getToken() {
    return localStorage.getItem('token');
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, getToken }}>
      {
        isAuthenticated ? 
        <>
          <button onClick={logout}>Logout</button>
          <Report />
        </>
        : <Login />
      }
      
    </AuthContext.Provider>
  )
}

export default App
