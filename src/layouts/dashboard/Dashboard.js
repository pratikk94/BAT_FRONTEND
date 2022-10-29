import Sidenav from "examples/Sidenav";
import Configurator from "examples/Configurator";
import routes from "routes/routes";
import MDBox from "components/MDBox";
import Icon from "@mui/material/Icon";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";

import { useMaterialUIController, setMiniSidenav, setOpenConfigurator } from "context";

import brandWhite from "assets/images/logo-ct.png";
import DataGrid from "layouts/dashboard/index"
 const Dashboard=()=>{
    const [controller, dispatch] = useMaterialUIController();
    const typeOflogin=localStorage.getItem("type")
    const getRoutes = (allRoutes) =>
    allRoutes.map((route) => {
      if (route.collapse) {
        return getRoutes(route.collapse);
      }

      if (route.route) {
        return <Route exact path={route.route} element={route.component} key={route.key} />;
      }

      return null;
    });
console.log("skssjjsj")
    const {
        miniSidenav,
        direction,
        layout,
        openConfigurator,
        sidenavColor,
        transparentSidenav,
        whiteSidenav,
        darkMode,
      } = controller;
    const configsButton = (
        <MDBox
          display="flex"
          justifyContent="center"
          alignItems="center"
          width="3.25rem"
          height="3.25rem"
          bgColor="white"
          shadow="sm"
          borderRadius="50%"
          position="fixed"
          right="2rem"
          bottom="2rem"
          zIndex={99}
          color="dark"
          sx={{ cursor: "pointer" }}
        //   onClick={handleConfiguratorOpen}
        >
          <Icon fontSize="small" color="inherit">
            settings
          </Icon>
        </MDBox>
      );

      return <>
      <Sidenav
        color={sidenavColor}
        brand={(transparentSidenav && !darkMode) || whiteSidenav ? brandDark : brandWhite}
        brandName="React British Asian Trust"
        routes={routes[typeOflogin]}

      />
      <Configurator />
      {configsButton}
<DataGrid/>


    </>
}

export default Dashboard