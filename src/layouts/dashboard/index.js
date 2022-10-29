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

// Material Dashboard 2 React components
import MDBox from "components/MDBox";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";

// Data
import reportsLineChartData from "layouts/dashboard/data/reportsLineChartData";
import UserInfo from "layouts/dashboard/components/UserInfo";
import { useState } from "react";

// Dashboard components
UserInfo;

function DataGrid() {
  const { sales, tasks } = reportsLineChartData;
  const [type, setType] = useState("student");

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox>
        <MDBox>
          <Grid>
            <Grid>
              <UserInfo type={type} setType={setType} typeOfLogin={localStorage.getItem("type")
}/>
            </Grid>
          </Grid>
        </MDBox>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default DataGrid;
