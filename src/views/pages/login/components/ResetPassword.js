/**
 * @file_purpose  page for taking new password
 * @author Sarmistha Mondal
 * @Date_Created 
 * @Date_Modified 28-02-2023
 */
import React, { useState } from 'react'
import {
    CButton,
    CCol,
    CRow,
    CInput,
    CForm,
    CInputGroup,
    CInputGroupPrepend,
    CInputGroupText,
    CContainer,
    CCard,
    CCardBody,
    CLabel,
    CInputGroupAppend
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { useHistory, useLocation } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import Constants from '../../../../Utility/Constants';
import Service from '../../../../apis/Service';
import RouteURL from '../../../../apis/RouteURL';
import HiddenEye from "../../../../assets/icons/hidden_eye.png";
import Eye from "../../../../assets/icons/eye.png";

const ResetPassword = (props) => {
    const history = useHistory();
    const location = useLocation();
    // let userId = location.state.userId;
    // let token = location.state.token;
    let userId = localStorage.getItem("userId");
    let token = localStorage.getItem("token");


    //Define states
    const [state, setState] = useState({
        confirm_password: '',
        new_password: '',
    })
    const [newPasswordErrors, setNewPasswordErrors] = useState();
    const [confirmPasswordErrors, setConfirmPasswordErrors] = useState();

    const [menuName, setMenuName] = useState('forgot-password-otp');
    const [newPasswordShown, setNewPasswordShown] = useState(false);
    const [confirmPasswordShown, setConfirmPasswordShown] = useState(false);
    const toggleNewPasswordVisibility = () => {
        setNewPasswordShown(newPasswordShown ? false : true);
    };
    const toggleConfirmPasswordVisibility = () => {
        setConfirmPasswordShown(confirmPasswordShown ? false : true);
    };

    /* Validate all fields */
    const handleValidation = (e) => {
        let confirmPasswordErrors, newPasswordErrors;
        let formIsValid1 = true, formIsValid2 = true;


        //New Password
        if (!state.new_password) {
            formIsValid1 = false;
            newPasswordErrors = "New password can not be empty";
            setNewPasswordErrors(newPasswordErrors);
        } else if (!/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?@$^&*-])(?!.*[%]).{8,}/.test(state.new_password)) {
            console.log(state.new_password)
            formIsValid1 = false;
            newPasswordErrors = "Password should be Minimum length 8,At least 1 upper case,At least 1 lower case,At least 1 number and 1 special character and it does not allow %";
            setNewPasswordErrors(newPasswordErrors);
        } else if (state.new_password !== state.confirm_password) {
            formIsValid1 = false;
            newPasswordErrors = "Password and Confirm Password does not match.";
            setNewPasswordErrors(newPasswordErrors);
        } else {
            formIsValid1 = true;
            setNewPasswordErrors('');
        }

        //Confirm Password
        if (!state.confirm_password) {
            formIsValid2 = false;
            confirmPasswordErrors = "Confirm password can not be empty";
            setConfirmPasswordErrors(confirmPasswordErrors);
        } else if (state.new_password !== state.confirm_password) {
            formIsValid2 = false;
            newPasswordErrors = "Password and Confirm Password does not match.";
            setConfirmPasswordErrors(newPasswordErrors);
        } else {
            formIsValid2 = true;
            setConfirmPasswordErrors('');
        }

        let finalResultValidation;

        if ((formIsValid1 == true) && (formIsValid2 == true)) {
            finalResultValidation = true;
        }
        else {
            finalResultValidation = false;
        }

        return finalResultValidation;
    }


    const handleChange = (e) => {
        const { id, value } = e.target
        setState(prevState => ({
            ...prevState,
            [id]: value
        }))
    }



    /* Validation Checking */
    const ValidateForm = (e) => {
        e.preventDefault();
        if (handleValidation()) {
            ResetPasswordClick();
        }
        else {
            toast.error("Please fill all the fields properly!", {
                position: toast.POSITION.BOTTOM_RIGHT
            });
        }
    }


    /**
      * @author Sarmistha Mondal
      * @Date_Created 
      * @Date_Modified 28/02/2023
      * @function sync
      * @functionName ResetPasswordClick
      * @functionPurpose this function submit new password and reset password.
      *
      * @functionParam {payload object:username,password,}
      * 
      * @functionSuccess Success status and message.
      *
      * @functionError {Boolean} error is there.
      * @functionError {String} message  Description message.
      */
    const ResetPasswordClick = (e) => {
      
        let params = JSON.stringify({
            username: localStorage.getItem("email"),
            password: state.new_password
        });
        Service.apiPostCallRequest(RouteURL.resetPassword, params).then((response) => {
            // console.log(response);
            if (response.err === Constants.API_RESPONSE_STATUS_SUCCESS) {
                setMenuName('login')
                props.onChangeMenu('login');
              
                toast.success(response.message, {
                    position: toast.POSITION.BOTTOM_RIGHT,
                });

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

    return (
        <>

            <div className="login_sec">
                <ToastContainer />
                <div>
                    <CForm className="commentForm">
                        <h6>Set New Password</h6>

                        <div class="login_inner">
                            <CLabel htmlFor="text-input">Enter New Password</CLabel>
                            <CInputGroup className="mb-4">
                                <CInput type={newPasswordShown ? "text" : "password"}
                                    id="new_password" name="new_password" placeholder="Enter your new password here" value={state.new_password} onChange={handleChange} />
                                <img
                                    className="hidden_eye"
                                    alt="eye-icon"
                                    onClick={toggleNewPasswordVisibility}
                                    src={newPasswordShown ? Eye : HiddenEye}
                                    style={{ cursor: "pointer" }}
                                ></img>
                              
                              
                            </CInputGroup>
                            <span style={{ color: "red" }}>{newPasswordErrors}</span>
                        </div>

                        <div class="login_inner">
                            <CLabel htmlFor="text-input">Confirm Password</CLabel>
                            <CInputGroup className="mb-4">
                                <CInput type={confirmPasswordShown ? "text" : "password"}
                                    id="confirm_password" name='confirm_password' placeholder="Enter your confirm password here" value={state.confirm_password} onChange={handleChange} />
                                <img
                                    className="hidden_eye"
                                    alt="eye-icon"
                                    onClick={toggleConfirmPasswordVisibility}
                                    src={confirmPasswordShown ? Eye : HiddenEye}
                                    style={{ cursor: "pointer" }}
                                ></img>
                              
                              
                            </CInputGroup>
                            <span style={{ color: "red" }}>{confirmPasswordErrors}</span>
                        </div>

                        <div className="otp_btm">
                            <div className="comp_off_inn">
                                <div className="atten_sec1">
                                    <CButton className="save" block onClick={ValidateForm} >Continue To Login</CButton>
                                </div>
                            </div>
                        </div>

                    </CForm>
                </div>

            </div>
        </>
    )
}

export default ResetPassword
