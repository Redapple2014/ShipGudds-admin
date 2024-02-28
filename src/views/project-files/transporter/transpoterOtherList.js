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
    CTooltip,
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

export default function TransporterOtherList(props) {
    const location = useLocation()
    const history = useHistory();
    let { transporter_id } = useParams();
    const [page, setPage] = useState(1)
    const [data, setData] = useState([])
    const [totalResults, setTotalResults] = useState(0)
    const [filteredData, setFilteredData] = useState([]);
    const [loader, setloader] = useState(0)
    const [openModal, setOpenModal] = useState(false);
    const [materialList, setMaterialList] = useState([]);
    const [proposalFileModal, setProposalFileModal] = useState(false);
    // pagination setup
    const resultsPerPage = 10
    // const totalResults = response.length
    const fields = [
        // { key: 'photo', label: 'Photo', _style: { width: '8%' }, sorter: false, },
        'shipper_name', 'shipper_code', 'request_id',
        "request_date",
        'to_city', 'from_city', 'material_type',
        // 'is_available',
        'status',

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
        loadTransporterAllList()
    }, [])



    /**
    * @author Sarmistha Mondal
    * @Date_Created 27/02/2024
    * @Date_Modified 
    * @function async
    * @functionName loadTransporterAllList
    * @functionPurpose this function gets the transporter vehical list.
    *
    * @functionParam {payload object:transporter_id}
    *
    * @functionSuccess Success status and message.
    *
    * @functionError {Boolean} error is there.
    * @functionError {String} message  Description message.
    */


    async function loadTransporterAllList() {

        let params = JSON.stringify({
            transporter_id: transporter_id
        })
        // setLoader(1);
        Service.apiPostTokenCallRequest(RouteURL.transporterAllRequest, params)
            .then((res) => {
                if (res.err === Constants.API_RESPONSE_STATUS_SUCCESS) {

                    setFilteredData(res.data.allShipmentRequest)
                } else {
                    toast.error(res.message, {
                        position: toast.POSITION.BOTTOM_RIGHT,
                    });
                }
            })
            .catch((error) => {
                console.log(error);
                if (error.response.status === 401) {
                    localStorage.clear();
                    history.push("/login");
                    window.location.reload();
                }
            });


    }
    const openFile = (proposal_file) => {
        setMaterialList()
        setMaterialList(proposal_file)
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
                                    <h6 className="hed_txt pt-2"><i className='fa fa-long-arrow-left' onClick={() => { history.push('/transporter') }} style={{ fontSize: 16, cursor: 'pointer', color: '#171f2d' }}></i> Transporter All List</h6>
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

                                        to_city: (item) => (
                                            <td>

                                                <span type="text" className="text-primary" data-bs-toggle="tooltip" data-bs-placement="top" title={item?.to_location}>
                                                    {item.to_city}
                                                </span>


                                            </td>
                                        ),
                                        from_city: (item) => (
                                            <td>

                                                <span type="text" className="text-primary" data-bs-toggle="tooltip" data-bs-placement="top" title={item?.from_location}>
                                                    {item.from_city}
                                                </span>


                                            </td>
                                        ),
                                        request_date: (item) => (
                                            <td>
                                                {item.request_date
                                                    ? item.request_date
                                                    : "--"}
                                            </td>
                                        ),
                                        material_type: (item) => (
                                            <td>
                                                {item.material_type.length > 0 ?
                                                    <Link
                                                        to='#'
                                                        onClick={(e) => openFile(item.material_type)}
                                                        style={{
                                                            textDecoration: "none",
                                                            color: "#5473FF",
                                                        }}
                                                    > {item.material_type.length + ' Type(s)'}</Link> : "--"}
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
                size="lg"
            >

                <div className="apply_comp_sec">
                    <Modal.Header closeButton >
                        <h6 className="hed_txt">Material Details</h6>
                    </Modal.Header>

                    <div className="comp_inner_sec">
                        <div className="comp_off_inn">
                            <div className="row">
                                <div className="col-md-12">

                                    <CFormGroup style={{ overflow: 'scroll' }}>
                                       

                                        {materialList != undefined && materialList.length > 0 && materialList.map((item) => {
                                            return <CCol md="12">
                                                <div class="card">
                                                    <div class="card-header">
                                                        <h5 class="card-title">{item.material_type}</h5> 
                                                    </div>
                                                    <div class="card-body">
                                                        <h6 class="card-title">No. of units: {item.no_of_units}</h6>
                                                        <p class="card-text">
                                                            <div className="row">
                                                                <div className="col-md-6">Package weight: {item.package_weight}</div>  
                                                                <div className="col-md-6">Product dimension: {item.product_dimension}</div>  
                                                                <div className="col-md-6"></div>  
                                                            </div>
                                                            {item.images != undefined && item.images.length > 0 && item.images.map((file) => {
                                                                return <CCol md="2" style={{ marginBottom: 10 }}><a href={file} rel="noopener noreferrer" download target='_blank' style={{ marginRight: 5 }}>
                                                                    <img style={{ borderRadius: 0 }} src={BgPdf} alt='' />
                                                                </a></CCol>

                                                            })}
                                                        </p>
                                                           

                                                    </div>
                                                </div>
                                            </CCol>
                                         

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


