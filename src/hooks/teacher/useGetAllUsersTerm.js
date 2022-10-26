import axios from "axios";
import useAuth from "hooks/useAuth";
import { useEffect, useState } from "react";

const useGetAllUsersTerm = ({ type }) => {
  const [loading, setLoading] = useState(true);
  const [UserInfoTerm, setUserInfo] = useState([]);
  const { token } = useAuth();
  console.log(type);
  useEffect(() => {
    setLoading(true);
    axios
      .post(
        `http://localhost:8000/api/get_marks_for_students_and_gaurdian_term`,
        {
          headers: { Authorization: "10|jVDOUdcGgeNPiM1DPrBxCJgol4ysMsmiMIa3IMYs" },
        },
        {
          data: {
            studentId: "1",
            term: "1",
            gaurdianId: "1", //Add body of studentId, gaurdianId, term
          },
        }
      )
      .then((resp) => {
        setUserInfo(resp.data);
        setLoading(false);
      });
  }, [token, type]);

  return {
    UserInfoTerm,
    loading,
  };
};

export default useGetAllUsersTerm;
