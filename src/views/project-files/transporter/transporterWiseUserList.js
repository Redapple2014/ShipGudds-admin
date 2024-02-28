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
    CSelect, CButton
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

export default function TransporterUserList(props) {
    const location = useLocation()
    const history = useHistory();
    let { transporter_id } = useParams();
    const [page, setPage] = useState(1)
    const [data, setData] = useState([])
    const [totalResults, setTotalResults] = useState(0)
    const [filteredData, setFilteredData] = useState([]);
    const [loader, setloader] = useState(0)
    const [openModal, setOpenModal] = useState(false);

    // pagination setup
    const resultsPerPage = 10
    // const totalResults = response.length
    const fields = [
        // { key: 'photo', label: 'Photo', _style: { width: '8%' }, sorter: false, },
        { key: `first_name`, label: "Name",  },
        // { key: "transporter_code", label: "Code", _style: { width: "9%" } },
        { key: "created", label: "Created On", },
        'is_available',
        'status'
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
        console.log(transporter_id);
        loadTransporterUserList()
    }, [])
  


    /**
    * @author Sarmistha Mondal
    * @Date_Created 27/02/2024
    * @Date_Modified 
    * @function async
    * @functionName loadTransporterUserList
    * @functionPurpose this function gets the transporter user list.
    *
    * @functionParam {payload object:transporter_id}
    *
    * @functionSuccess Success status and message.
    *
    * @functionError {Boolean} error is there.
    * @functionError {String} message  Description message.
    */


    async function loadTransporterUserList() {

        let params = JSON.stringify({
            transporter_id: transporter_id
        })
        // setLoader(1);
        Service.apiPostTokenCallRequest(RouteURL.transporterUserList, params)
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
                    <h6 className="hed_txt pt-2"><i className='fa fa-long-arrow-left' onClick={() => { history.push('/transporter') }} style={{ fontSize: 16, cursor: 'pointer', color: '#171f2d' }}></i>Transporter User List</h6>
                                </div>
                                {/* <div className="col-12 col-sm-8 d-none d-md-block">
                <div className="row">
                  <div className="col-sm-3 col-12">

                    <CLabel>Subscription Plan</CLabel>
                    <CSelect
                      custom
                      name="plan_id"
                      id="plan_id"
                      value={planId}
                      onChange={(e) => {
                        setPlanId(e.target.value); setUpdatePlan(true)
                      }}
                      required
                    >
                      <option value="">Select Plan</option>
                      {subscriptionPlan.map(item => (
                        <option value={item.plan_id}>{item.plan_name} </option>
                      ))}
                    </CSelect>
                  </div>
                  <div className="col-12 col-sm-3">
                    <div className="team_member">
                      <CLabel>From</CLabel>

                      <DatePicker name="dateFrom" id="dateFrom"
                        className="date_sec"
                        showMonthDropdown
                        showYearDropdown
                        dropdownMode="select"
                        autoComplete='off'
                        selected={dateFrom}
                        wrapperClassName="datePicker"
                        placeholderText={dateFormat}
                        onChange={(date) => { setDateFrom(date); setUpdateFrom(!updateFrom); console.log('o'); }}
                      />
                    </div>
                  </div>
                  <div className="col-12 col-sm-3">
                    <div className="team_member">
                      <CLabel>To</CLabel>
                      <DatePicker name="dateTo" id="dateTo"
                        className="date_sec"
                        showMonthDropdown
                        showYearDropdown
                        dropdownMode="select"
                        autoComplete='off'
                        selected={dateTo}
                        minDate={dateFrom}
                        wrapperClassName="datePicker"
                        placeholderText={dateFormat}
                        onChange={(date) => { setDateTo(date); setUpdateTo(!updateTo) }}
                      />
                    </div>
                  </div>
                  <div className="col-sm-3 col-12">
                    <CLabel>Status</CLabel>
                    <CSelect
                      custom
                      name="status"
                      id="status"
                      value={status}
                      onChange={(e) => {
                        setStatus(e.target.value); setUpdate(true)
                      }}
                      required
                    >
                      <option value="">Select Status</option>
                      <option value="1">Active </option>
                      <option value="0">Inactive </option>
                    </CSelect>
                  </div>

                </div>
              </div> */}

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
                                        first_name: (item) => (
                                            <td>
                                                {item.first_name
                                                    ? item.first_name+' '+item.last_name
                                                    : "--"}
                                            </td>
                                        ),
                                        created: (item) => (
                                            <td>
                                                {item.created
                                                    ? moment(item.created).format("DD-MM-YYYY")
                                                    : "--"}
                                            </td>
                                        ),
                                       
                                        is_available: (item) => (
                                            <td>
                                                {item.is_available ==0
                                                    ? 'No'
                                                    : "Yes"}
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
         
        </>
    );
};


