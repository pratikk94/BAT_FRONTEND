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

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

// Material Dashboard 2 React examples
import DataTable from "examples/Tables/DataTable";
import useGetAllUsers from "hooks/principle/useGetAllUsers";

// Data
import data from "layouts/dashboard/components/UserInfo/data";

function UserInfo({ type, setType }) {
  const { columns, rows } = data();
  const { userInfo, loading } = useGetAllUsers({ type });
  console.log(userInfo);
  return (
    <Card>
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
      <MDBox>
        {loading ? (
          <p>Loading</p>
        ) : (
          <DataTable
            table={{ columns, rows: userInfo }}
            showTotalEntries={false}
            isSorted={false}
            noEndBorder
            entriesPerPage={false}
          />
        )}
      </MDBox>
    </Card>
  );
}

export default UserInfo;
