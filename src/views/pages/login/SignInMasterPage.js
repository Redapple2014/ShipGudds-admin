import React, { useState, useEffect } from 'react'
import {
  CCol,
  CRow,
} from '@coreui/react'
import { withRouter, useHistory, useLocation } from 'react-router-dom'
import Login from '../../pages/login/components/Login';
import ForgotPassword from '../../pages/login/components/ForgotPassword';
import ForgotPasswordOTP from '../../pages/login/components/ForgotPasswordOTP';
import VerifyOTP from '../../pages/login/components/VerifyOTP';
import ResetPassword from '../../pages/login/components/ResetPassword';
import LoginImage from "../../../assets/icons/log_img.png"
import blueOverlay from "../../../assets/icons/blue_overlay.png"
// import Logo from "src/assets/icons/login_logo.png"
const SignInMasterPage = (props) => {
  const location = useLocation();

  //Main Code
  var selectedMenu;
  if (location.state) {
    selectedMenu = "login"
    localStorage.setItem('SelectedMenu', "login");
  } else {
    selectedMenu = localStorage.getItem('SelectedMenu') || "login";
  }


  //For Design
  // var selectedMenu = "reset-password";


  const [menuName, setMenuName] = useState(selectedMenu);
  const handleMenuSet = (menuName) => {
    localStorage.setItem('SelectedMenu', menuName);
    setMenuName(menuName)
  }
  return (
    <div className="signin_sec">
      <div className="overlay_sec">
        <img src={blueOverlay} alt='' />
      </div>
      <div className="container-fluid">
        <div className="row logo_sec1" style={{marginTop:'90px'}}>
          <div className="col-sm-12">
            <div className="logo">
              {/* <img src={Logo} alt='' /> */}
            </div>
          </div>
        </div>
      </div>
      <div className="container">

        <CRow>
          <div className="col-sm-5">
            <div className="login_left_sec">
              <h2><span>Welcome to</span> <br />ShipGudds Admin<br />Panel</h2>
              <div className="logo_mob_small"><img src={LoginImage} alt='' /></div>
            </div>
          </div>
          <div className="col-md-2"></div>
          <div className="col-md-5">
            {menuName === "verify-otp" ?
              <VerifyOTP onChangeMenu={handleMenuSet} />
              :
              (menuName === "forgot-password" ?
                <ForgotPassword onChangeMenu={handleMenuSet} />
                :
                (menuName === "forgot-password-otp" ?
                  <ForgotPasswordOTP onChangeMenu={handleMenuSet} />
                  : 
                  (menuName === "reset-password" ?
                    <ResetPassword onChangeMenu={handleMenuSet} />
                    : (menuName === "login" ?
                      <Login onChangeMenu={handleMenuSet} />
                      : "")
                  )
                ))
            }
          </div>
          <CCol xs="12" md="2">
          </CCol>
        </CRow>
      </div>

    </div>
  );
}
export default withRouter(SignInMasterPage);






