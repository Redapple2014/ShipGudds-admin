/**
 * @file_purpose  page for showing login form of employee panel
 * @author Sarmistha Mondal
 * @Date_Created 
 * @Date_Modified 23/01/2024
 */
import React, { useState, useEffect } from 'react'
import { withRouter, useHistory, useLocation, } from 'react-router-dom'
import {
    CButton,
    CCard,
    CCardBody,
    CCardGroup,
    CCol,
    CContainer,
    CForm,
    CInput,
    CRow,
    CLabel,
} from '@coreui/react'
import { ToastContainer, toast } from 'react-toastify';
import Constants from '../../../../Utility/Constants';
import Service from '../../../../apis/Service';
import RouteURL from '../../../../apis/RouteURL';


const ForgotPassword = (props) => {
    const history = useHistory();
    const location = useLocation();
    //Define states
    const [menuName, setMenuName] = useState('forgot-password');
    const [state, setState] = useState({
        username: "",
        password: ""
    })
    const [emailErrors, setEmailErrors] = useState();
    const [forgotPasswordModal, setForgotPasswordModal] = useState(false)

    const handleChange = (e) => {
        const { id, value } = e.target
        setState(prevState => ({
            ...prevState,
            [id]: value
        }))
    }

    useEffect(() => {
        if (location.state) {
            toast.success(location.state.forgotPasswordMessage, {
                position: toast.POSITION.BOTTOM_RIGHT
            });
        }

    }, []);


    const handleMenuSet = (e, menuName) => {
        setMenuName(menuName)
        props.onChangeMenu(menuName);
    }



    /* Validate  fields */
    const EmailModalValidation = (e) => {
        let emailErrors;
        let formIsValid = true;
        //Probation Date
        if (!state.email) {
            formIsValid = false;
            emailErrors = "Email can not be empty";
            setEmailErrors(emailErrors);
        } else {
            formIsValid = true;
            setEmailErrors('');
        }
        return formIsValid;
    }


    /* Validation Checking */
    const ValidateEmailModal = (e) => {
        e.preventDefault();
        if (EmailModalValidation()) {
            ForgotEmailSubmitClick();
        }
    }


    /**
      * @author Sarmistha Mondal
      * @Date_Created 
      * @Date_Modified 23/01/2024
      * @function sync
      * @functionName ForgotEmailSubmitClick
      * @functionPurpose this function send email id for forgot password.
      *
      * @functionParam {payload object:email}
      * 
      * @functionSuccess Success status and message.
      *
      * @functionError {Boolean} error is there.
      * @functionError {String} message  Description message.
      */
    const ForgotEmailSubmitClick = (e) => {
        let params = JSON.stringify({
            username: state.email,
        });

        Service.apiPostCallRequest(RouteURL.generateForgotpasswordOTP, params).then((response) => {
            // console.log(response);
            if (response.err === Constants.API_RESPONSE_STATUS_SUCCESS) {
             
                localStorage.setItem("email", state.email);
                setMenuName('forgot-password-otp')
                props.onChangeMenu('forgot-password-otp');
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

        // let params = JSON.stringify({
        //     email: state.email,
        // })

        // Service.apiPostCallRequest(RouteURL.generateOtpForgetPassword, params)
        //     .then((res) => {

        //         if (res.status === Constants.API_RESPONSE_STATUS_SUCCESS) {
        //             const data = res.data;
        //             setForgotPasswordModal(!forgotPasswordModal)
        //             setMenuName('forgot-password-otp')
        //             props.onChangeMenu('forgot-password-otp');
        //             localStorage.setItem("user_email", state.email);
        //             toast.success(res.message, {
        //                 position: toast.POSITION.BOTTOM_RIGHT
        //             });
        //         } else {
        //             toast.error(res.message, {
        //                 position: toast.POSITION.BOTTOM_RIGHT,
        //             });

        //         }
        //     })
        //     .catch((error) => {
        //         if (error.response.status === 401) {
        //             localStorage.clear();
        //             history.push("/login");
        //             window.location.reload();

        //         }
        //     });

    }


    return (
        <div className="login_sec">
            <ToastContainer />
            <div>
                <div>
                    <i className='fa fa-long-arrow-left' onClick={e => handleMenuSet(e, "login")} style={{ fontSize: 16, cursor: 'pointer' }}></i>
                </div>
                <CForm className="commentForm" onSubmit={ValidateEmailModal}>
                    <h6>Forgot Password?</h6>
                    <p className="for_txt">Please enter your email address to receive<br /> a verification code</p>
                    <div className="otp_btm">
                        <div class="login_inner">
                            <CLabel style={{ textAlign: "left", width: '100%' }} htmlFor="text-input">Email Address</CLabel>
                            <CInput type="" id="email" name="email" placeholder="Enter your email iD" value={state.email} onChange={handleChange} />
                            <span style={{ color: "red" }}>{emailErrors}</span>
                        </div>


                        <div className="row mat-5">
                            <div className="col-md-4">
                                <div className="comp_off_inn">
                                    <div className="atten_sec1">
                                        <CButton className="cancel" block onClick={e => handleMenuSet(e, "login")}>
                                            Cancel
                                        </CButton>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-8">
                                <div className="comp_off_inn">
                                    <div className="atten_sec1">
                                        <CButton type="submit" block className="save">Reset Password</CButton>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>



                </CForm>
            </div>
        </div>
    )
}

export default withRouter(ForgotPassword)
