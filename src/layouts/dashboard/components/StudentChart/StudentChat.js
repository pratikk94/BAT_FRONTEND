import axios from "axios";
import Typography from "@mui/material/Typography";
import useAuth from "hooks/useAuth";
import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "70vw",
  height: "70vh",
  overflowY: "auto",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

function StudentChart({ user, handleClose }) {
  const [loading, setLoading] = useState(true);
  const [term, setTerm] = useState("1");
  const [userInfo, setUserInfo] = useState([]);
  const { token } = useAuth();

  const options = {
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: `${user?.name} chart`,
      },
    },
  };

  useEffect(() => {
    if (!user) return;
    setLoading(true);
    axios
      .post(
        "https://floating-harbor-27436.herokuapp.com/api/get_marks_for_term_students",
        {
          studentId: user?.id?.toString() ?? "1",
          term,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((resp) => {
        setUserInfo(resp.data);
        setLoading(false);
      });
  }, [term, user]);

  return (
    <Modal open={!!user} onClose={handleClose}>
      <Box sx={style}>
        <div className="close" onClick={handleClose}></div>
        <Typography variant="h6" component="h2">
          {user?.name}'s Marks Chart{" "}
          <Select value={term} label="Term" onChange={(e) => setTerm(e.target.value)}>
            <MenuItem value="1">Term 1</MenuItem>
            <MenuItem value="2">Term 2</MenuItem>
            <MenuItem value="3">Term 3</MenuItem>
            <MenuItem value="4">Term 4</MenuItem>
          </Select>
        </Typography>
        {loading ? (
          <div className="loader"></div>
        ) : (
          <Bar
            options={options}
            width={100}
            height={50}
            data={{
              labels: userInfo.map((el) => el.subject.SubjectName),
              datasets: [
                {
                  label: "Marks secured",
                  data: userInfo.map((el) => el.marks),
                },
              ],
            }}
          />
        )}
      </Box>
    </Modal>
  );
}

export default StudentChart;
