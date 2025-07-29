import React from "react";
import { createContext } from "react";
const AuthContext = createContext(null);

function AuthContextProvider({ children }) {
  return <AuthContext.Provider value={{}}>{children}</AuthContext.Provider>;
}

export default AuthContextProvider;
