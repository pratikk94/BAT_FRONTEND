import axios from "axios";
import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

const userType = {
  1: "student",
  2: "gaurdian",
  3: "teacher",
  4: "principal",
};

export const AuthProvider = ({ children }) => {
  const [{ token, type, user }, setState] = useState({
    loading: false,
    token: localStorage.getItem("token"),
    type: "principal",
    user: null,
  });

  const navigate = useNavigate();

  // useEffect(() => {
  //   axios.get("https://floating-harbor-27436.herokuapp.com/api/me", {
  //     headers: { Authorization: `Bearer ${token}` },
  //   }).then(el => {

  //   });
  // }, []);

  const login = useCallback(async (info) => {
    //
    axios
      .post("https://floating-harbor-27436.herokuapp.com/api/login", {
        ...info,
      })
      .then((resp) => {
        const { token: newToken, user: newUser, term } = resp.data;
        setState((el) => ({
          ...el,
          token: newToken,
          user: newUser,
          term: newUser.term,
          type: userType[newUser.term],
          authenticated: true,
        }));
        localStorage.setItem("token", newToken);
        localStorage.setItem("type", userType[newUser.term]);
        console.log("userType[newUser.term]",userType[newUser.term])
        navigate("/dashboard");
      });
  }, []);

  const signup = useCallback(async (info) => {
    console.log(info);
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
          term: newUser.term,
          type: userType[newUser.term],
          authenticated: true,
        }));
        localStorage.setItem("token", newToken);
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
