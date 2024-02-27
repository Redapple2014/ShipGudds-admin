import React from "react";

const Dashboard = React.lazy(() =>
  import("./views/project-files/dashboard/Dashboard")
);

const TransporterList = React.lazy(() =>
  import("./views/project-files/transporter/transporterList")
);
// const UserDetailsPage = React.lazy(() =>
//   import("./views/project-files/employee/user-details/UserDetailsPage")
// );

const routes = [
  { path: "/", exact: true, name: "Home" },
  // { path: "/dashboard", name: "Dashboard", component: Dashboard },

  { path: "/transporter", name: "Transporter List", component: TransporterList, },
 

  // {
  //   path: "/user/user-details/:user_id",
  //   name: "User Details",
  //   component: UserDetailsPage,
  // },
 
  
];

export default routes;
