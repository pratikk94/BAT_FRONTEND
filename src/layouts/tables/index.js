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
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import DataTable from "examples/Tables/DataTable";

// Data
// import authorsTableData from "layouts/tables/data/authorsTableData";
import projectsTableData from "layouts/tables/data/projectsTableData";
import { useEffect, useState } from "react";
import useStudentGetAllMarks from "hooks/student/useStudentGetAllMarks";
import useStudentGetMarksTermGaurdian from "hooks/student/useStudentGetMarksTermGaurdian";
import axios from "axios";
import useAuth from "hooks/useAuth";

function Tables() {
  const { token } = useAuth();

  const [columns] = useState([
    { Header: "Computer", accessor: "computer" },
    { Header: "eEnglish", accessor: "english" },
    { Header: "Maths", accessor: "maths" },
    { Header: "Science", accessor: "science" },
    { Header: "Social Science", accessor: "socialScience" },
  ]);
  const { studentMarks: rows, loading } = useStudentGetAllMarks();
  const { chart } = useStudentGetMarksTermGaurdian();
  const { columns: pColumns, rows: pRows } = projectsTableData();

  useEffect(() => {
    const fetchData = async () => {
      const data = await axios.post(
        "https://floating-harbor-27436.herokuapp.com/api/get_marks_for_term",
        {
          studentId: 1,
          term: 4,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(data.data);
    };
    fetchData();
  }, [token]);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox pt={6} pb={3}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <Card>
              <MDBox
                mx={2}
                mt={-3}
                py={3}
                px={2}
                variant="gradient"
                bgColor="info"
                borderRadius="lg"
                coloredShadow="info"
              >
                <MDTypography variant="h6" color="white">
                  Student Marks
                </MDTypography>
              </MDBox>
              <MDBox pt={3}>
                {loading ? (
                  <div style={{ textAlign: "center", margin: "1rem" }}>Loading...</div>
                ) : (
                  <DataTable
                    table={{ columns, rows }}
                    isSorted={false}
                    entriesPerPage={false}
                    showTotalEntries={false}
                    noEndBorder
                  />
                )}
              </MDBox>
            </Card>
          </Grid>
          <Grid item xs={12}>
            <Card>
              <MDBox
                mx={2}
                mt={-3}
                py={3}
                px={2}
                variant="gradient"
                bgColor="info"
                borderRadius="lg"
                coloredShadow="info"
              >
                <MDTypography variant="h6" color="white">
                  Charts
                </MDTypography>
              </MDBox>
              <MDBox pt={3}>{chart}</MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Tables;
