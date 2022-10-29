import axios from "axios";
import useAuth from "hooks/useAuth";
import { useEffect, useState } from "react";

const useGetAllUsers = ({ type }) => {
  const [loading, setLoading] = useState(true);
  const [userInfo, setUserInfo] = useState([]);
  const { token } = useAuth();
  useEffect(() => {
    setLoading(true);
    callAPi()
  }, [token, type]);

  const callAPi=()=>{
    axios
    .get(`https://floating-harbor-27436.herokuapp.com/api/get_all_${type}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((resp) => {
      setUserInfo(resp.data);
      setLoading(false);
    });
  }

  return {
    userInfo,
    loading,
    setLoading,
    callAPi
  };
};

export default useGetAllUsers;
