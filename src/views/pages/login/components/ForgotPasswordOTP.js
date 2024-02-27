/**
 * @file_purpose  page for showing verify otp form of admin panel
 * @author Sarmistha Mondal
 * @Date_Created 
 * @Date_Modified 23/01/2024
 */
import React, { useState, useEffect } from 'react'
import { withRouter, useHistory, useLocation } from 'react-router-dom'
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
import Constants from '../../../../Utility/Constants';
import Service from '../../../../apis/Service';
import RouteURL from '../../../../apis/RouteURL';

const ForgotPasswordOTP = (props) => {
  const history = useHistory();
  const location = useLocation();
  // let user_email = location.state.email;
  const user_email = localStorage.getItem("user_email");

  //Define states
  const [menuName, setMenuName] = useState('login');
  const [minutes, setMinutes] = useState(4);
  const [seconds, setSeconds] = useState(59);
  const [state, setState] = useState({
    otp: '',
    numInputs: 4,
    separator: '-',
    isDisabled: false,
    hasErrored: false,
    isInputNum: false,
    isInputSecure: false,
    minLength: 0,
    placeholder: '',
  })

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

  const handleMenuSet = (e, menuName) => {
    setMenuName(menuName)
    props.onChangeMenu(menuName);
  }

  const handleOtpChange = (otp) => {
    setState({ otp: otp });
  };

  const clearOtp = (e) => {
    setState({ otp: '' });
  };



  /**
    * @author Sarmistha Mondal
    * @Date_Created 
    * @Date_Modified 23/01/2024
    * @function sync
    * @functionName OTPSubmitClick
    * @functionPurpose this function submit otp data and verify otp.
    *
    * @functionParam {payload object:email,otp}
    * 
    * @functionSuccess Success status and message.
    *
    * @functionError {Boolean} error error is there.
    * @functionError {String} message  Description message.
    */
  const OTPSubmitClick = (e) => {
    e.preventDefault();
    let params = JSON.stringify({
      username: localStorage.getItem("email"),
      otp: state.otp
    })
    Service.apiPostCallRequest(RouteURL.validateForgotpasswordOTP, params).then(
      (res) => {
        // console.log(response);
        if (res.err === Constants.API_RESPONSE_STATUS_SUCCESS) {
          // console.log(res);
          setMenuName('reset-password')
          props.onChangeMenu('reset-password');
         
          toast.success(res.message, {
            position: toast.POSITION.BOTTOM_RIGHT,
          });

        } else {
        
          toast.error(res.message, {
            position: toast.POSITION.BOTTOM_RIGHT,
          });
        }
      }).catch((error) => {
        // console.log(error);
        if (error.response.status === 401) {

          localStorage.clear();
          history.push("/login");
          window.location.reload();
        }
      });




    
  }


  /**
  * @author Sarmistha Mondal
  * @Date_Created 
  * @Date_Modified 03/07/2023
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
    // let params = JSON.stringify({
    //   email: user_email,
    // })
    let params = JSON.stringify({
      username: localStorage.getItem("email"),
    });

    Service.apiPostCallRequest(RouteURL.generateForgotpasswordOTP, params).then((response) => {
      // console.log(response);
      if (response.err === Constants.API_RESPONSE_STATUS_SUCCESS) {

        localStorage.setItem("email", localStorage.getItem("email"));
        
        toast.success(response.message, {
          position: toast.POSITION.BOTTOM_RIGHT,
        },);

      } else {
        toast.error(response.message, {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
      }
    }).catch((error) => {
      // console.log(error);
      if (error.response.status === 401) {
        localStorage.clear();
        history.push("/login");
        window.location.reload();
      }
    });
  
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
                numInputs="4"
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
                  {seconds > 0 || minutes > 0 ? (
                    <p>
                      Time Remaining: <span style={{ color: '#5473FF' }}>{minutes < 10 ? `0${minutes}` : minutes}:
                        {seconds < 10 ? `0${seconds}` : seconds}</span>
                    </p>
                  ) : (
                    GoPreviousPage()

                  )}
                </div>
                <p>
                  Not received the code? <span onClick={ResendOTPClick} style={{ cursor: 'pointer', color: '#5473FF' }}> Resend</span>
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
                        <CButton className="save" block type="submit" disabled={state.otp.length < 4}>Verify OTP</CButton>
                      </div>
                    </div>
                  </div>
                </div>

                {/* <CButton disabled={state.isDisabled || state.otp.trim() === ''}
                onClick={clearOtp} className="px-4 clear_back" style={{ marginTop: 10, marginRight: 10 }}>Clear</CButton>
              <CButton type="submit" disabled={state.otp.length < 6} className="px-4 btn_back" style={{ marginTop: 10 }}>Verify OTP</CButton> */}
              </div>

            </div>
          </CRow>
        </CForm>

      </div >
    </div >
  )
}
export default withRouter(ForgotPasswordOTP)
