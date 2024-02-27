/**
 * @file_purpose  page for showing dashboard of admin panel
 * @author Sarmistha Mondal
 * @Date_Created 
 * @Date_Modified 21-02-2023
 */
import React, { useState, useEffect } from 'react'
import {
  CBadge,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CDataTable,
  CRow,
  CFormGroup,
  CLabel,
  CSelect,
  CButton
} from '@coreui/react'
import Service from '../../../apis/Service';
import { useHistory } from 'react-router-dom'
import masterData from '../../../Utility/MasterData';
import Constants from '../../../Utility/Constants';
import moment from 'moment';
import { ToastContainer, toast } from 'react-toastify';
import defaultImg from '../../../assets/icons/user.png';
import Helpers from '../../../Utility/Helpers';
const Dashboard = () => {
  const history = useHistory();
  const arrMonths = masterData.months;
  const dateFormat = localStorage.getItem("date_format").toUpperCase();

  var arrYears = []
  for (let index = 2021; index <= new Date().getFullYear(); index++) {
    arrYears.push({
      id: index,
      name: index
    })
  }

  //Define states
  const [loadingData, setLoadingData] = useState(true);
  const [filter, setFilter] = useState({
    month: Helpers.getCurrentMonth(),
    year: Helpers.getCurrentYear(),
    company_id: 1,
  });


  const [confirmDueListData, setConfirmDueListData] = useState([]);
  const [loadingEmpStatusDueData, setLoadingEmpStatusDueData] = useState(true);
  const [empStatusDueLoader, setEmpStatusDueLoader] = useState(1);

  const [trainingDueListData, setTrainingDueListData] = useState([]);



  //Fields for showing user list
  const confirmationDueFields = [
    { key: 'profile_pic', label: 'Photo', _style: { width: '20%' }, sorter: false, },
    { key: 'fullname', label: 'Name', _style: { width: '25%' } },
    { key: 'employee_id', label: 'Employee ID', _style: { width: '10%' } },
    { key: 'designation', _style: { width: '15%' } },
    { key: 'joining_date', _style: { width: '15%' } },
    { key: 'probation_end_date', _style: { width: '15%' } },

  ]

  const trainingDueFields = [
    { key: 'profile_pic', label: 'Photo', _style: { width: '20%' }, sorter: false, },
    { key: 'fullname', label: 'Name', _style: { width: '25%' } },
    { key: 'employee_id', label: 'Employee ID', _style: { width: '10%' } },
    { key: 'designation', _style: { width: '15%' } },
    { key: 'joining_date', _style: { width: '15%' } },
    { key: 'training_end_date', _style: { width: '15%' } },

  ]


  useEffect(() => {
    /**
      * @author Sarmistha Mondal
      * @Date_Created 
      * @Date_Modified 21/02/2023
      * @function async
      * @functionName loadCompany
      * @functionPurpose this function gets company list.
      *
      * @functionParam {}
      * 
      * @functionSuccess Success status and message.
      *
      * @functionError {Boolean} error is there.
      * @functionError {String} message  Description message.
      */
    async function loadCompany() {
      Service.company().then(res => {
        if (res.message === "jwt expired") {
          localStorage.clear();
          history.push("/login")
          window.location.reload();
        }
        setLoadingData(false)
      }).catch(error => {
        if (error.response.status === 401) {
          localStorage.clear();
          history.push("/login")
          window.location.reload();
        }
      })
    }


    /**
     * @author Sarmistha Mondal
     * @Date_Created 
     * @Date_Modified 09/05/2023
     * @function async
     * @functionName loadEmployeeStatusDueList
     * @functionPurpose this function gets confirmation due list for employees.
     *
     * @functionParam {}
     * 
     * @functionSuccess Success status and message.
     *
     * @functionError {Boolean} error is there.
     * @functionError {String} message  Description message.
     */
    async function loadEmployeeStatusDueList() {
      let params = JSON.stringify({
        month: filter.month,
        year: filter.year,
      })
      Service.employeeStatusDueList(params).then(res => {
        if (res.status === Constants.API_RESPONSE_STATUS_SUCCESS) {
          setEmpStatusDueLoader(0)
          setConfirmDueListData(res.data.probation_employees)
          setTrainingDueListData(res.data.training_employees)
          setLoadingEmpStatusDueData(false)
        }
        else {
          toast.error(res.message, {
            position: toast.POSITION.BOTTOM_RIGHT
          });
        }
      }).catch(error => {
        if (error.response.status === 401) {
          localStorage.clear();
          history.push("/login")
          window.location.reload();
        }
      })
    }



    if (loadingData) {
      // if the result is not ready so you make the axios call
      loadCompany();
    }
    if (loadingEmpStatusDueData) {
      // if the result is not ready so you make the axios call
      loadEmployeeStatusDueList();
    }



  }, [loadingEmpStatusDueData]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFilter((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const SearchClick = (e) => {
    e.preventDefault();

    setLoadingEmpStatusDueData(true)
  }

  return (
    <>
      <div className="row">
        <div className="col">
          <div className="dashboard_sec">
           <div className="dash_upper">
              <CRow>
                <div className="col-sm-3 col-xxl-2 col-xl-3 col-md-4 col-sm-4 col-6">
                  <div className="team_member">
                    <CLabel>Month</CLabel>
                    <CSelect
                      custom
                      name="month"
                      id="month"
                      value={filter.month}
                      onChange={handleChange}
                    >
                      {arrMonths.map((month, index) => (
                        <option key={month.id} value={month.id}>
                          {month.name}
                        </option>
                      ))}
                    </CSelect>
                  </div>
                </div>
                <div className="col-sm-3 col-xxl-2 col-xl-3 col-md-4 col-sm-4 col-6">
                <div className="team_member">
                    <CLabel>Year</CLabel>
                    <CSelect
                      custom
                      name="year"
                      id="year"
                      value={filter.year}
                      onChange={handleChange}
                    >
                      {arrYears.map((year, index) => (
                        <option key={year.id} value={year.id}>
                          {year.name}
                        </option>
                      ))}
                    </CSelect>
                  </div>
                </div>

                <div className="col-sm-3 col-xxl-2 col-xl-3 col-md-4 col-sm-4 col-4">
                  <div className="comp_off_inn">
                  <div className="atten_sec">
                    <CButton
                      className="cancel"                      
                      style={{ marginTop: 26 }}
                      onClick={SearchClick}
                    >
                      Search
                    </CButton>
                  </div>
                  </div>
                </div>


              </CRow>
           </div>
            <div className="dash_down">
              <CRow>
              <CCol xs="12" lg="6">
                <CCard>
                 <h6 className="hed_txt">                
                    Confirmation Due List
                    </h6>   


                  <div className="dashboard_dwn leave_inn">
                    <CDataTable
                      items={confirmDueListData}
                      fields={confirmationDueFields}
                      hover
                      
                      // itemsPerPage={10}
                      itemsPerPage={5}
                      itemsPerPageSelect
                      loading={empStatusDueLoader ? empStatusDueLoader : ""}
                      noItemsViewSlot={empStatusDueLoader ? "Loading..." : ""}
                      tableFilter={{
                        placeholder: "Filter",
                        label: "Search:"
                      }}
                      pagination
                      scopedSlots={{
                        'profile_pic': (item) => (
                          (item.profile_pic == null || item.profile_pic === "") ?
                            <td>
                              <img src={defaultImg} height={100} width={120} alt="img" />

                            </td>
                            :
                            <td>
                              <img src={item.profile_pic} height={100} width={120} alt="img" />

                            </td>
                        ),

                        'joining_date': (item) => (
                          <td>
                            {item.joining_date ? moment(item.joining_date).format(dateFormat) : ""}
                          </td>
                        ),

                        'probation_end_date': (item) => (
                          <td>
                            {item.probation_end_date ? moment(item.probation_end_date).format(dateFormat) : ""}
                          </td>
                        ),

                        'designation': (item) => (
                          <td>
                            {Helpers.checkNull(item.designation)}
                          </td>
                        ),
                        'employment_id': (item) => (
                          <td>
                            {Helpers.checkNull(item.employment_id)}
                          </td>
                        ),


                      }}
                    />
                  </div>
                </CCard>
              </CCol>

              <CCol xs="12" lg="6">
                <CCard>
                <h6 className="hed_txt">   
                    Training Due List
                  </h6>
                  <div className="dashboard_dwn leave_inn">
                    <CDataTable
                      items={trainingDueListData}
                      fields={trainingDueFields}
                      hover
                      
                      // itemsPerPage={10}
                      itemsPerPage={5}
                      itemsPerPageSelect
                      loading={empStatusDueLoader ? empStatusDueLoader : ""}
                      noItemsViewSlot={empStatusDueLoader ? "Loading..." : ""}
                      tableFilter={{
                        placeholder: "Filter",
                        label: "Search:"
                      }}
                      pagination
                      scopedSlots={{
                        'profile_pic': (item) => (
                          (item.profile_pic == null || item.profile_pic === "") ?
                            <td>
                              <img src={defaultImg} height={100} width={120} alt="img" />

                            </td>
                            :
                            <td>
                              <img src={item.profile_pic} height={100} width={120} alt="img" />

                            </td>
                        ),

                        'joining_date': (item) => (
                          <td>
                            {item.joining_date ? moment(item.joining_date).format(dateFormat) : ""}
                          </td>
                        ),

                        'training_end_date': (item) => (
                          <td>
                            {item.training_end_date ? moment(item.training_end_date).format(dateFormat) : ""}
                          </td>
                        ),

                        'designation': (item) => (
                          <td>
                            {Helpers.checkNull(item.designation)}
                          </td>
                        ),
                        'employment_id': (item) => (
                          <td>
                            {Helpers.checkNull(item.employment_id)}
                          </td>
                        ),


                      }}
                    />
                  </div>
                </CCard>
              </CCol>
            </CRow>
            </div>
          </div>
        </div>
      </div>

    </>
  )
}

export default Dashboard
