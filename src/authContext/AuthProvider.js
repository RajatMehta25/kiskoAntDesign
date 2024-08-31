import React, { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
const AuthProvider = ({ children }) => {
  // const [user, setUser] = useState(false)
  const [user, setUser] = useState({
    logIn: false,
    name: "Rajat Mehta",
    Role: "Technology Lead",
    Modules_Screens: ["Redx", "Admin"],
  });
  useEffect(() => {
    if (JSON.parse(localStorage.getItem("user")) !== null) {
      setUser(JSON.parse(localStorage.getItem("user")));
    } else {
    }
    // console.log(JSON.parse(localStorage.getItem("user")));
  }, []);
  return <AuthContext.Provider value={{ user, setUser }}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
