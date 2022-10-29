import axios from "axios";
import useAuth from "hooks/useAuth";
import { useEffect, useState } from "react";

const useUpdateStudent = (id,payload) => {
  const [loading, setLoading] = useState(true);
  const [studentMarks, setStudentMarks] = useState([]);
  const { token } = useAuth();
const execute=(data)=>{

    console.log("shhshss",data)
}

  useEffect(() => {
    axios
      .post(
        `https://floating-harbor-27436.herokuapp.com/api/update_student_info/${id}`,
        {},
        {
            data: payload,
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
    response,
    execute,
  };
};

export default useUpdateStudent;
