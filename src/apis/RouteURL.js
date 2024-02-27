const RouteURL = {
  //For maintain staging and production
  webMode: `local`,
  // webMode: `production`,
  version: "V 1.0.0",
 

  //For Service Routes

  login: "admin/login",
  generateForgotpasswordOTP: "generate/forgotpassword/otp",
  validateForgotpasswordOTP: "validate/forgotpassword/otp",
  resetPassword: "reset/password",
  transporterList: "admin/transporter/list",
  transporterUserList :"admin/transporter/user/list",
  transporterVehicleList:"admin/transporter/vehicle/list",
  transporterAllRequest :"admin/transporter/all/request",
};

export default RouteURL;
