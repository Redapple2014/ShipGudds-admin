import React from "react";

const Dashboard = React.lazy(() =>
  import("./views/project-files/dashboard/Dashboard")
);

const TransporterList = React.lazy(() =>
  import("./views/project-files/transporter/transporterList")
);
const TransporterUserList = React.lazy(() =>
  import("./views/project-files/transporter/transporterWiseUserList")
);
const TransporterVehicalList = React.lazy(() =>
  import("./views/project-files/transporter/transporterVehicalList")
);
const TransporterOtherList = React.lazy(() =>
  import("./views/project-files/transporter/transpoterOtherList")
);
const routes = [
  { path: "/", exact: true, name: "Home" },
  // { path: "/dashboard", name: "Dashboard", component: Dashboard },

  { path: "/transporter", name: "Transporter List", component: TransporterList, },
  { path: "/transporter/user/:transporter_id", name: "Transporter User List", component: TransporterUserList, },
  { path: "/transporter/vehical/:transporter_id", name: "Transporter User List", component: TransporterVehicalList, },
  { path: "/transporter/other/:transporter_id", name: "Transporter User List", component: TransporterOtherList, },
  
  // {
  //   path: "/user/user-details/:user_id",
  //   name: "User Details",
  //   component: UserDetailsPage,
  // },
 
  
];

export default routes;
