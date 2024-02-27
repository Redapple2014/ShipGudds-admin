const masterData = {
  months: [
    { id: 1, name: 'January' },
    { id: 2, name: 'February' },
    { id: 3, name: 'March' },
    { id: 4, name: 'April' },
    { id: 5, name: 'May' },
    { id: 6, name: 'June' },
    { id: 7, name: 'July' },
    { id: 8, name: 'August' },
    { id: 9, name: 'September' },
    { id: 10, name: 'October' },
    { id: 11, name: 'November' },
    { id: 12, name: 'December' }
  ],
  years: [
    { id: 2017, name: '2017' },
    { id: 2018, name: '2018' },
    { id: 2019, name: '2019' },
    { id: 2020, name: '2020' },
    { id: 2021, name: '2021' },
    { id: 2022, name: '2022' },
    { id: 2023, name: '2023' },
    { id: 2024, name: '2024' },
    { id: 2025, name: '2025' },
    { id: 2026, name: '2026' },
    { id: 2027, name: '2027' },
    { id: 2028, name: '2028' },
    { id: 2029, name: '2029' },
    { id: 2030, name: '2030' },
  ],
  leaveCategories: [
    { id: 1, name: 'Casual' },
    { id: 2, name: 'Medical' },
  ],
  leaveApplicationStatuses: [
    { id: 1, name: 'Pending' },
    { id: 2, name: 'Approved' },
    { id: 3, name: 'Rejected' },
    { id: 4, name: 'Cancel' }
  ],
  jobStatuses: [
    { id: 'published', name: 'Published' },
    { id: 'unpublished', name: 'Unpublished' },
  ],
  jobEmploymentTypes: [
    { id: 'contractual', name: 'Contractual' },
    { id: 'full_time', name: 'Full Time' },
    { id: 'part_time', name: 'Part Time' },
    { id: "trainee", name: "Trainee" }
  ],

  jobVisibility: [
    { id: 'internal', name: 'Internal' },
    { id: 'website', name: 'Website' },
    { id: 'all', name: 'All' },
  ],

  jobApplicantStatus: [
    { id: 0, name: 'Pending' },
    { id: 1, name: 'Accepted' },
    { id: 2, name: 'Rejected' },
  ],
  jobInterviewStatuses: [
    { id: 'scheduled', name: 'Scheduled' },
    { id: 'selected', name: 'Selected' },
    { id: 'rejected', name: 'Rejected' },
    { id: 'candidate not available', name: 'Candidate Not Available' },
    { id: 'on hold', name: 'On Hold' },
    { id: 'cancelled', name: 'Cancelled' },
  ],
  holidayLocations: [
    { id: 'kolkata', name: 'Kolkata' },
    { id: 'delhi', name: 'Delhi' }
  ],
  usersType: [
    { id: 'kolkata', name: 'Admin' },
    { id: 'Client', name: 'Client' },
    { id: 'delhi', name: 'Staff' }
  ],
  userLocations: [
    { id: 'kolkata', name: 'Kolkata' },
    { id: 'delhi', name: 'Delhi' },
    { id: 'bangalore', name: 'Bangalore' }
  ],
  userFilter: [
    { id: 'all', name: 'All Employees' },
    { id: 'active', name: 'Active Employees' },
    { id: 'deactive', name: 'Inactive Employees' },
    { id: 'department', name: 'Department' },
  ],
  sortByFilter: [
    { id: 'employeeName', name: 'Employee Name' },
    { id: 'joiningDate', name: 'Date of Joining' },
  ],
  leaveStatusFilter: [
    { id: 'all', name: 'All Employees' },
    { id: 'active', name: 'Active Employees' },
    { id: 'inactive', name: 'Inactive Employees' },
  ],
  leaveCategory: [
    { id: 'casual', name: 'Casual' },
    { id: 'medicalleave', name: 'Medical Leave' },
  ],
  leaveDuration: [
    { id: 'single_day', name: 'Single day' },
    { id: 'multiple_days', name: 'Multiple days' },
    { id: 'hours', name: 'Hours' },
  ],
  leaveHours: [
    { id: '2', name: '0.25' },
    { id: '4', name: '0.5' },
    { id: '6', name: '0.75' },
  ],

  clockHistoryStatus: [
    { id: '1', name: 'Pending' },
    { id: '2', name: 'Approved' },
    { id: '3', name: 'Rejected' },
  ],
  leaveSearchStatus: [
    { id: 'all', name: 'All' },
    { id: 'pending', name: 'Pending' },

  ],
  source: [
    { id: 'website', name: 'Website' },
    { id: 'linkedIn', name: 'LinkedIn' },
    { id: 'indeed', name: 'Indeed' },
    { id: 'others', name: 'Others' },
  ],
  work_location: [
    { id: 'Work From Home', name: 'Work From Home' },
    { id: 'Work From Office', name: 'Work From Office' },
    // { id: 'Remote', name: 'Remote' },
  ],
  cvStatuses: [
    { id: "pending", name: "CV Feedback Pending" },
    { id: "selected", name: "CV Shortlisted" },
    { id: "rejected", name: "CV Rejected" },
    { id: "documentation_initiated", name: "Documentation Initiated" },
    { id: "documentation_rejected", name: "Documentation Rejected" },
    { id: "offered", name: "Offered" },
    { id: "offer_accepted", name: "Offer Accepted" },
    { id: "offer_rejected", name: "Offer Rejected" },
    { id: "not_interested", name: "Not Interested" },
    { id: "on_hold", name: "On Hold" },
    { id: 'onboarded', name: 'Joined' },
    { id: 'not_joined', name: 'Not Joined' }
  ],
  officeTime: [
    { id: 'everyday', name: 'Every Day Same Time' },
    { id: 'different', name: 'Set Different Time' },
  ],
  days: [
    { id: 1, name: 'Saturday' },
    { id: 2, name: 'Sunday' },
    { id: 3, name: 'Monday' },
    { id: 4, name: 'Tuesday' },
    { id: 5, name: 'Wednesday' },
    { id: 6, name: 'Thursday' },
    { id: 7, name: 'Friday' },
  ],
  gender: [
    { id: 'Male', name: 'Male' },
    { id: 'Female', name: 'Female' },
    { id: 'Others', name: 'Others' },
  ],
  documentCategory: [
    { id: 'appointment_letter', name: 'Appointment Letter' },
    // {id: 'offer_letter', name:'Offer Letter'},
  ],
  declarationStatus: [
    { id: 0, name: 'Request Sent' },
    { id: 1, name: 'Declaration Submitted' },
    { id: 2, name: 'Closed' },
  ],
  clockInCategory: [
    { id: 0, name: 'Manual Clock In/Out' },
    { id: 1, name: 'ESSL Clock In/Out' },
  ],
  policyMode: [
    { id: 'public', name: 'Public' },
    { id: 'private', name: 'Private' },
    { id: 'shared', name: 'Shared' },
  ],
  inventoryAttributeType: [
    { id: 'single_line', name: 'Single Line' },
    { id: 'multi_line', name: 'Multiple Line' },
    { id: 'date', name: 'Date' },
    { id: 'list', name: 'List' }
  ],

  fieldType: [
    { id: 'single_line_text', name: 'Single Line' },
    { id: 'multiline_text', name: 'Multiple Line' },
    { id: 'date', name: 'Date' },
    { id: 'checkbox', name: 'Checkbox' },
    { id: 'radio_button', name: 'Radio Button' },
    { id: 'list', name: 'List' }
  ],

  inventoryNotifyAt: [
    { id: 30, name: '30 min before' },
    { id: 1440, name: '1 day before' },
    { id: 10080, name: '1 week before' },
    { id: 43800, name: '1 month before' }
  ],

  assetAllocationStatus: [
    { id: 2, name: 'All' },
    { id: 1, name: 'Assign' },
    { id: 0, name: 'Unassign' },
  ],

  interviewFeedbackCategoryAttributeType: [
    { id: 'input', name: 'input' },
    { id: 'textarea', name: 'textarea' }
  ],

  trackerReportType: [
    { id: 'daily', name: 'Daily' },
    { id: 'weekly', name: 'Weekly' },
    { id: 'monthly', name: 'Monthly' },
  ],
  dateDutation: [
    { key: "Today", label: "Today" },
    { key: "Tomorrow", label: "Tomorrow" },
    { key: "In 2 business days", label: "In 2 business days" },
    { key: "In 3 business days", label: "In 3 business days" },
    { key: "In 1 week", label: "In 1 week" },
    { key: "In 2 weeks", label: "In 2 weeks" },
    { key: "In 1 month", label: "In 1 month" },
    { key: "In 3 months", label: "In 3 months" },
    { key: "In 6 months", label: "In 6 months" },
    { key: "Custom Date", label: "Custom Date" },
  ],
  reminderOptions: [
    { id: "No Reminder", label: "No Reminder" },
    { id: "At task due time", label: "At task due time" },
    { id: "30 minutes before", label: "30 minutes before" },
    { id: "1 hour before", label: "1 hour before" },
    { id: "1 day before", label: "1 day before" },
    { id: "1 week before", label: "1 week before" },
    { id: "Custom Date", label: "Custom Date" },
  ],

  leaveDeductionArr: [
    { id: '1', name: '1' },
    { id: '0.75', name: '0.75' },
    { id: '0.5', name: '0.5' },
    { id: '0.25', name: '0.25' },
    { id: '0', name: '0' },
  ],
  meetingOutcomeList: [
    { id: 0, name: "(No value)" },
    { id: 1, name: "Scheduled" },
    { id: 2, name: "Completed" },
    { id: 3, name: "Rescheduild" },
    { id: 4, name: "No Show" },
    { id: 5, name: "Canceled" },
  ],
  meetingDuration: [
    { id: 15, name: "15 Minutes" },
    { id: 30, name: "30 Minutes" },
    { id: 45, name: "45 Minutes" },
    { id: 60, name: "1 Hours" },
    { id: 90, name: "1.5 Hours" },
    { id: 120, name: "2 Hours" },
  ],

  trainingAttendanceStatus: [
    { id: 'present', name: "Present" },
    { id: 'absent', name: "Absent" },
    { id: 'none', name: "None" },
  ],
  ticketStatus: [
    { id: 'open', name: "Open" },
    { id: 'in_progress', name: "In Progress" },
    { id: 'closed', name: "Closed" },
  ],

  trainingParticipantAttendance: [
    { id: 'invited', name: "Invited" },
    { id: 'present', name: "Present" },
    { id: 'absent', name: "Absent" },
    { id: 'busy', name: "Busy with other work" },
  ],
  arrMenuDetails: [
    {
      id: [
        "/transporter",
       
      ],
      details: [
        { url: `/transporter`, name: "Employee" },
        // { url: "/user/leave-details", name: "Leave" },
        // { url: "/user/salary-configurations", name: "Salary Configuration" },
        // { url: "/user/attendance-details", name: "Attendance" },
        // { url: "/user/documents", name: "Documents" }
      ],
    }
  ],

  bankPaymentMode: [
    { id: 'cash', name: "Cash" },
    { id: 'bank_transfer', name: "Bank Transfer" },
  ],
  taxDayType: [
    { id: 'company', name: 'Company' },
    { id: 'individual', name: 'Individual' },
  ],
  dataMiningPurpose: [
    { id: 'game', name: 'Game' },
    { id: 'web', name: 'Web' },
    { id: 'app', name: 'App' },
    { id: 'general', name: 'General' },
  ],
  reimbursementStatuses: [
    { id: 'pending', name: 'Pending' },
    { id: 'approved', name: 'Approved' },
    { id: 'rejected', name: 'Rejected' },
  ],

  dataMiningIndustry: [
    { id: 'Aerospace & Defense', name: 'Aerospace & Defense' },
    { id: 'Automotive', name: 'Automotive' },
    { id: 'Banking, Finance, Insurance', name: 'Banking, Finance, Insurance' },
    { id: 'Communication, Media & Entertainment', name: 'Communication, Media & Entertainment' },
    { id: 'Chemicals', name: 'Chemicals' },
    { id: 'Consumer Goods', name: 'Consumer Goods' },
    { id: 'Construction', name: 'Construction' },
    { id: 'Casino', name: 'Casino' },
    { id: 'Education', name: 'Education' },
    { id: 'Entertainment', name: 'Entertainment' },
    { id: 'Electronics', name: 'Electronics' },
    { id: 'Energy & Utilities', name: 'Energy & Utilities' },
    { id: 'Government', name: 'Government' },
    { id: 'Game', name: 'Game' },
    { id: 'High Tech', name: 'High Tech' },
    { id: 'Information Services', name: 'Information Services' },
    { id: 'Life Science', name: 'Life Science' },
    { id: 'Manufacturing', name: 'Manufacturing' },
    { id: 'Mining', name: 'Mining' },
    { id: 'Natural Resource', name: 'Natural Resource' },
    { id: 'Oil & Gas', name: 'Oil & Gas' },
    { id: 'Public Services', name: 'Public Services' },
    { id: 'Restaurants', name: 'Restaurants' },
    { id: 'Retail', name: 'Retail' },
    { id: 'Travel, Tourism & Transport', name: 'Travel, Tourism & Transport' },
    { id: 'Telecommunications', name: 'Telecommunications' },
    { id: 'Utilities', name: 'Utilities' },
  ],

  dataMiningNoOfEmp: [
    { id: '1-10', name: '1-10' },
    { id: '11-50', name: '11-50' },
    { id: '51-200', name: '51-200' },
    { id: '201-500', name: '201-500' },
    { id: '501-Above', name: '501-Above' },
  ],

  exceptionStatus: [
    { id: '0', name: 'Pending' },
    { id: '1', name: 'Approved' },
    { id: '2', name: 'Rejected' },
  ],
  rate: [
    { id: -1, name: "NA" },
    { id: 0, name: "0" },
    { id: 1, name: "1" },
    { id: 1.5, name: "1.5" },
    { id: 2, name: "2" },
    { id: 2.5, name: "2.5" },
    { id: 3, name: "3" },
    { id: 3.5, name: "3.5" },
    { id: 4, name: "4" },
    { id: 4.5, name: "4.5" },
    { id: 5, name: "5" },
    { id: 5.5, name: "5.5" },
    { id: 6, name: "6" },
    { id: 6.6, name: "6.5" },
    { id: 7, name: "7" },
    { id: 7.5, name: "7.5" },
    { id: 8, name: "8" },
    { id: 8.5, name: "8.5" },
    { id: 9, name: "9" },
    { id: 9.5, name: "9.5" },
    { id: 10, name: "10" },
  ],
  projectTaskType: [
    { id: 'user_story', name: "User Story" },
    { id: 'task', name: "Task" },
  ],
  timeSheetDurations: [
    { id: "total_hours", name: "Total Hours" },
    { id: "start_end_time", name: "Start & End Time" }
  ],
  projectIsBillableList: [
    { id: 1, name: "Billable" },
    { id: 0, name: "Non-billable" },

  ],

  feedbackMarks: [
    { id: 0, name: "0" },
    { id: 1, name: "1" },
    { id: 1.5, name: "1.5" },
    { id: 2, name: "2" },
    { id: 2.5, name: "2.5" },
    { id: 3, name: "3" },
    { id: 3.5, name: "3.5" },
    { id: 4, name: "4" },
    { id: 4.5, name: "4.5" },
    { id: 5, name: "5" },
    { id: 5.5, name: "5.5" },
    { id: 6, name: "6" },
    { id: 6.6, name: "6.5" },
    { id: 7, name: "7" },
    { id: 7.5, name: "7.5" },
    { id: 8, name: "8" },
    { id: 8.5, name: "8.5" },
    { id: 9, name: "9" },
    { id: 9.5, name: "9.5" },
    { id: 10, name: "10" },
    { id: -1, name: "NA" },
  ],
  contactType: [
    { id: 1, name: "Upload CSV" },
    { id: 2, name: "Select from list" }
  ],
  sequenceStatus: [
    { id: "start_now", name: "Start Now" },
    { id: "schedule", name: "Schedule" }
  ],
  timeBetweenStep: [
    { id: "minutes", name: "minutes" },
    { id: "hours", name: "hours" },
    { id: "days", name: "days" }
  ],

  hourArray: [
    { id: 1, name: "1" },
    { id: 2, name: "2" },
    { id: 3, name: "3" },
    { id: 4, name: "4" },
    { id: 5, name: "5" },
    { id: 6, name: "6" },
    { id: 7, name: "7" },
    { id: 8, name: "8" },
    { id: 9, name: "9" },
    { id: 10, name: "10" },
    { id: 11, name: "11" },
    { id: 12, name: "12" },
    { id: 13, name: "13" },
    { id: 14, name: "14" },
    { id: 15, name: "15" },
    { id: 16, name: "16" },
    { id: 17, name: "17" },
    { id: 18, name: "18" },
    { id: 19, name: "19" },
    { id: 20, name: "20" },
    { id: 21, name: "21" },
    { id: 22, name: "22" },
    { id: 23, name: "23" },
    { id: 24, name: "24" },
  ],

  minArray: [
    { id: 0, name: "0" },
    { id: 5, name: "5" },
    { id: 10, name: "10" },
    { id: 15, name: "15" },
    { id: 20, name: "20" },
    { id: 25, name: "25" },
    { id: 30, name: "30" },
    { id: 35, name: "35" },
    { id: 40, name: "40" },
    { id: 45, name: "45" },
    { id: 50, name: "50" },
    { id: 55, name: "55" },
    { id: 60, name: "60" },
  ],
  getVisibility: [
    { id: 'public', name: "Public" },
    { id: 'private', name: "Private" },
    { id: 'shared', name: "Shared" }
  ],
  getEffortType: [
    { id: 'internal', name: "Internal" },
    { id: 'change_request', name: "Change Request" },
  ],
  getFilter: [
    { id: 'all', name: "All" },
    { id: 'current', name: "Current" },
    { id: 'previous', name: "Previous" },
  ],



}
export default masterData
