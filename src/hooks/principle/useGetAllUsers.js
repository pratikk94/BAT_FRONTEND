import axios from "axios";
import useAuth from "hooks/useAuth";
import { useEffect, useState } from "react";

const useGetAllUsers = ({ type }) => {
  const [loading, setLoading] = useState(true);
  const [userInfo, setUserInfo] = useState([]);
  const { token } = useAuth();
  useEffect(() => {
    setLoading(true);
    axios
      .get(`https://floating-harbor-27436.herokuapp.com/api/get_all_${type}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((resp) => {
        setUserInfo(resp.data);
        setLoading(false);
      });
  }, [token, type]);

  return {
    userInfo,
    loading,
  };
};

export default useGetAllUsers;
