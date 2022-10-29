/**
=========================================================
* Material Dashboard 2 React - v2.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// @mui material components
import Card from "@mui/material/Card";
import Typography from '@mui/material/Typography';
import axios from "axios";
import useAuth from "hooks/useAuth";
// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

// Material Dashboard 2 React examples
import DataTable from "examples/Tables/DataTable";
import useGetAllUsers from "hooks/principle/useGetAllUsers";
import useUpdateStudent from "hooks/student/useUpdateStudent";

import { useState, useEffect } from "react"
// Data
import data from "layouts/dashboard/components/UserInfo/data";
import StudentChart from "../StudentChart/StudentChat";




function UserInfo({ type, setType  }) {
  const { columns, rows } = data();
  let [val, setVal] = useState()
  const typeOfLogin=localStorage.getItem("type")

  console.log("testtt", typeOfLogin)
  useEffect(() => {
    if (type) {
      setVal(type)
    }
  }, [type])
  const { userInfo, loading, setLoading, callAPi } = useGetAllUsers({ type });
  const { userInfo: teacherInfo, loading: teacherloading } = useGetAllUsers({ type: "teacher" });
  const { token } = useAuth();

  const { userInfo: gaurdainInfo, loading: gaurdianloading } = useGetAllUsers({ type: "gaurdian" });
  let [edit, setEdit] = useState(null)
  let [showChart, setShowChart] = useState(null);
  let [teacherOptions, setTeacherOptions] = useState([])
  let [gaurdianOptions, setgaurdianOptions] = useState([])
  const handleUpdate = (data, selectedGaurdian, selectedTeacher) => {
    console.log("dataaa", selectedGaurdian, selectedTeacher)
    setLoading(true);
    let payload={}
    if(typeOfLogin==="principal"){
      payload={
        "gaurdian_id": selectedGaurdian.value,
        "teacher_id": selectedTeacher.value
      }
    }else{
      payload={
        "gaurdian_id": selectedGaurdian.value
      }
    }
    axios
      .post(
        `https://floating-harbor-27436.herokuapp.com/api/update_student_info/${data.id}`,

        payload,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((resp) => {
        setEdit(null)
        callAPi()
      });

  }
  useEffect(() => {
    if (teacherInfo) {
      setTeacherOptions(createOptions(teacherInfo))
    }

  }, [teacherInfo])
  useEffect(() => {
    if (gaurdainInfo) {
      setgaurdianOptions(createOptions(gaurdainInfo))

    }
  }, [gaurdainInfo])
  const createOptions = (data) => {
    let options = data.map((item) => {
      return {
        label: item.name,
        value: item.id
      }
    })
    return options
  }

  const handleClose = () => {
    setShowChart(null);
  }

  console.log("teacherOptions", teacherOptions)


  console.log(userInfo, "userInfo");
  return (
    <Card style={{ height: "500px" }}>
      <MDBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
        <MDBox>
          <MDTypography variant="h6" gutterBottom>
            {type}&apos;s details
          </MDTypography>
          <div>
            <Select value={type} label="Age" onChange={(e) => setType(e.target.value)}>
              <MenuItem value="student">Student</MenuItem>
              <MenuItem value="gaurdian">Gaurdian</MenuItem>
              <MenuItem value="teacher">Teacher</MenuItem>
            </Select>
          </div>
        </MDBox>
      </MDBox>
      {loading ? (
        <MDBox style={{ margin: "0 auto" }}>
          <div >

            <div className="loader"></div>
          </div>

        </MDBox>
      ) : (
        <MDBox >
          <DataTable
            table={{ columns, rows: userInfo }}
            showTotalEntries={false}
            isSorted={false}
            noEndBorder
            entriesPerPage={false}
            userInfo={userInfo}
            teacherOptions={teacherOptions}
            gaurdianOptions={gaurdianOptions}
            setEdit={setEdit}
            edit={edit}
            setShowChart={setShowChart}
            handleUpdate={handleUpdate}
            typeOfLogin={typeOfLogin}
          />
        </MDBox>

      )}   
      <StudentChart user={showChart}  handleClose={handleClose} />
    </Card>
  );
}

export default UserInfo;
