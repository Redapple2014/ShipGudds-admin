/**
 * @file_purpose  page for showing login form of employee panel
 * @author Sarmistha Mondal
 * @Date_Created
 * @Date_Modified 22/01/2024
 */
import React, { useState, useEffect } from "react";
import { withRouter, useHistory, useLocation } from "react-router-dom";
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CInput,
  CInputGroup,
  CInputGroupText,
  CRow,
  CLabel,
  CInputGroupAppend,
} from "@coreui/react";
import { ToastContainer, toast } from "react-toastify";
import Constants from "../../../../Utility/Constants";
import moment from "moment";
import Service from "../../../../apis/Service";
import HiddenEye from "../../../../assets/icons/hidden_eye.png";
import Eye from "../../../../assets/icons/eye.png";
import RouteURL from "../../../../apis/RouteURL";

const Login = (props) => {
  const history = useHistory();
  const location = useLocation();
  //Define states
  const [state, setState] = useState({
    username: "",
    password: "",
  });
  const [menuName, setMenuName] = useState("login");
  const [userNameErrors, setUserNameErrors] = useState();
  const [passwordErrors, setPasswordErrors] = useState();
  const [passwordShown, setPasswordShown] = useState(false);
  const [submitDisable, setSubmitDisable] = useState(false);
  const togglePasswordVisibility = () => {
    setPasswordShown(passwordShown ? false : true);
  };
  const handleChange = (e) => {
    const { id, value } = e.target;
    setState((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const handleMenuSet = (e, menuName) => {
    setMenuName(menuName);
    props.onChangeMenu(menuName);
  };

  useEffect(() => {
    if (location.state) {
      toast.success(location.state.forgotPasswordMessage, {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    }
  }, []);

  /* Validation Checking */
  const ValidateForm = (e) => {
    // console.log('ok');
    e.preventDefault();
    if (handleValidation()) {
      LoginSubmitClick();
    } else {
      toast.error("Please fill all the fields !", {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    }
  };

  /* Validate all fields */
  const handleValidation = (e) => {
    let usernameErrors, passwordErrors;
    let formIsValid = true;

    //Name
    if (!state.username) {
      formIsValid = false;
      usernameErrors = "Username cannot be empty";
      setUserNameErrors(usernameErrors);
    } else {
      setUserNameErrors("");
    }

    //Email

    if (!state.password) {
      formIsValid = false;
      passwordErrors = "Password can not be empty";
      setPasswordErrors(passwordErrors);
    } else {
      setPasswordErrors("");
    }

    return formIsValid;
  };

  /**
   * @author Sarmistha Mondal
   * @Date_Created 16/02/2024
   * @Date_Modified 
   * @function sync
   * @functionName LoginSubmitClick
   * @functionPurpose this function submit login form data.
   *
   * @functionParam {payload object:username,password}
   *
   * @functionSuccess Success status and message.
   *
   * @functionError {Boolean} error error is there.
   * @functionError {String} message  Description message.
   */
  const LoginSubmitClick = (e) => {
    let params = JSON.stringify({
      username: state.username,
      password: state.password, 
    });
    Service.apiPostCallFopLoginRequest(RouteURL.login, params)
      .then((res) => {
        if (res.err === Constants.API_RESPONSE_STATUS_SUCCESS) {
          const data = res.data.userDetails;
          console.log(data);
          localStorage.setItem("shipGudds_admin_auth_token", data.token);
          localStorage.setItem("user_type", data.user_type);
          localStorage.setItem("email", data.email);

          // console.log('ok');
          history.push("/transporter");
        } else {
          toast.error(res.message, {
            position: toast.POSITION.BOTTOM_RIGHT,
          });
          setSubmitDisable(false);
        }
      })
      .catch((error) => {
        if (error.response.status === 401) {
          localStorage.clear();
          history.push("/login");
          window.location.reload();
          setSubmitDisable(false);
        }
      });
  };

  return (
    <div className="login_sec">
      <ToastContainer />

      <div>
        <CForm className="commentForm" onSubmit={ValidateForm}>
          <h6>Login</h6>

          <div class="login_inner">
            <CLabel htmlFor="text-input">Email address</CLabel>
            <CInput
              type="email"
              placeholder="Username"
              id="username"
              autoComplete="username"
              value={state.username}
              onChange={handleChange}
            />
            <span style={{ color: "red" }}>{userNameErrors}</span>
          </div>

          <div class="login_inner">
            <CLabel htmlFor="text-input">Password</CLabel>
            <CInputGroup className="mb-4">
              <CInput
                placeholder="Password"
                id="password"
                autoComplete="current-password"
                value={state.password}
                onChange={handleChange}
                type={passwordShown ? "text" : "password"}
              />
              {/* <i onClick={togglePasswordVisibility} className={passwordShown ? 'fa fa-eye' : 'fa fa-eye-slash'} style={{ cursor: 'pointer' }}></i> */}
              <img
                className="hidden_eye"
                alt="eye-icon"
                onClick={togglePasswordVisibility}
                src={passwordShown ? Eye : HiddenEye}
                style={{ cursor: "pointer" }}
              ></img>
            </CInputGroup>
            <span style={{ color: "red" }}>{passwordErrors}</span>
          </div>
          <CRow>
            <CCol xs="6"></CCol>
            <CCol xs="6" className="text-right">
              <CButton
                color="link"
                className="forgot_pass"
                onClick={(e) => handleMenuSet(e, "forgot-password")}
              >
                Forgot password?
              </CButton>
            </CCol>
          </CRow>

          <button type="submit" className="login_btn">
            Login
          </button>
        </CForm>
      </div>
    </div>
  );
};

export default withRouter(Login);
