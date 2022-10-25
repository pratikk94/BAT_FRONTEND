import MDBox from "components/MDBox";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import * as React from "react";
import ValidationTextFields from "../common/ValidationTextFields";

export default function addGaurdian() {
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox py={3}>
        <ValidationTextFields />
      </MDBox>
    </DashboardLayout>
  );
}
