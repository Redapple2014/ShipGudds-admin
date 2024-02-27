
import React, { useState, useEffect } from 'react'
import { CRow, CDataTable, CCol, CButton } from '@coreui/react'
import { useHistory, useLocation, useParams, Link } from "react-router-dom";
import Constants from "../../../../Utility/Constants";
import Service from "../../../../apis/Service";
import RouteURL from "../../../../apis/RouteURL";
import { ToastContainer, toast } from "react-toastify";
import moment from "moment";
import Helpers from "../../../../Utility/Helpers";
import defaultImg from "../../../../assets/icons/user_.png";
import Dropdown from "react-bootstrap/Dropdown";
import Modal from "react-bootstrap/Modal";


export default function UserDetailsPage(props) {
    const history = useHistory();
    let { user_id, id } = useParams();
    const accessToken = localStorage.getItem("shipGudds_admin_auth_token");
    const dateFormat = localStorage.getItem("date_format").toUpperCase();
    const [filteredData, setFilteredData] = useState([]);
    const [menuName, setMenuName] = useState("SubscriptionHistory");
    const [activeTab, setActiveTab] = useState(1);
    const [deleteModal, setDeleteModal] = useState(false);
    const [submitDisable, setSubmitDisable] = useState(false);
    const dynamicMenu = JSON.parse(localStorage.getItem("menu_list"));
    let filterMenu = dynamicMenu.filter(e => (e.to.includes("/user")))
    let createPermission = filterMenu[0]?.created;
    let editPermission = filterMenu[0]?.edited;
    let deletePermission = filterMenu[0]?.deleted;
    let viewPermission = filterMenu[0]?.view;
    let _params = JSON.stringify({
            user_id: user_id,
        });
    useEffect(() => {
        if (accessToken === null) {
            history.push("/");
            window.location.reload();
        }
        // if (tabId) {
        //     setActiveTab(tabId);
        // }
        
        loadUsers(_params);
        // loadReadingHistory(params)
    }, []);
    const handleMenuSet = (e, menuName) => {
        setMenuName(menuName);
    };
    /**
      * @author Sarmistha Mondal
      * @Date_Created
      * @Date_Modified 22/01/2024
      * @function async
      * @functionName loadUsers
      * @functionPurpose this function gets the Users list.
      *
      * @functionParam {payload object:}
      *
      * @functionSuccess Success status and message.
      *
      * @functionError {Boolean} error is there.
      * @functionError {String} message  Description message.
      */


    async function loadUsers(params) {
        Service.apiPostCallRequest(RouteURL.getUsers, params)
            .then((res) => {
                if (res.status === Constants.API_RESPONSE_STATUS_SUCCESS) {

                    setFilteredData(res.data[0]);
                } else {
                    toast.error(res.message, {
                        position: toast.POSITION.BOTTOM_RIGHT,
                    });
                }
            })
            .catch((error) => {
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
  * @Date_Created 23/02/2024
  * @Date_Modified
  * @function async
  * @functionName updateStatus
  * @functionPurpose this function gets the status update.
  *
  * @functionParam {payload object:story_id,status}
  *
  * @functionSuccess Success status and message.
  *
  * @functionError {Boolean} error is there.
  * @functionError {String} message  Description message.
  */
    const updateStatus = (e, type) => {
        e.preventDefault();
        // console.log(filteredData, type);
       
            let params = JSON.stringify({
                user_id: user_id,
                status: filteredData?.status == 0 ? 1 : 0,
            });
            Service.apiPostCallRequest(RouteURL.updateUserStatus, params)
                .then((res) => {
                    if (res.status === Constants.API_RESPONSE_STATUS_SUCCESS) {
                        // console.log(res.data);
                        loadUsers(_params);
                        toast.success(res.message, {
                            position: toast.POSITION.BOTTOM_RIGHT,
                        });
                    } else {
                        toast.error(res.message, {
                            position: toast.POSITION.BOTTOM_RIGHT,
                        });
                    }
                })
                .catch((error) => {
                    if (error.response.status === 401) {
                        localStorage.clear();
                        history.push("/login");
                        window.location.reload();
                    }
                });
      

    };

    /**
     * @author Sarmistha Mondal
     * @Date_Created 23/02/2024
     * @Date_Modified
     * @function async
     * @functionName deleteUser
     * @functionPurpose this function gets the user delete.
     *
     * @functionParam {payload object:user_id}
     *
     * @functionSuccess Success status and message.
     *
     * @functionError {Boolean} error is there.
     * @functionError {String} message  Description message.
     */
    const deleteUser = () => {
        let params = JSON.stringify({
            user_id: user_id,
        });
        setSubmitDisable(true);
        Service.apiPostCallRequest(RouteURL.deleteUser, params)
            .then((res) => {
                setSubmitDisable(false);
                if (res.status === Constants.API_RESPONSE_STATUS_SUCCESS) {
                    // console.log(res.data);
                    history.push("/user");
                    toast.success(res.message, {
                        position: toast.POSITION.BOTTOM_RIGHT,
                    });
                } else {
                    toast.error(res.message, {
                        position: toast.POSITION.BOTTOM_RIGHT,
                    });
                }
            })
            .catch((error) => {
                setSubmitDisable(false);
                if (error.response.status === 401) {
                    localStorage.clear();
                    history.push("/login");
                    window.location.reload();
                }
            });
    };
    return (
        <>
            <div>
                <CRow>

                    <div className="col-xs-12 col-md-12 col-xxl-12 col-xl-12 col-lg-12">

                        <CRow className="justify-content-center align-items-center">
                            <div className="col-sm-12">
                                <div className="deal_sec_main">
                                    <div className="row">
                                        <div className="col-xxl-6 col-sm-12 col-xl-6 col-lg-6 col-md-6">
                                            <h6 class="hed_txt pb-0">
                                                <i
                                                    className="fa fa-long-arrow-left"
                                                    onClick={() => {
                                                        history.push(`/user`);
                                                    }}
                                                    style={{
                                                        fontSize: 16,
                                                        cursor: "pointer",
                                                        color: "#171f2d",
                                                    }}
                                                ></i>
                                                &nbsp;   <span
                                                    className="text-left"
                                                    style={{ color: "#5473ff", cursor: "pointer" }}
                                                >
                                                    {filteredData?.photo == null || filteredData?.photo === "" ? (
                                                        <img
                                                            className="userImage"
                                                            src={defaultImg}
                                                            height={40}
                                                            width={40}
                                                            alt="img"
                                                        />
                                                    ) : (
                                                        <img
                                                            className="userImage"
                                                            src={filteredData?.photo}
                                                            height={40}
                                                            width={40}
                                                            alt="img"
                                                        />
                                                    )}

                                                    {filteredData?.first_name + ' ' + filteredData?.last_name}

                                                </span>
                                            </h6>
                                        </div>
                                        <div className="col-xxl-2 col-sm-6 col-xl-2 col-lg-2 col-md-2 d-none d-md-block"></div>
                                        <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-4 col-sm-12 pl-0 deal_icon">
                                            <span className="icon_sec d-flex align-items-center justify-content-end">
                                                <span
                                                    className={
                                                        filteredData?.status_name &&
                                                            filteredData?.status_name === "Active"
                                                            ? "badge text-success"
                                                            : "'badge text-danger"
                                                    }
                                                >
                                                    {filteredData?.status_name
                                                        ? filteredData?.status_name
                                                        : "---"}
                                                </span>

                                                <div className="issue_dot_main ml-2">
                                                    <div className="issue_dot_inn">
                                                        <ul>
                                                            <div className="dropdown_btn">
                                                                <Dropdown>
                                                                    <Dropdown.Toggle
                                                                        className="m-0"
                                                                        id="dropdown-basic"
                                                                    >
                                                                        <i class="fa-solid fa-ellipsis-vertical"></i>
                                                                    </Dropdown.Toggle>
                                                                    <Dropdown.Menu
                                                                        style={{ height: "auto", width: "auto" }}
                                                                    >
                                                                        <div
                                                                            className="row"
                                                                            style={{
                                                                                marginLeft: 0,
                                                                                marginRight: 0,
                                                                                paddingLeft: 10,
                                                                                paddingRight: 10,
                                                                                paddingBottom: 5,
                                                                                paddingTop: 9,
                                                                            }}
                                                                        >
                                                                            
                                                                            {(editPermission == 1 || createPermission == 1) &&
                                                                                <Dropdown.Item
                                                                                    onClick={(e) => updateStatus(e, filteredData?.status_name)}
                                                                                >
                                                                                    <li>
                                                                                        Mark as
                                                                                        {filteredData?.status_name ===
                                                                                            "Active"
                                                                                            ? " Inactive"
                                                                                            : " Active"}
                                                                                    </li>
                                                                                </Dropdown.Item>}
                                                                            {deletePermission == 1 &&
                                                                                <Dropdown.Item
                                                                                    onClick={() =>
                                                                                        setDeleteModal(!deleteModal)
                                                                                    }
                                                                                >
                                                                                    <li> Delete User</li>
                                                                                </Dropdown.Item>}
                                                                        </div>
                                                                    </Dropdown.Menu>
                                                                </Dropdown>
                                                            </div>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div className="recruitment_sec">
                                    <div className="leave_inn">
                                        <div className="row">
                                            <div className="col-xxl-4 col-xl-4 col-lg-6 col-md-6 col-sm-12">
                                                <div className="deal_inner">
                                                    <table class="table">
                                                        <tbody>
                                                            <tr>
                                                                <td style={{ width: 15 }}>
                                                                    <strong>Email</strong>
                                                                </td>
                                                                <td style={{ width: 15 }}>:</td>
                                                                <td>{filteredData?.email}</td>
                                                            </tr>
                                                            <tr>
                                                                <td style={{ width: 15 }}>
                                                                    <strong>Date Of Birth</strong>
                                                                </td>
                                                                <td style={{ width: 15 }}>:</td>
                                                                <td>{filteredData?.date_of_birth
                                                                    ? moment(filteredData.date_of_birth).format(dateFormat)
                                                                    : ""}</td>
                                                            </tr>
                                                            <tr>
                                                                <td style={{ width: 200 }}>
                                                                    <strong>Age</strong>
                                                                </td>
                                                                <td style={{ width: 15 }}>:</td>
                                                                <td>{filteredData?.date_of_birth != null ? Helpers.getAge(filteredData?.date_of_birth) : '--'}</td>
                                                            </tr>
                                                            <tr>
                                                                <td style={{ width: 130 }}>
                                                                    <strong>Status</strong>
                                                                </td>
                                                                <td style={{ width: 15 }}>:</td>
                                                                <td>  {filteredData?.status_name ? (
                                                                    <span
                                                                        className={
                                                                            filteredData?.status_name && filteredData?.status_name === "Active"
                                                                                ? " text-success"
                                                                                : " text-danger"
                                                                        }
                                                                    >
                                                                        {filteredData?.status_name ? filteredData?.status_name : "---"}
                                                                    </span>
                                                                ) : (
                                                                    "--"
                                                                )}</td>
                                                            </tr>

                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                            <div className="col-xxl-4 col-xl-4 col-lg-6 col-md-6 col-sm-12">
                                                <div className="deal_inner">
                                                    <table class="table">
                                                        <tbody>

                                                            <tr>
                                                                <td style={{ width: 160 }}>
                                                                    <strong>Subscription Status</strong>
                                                                </td>
                                                                <td style={{ width: 15 }}>:</td>
                                                                <td> {filteredData?.subscription_status
                                                                    ? filteredData?.subscription_status
                                                                    : ""}</td>
                                                            </tr>
                                                            <tr>
                                                                <td style={{ width: 140 }}>
                                                                    <strong>	Story Read</strong>
                                                                </td>
                                                                <td style={{ width: 15 }}>:</td>
                                                                <td> {filteredData?.story_read
                                                                    ? filteredData?.story_read
                                                                    : ""}</td>
                                                            </tr>
                                                            <tr>
                                                                <td style={{ width: 100 }}>
                                                                    <strong>Story Viewed</strong>
                                                                </td>
                                                                <td style={{ width: 15 }}>:</td>
                                                                <td> {filteredData?.story_viewed
                                                                    ? filteredData?.story_viewed
                                                                    : ""}</td>
                                                            </tr>
                                                            <tr>
                                                                <td style={{ width: 100 }}>
                                                                    <strong>Story In Progress</strong>
                                                                </td>
                                                                <td style={{ width: 15 }}>:</td>
                                                                <td> {filteredData?.story_in_progress
                                                                    ? filteredData?.story_in_progress
                                                                    : ""}</td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                            <div className="col-xxl-4 col-xl-4 col-lg-6 col-md-6 col-sm-12">
                                                <div className="deal_inner">
                                                    <table class="table">
                                                        <tbody>
                                                            <tr>
                                                                <td style={{ width: 140 }}>
                                                                    <strong>Created On</strong>
                                                                </td>
                                                                <td style={{ width: 15 }}>:</td>
                                                                <td>{filteredData?.created_at
                                                                    ? moment(filteredData?.created_at).format(dateFormat)
                                                                    : ""}</td>
                                                            </tr>
                                                            <tr>
                                                                <td style={{ width: 100 }}>
                                                                    <strong>	Subscription Plan</strong>
                                                                </td>
                                                                <td style={{ width: 15 }}>:</td>
                                                                <td> {filteredData?.subscription_plan_name
                                                                    ? filteredData?.subscription_plan_name.charAt(0).toUpperCase() +
                                                                    filteredData?.subscription_plan_name.slice(1)
                                                                    : ""}</td>
                                                            </tr>
                                                            <tr>
                                                                <td style={{ width: 100 }}>
                                                                    <strong>	Subscribed On</strong>
                                                                </td>
                                                                <td style={{ width: 15 }}>:</td>
                                                                <td>  {filteredData?.subscribed_on
                                                                    ? moment(filteredData?.subscribed_on).format(dateFormat)
                                                                    : ""}</td>
                                                            </tr>
                                                            <tr>
                                                                <td style={{ width: 100 }}>
                                                                    <strong>	Expired On</strong>
                                                                </td>
                                                                <td style={{ width: 15 }}>:</td>
                                                                <td> {filteredData?.expired_on
                                                                    ? moment(filteredData?.expired_on).format(dateFormat)
                                                                    : ""}</td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </CRow>
                        &nbsp;
                        <div className="leave_dwn_sec">
                            <CRow>
                                <CCol xs="12">
                                    <ul class="nav ">
                                        <li class="nav-item">
                                            <a
                                                class={
                                                    "nav-link" +
                                                    (menuName === "SubscriptionHistory" ? " active" : "")
                                                }
                                                aria-current="page"
                                                href="#"
                                                onClick={(e) => handleMenuSet(e, "SubscriptionHistory")}
                                            >
                                                Subscription History
                                            </a>
                                        </li>
                                        <li class="nav-item">
                                            <a
                                                class={
                                                    "nav-link" + (menuName === "ReadingHistory" ? " active" : "")
                                                }
                                                href="#"
                                                onClick={(e) => handleMenuSet(e, "ReadingHistory")}
                                            >
                                                Reading History
                                            </a>
                                        </li>

                                    </ul>
                                </CCol>
                            </CRow>
                            {(() => {
                                switch (menuName) {
                                    case "SubscriptionHistory":
                                        return <SubscriptionHistory />;
                                    case "ReadingHistory":
                                        return <ReadingHistory />;


                                    default:
                                        return null;
                                }
                            })()}
                        </div>


                    </div>
                </CRow>
            </div>
            {/*delete the user modal */}

            <Modal
                show={deleteModal}
                onHide={() => setDeleteModal(!deleteModal)}
                backdrop="static"
            >
                <div className="apply_comp_sec">
                    <Modal.Header closeButton>
                        <h6 className="hed_txt">Delete User</h6>
                    </Modal.Header>
                    <div className="task_modal_sec">
                        <p>Do you want to delete this user?</p>
                    </div>
                    <div className="comp_off_inn">
                        <div className="row">
                            <div className="atten_sec1 col-12">
                                <CButton
                                    className="save"
                                    style={{ marginRight: 10 }}
                                    onClick={deleteUser}
                                    disabled={submitDisable ? true : false}
                                >
                                    Yes
                                </CButton>
                                <CButton
                                    className="cancel"
                                    onClick={() => setDeleteModal(!deleteModal)}
                                >
                                    No
                                </CButton>
                            </div>
                        </div>
                    </div>
                </div>
            </Modal>

            {/* <div>
            <CRow>
                <div className="col-12">
                    <CRow className="justify-content-center align-items-center">
                        <div className="col-sm-12">
                            <div className="deal_sec_main">
                                <div className="row">
                                    <div className="col-xxl-6 col-sm-12 col-xl-6 col-lg-6 col-md-6">
                                        <h6 class="hed_txt pb-0">
                                            <i
                                                className="fa fa-long-arrow-left"
                                                onClick={() => {
                                                    history.push(`/user`);
                                                }}
                                                style={{
                                                    fontSize: 16,
                                                    cursor: "pointer",
                                                    color: "#171f2d",
                                                }}
                                            ></i>
                                            &nbsp;{"Subscription History "}
                                        </h6>
                                    </div>
                                    <div className="col-xxl-2 col-sm-6 col-xl-2 col-lg-2 col-md-2 d-none d-md-block"></div>
                                    <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-4 col-sm-12 pl-0 deal_icon">
                                       
                                    </div>
                                </div>
                            </div>
                            <div className="recruitment_sec">
                                <div className="leave_inn">
                                    <div className="row">
                                        <div className="col-xxl-4 col-xl-4 col-lg-6 col-md-6 col-sm-12">
                                            <div className="deal_inner">
                                                <table class="table">
                                                    <tbody>
                                                        <tr>
                                                            <td style={{ width: 200 }}>
                                                                <strong>Subscription Plan</strong>
                                                            </td>
                                                            <td style={{ width: 15 }}>:</td>
                                                            <td>{filteredData?.subscription_plan_name}</td>
                                                        </tr>
                                                        
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                        <div className="col-xxl-4 col-xl-4 col-lg-6 col-md-6 col-sm-12">
                                            <div className="deal_inner">
                                                <table class="table">
                                                   
                                                </table>
                                            </div>
                                        </div>
                                        <div className="col-xxl-4 col-xl-4 col-lg-6 col-md-6 col-sm-12">
                                            <div className="deal_inner">
                                                <table class="table">
                                                    <tbody>
                                                        <tr>
                                                            <td style={{ width: 140 }}>
                                                                <strong>Subscribed On</strong>
                                                            </td>
                                                            <td style={{ width: 15 }}>:</td>
                                                            <td> {filteredData?.subscribed_on
                                                                ? moment(filteredData?.subscribed_on).format(dateFormat)
                                                                : ""}</td>
                                                        </tr>
                                                       
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </CRow>
                    &nbsp;
                    <CRow className="justify-content-center align-items-center">
                        <div className="col-sm-12">
                            <div className="deal_sec_main">
                                <div className="row">
                                    <div className="col-xxl-6 col-sm-12 col-xl-6 col-lg-6 col-md-6">
                                        <h6 class="hed_txt pb-0">Reading History</h6>
                                    </div>
                                    <div className="col-xxl-2 col-sm-6 col-xl-2 col-lg-2 col-md-2 d-none d-md-block"></div>
                                    <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-4 col-sm-12 pl-0 deal_icon"></div>
                                </div>
                            </div>
                            <div className="recruitment_sec">
                                <div className="leave_inn ">
                                    <div className="asset_sec"></div>

                                  
                                    <CDataTable
                                        responsive
                                        items={readingHistory}
                                        fields={fields}
                                        loading={loader ? loader : ""}
                                        noItemsViewSlot={loader ? "Loading..." : ""}
                                        sorter
                                        onPaginationChange={(page) =>
                                            localStorage.setItem("items_per_page", page)
                                        }
                                        itemsPerPage={10}
                                        itemsPerPageSelect
                                        tableFilter={{
                                            placeholder: "Search",
                                            label: "Search:",
                                        }}
                                      
                                        pagination
                                        activePage={3}
                                        scopedSlots={{
                                            cover_image: (item) => (
                                                <td>

                                                    <img
                                                        className="storyCover"
                                                        src={item?.cover_image}
                                                        height={100}
                                                        width={120}
                                                        alt="img"
                                                    />

                                                </td>
                                            ),
                                            
                                        }}
                                    />
                                </div>
                            </div>
                     
                        </div>
                    </CRow>
                    &nbsp;
                  
                </div>
            </CRow>
        </div> */}
        </>
    );
}
export const SubscriptionHistory = (props) => {
    let { user_id, id } = useParams();
    const history = useHistory();
    const accessToken = localStorage.getItem("shipGudds_admin_auth_token");
    const dateFormat = localStorage.getItem("date_format").toUpperCase();
    const [readingHistory, setReadingHistory] = useState([]);
    const [loader, setLoader] = useState(1);
    const fields = [
        // { key: 'photo', label: 'Photo', _style: { width: '8%' }, sorter: false, },
        { key: `cover_image`, label: "Story", _style: { width: "4%" } },
        { key: "story_name", label: "Story Name", _style: { width: "9%" } },
        { key: "categories", label: "Story Category", _style: { width: "12%" } },
        { key: "completion_percentage", label: "Story Completion Percentage", _style: { width: "10%" } },
        { key: "reading_progress", label: "Reading Progress", _style: { width: "7%" } },


    ];
    useEffect(() => {
        if (accessToken === null) {
            history.push("/");
            window.location.reload();
        }

        let params = JSON.stringify({
            user_id: user_id,
        });

        loadReadingHistory(params)
    }, []);
    /**
    * @author Sarmistha Mondal
    * @Date_Created 07/02/2024
    * @Date_Modified 
    * @function async
    * @functionName loadReadingHistory
    * @functionPurpose this function gets the ReadingHistory list.
    *
    * @functionParam {payload object:}
    *
    * @functionSuccess Success status and message.
    *
    * @functionError {Boolean} error is there.
    * @functionError {String} message  Description message.
    */

    async function loadReadingHistory(params) {
        setLoader(1)
        Service.apiPostCallRequest(RouteURL.getReadingHistory, params)
            .then((res) => {
                if (res.status === Constants.API_RESPONSE_STATUS_SUCCESS) {
                    setReadingHistory(res.data);
                    setLoader(0)
                } else {
                    setLoader(0)
                    toast.error(res.message, {
                        position: toast.POSITION.BOTTOM_RIGHT,
                    });
                }
            })
            .catch((error) => {
                // console.log(error);
                if (error.response.status === 401) {
                    localStorage.clear();
                    history.push("/login");
                    window.location.reload();
                }
            });
    }
    return (
        <CRow className="justify-content-center align-items-center">
            <div className="col-sm-12">
                <div className="deal_sec_main">
                    <div className="row">
                        <div className="col-xxl-6 col-sm-12 col-xl-6 col-lg-6 col-md-6">
                            {/* <h6 class="hed_txt pb-0">Reading History</h6> */}
                        </div>
                        <div className="col-xxl-2 col-sm-6 col-xl-2 col-lg-2 col-md-2 d-none d-md-block"></div>
                        <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-4 col-sm-12 pl-0 deal_icon"></div>
                    </div>
                </div>
                <div className="recruitment_sec">
                    <div className="leave_inn ">
                        <div className="asset_sec"></div>
                        <tr>
                            <td colSpan={8} align="center" style={{ color: "red" }}> No data found</td>
                        </tr>

                        {/* <CDataTable
                            responsive
                            items={readingHistory}
                            fields={fields}
                            loading={loader ? loader : ""}
                            noItemsViewSlot={loader ? "Loading..." : ""}
                            sorter
                            onPaginationChange={(page) =>
                                localStorage.setItem("items_per_page", page)
                            }
                            itemsPerPage={10}
                            itemsPerPageSelect
                            tableFilter={{
                                placeholder: "Search",
                                label: "Search:",
                            }}

                            pagination
                            activePage={3}
                            scopedSlots={{
                                cover_image: (item) => (
                                    <td>

                                        <img
                                            className="storyCover"
                                            src={item?.cover_image}
                                            height={100}
                                            width={120}
                                            alt="img"
                                        />

                                    </td>
                                ),

                            }}
                        /> */}
                    </div>
                </div>

            </div>
        </CRow>
    )
}
export const ReadingHistory = (props) => {
    let { user_id, id } = useParams();
    const history = useHistory();
    const accessToken = localStorage.getItem("shipGudds_admin_auth_token");
    const dateFormat = localStorage.getItem("date_format").toUpperCase();
    const [readingHistory, setReadingHistory] = useState([]);
    const [loader, setLoader] = useState(1);
    const fields = [
        // { key: 'photo', label: 'Photo', _style: { width: '8%' }, sorter: false, },
        { key: `cover_image`, label: "Story", _style: { width: "4%" } },
        { key: "story_name", label: "Story Name" },
        { key: "categories", label: "Story Category" },
        { key: "completion_percentage", label: "Story Completion Percentage" },
        { key: "reading_progress", label: "Reading Progress" },


    ];
    useEffect(() => {
        if (accessToken === null) {
            history.push("/");
            window.location.reload();
        }

        let params = JSON.stringify({
            user_id: user_id,
        });

        loadReadingHistory(params)
    }, []);
    /**
    * @author Sarmistha Mondal
    * @Date_Created 07/02/2024
    * @Date_Modified 
    * @function async
    * @functionName loadReadingHistory
    * @functionPurpose this function gets the ReadingHistory list.
    *
    * @functionParam {payload object:}
    *
    * @functionSuccess Success status and message.
    *
    * @functionError {Boolean} error is there.
    * @functionError {String} message  Description message.
    */

    async function loadReadingHistory(params) {
        setLoader(1)
        Service.apiPostCallRequest(RouteURL.getReadingHistory, params)
            .then((res) => {
                if (res.status === Constants.API_RESPONSE_STATUS_SUCCESS) {
                    setReadingHistory(res.data);
                    setLoader(0)
                } else {
                    setLoader(0)
                    toast.error(res.message, {
                        position: toast.POSITION.BOTTOM_RIGHT,
                    });
                }
            })
            .catch((error) => {
                // console.log(error);
                if (error.response.status === 401) {
                    localStorage.clear();
                    history.push("/login");
                    window.location.reload();
                }
            });
    }
    return (
        <CRow className="justify-content-center align-items-center">
            <div className="col-sm-12">
                <div className="deal_sec_main">
                    <div className="row">
                        <div className="col-xxl-6 col-sm-12 col-xl-6 col-lg-6 col-md-6">
                            {/* <h6 class="hed_txt pb-0">Reading History</h6> */}
                        </div>
                        <div className="col-xxl-2 col-sm-6 col-xl-2 col-lg-2 col-md-2 d-none d-md-block"></div>
                        <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-4 col-sm-12 pl-0 deal_icon"></div>
                    </div>
                </div>
                <div className="recruitment_sec">
                    <div className="leave_inn ">
                        <div className="asset_sec"></div>


                        <CDataTable
                            responsive
                            items={readingHistory}
                            fields={fields}
                            loading={loader ? loader : ""}
                            noItemsViewSlot={loader ? "Loading..." : ""}
                            sorter
                            onPaginationChange={(page) =>
                                localStorage.setItem("items_per_page", page)
                            }
                            itemsPerPage={10}
                            itemsPerPageSelect
                            tableFilter={{
                                placeholder: "Search",
                                label: "Search:",
                            }}

                            pagination
                            activePage={3}
                            scopedSlots={{
                                cover_image: (item) => (
                                    <td>

                                        <img
                                            className="storyCover"
                                            src={item?.cover_image}
                                            height={100}
                                            width={120}
                                            alt="img"
                                        />

                                    </td>
                                ),

                            }}
                        />
                    </div>
                </div>

            </div>
        </CRow>
    )
}
