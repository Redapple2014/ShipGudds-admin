/**
 * @file_purpose  page for logged in user name,designation ,change password and logout
 * @author Sarmistha Mondal
 * @Date_Created
 * @Date_Modified 21-03-2023
 */
import React, { useState } from "react";
import {
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CImg,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
  CCol,
  CFormGroup,
  CLabel,
  CButton,
  CInput,
  CForm,
} from "@coreui/react";
import { ToastContainer, toast } from "react-toastify";
import { useHistory } from "react-router-dom";
import defaultImg from "../assets/icons/userlogo.png";
import Service from "../apis/Service";
import Constants from "../Utility/Constants";
import Modal from "react-bootstrap/Modal";
import RouteURL from "../apis/RouteURL";

const TheHeaderDropdown = () => {
  const history = useHistory();
  const [state, setState] = useState({
    confirm_password: "",
    new_password: "",
    profileImage: "",
  });
  const [changePasswordModal, setChangePasswordModal] = useState(false);
  const [newPasswordErrors, setNewPasswordErrors] = useState();
  const [confirmPasswordErrors, setConfirmPasswordErrors] = useState();
  const [logoutModal, setLogoutModal] = useState(false);
  const [submitDisable, setSubmitDisable] = useState(false);
  //For Change password modal
  const [showModal, setShowModal] = useState(false);
  const handleClose = () => setShowModal(false);
  const handleShowChangePassword = () => setShowModal(true);
  //For Change password modal

  const [oldPasswordErrors, setOldPasswordErrors] = useState();
  const profileImage = localStorage.getItem("hrms_Profile_image");
  const username = localStorage.getItem("hrms_username");
  const designation = localStorage.getItem("hrms_designation");

  const openLogoutModal = () => {
    setLogoutModal(!logoutModal);
  };

  const logOut = (e) => {
    localStorage.removeItem("shipGudds_admin_auth_token");
    // localStorage.removeItem("hrms_tab");
    localStorage.removeItem("Profile_image");
    localStorage.removeItem("date_format");
    localStorage.clear();
    setLogoutModal(!logoutModal);
    history.push("/");
    window.location.reload();
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setState((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  /* Validate all fields */
  const handleValidation = (e) => {
    let confirmPasswordErrors, newPasswordErrors, oldPasswordErrors;
    let formIsValid = true;

    //Old Password
    if (!state.old_password) {
      formIsValid = false;
      oldPasswordErrors = "Old password can not be empty";
      setOldPasswordErrors(oldPasswordErrors);
    } else {
      setOldPasswordErrors("");
    }

    //New Password
    if (!state.new_password) {
      formIsValid = false;
      newPasswordErrors = "New password can not be empty";
      setNewPasswordErrors(newPasswordErrors);
    } else if (state.new_password !== state.confirm_password) {
      formIsValid = false;
      newPasswordErrors = "Password and Confirm Password does not match.";
      setNewPasswordErrors(newPasswordErrors);
    } else {
      setNewPasswordErrors("");
    }

    //Confirm Password
    if (!state.confirm_password) {
      formIsValid = false;
      confirmPasswordErrors = "Confirm password can not be empty";
      setConfirmPasswordErrors(confirmPasswordErrors);
    } else if (state.new_password !== state.confirm_password) {
      formIsValid = false;
      newPasswordErrors = "Password and Confirm Password does not match.";
      setConfirmPasswordErrors(newPasswordErrors);
    } else {
      setConfirmPasswordErrors("");
    }

    return formIsValid;
  };

  /* Validation Checking */
  const ValidateForm = (e) => {
    e.preventDefault();
    if (handleValidation()) {
      ChangePasswordClick();
    } else {
      toast.error("Please fill all * fields !", {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    }
  };

  /**
   * @author Sarmistha Mondal
   * @Date_Created
   * @Date_Modified 21/03/2023
   * @function sync
   * @functionName ChangePasswordClick
   * @functionPurpose this function change user password.
   *
   * @functionParam {payload object:old_password,new_password}
   *
   * @functionSuccess Success status and message.
   *
   * @functionError {Boolean} error is there.
   * @functionError {String} message  Description message.
   */
  const ChangePasswordClick = (e) => {
    let params = JSON.stringify({
      old_password: state.old_password,
      new_password: state.new_password,
    });
    Service.apiPostCallRequest(RouteURL.changePassword, params)
      .then((res) => {
        if (res.status === Constants.API_RESPONSE_STATUS_SUCCESS) {
          const data = res.data;
          toast.success(res.message, {
            position: toast.POSITION.BOTTOM_RIGHT,
          });
          setShowModal(false);
        } else {
          toast.error(res.message, {
            position: toast.POSITION.BOTTOM_RIGHT,
          });
          setSubmitDisable(false);
        }
      })
      .catch((error) => {
        console.log(error);
        // if (error.response.status === 401) {
        //   localStorage.clear();
        //   history.push("/login");
        //   window.location.reload();
        //   setSubmitDisable(false);
        // }
      });
    // bntikvkohbslqffnqgfidddupdrmdwujkwjxkihzgobqqqocjcdo
  };

  return (
    <>
      {/* <ToastContainer /> */}
      <CDropdown inNav className="c-header-nav-items mx-2" direction="down">
        <CDropdownToggle className="c-header-nav-link" caret={false}>
          <span style={{ paddingRight: "8px" }}>
            <h6 style={{ margin: "0", fontSize: "20", color: "#222" }}>
              <strong>{username}</strong>
            </h6>
            <p
              style={{
                margin: "0",
                fontSize: "12",
                textAlign: "center",
                fontWeight: 300,
              }}
            >
              {designation}
            </p>
          </span>
          <div className="user_login">
            <p className="m-0">
              Welcome <span>{localStorage.getItem("username")}</span>
            </p>
            {/* <CImg src={profileImage ? profileImage : defaultImg} alt="image" className="c-avatar-img" style={{ width: 40 }} /> */}
          </div>

          {/* <CButton variant="primary" onClick={handleShowChangePassword}>
            Modal
          </CButton> */}
          {/* <div className="c-avatar">
            <CImg
              //src={'avatars/6.jpg'}
              src={defaultImg}
              className="c-avatar-img"
              alt="admin@bootstrapmaster.com"
            />
          </div> */}
        </CDropdownToggle>
        <CDropdownMenu className="pt-0" placement="bottom-end">
          <CDropdownItem header tag="div" className="text-center acct_sec">
            <strong>Account</strong>
          </CDropdownItem>
          {/* <CDropdownItem onClick={() => setChangePasswordModal(!changePasswordModal)}> */}
          <CDropdownItem onClick={handleShowChangePassword}>
            <i
              className="fa-solid fa-lock"
              style={{ paddingLeft: 2, paddingRight: 13 }}
            ></i>
            Change Password
          </CDropdownItem>

          {/* <CDropdownItem divider /> */}
          <CDropdownItem
            style={{ textDecoration: "none" }}
            onClick={(e) => openLogoutModal(e)}
          >
            <i
              className="fa-solid fa-arrow-right-from-bracket"
              style={{ paddingLeft: 2, paddingRight: 13 }}
            ></i>
            Log Out
          </CDropdownItem>
        </CDropdownMenu>
      </CDropdown>
      <Modal
        show={showModal}
        backdrop="static"
        onHide={() => setShowModal(!showModal)}
        keyboard={false}
      >
        <div className="apply_comp_sec chng_pass_inn">
          <Modal.Header closeButton>
            <h6 className="hed_txt">Change Password</h6>
          </Modal.Header>

          <CForm action="" method="post" className="form-horizontal">
            <div className="comp_off_inn">
              <div className="row">
                <div className="col-md-4">
                  <CLabel htmlFor="new_password">
                    Old Password <span style={{ color: "red" }}>*</span>
                  </CLabel>
                </div>
                <div className="col-md-8">
                  <CInput
                    type="password"
                    id="old_password"
                    name="old_password"
                    placeholder="enter your old password here"
                    value={state.old_password}
                    onChange={handleChange}
                  />
                  <span style={{ color: "red" }}>{oldPasswordErrors}</span>
                </div>
              </div>
            </div>
            <div className="comp_off_inn">
              <div className="row">
                <div className="col-md-4">
                  <CLabel htmlFor="new_password">
                    New Password <span style={{ color: "red" }}>*</span>
                  </CLabel>
                </div>
                <div className="col-md-8">
                  <CInput
                    type="password"
                    id="new_password"
                    name="new_password"
                    placeholder="enter your new password here"
                    value={state.new_password}
                    onChange={handleChange}
                  />
                  <span style={{ color: "red" }}>{newPasswordErrors}</span>
                </div>
              </div>
            </div>
            <div className="comp_off_inn">
              <div className="row">
                <div className="col-md-4">
                  <CLabel htmlFor="confirm_password">
                    Confirm Password <span style={{ color: "red" }}>*</span>
                  </CLabel>
                </div>
                <div className="col-md-8">
                  <CInput
                    type="password"
                    id="confirm_password"
                    name="confirm_password"
                    placeholder="enter your confirm password here"
                    value={state.confirm_password}
                    onChange={handleChange}
                  />
                  <span style={{ color: "red" }}>{confirmPasswordErrors}</span>
                </div>
              </div>
            </div>

            <div className="comp_off_inn">
              <div className="row">
                <div className="atten_sec1 col-12">
                  <CButton
                    className="save"
                    style={{ marginRight: 10 }}
                    onClick={(e) => ValidateForm(e)}
                  >
                    Submit
                  </CButton>
                  <CButton className="cancel" onClick={handleClose}>
                    Close
                  </CButton>
                </div>
              </div>
            </div>
          </CForm>
        </div>
      </Modal>

      {/* logout modal */}

      <CModal
        centered
        show={logoutModal}
        onClose={() => setLogoutModal(!logoutModal)}
      >
        <CModalBody className="form_body">
          <CLabel>Are you sure you want to logout?</CLabel>
        </CModalBody>

        <CModalFooter className="footer_design">
          <CButton type="submit" color="primary" onClick={(e) => logOut(e)}>
            Yes
          </CButton>
          <CButton
            color="secondary"
            onClick={() => setLogoutModal(!logoutModal)}
          >
            No
          </CButton>
        </CModalFooter>
      </CModal>
    </>
  );
};

export default TheHeaderDropdown;
