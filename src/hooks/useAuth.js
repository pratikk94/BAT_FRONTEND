import axios from "axios";
import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

const userType = {
  1: "student",
  2: "gaurdian",
  3: "teacher",
};

export const AuthProvider = ({ children }) => {
  const [{ token, type, user }, setState] = useState({
    loading: false,
    token: localStorage.getItem("token") || "5|0FKzhgF2YR2FQ5Up5MpKO4WHttZjH85bWpomuceU",
    type: "gaurdian",
    user: null,
  });

  const navigate = useNavigate();

  useEffect(() => {}, []);

  const login = useCallback(() => {
    //

    localStorage.setItem("token", "");
  }, []);

  const signup = useCallback(async (info) => {
    console.log(info);
    // localStorage.setItem("token", "");
    axios
      .post("https://floating-harbor-27436.herokuapp.com/api/register", {
        ...info,
        password_confirmation: info.password,
      })
      .then((resp) => {
        const { token: newToken, user: newUser, term } = resp.data;
        setState((el) => ({
          ...el,
          token: newToken,
          user: newUser,
          type: userType[term],
          authenticated: true,
        }));
        navigate("/dashboard");
      });
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem("token");
  }, []);

  return (
    <AuthContext.Provider
      value={{
        token,
        type,
        user,
        login,
        signup,
        logout,
        authenticated: !!token,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  return useContext(AuthContext);
};

export default useAuth;
