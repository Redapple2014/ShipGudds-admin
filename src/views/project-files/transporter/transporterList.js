/**
 * @file_purpose  page for showing Transporter List by filter wise
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
import { useHistory, useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import Helpers from "../../../Utility/Helpers";
import Constants from "../../../Utility/Constants";
import Service from "../../../apis/Service";
// import defaultImg from "../../../../assets/icons/user_.png";
import RouteURL from "../../../apis/RouteURL";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import BgPdf from "../../../assets/icons/bg_pdf.png";
import Modal from "react-bootstrap/Modal";

export default function TransporterList(props) {

  const history = useHistory();
  const [page, setPage] = useState(1)
  const [data, setData] = useState([])
  const [totalResults, setTotalResults] = useState(0)
  const [filteredData, setFilteredData] = useState([]);
  const [loader, setloader] = useState(0)
  const [openModal, setOpenModal] = useState(false)
  const [transporterId, setTransporterId] = useState();
  const [filterData, setFilterData] = useState();
  const [update, setUpdate] = useState(false);
  const [ocrModal, setOcrModal] = useState(false);
  const [ocrDetails, setOcrDetails] = useState();
  // pagination setup
  const resultsPerPage = 10
  // const totalResults = response.length
  const fields = [
    // { key: 'photo', label: 'Photo', _style: { width: '8%' }, sorter: false, },
    { key: `firm_name`, label: "Name", _style: { width: "12%" } },
    { key: "transporter_code", label: "Code", _style: { width: "9%" } },
    { key: "created", label: "Created On", _style: { width: "8%" } },
    'subscription_plan', 'subscription_validity', 'ocr_file',
    {
      key: "action",
      label: "Action",
      // _style: { width: "20%" },
      sorter: false,
      filter: false,
    },
  ];
  // pagination change control
  function onPageChange(p) {
    console.log(p);
    setPage(p)
  }
  useEffect(() => {
    loadTransporterList()
  }, [])
  useEffect(() => {
    if (update==true)loadTransporterList()
    
  }, [update])


  /**
  * @author Sarmistha Mondal
  * @Date_Created 22/01/2024
  * @Date_Modified 
  * @function async
  * @functionName loadTransporterList
  * @functionPurpose this function gets the transporter.
  *
  * @functionParam {payload object:}
  *
  * @functionSuccess Success status and message.
  *
  * @functionError {Boolean} error is there.
  * @functionError {String} message  Description message.
  */


  async function loadTransporterList() {
    
    let params = JSON.stringify({
      filter: filterData
    })
    Service.apiPostTokenCallRequest(RouteURL.transporterList, params)
      .then((res) => {
        if (res.err === Constants.API_RESPONSE_STATUS_SUCCESS) {
          setTotalResults(res.data.length);
          setData(res.data)
          setFilteredData(res.data)
          setUpdate(false)
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
     
      <>
        <ToastContainer />
        <CRow>
          <CCol>
            <div className="recruit_top_sec mb-0 leave_top_sec">
              <div className="row">
                <div className="col-12 col-sm-4">
                  <h6 className="hed_txt pt-2">Transporter List</h6>
                </div>
                <div className="col-12 col-sm-8 d-none d-md-block">
                <div className="row">
                  <div className="col-sm-3 col-12">

                    <CLabel>Filter</CLabel>
                      <input type="text" placeholder="Filter" name="filterData"

                        onChange={(e) => {setFilterData(e.target.value); }}
                        // onBlur={updateFormTouchValue}
                        // value={formValue.estyear}
                        // error={errorValue.estyear ? "true" : "false"}
                        // disabled={inputDisable.estyear ? false : true} 
                        />
                    {/* <CSelect
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
                    </CSelect> */}
                  </div>
                  {/* <div className="col-12 col-sm-3">
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
                  </div> */}
                    <div className="col-sm-6 col-xxl-2 col-xl-3 col-lg-3 col-md-3 col-12">
                      {/* <div className="asset_in atten_sec"> */}
                      {/* <CLabel htmlFor="text-input"></CLabel> */}
                      {/* {<CButton
                    className="save"
                  //  onClick={(e) => OpenAddEditModal(0, "", "")}
                  >
                    Add Contact
                  </CButton> } */}
                      {/* </div> */}
                      <div className='comp_off_inn'>
                        <div className="atten_sec">
                          <CLabel htmlFor="text-input"></CLabel>
                          <CButton style={{ marginTop: 4 }} className="cancel"
                            onClick={() => setUpdate(true)} 
                            // disabled={submitDisable ? true : false}
                          >
                            Filter
                          </CButton>
                        </div>
                      </div>
                    </div>
                </div>
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
                    created: (item) => (
                      <td>
                        {item.created
                          ? moment(item.created).format("DD-MM-YYYY")
                          : "--"}
                      </td>
                    ),
                    subscription_validity: (item) => (
                      <td>
                        {item.subscription_validity
                          ? moment(item.subscription_validity).format("DD-MM-YYYY")
                          : "--"}
                      </td>
                    ),
                    subscription_plan: (item) => (
                      <td>
                        {item.subscription_plan
                          ? item.subscription_plan
                          : "--"}
                      </td>
                    ),

                    ocr_file:
                      (item, index) => {
                        return (

                          <td >
                            {item.ocr_file.length > 0 ?
                              // <Link
                              //   to='#'
                              //   onClick={(e) => openFile(item.proposal_file)}
                              //   style={{
                              //     textDecoration: "none",
                              //     color: "#5473FF",
                              //   }}
                              // > {item.proposal_file.length + ' File(s)'}</Link> : "--"}

                              <>
                                <a href={item.ocr_file} rel="noopener noreferrer" download target='_blank' style={{ marginRight: 5 }}>
                                  <img style={{ borderRadius: 0 }} src={
                                    BgPdf
                                  } alt='' />
                                </a>
                              </>
                              : <Link
                                to={'#'}
                                style={{
                                  textDecoration: "none",
                                  color: "#5473FF",
                                }}
                                onClick={() => { setOcrModal(!ocrModal); setOcrDetails(item)}}
                              >
                                OCR Details
                              </Link>
                              }

                          </td>
                        )
                      },
                    action: (item, index) => {
                      return (
                        <td>
                          <div className="comp_off_inn">
                            <div className="row">
                              <div className="atten_sec1 col-12">
                                <CButton
                                  className="save"
                                  // style={{ marginRight: 10 }}
                                  onClick={() => { setOpenModal(!openModal); setTransporterId(item.id) }}
                                >
                                  View
                                </CButton>

                              </div>
                            </div>
                          </div>


                        </td>

                      );
                    },
                  }}
                />
              </div>
            </div>
          </CCol>
        </CRow>
      </>
      {/* open modal  */}

      < Modal
        show={openModal}
        onHide={() => setOpenModal(!openModal)}
        backdrop="static"
      >
        <div className="apply_comp_sec">
          <Modal.Header closeButton>
            <h6 className="hed_txt">View</h6>
          </Modal.Header>
          <div className="task_modal_sec">
            <p>
              <div className="row">
                <div className="col-md-6">
                  <div class="card" style={{ width: '14rem' }} onClick={(e) => {
                    e.preventDefault(
                    ); history.push(`/transporter/user/${transporterId}`);
                  }}>
                    <div class="card-body">
                      <h5 class="card-title">User List</h5>
                      <p class="card-text"></p>
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div class="card" style={{ width: '14rem' }}
                    onClick={(e) => {
                      e.preventDefault(
                      ); history.push(`/transporter/vehical/${transporterId}`);
                    }}>
                    <div class="card-body">
                      <h5 class="card-title">Vehical List</h5>
                      <p class="card-text"></p>
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div class="card" style={{ width: '14rem' }} onClick={(e) => {
                    e.preventDefault(
                    ); history.push(`/transporter/other/${transporterId}`);
                  }}>
                    <div class="card-body">
                      <h5 class="card-title">Order</h5>
                      <p class="card-text"></p>
                    </div>
                  </div>
                </div>
                {/* <div className="col-md-6">
                  <div class="card" style={{ width: '14rem' }}>
                    <div class="card-body">
                      <h5 class="card-title">Godown Address</h5>
                      <p class="card-text"></p>
                    </div>
                  </div>
                </div> */}

              </div>


            </p>
          </div>

        </div>
      </Modal >

      {/* OCR Details  */}
     
      < Modal
        show={ocrModal}
        onHide={() => setOcrModal(!ocrModal)}
        backdrop="static"
        size="lg"
      >
        <div className="apply_comp_sec">
          <Modal.Header closeButton>
            <h6 className="hed_txt">OCR Details</h6>
          </Modal.Header>
          <div className="task_modal_sec">
            <p>
              <div class="card" >
                  <div class="card-body">
                  <h5 class="card-title">{ocrDetails?.firm_name}</h5>
                  <p class="card-text">Office Address: {ocrDetails?.office_address}</p>
                  <p class="card-text">GST : {ocrDetails?.gst_number}</p>
                  <p class="card-text">Business Type: {ocrDetails?.business_type}</p>
                  <p class="card-text">Establishment Year: {ocrDetails?.establishment_year}</p>
                  
                  </div>
                
                 
              </div>


            </p>
          </div>

        </div>
      </Modal >
    </>
  );
};


