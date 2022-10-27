import axios from "axios";
import useAuth from "hooks/useAuth";
import { useEffect, useState } from "react";

const useGetAllUsersTerm = ({ type }) => {
  const [loading, setLoading] = useState(true);
  const [UserInfoTerm, setUserInfo] = useState([]);
  const { token } = useAuth();

  console.log(token);
  useEffect(() => {
    setLoading(true);
    axios
      .post(
        "https://floating-harbor-27436.herokuapp.com/api/get_marks_for_students_and_gaurdian_term",
        {
          headers: { Authorization: `Bearer ${token}` },
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
        console.log(resp);
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
