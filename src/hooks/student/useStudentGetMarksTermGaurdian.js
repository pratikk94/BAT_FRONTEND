import axios from "axios";
import useAuth from "hooks/useAuth";
import { useEffect, useState } from "react";

const useStudentGetMarksTermGaurdian = () => {
  const [loading, setLoading] = useState(true);
  const [studentMarks, setStudentMarks] = useState([]);
  const { token } = useAuth();

  useEffect(() => {
    axios
      .post(
        "https://floating-harbor-27436.herokuapp.com/api/get_marks_for_term_and_gaurdian",
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((resp) => {
        setStudentMarks(resp.data);
        setLoading(false);
      });
  }, [token]);

  console.log(studentMarks);

  const chart = loading ? <p>loading</p> : <p>chart</p>;

  return {
    studentMarks,
    loading,
    chart,
  };
};

export default useStudentGetMarksTermGaurdian;
