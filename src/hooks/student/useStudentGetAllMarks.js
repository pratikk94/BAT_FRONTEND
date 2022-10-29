import axios from "axios";
import useAuth from "hooks/useAuth";
import { useEffect, useState } from "react";

const useStudentGetAllMarks = () => {
  const [loading, setLoading] = useState(true);
  const [studentMarks, setStudentMarks] = useState([]);
  const { token } = useAuth();
  useEffect(() => {
    axios
      .get("https://floating-harbor-27436.herokuapp.com/api/get_all_student_marks", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((resp) => {
        setStudentMarks(resp.data);
        setLoading(false);
      });
  }, [token]);

  return {
    studentMarks,
    loading,
  };
};

export default useStudentGetAllMarks;
