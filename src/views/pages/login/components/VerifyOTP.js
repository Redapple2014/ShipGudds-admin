/**
 * @file_purpose  page for showing verify otp form of admin panel
 * @author Sarmistha Mondal
 * @Date_Created 
 * @Date_Modified 23/01/2024
 */
import React, { useState, useEffect } from 'react'
import { withRouter, useHistory } from 'react-router-dom'
import OtpInput from 'react-otp-input';
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CInputGroup,
  CRow
} from '@coreui/react'
import { ToastContainer, toast } from 'react-toastify';
import moment from 'moment';
import Constants from '../../../../Utility/Constants';
import Helpers from '../../../../Utility/Helpers';
import Service from '../../../../apis/Service';
const VerifyOTP = (props) => {
  const history = useHistory();
  const user_email = localStorage.getItem("user_email");
  const expiresTimestamp = localStorage.getItem("expiresTimestamp");
  const [menuName, setMenuName] = useState('verify-otp');
  //Define states
  const [minutes, setMinutes] = useState(4);
  const [seconds, setSeconds] = useState(59);
  const [state, setState] = useState({
    otp: '',
    numInputs: 6,
    separator: '-',
    isDisabled: false,
    hasErrored: false,
    isInputNum: false,
    isInputSecure: false,
    minLength: 0,
    placeholder: '',
  })

  let timeDiff = moment().diff(expiresTimestamp, "seconds");
  let convertedTime = Helpers.secondsToHms(Math.abs(timeDiff))
  const myArray = convertedTime.split(":");
  let calculatedMinutes = myArray[0];
  let calculatedSeconds = myArray[1];

  useEffect(() => {
    const interval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      }

      if (seconds === 0) {
        if (minutes === 0) {
          clearInterval(interval);
        } else {
          setSeconds(59);
          setMinutes(minutes - 1);
        }
      }
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [seconds]);


  const handleOtpChange = (otp) => {
    setState({ otp: otp });
  };

  const clearOtp = (e) => {
    setState({ otp: '' });
  };

  const handleMenuSet = (e, menuName) => {
    setMenuName(menuName)
    props.onChangeMenu(menuName);
  }

  /**
    * @author Sarmistha Mondal
    * @Date_Created 
    * @Date_Modified 23/01/2024
    * @function sync
    * @functionName OTPSubmitClick
    * @functionPurpose this function submit otp data and verify otp.
    *
    * @functionParam {payload object:username,otp}
    * 
    * @functionSuccess Success status and message.
    *
    * @functionError {Boolean} error error is there.
    * @functionError {String} message  Description message.
    */
  const OTPSubmitClick = (e) => {
    e.preventDefault();
    let params = JSON.stringify({
      otp: state.otp,
      username: user_email
    })
    // Service.verifyOTP(params).then(res => {
    //   if (res.status === Constants.API_RESPONSE_STATUS_SUCCESS) {

    //     if (res.data["is_password_change_required"] == 1) {
    //       history.push({
    //         pathname: '/change-password',
    //         state: { token: res.data["token"] }
    //       })
    //     } else {
    //       localStorage.removeItem("user_email");
    //       localStorage.setItem("shipGudds_admin_auth_token", res.data["token"]);
    //       localStorage.setItem("hrms_Profile_image", res.data["profile_image"]);
    //       localStorage.setItem("hrms_username", res.data["name"]);
    //       localStorage.setItem("hrms_designation", res.data["designation"]);
    //       localStorage.setItem("date_format", res.data["date_settings"]);
    //       localStorage.setItem("items_per_page", 10)
    //       localStorage.setItem("hrms_admin_menu_access", JSON.stringify(res.data["menu_access"]));
    //       localStorage.setItem("hrms_menu_tab_access", JSON.stringify(res.data["tab_access"]));
    //       history.push("/dashboard");

    //       toast.success(res.message, {
    //         position: toast.POSITION.BOTTOM_RIGHT
    //       });
    //       window.location.reload();
    //     }

    //   }
    //   else {
    //     toast.error(res.message, {
    //       position: toast.POSITION.BOTTOM_RIGHT
    //     });
    //   }
    // }).catch(error => {
    //   console.log(error)
    // })
  }


  /**
   * @author Sarmistha Mondal
   * @Date_Created 
   * @Date_Modified 23/01/2024
   * @function sync
   * @functionName ResendOTPClick
   * @functionPurpose this function calling resend otp function.
   *
   * @functionParam {payload object:email,panel_status}
   * 
   * @functionSuccess Success status and message.
   *
   * @functionError {Boolean} error error is there.
   * @functionError {String} message  Description message.
   */
  const ResendOTPClick = (e) => {
    setState({ otp: '' });
    let params = JSON.stringify({
      email: user_email,
      panel_status: 1
    })
    Service.resendOTP(params).then(res => {
      if (res.status === Constants.API_RESPONSE_STATUS_SUCCESS) {
        var future = moment().add(5, 'minutes');
        localStorage.setItem('expiresTimestamp', future.format("YYYY-MM-DD HH:mm:ss"));
        toast.success(res.message, {
          position: toast.POSITION.BOTTOM_RIGHT
        });
      }
      else {
        toast.error(res.message, {
          position: toast.POSITION.BOTTOM_RIGHT
        });
      }
    }).catch(error => {
      console.log(error);
    })
  }


  const GoBackClick = (e) => {
    e.preventDefault();
    history.goBack()
  }

  const GoPreviousPage = (e) => {
    history.push({
      pathname: '/login',
      state: { message: "OTP is expired, please try again", redirectUrl: "login" }
    })
    window.location.reload();
  }


  return (

    <div className="login_sec">
      <ToastContainer />



      <div>
        <i className='fa fa-long-arrow-left' onClick={e => handleMenuSet(e, "login")} style={{ fontSize: 16, cursor: 'pointer' }}></i>
      </div>
      <div>
        <CForm className="commentForm" onSubmit={OTPSubmitClick}>
          <h6>Verify OTP</h6>
          <p>An OTP has been sent to your entered email {user_email}</p>

          <div className="verify_main">
            <CInputGroup className="verify_box">
              <OtpInput
                className="verify_box_inner"
                inputStyle="inputStyle"
                numInputs="6"
                isDisabled={state.isDisabled}
                hasErrored={state.hasErrored}
                errorStyle="error"
                onChange={handleOtpChange}
                // separator={<span>{state.separator}</span>}
                isInputNum={state.isInputNum}
                isInputSecure={state.isInputSecure}
                shouldAutoFocus
                value={state.otp}
                placeholder={state.placeholder}
              />
            </CInputGroup>
          </div>

          <CRow>
            <div className="col-md-12">
              <div className="otp_btm">
                <p>Your OTP will be valid for 5 Minute</p>
                <div className="countdown-text">
                  {/* {seconds > 0 || minutes > 0 ? (
                    <p>
                      Time Remaining: <span > {minutes < 10 ? `0${minutes}` : minutes}:
                        {seconds < 10 ? `0${seconds}` : seconds}
                      </span>
                    </p>
                  ) : (
                    GoPreviousPage()


                  )} */}

                  {calculatedSeconds > 0 || calculatedMinutes > 0 ? (
                    <p>
                      Time Remaining: <span > {calculatedMinutes < 10 ? `0${calculatedMinutes}` : calculatedMinutes}:
                        {calculatedSeconds < 10 && calculatedSeconds != "00" ? `0${calculatedSeconds}` : calculatedSeconds}
                      </span>
                    </p>
                  ) : (
                    GoPreviousPage()


                  )}
                </div>
                <p>
                  Not received the code? <span onClick={ResendOTPClick} style={{ cursor: 'pointer', color: '#5473FF' }} >Resend</span>
                </p>
                <div className="row mat-5">
                  <div className="col-md-4">
                    <div className="comp_off_inn">
                      <div className="atten_sec1">
                        <CButton disabled={state.isDisabled || state.otp.trim() === ''}
                          onClick={clearOtp} block className="cancel" >Clear</CButton>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-8">
                    <div className="comp_off_inn">
                      <div className="atten_sec1">
                        <CButton className="save" block type="submit" disabled={state.otp.length < 6}>Verify OTP</CButton>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </CRow>
        </CForm>

      </div>
    </div>

  )
}

export default withRouter(VerifyOTP)
