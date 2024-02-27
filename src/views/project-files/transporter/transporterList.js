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
  CSelect,
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



export default function TransporterList(props) {

  const history = useHistory();
  const [page, setPage] = useState(1)
  const [data, setData] = useState([])
  const [totalResults, setTotalResults] = useState(0)
  const [filteredData, setFilteredData] = useState([]);
  const [loader, setloader] = useState(0)
  // pagination setup
  const resultsPerPage = 10
  // const totalResults = response.length
  const fields = [
    // { key: 'photo', label: 'Photo', _style: { width: '8%' }, sorter: false, },
    { key: `firm_name`, label: "Name", _style: { width: "12%" } },
    { key: "transporter_code", label: "Email", _style: { width: "9%" } },
    'subscription_plan', 'subscription_validity',
    // { key: "date_of_birth", label: "Date Of Birth", _style: { width: "12%" } },
    // { key: "age", label: "Age", _style: { width: "10%" } },
    // { key: "status_name", label: "Status", _style: { width: "7%" } },
    { key: "created", label: "Created On", _style: { width: "8%" } },


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
    console.log(data);
    // setData(response.slice((page - 1) * resultsPerPage, page * resultsPerPage))
    // console.log(response);
    setData(data.slice((page - 1) * resultsPerPage, page * resultsPerPage))
  }, [page])


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

    // setLoader(1);
    Service.apiPostTokenCallRequest(RouteURL.transporterList, {})
      .then((res) => {
        if (res.err === Constants.API_RESPONSE_STATUS_SUCCESS) {
          setTotalResults(res.data.length);
          setData(res.data)
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
                  <h6 className="hed_txt pt-2">Dashboard</h6>
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
                  sorter
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
                  buttons={{
                    text: "hello",
                  }}
                  pagination
                  // onPageChange={(page) => console.log("page No", page)}
                  activePage={3}
                  scopedSlots={{

                  }}
                />
              </div>
            </div>
          </CCol>
        </CRow>
      </>
      {/* :<div className="card">
        <div className="card-body text-center p-5 text-danger">
            <h4>You have no permission to access admin panel.</h4>
        </div>
      </div>} */}
    </>
  );
};


