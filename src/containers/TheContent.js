/**
 * @file_purpose routing of all pages
 * @author Sarmistha Mondal
 * @Date_Created 22.01.2024
 * @Date_Modified 
 */
import React, { Suspense } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { CContainer } from "@coreui/react";
// import UserList from "../views/project-files/employee/user-details/UserList";
// import Dashboard from "src/views/project-files/dashboard/Dashboard";
import TransporterList from "../views/project-files/transporter/transporterList"
// import UserDetailsPage from "../views/project-files/employee/user-details/UserDetailsPage";


const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
);

const TheContent = () => {
  return (
    <main className="c-main">
      <CContainer fluid>
        <Suspense fallback={loading}>
          <Switch>
            {/* <Route
              path="/user/user-details/:user_id"
              name="User Detail"
              component={UserDetailsPage}
            /> */}
            {/* <Route
              path="/dashboard"
              exact="true"
              name="Dashboard"
              component={Dashboard}
            /> */}
            <Route
              path="/transporter"
              exact="true"
              name="transporter List"
              component={TransporterList}
            />
           
            
            <Redirect from="/" to="/transporter" />
          </Switch>
        </Suspense>
      </CContainer>
    </main>
  );
};

export default React.memo(TheContent);
