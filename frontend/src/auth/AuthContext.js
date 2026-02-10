import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
 const [user, setUser] = useState(null);

 useEffect(() => {
  const token = localStorage.getItem("token");
  if (token) setUser(true);
 }, []);

 const login = (username, token) => {
  localStorage.setItem("token", token);
  localStorage.setItem("username", username);
  setUser(true);
 };

 const logout = () => {
  localStorage.clear();
  setUser(null);
  window.location = "/login";
 };

 return (
  <AuthContext.Provider value={{ user, login, logout }}>
   {children}
  </AuthContext.Provider>
 );
};

export const useAuth = () => useContext(AuthContext);
