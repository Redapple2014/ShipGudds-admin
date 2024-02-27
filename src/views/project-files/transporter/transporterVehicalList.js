/**
 * @file_purpose  page for showing user list by filter wise
 * @author Sarmistha Mondal
 * @Date_Created 22/01/2024
 * @Date_Modified 07/02/2024
 */
import React, { useState, useEffect, useRef } from "react";
import {
    CCol,
    CDataTable,
    CRow,
    CLabel,
    CSelect, CButton, CFormGroup
} from "@coreui/react";
import moment from "moment";
import { ToastContainer, toast } from "react-toastify";
import { useHistory, useLocation, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import Helpers from "../../../Utility/Helpers";
import Constants from "../../../Utility/Constants";
import Service from "../../../apis/Service";
import RouteURL from "../../../apis/RouteURL";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import BgPdf from "../../../assets/icons/bg_pdf.png";
import Modal from "react-bootstrap/Modal";

export default function TransporterVehicalList(props) {
    const location = useLocation()
    const history = useHistory();
    let { transporter_id } = useParams();
    const [page, setPage] = useState(1)
    const [data, setData] = useState([])
    const [totalResults, setTotalResults] = useState(0)
    const [filteredData, setFilteredData] = useState([]);
    const [loader, setloader] = useState(0)
    const [openModal, setOpenModal] = useState(false);
    const [fileList, setFileList] = useState([]);
    const [proposalFileModal, setProposalFileModal] = useState(false);
    // pagination setup
    const resultsPerPage = 10
    // const totalResults = response.length
    const fields = [
        // { key: 'photo', label: 'Photo', _style: { width: '8%' }, sorter: false, },
        'vehicle_plate_number', 'tracking_mode', 'vehicle_model', 'vehicle_type', 'vin_chassis_number', 'vehicle_group', 'tracking_device_iemi', 'year',
        "purchase_date",
        'assign_driver', 'insurance_document',
        'is_available',
        'status',
        'vehicle_image'
        // 'subscription_plan', 'subscription_validity', 'ocr_file',
        // {
        //     key: "action",
        //     label: "Action",
        //     // _style: { width: "20%" },
        //     sorter: false,
        //     filter: false,
        // },
    ];
    // pagination change control
    function onPageChange(p) {
        console.log(p);
        setPage(p)
    }
    useEffect(() => {
        // console.log(transporter_id);
        loadTransporterVehicalList()
    }, [])



    /**
    * @author Sarmistha Mondal
    * @Date_Created 27/02/2024
    * @Date_Modified 
    * @function async
    * @functionName loadTransporterVehicalList
    * @functionPurpose this function gets the transporter vehical list.
    *
    * @functionParam {payload object:transporter_id}
    *
    * @functionSuccess Success status and message.
    *
    * @functionError {Boolean} error is there.
    * @functionError {String} message  Description message.
    */


    async function loadTransporterVehicalList() {

        let params = JSON.stringify({
            transporter_id: transporter_id
        })
        // setLoader(1);
        Service.apiPostTokenCallRequest(RouteURL.transporterVehicleList, params)
            .then((res) => {
                if (res.err === Constants.API_RESPONSE_STATUS_SUCCESS) {
                    // setTotalResults(res.data.length);
                    // setData(res.data)
                    setFilteredData(res.data)
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
    const openFile = (proposal_file) => {
        setFileList(proposal_file)
        setProposalFileModal(!proposalFileModal)
    }


    return (
        <>
            {/* {dynamicMenu.length>0? */}
            <>
                <ToastContainer />
                <CRow>
                    <CCol>
                        <div className="recruit_top_sec mb-0 leave_top_sec">
                            <div className="row">
                                <div className="col-12 col-sm-4">
                                    <h6 className="hed_txt pt-2"><i className='fa fa-long-arrow-left' onClick={() => { history.goBack() }} style={{ fontSize: 16, cursor: 'pointer', color: '#171f2d' }}></i>  Transporter Vehical List</h6>
                                </div>
                               
                            </div>
                        </div>
                        <div className="recruitment_sec">
                            <div className="leave_inn ">
                                <div className="asset_sec"></div>

                                {/* listing table for user list */}
                                <CDataTable
                                    responsive
                                    items={filteredData}
                                    fields={fields}
                                    loading={loader ? loader : ""}
                                    noItemsViewSlot={loader ? "Loading..." : ""}
                                    // sorter
                                    // itemsPerPage={itemsPerPage}
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
                                    // onPageChange={(page) => console.log("page No", page)}
                                    activePage={3}
                                    scopedSlots={{
                                        vehicle_image: (item) => (
                                            <td>
                                                {item.vehicle_image.length > 0 ?
                                                    <Link
                                                        to='#'
                                                        onClick={(e) => openFile(item.vehicle_image)}
                                                        style={{
                                                            textDecoration: "none",
                                                            color: "#5473FF",
                                                        }}
                                                    > {item.vehicle_image.length + ' File(s)'}</Link> : "--"}



                                            </td>
                                        ),
                                        purchase_date: (item) => (
                                            <td>
                                                {item.purchase_date
                                                    ? moment(item.purchase_date).format("DD-MM-YYYY")
                                                    : "--"}
                                            </td>
                                        ),

                                        is_available: (item) => (
                                            <td>
                                                {item.is_available == 0
                                                    ? 'No'
                                                    : "Yes"}
                                            </td>
                                        ),

                                        assign_driver: (item) => (
                                            <td>
                                                {item.assign_driver
                                                    ? item.assign_driver 
                                                    : "--"}
                                            </td>
                                        ),
                                        insurance_document: (item) => (
                                            <td>
                                                {item.insurance_document
                                                    ? item.insurance_document
                                                    : "--"}
                                            </td>
                                        ),
                                        // action: (item, index) => {
                                        //     return (
                                        //         <td>
                                        //             <div className="comp_off_inn">
                                        //                 <div className="row">
                                        //                     <div className="atten_sec1 col-12">
                                        //                         <CButton
                                        //                             className="save"
                                        //                             // style={{ marginRight: 10 }}
                                        //                             onClick={() => setOpenModal(!openModal)}
                                        //                         >
                                        //                             View
                                        //                         </CButton>

                                        //                     </div>
                                        //                 </div>
                                        //             </div>


                                        //         </td>

                                        //     );
                                        // },
                                    }}
                                />
                            </div>
                        </div>
                    </CCol>
                </CRow>
            </>
            {/* for file view */}
            <Modal
                show={proposalFileModal}
                onHide={() => setProposalFileModal(!proposalFileModal)}
                backdrop="static"
            >

                <div className="apply_comp_sec">
                    <Modal.Header closeButton >
                        <h6 className="hed_txt">File Details</h6>
                    </Modal.Header>

                    <div className="comp_inner_sec">
                        <div className="comp_off_inn">
                            <div className="row">
                                <div className="col-md-12">

                                    <CFormGroup row>

                                        {fileList != undefined && fileList.length > 0 && fileList.map((file) => {
                                            return <CCol md="2" style={{ marginBottom: 10 }}><a href={file} rel="noopener noreferrer" download target='_blank' style={{ marginRight: 5 }}>
                                                <img style={{ borderRadius: 0 }} src={BgPdf} alt='' />
                                            </a></CCol>

                                        })}
                                    </CFormGroup>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="comp_off_inn">
                        <div className="row">
                            <div className="atten_sec1 col-12">
                                <CButton className="save"
                                    style={{ marginRight: 10 }} onClick={() => setProposalFileModal(!proposalFileModal)}>
                                    Close
                                </CButton>

                            </div>
                        </div>
                    </div>
                </div>
            </Modal>
        </>
    );
};


