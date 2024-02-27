import moment from 'moment';
const helpers = {
  toTitleCase: function (str) {
    return str.replace(/\w\S*/g, function (txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
  },
  getBadge: function (status) {
    switch (status) {
      case "active":
        return "success";
      case "inactive":
        return "danger";
      case "Pending":
        return "warning";
      case "Banned":
        return "danger";
      case "published":
        return "success";
      case "generated":
        return "danger";
      case "approved":
        return "success";
      case "rejected":
        return "danger";
      default:
        return "primary";
    }
  },

  getBadgeStatusChange: function (status) {
    switch (status) {
      case "active":
        return "danger";
      case "inactive":
        return "success";

      default:
        return "primary";
    }
  },

  getAttendanceApplicationStatus: function (status) {
    switch (status) {
      case 1:
        return "Approved";
      case 0:
        return "Rejected";
      default:
        return status;
    }
  },

  getAttendanceApplicationStatusReverse: function (status) {
    switch (status) {
      case 0:
        return "Approve";
      case 1:
        return "Reject";
      default:
        return status;
    }
  },

  getBadgeLeaveApplicationStatus: function (status) {
    switch (status) {
      case 1:
        return "primary";
      case 2:
        return "success";
      case 3:
        return "danger";
      case 4:
        return "danger";
      default:
        return "primary";
    }
  },

  getLeaveApplicationStatus: function (status) {
    switch (status) {
      case 0:
        return "";
      case 1:
        return "Pending";
      case 2:
        return "Approved";
      case 3:
        return "Rejected";
      case 4:
        return "Cancel";
      default:
        return "Deleted";
    }
  },

  getAttendanceApplicationStatus: function (status) {
    switch (status) {
      case 0:
        return "";
      case 1:
        return "Waiting for approval";
      case 2:
        return "Approved";
      case 3:
        return "Rejected";
      case 4:
        return "Cancel";
      default:
        return "Deleted";
    }
  },

  getLeaveType: function (type) {
    switch (type) {
      case "single_day":
        return "Single Day";
      case "multiple_days":
        return "Multiple Days";
      case "hours":
        return "Hours";
      default:
        return "Unknown";
    }
  },

  getAttendanceBtnColor: function (status) {
    switch (status) {
      case 0:
        return "primary";
      case 1:
        return "danger";
      case 2:
        return "success";
      case 3:
        return "warning";
      default:
        return "secondary";
    }
  },

  getSalaryBtnColor: function (status) {
    switch (status) {
      case 0:
        return "primary";
      case 1:
        return "success";
      case 2:
        return "secondary";
      default:
        return "primary";
    }
  },

  getSalaryStatus: function (status) {
    switch (status) {
      case 0:
        return "Generated";
      case 1:
        return "Published";
      case 2:
        return "Printed";
      default:
        return "Generated";
    }
  },

  convertDateToLocal: function (date) {
    if (date === null || date === "") {
      return "";
    }
    return new Date(date).toLocaleDateString().slice(0, 10);
  },
  convertDateToISO: function (date) {
    if (date === null || date === "") {
      return "";
    }
    return new Date(date).toISOString().slice(0, 10);
  },

  getCurrentMonth: function () {
    var d = new Date();
    var month = d.getMonth() + 1;
    return month;
  },

  getCurrentYear: function () {
    var d = new Date();
    var year = d.getFullYear();
    return year;
  },

  checkNull: function (value, defaultValue = "") {
    if (value === undefined || value === null) {
      return defaultValue;
    } else {
      return value;
    }
  },

  convertSecondsToHour: function (valueInSeconds, defaultValue = "") {
    if (valueInSeconds === undefined || valueInSeconds === null) {
      return defaultValue;
    } else {
      let hours = parseInt(valueInSeconds / 3600);
      let seconds = valueInSeconds % 3600;
      var minutes = 0;
      if (seconds > 0) {
        minutes = parseInt(seconds / 60);
      }
      let hoursString =
        (hours > 9 ? hours : "0" + hours) +
        ":" +
        (minutes > 9 ? minutes : "0" + minutes);
      return hoursString;
    }
  },

  convertPayslipMonthYear: function (month, year) {
    let payslip_month = month + " - " + year;
    return payslip_month;
  },

  getLeaveTypeName: function (leave_type) {
    switch (leave_type) {
      case "single_day":
        return "Single Day";
      case "multiple_days":
        return "Multiple Days";
      case "hours":
        return "Hours";
      default:
        return leave_type;
    }
  },

  getJobEmploymentTypeName: function (employment_type) {
    switch (employment_type) {
      case "contractual":
        return "Contractual";
      case "full_time":
        return "Full Time";
      case "part_time":
        return "Part Time";
      default:
        return employment_type;
    }
  },

  getBadgeJobStatus: function (status) {
    switch (status) {
      case "published":
        return "success";
      case "unpublished":
        return "danger";
      default:
        return "primary";
    }
  },

  getJobStatusName: function (status) {
    switch (status) {
      case "published":
        return "Published";
      case "unpublished":
        return "Unpublished";
      default:
        return status;
    }
  },

  getJobInterviewStatusName: function (status) {
    switch (status) {
      case "scheduled":
        return "Scheduled";
      case "completed":
        return "Completed";
      case "cancelled":
        return "Cancelled";
      default:
        return status;
    }
  },
  getBadgeJobApplicantStatus: function (status) {
    switch (status) {
      case 0:
        return "primary";
      case 1:
        return "success";
      case 2:
        return "danger";
      default:
        return "primary";
    }
  },
  getBadgeJobInterviewStatus: function (status) {
    switch (status) {
      case "scheduled":
        return "primary";
      case "completed":
        return "success";
      case "cancelled":
        return "danger";
      default:
        return "primary";
    }
  },
  getHolidayLocationName: function (location) {
    switch (location) {
      case "kolkata":
        return "Kolkata";
      case "delhi":
        return "Delhi";
      default:
        return location;
    }
  },

  getPayrollHeadName: function (column) {
    let fields = column.split("_");
    var columnName = "";
    for (let i = 3; i < fields.length; i++) {
      columnName = columnName + " " + fields[i];
    }
    return columnName;
  },

  getPayrollHeadType: function (column) {
    let fields = column.split("_");
    return fields[2];
  },

  getPayrollHeadId: function (column) {
    let fields = column.split("_");
    return fields[1];
  },

  trimString: function (string, showCharacters = 50) {
    if (string === undefined || string === null) {
      return "";
    }
    var trimmedString =
      string.length > showCharacters
        ? string.substring(0, showCharacters - 3) + "..."
        : string;
    return trimmedString;
  },

  getDifferenceInDays: function (date1, date2) {
    const diffDays = Math.ceil(
      Math.abs(new Date(date2) - new Date(date1)) / (1000 * 60 * 60 * 24)
    );
    return diffDays;
  },

  getReverseDate: function (date) {
    const dateVal = date.split("/").reverse().join("/");
    return dateVal;
  },

  getSplit: function (date) {
    const dateVal = date.split("/");
    return dateVal;
  },

  getActiveEmployee: function () {
    var status = "active";
    return status;
  },

  getMonthName: function (month) {
    return [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ][month - 1];
  },

  getDiff_hours: function (dt2, dt1) {
    var diff = (dt2 - dt1) / 1000;
    diff /= 60 * 60;
    return Math.abs(Math.round(diff));
  },

  getDaysInMonth: function (month, year) {
    var date = new Date(year, month, 1);
    var days = [];
    while (date.getMonth() === month) {
      days.push(new Date(date));
      date.setDate(date.getDate() + 1);
    }
    return days;
  },

  getJobInStatus: function (status) {
    switch (status) {
      case "scheduled":
        return "Scheduled";
      case "selected":
        return "Selected";
      case "rejected":
        return "Rejected";
      case "candidate not available":
        return "Candidate Not Available";
      case "on hold":
        return "On Hold";
      default:
        return "Not Selected";
    }
  },

  getJobInStatusButton: function (status) {
    switch (status) {
      case "scheduled":
        return "primary";
      case "selected":
        return "success";
      case "rejected":
        return "danger";
      case "candidate not available":
        return "danger";
      case "on hold":
        return "warning";
      default:
        return "danger";
    }
  },

  convertTime12To24(time) {
    var hours = Number(time.match(/^(\d+)/)[1]);
    var minutes = Number(time.match(/:(\d+)/)[1]);
    var AMPM = time.match(/\s(.*)$/)[1];
    if (AMPM === "PM" && hours < 12) hours = hours + 12;
    if (AMPM === "AM" && hours === 12) hours = hours - 12;
    var sHours = hours.toString();
    var sMinutes = minutes.toString();
    if (hours < 10) sHours = "0" + sHours;
    if (minutes < 10) sMinutes = "0" + sMinutes;
    return sHours + ":" + sMinutes;
  },
  tConvert(time) {
    // Check correct time format and split into components
    time = time
      .toString()
      .match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];

    if (time.length > 1) {
      // If time format correct
      time = time.slice(1); // Remove full string match value
      time[5] = +time[0] < 12 ? " AM" : " PM"; // Set AM/PM
      time[0] = +time[0] % 12 || 12; // Adjust hours
    }
    return time.join(""); // return adjusted time or original string
  },

  toUpperCase(str) {
    const arr = str.split("_");

    const result = [];

    for (const word of arr) {
      result.push(word.charAt(0).toUpperCase() + word.slice(1));
    }

    return result.join("  ");
  },
  getDocumentCategoryType: function (category) {
    switch (category) {
      case "appointment_letter":
        return "Appointment Letter";
      case "offer_letter":
        return "Offer Letter";

      default:
        return "No Value";
    }
  },
  getLeaveApplicationBtnColor: function (status) {
    switch (status) {
      case "pending":
        return "warning";
      case "approved":
        return "success";
      case "rejected":
        return "danger";
      default:
        return "secondary";
    }
  },

  getTaxDeclarationStatus: function (status) {
    switch (status) {
      case -1:
        return "Request Not Sent";
      case 0:
        return "Request Sent";
      case 1:
        return "Declaration Submitted";
      case 2:
        return "Closed";
      case 3:
        return "Request Send For Scheme Choose";
      case 4:
        return "Scheme Details Submitted";
      default:
        return "No Value";
    }
  },

  getTaxDeclarationBtnColor: function (status) {
    switch (status) {
      case -1:
        return "danger";
      case 0:
        return "primary";
      case 1:
        return "success";
      case 2:
        return "warning";
      case 3:
        return "danger";
      case 4:
        return "success";
      default:
        return "secondary";
    }
  },
  getTaxSubcategoryStatus: function (status) {
    switch (status) {
      case 0:
        return "Pending";
      case 1:
        return "Approved";
      case 2:
        return "Rejected";
      default:
        return "No Value";
    }
  },

  getTaxSubcategoryBtnColor: function (status) {
    switch (status) {
      case 0:
        return "primary";
      case 1:
        return "success";
      case 2:
        return "danger";
      default:
        return "secondary";
    }
  },
  lead_getBadge: function (status) {
    switch (status) {
      case "Pending":
        return "primary";
      case "Rejected":
        return "danger";
      case "In Review":
        return "info";
      case "Query Submitted":
        return "warning";
      case "Proposal Submitted":
        return "success";
      case "Closed":
        return "danger";
      default:
        return "primary";
    }
  },

  findTotalWorkingHours: function (date_in, date_out, login_time, logout_time) {
    let new_logout_time, new_date_out;
    var currentDate = new Date();
    if (logout_time == "" || logout_time == null) {

      var currentHour = currentDate.getHours();
      var currentMinute = currentDate.getMinutes();
      new_logout_time = currentHour + ":" + currentMinute
    } else {
      new_logout_time = logout_time
    }

    if (date_out == null || date_out == "" || date_out == "Invalid date" || logout_time == "" || logout_time == null) {
      new_date_out = moment(currentDate).format('YYYY/MM/DD');
    } else {
      new_date_out = date_out
    }
    if (date_in && new_date_out && login_time && new_logout_time) {
      let temp = login_time.split(':');
      let intime = temp[0] + ":" + temp[1];
      temp = new_logout_time.split(':');
      let outtime = temp[0] + ":" + temp[1];
      let indatetime = new Date(`${date_in} ${intime}`);
      let outdatetime = new Date(`${new_date_out} ${outtime}`);
      let diff = Math.floor((outdatetime - indatetime) / 1000);
      return diff;

    } else {
      return 0;
    }
  },


  findTotalWorkingHoursWithWorkingDay: function (date_in, date_out, login_time, logout_time, last_login_time, workingDays) {
    const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let new_logout_time, new_date_out;
    var currentDate = new Date();
    if (logout_time == "" || logout_time == null) {
      var currentHour = currentDate.getHours();
      var currentMinute = currentDate.getMinutes();
      new_logout_time = currentHour + ":" + currentMinute
    } else {
      new_logout_time = logout_time
    }

    if (date_out == null || date_out == "" || date_out == "Invalid date" || logout_time == "" || logout_time == null) {
      const get_day = new Date(date_in).getDay();
      let particular_day_working_details = workingDays.filter(e => (e.day_name == dayNames[get_day]))
      let working_end_hours = particular_day_working_details.length > 0 ? particular_day_working_details[0].end_hours : "0:00 AM";
      let convert_end_hour = this.convertTime12To24(working_end_hours)
      if (convert_end_hour >= last_login_time) {
        new_logout_time = convert_end_hour
      } else {
        new_logout_time = last_login_time
      }
      // new_date_out = moment(currentDate).format('YYYY/MM/DD');
      new_date_out = date_in;
    } else {
      new_date_out = date_out
    }
    if (date_in && new_date_out && login_time && new_logout_time) {
      let temp = login_time.split(':');
      let intime = temp[0] + ":" + temp[1];
      let temp1 = new_logout_time.split(':');
      let outtime = temp1[0] + ":" + temp1[1];
      let indatetime = new Date(`${date_in} ${intime}`);
      let outdatetime = new Date(`${new_date_out} ${outtime}`);
      var current_date = new Date();
      let finalOutTime;
      if (current_date > outdatetime) {
        finalOutTime = outdatetime
      } else {
        finalOutTime = current_date
      }

      let diff = Math.floor((finalOutTime - indatetime) / 1000);
      return diff;

    } else {
      return 0;
    }
  },

  calculateTimeDiff: function (firstdatetime, seconddatetime) {
    const diff = moment(seconddatetime, "DD/MM/YYYY").diff(moment(firstdatetime, "DD/MM/YYYY"), 'month');
    return diff;
  },

  calculateDayTimeDiff: function (firstdatetime, seconddatetime) {
    const diff = moment(seconddatetime, "DD/MM/YYYY").diff(moment(firstdatetime, "DD/MM/YYYY"), 'days');
    return Math.abs(diff);
  },

  getCompanyName: function (company_id) {
    switch (company_id) {
      case "1":
        return "Red Apple Technology";
      case "2":
        return "Red Apple Learning";
      case "3":
        return "ThinkTrek Private Limited";
      default:
        return "Red Apple Technology";
    }
  },
  parseJwt: function (token) {
    if (!token) {
      return;
    }
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace("-", "+").replace("_", "/");
    return JSON.parse(window.atob(base64));
  },
  trim: function (x) {
    let value = String(x)
    return value.replace(/^\s+|\s+$/gm, '')
  },
  isEmpty: function (value) {
    if (value === null || value === undefined || this.trim(value) === '' || value.length === 0) {
      return true
    } else {
      return false
    }
  },

  getParticipantStatus: function (status) {
    switch (status) {
      case "invited":
        return "Invited";
      case "present":
        return "Present";
      case "absent":
        return "Absent";
      case "busy":
        return "Busy with other work";
      default:
        return "None";
    }
  },

  capitalizeFLetter: function (string) {
    let str = string[0].toUpperCase() + string.slice(1);
    return str;
  },

  getReimbursementStatusColor: function (status) {
    switch (status) {
      case 'pending':
        return "primary";
      case 'approved':
        return "success";
      case 'rejected':
        return "danger";
      default:
        return "secondary";
    }
  },

  getReimbursementPaymentStatusColor: function (status) {
    switch (status) {
      case 'pending':
        return "primary";
      case 'done':
        return "success";
      case 'in_progress':
        return "warning";
      default:
        return "secondary";
    }
  },

  secondsToHms: function (value) {
    return Math.floor(value / 60) + ":" + (value % 60 ? value % 60 : '00')
  },

  getMonthList: function (status) {
    switch (status) {
      case "1":
        return "January";
      case "2":
        return "February";
      case "3":
        return "March";
      case "4":
        return "April";
      case "5":
        return "May";
      case "6":
        return "June";
      case "7":
        return "July";
      case "8":
        return "August";
      case "9":
        return "September";
      case "10":
        return "October";
      case "11":
        return "November";
      case "12":
        return "December";
      default:
        //  var d = new Date();
        //  var month = d.getMonth() + 1;
        //  return month;

        let date = new Date();
        let Month = date.toLocaleString('default', { month: 'long' });
        return Month;
    }
  },
  createPrefix: function (string) {
    return string.match(/\b(\w)/g).join('')
  },
  yearsList: function () {
    let currentYear = new Date().getFullYear(), years = [];
    let startYear = 2011;
    while (startYear <= currentYear) {
      years.push(startYear++);
    }
    return years;
  },
  calculateTimeDiffInMinutes: function (start_time, end_time) {
    var beginningTime = moment(start_time, "H:mm");
    var closeTime = moment(end_time, "H:mm");
    var diffTime = moment(closeTime).diff(moment(beginningTime), 'minutes')
    return diffTime;
  },

  getCvStatus: function (cv_status) {
    switch (cv_status) {
      case "pending":
        return "CV Feedback Pending";
      case "selected":
        return "CV Shortlisted";
      case "rejected":
        return "CV Rejected";
      case "documentation_initiated":
        return "Documentation Initiated";
      case "documentation_rejected":
        return "Documentation Rejected";
      case "offered":
        return "Offered";
      case "offer_accepted":
        return "Offer Accepted";
      case "offer_rejected":
        return "Offer Rejected";
      case "not_interested":
        return "Not Interested";
      case "on_hold":
        return "On Hold";
      case "onboarded":
        return "Joined";
      case "not_joined":
        return "Not Joined";

      default:
        return "";
    }
  },

  isThisDecimal: function (val) {
    if (val % 1 === 0) {
      return false; // decimal 
    }
    return true; // number
  },
  getColorCode: function (level) {
    switch (level) {
      case 1:
        return "#0c5743";
      case 2:
        return "#1a6edb";
      case 3:
        return "#4d1adb";
      case 4:
        return "#0c6607";
      case 5:
        return "#08543c";
      case 6:
        return "#13759c";
      case 7:
        return "#ad102f";
      case 8:
        return "#fcba03";
      case 9:
        return "#1a6edb";
      case 10:
        return "#4d1adb";

      default:
        return "#000";
    }
  },
  getAge: function (dateOfBirth) {

    const now = new Date().getFullYear();
    // console.log(parseInt(dateOfBirth), now);
    const diff = Math.abs(now - parseInt(dateOfBirth));
    // console.log(diff);
    // const age = Math.floor(diff / (1000 * 60 * 60 * 24 * 365));

    return diff
  },
  NumberValidation: function (value) {
    let numberRegex = /^\d+$/;
    let valid = numberRegex.test(value)
    return valid;
  },
  leftTrim: function (string) {
    return (string ?? "").toString().trimStart();
  },
};

export default helpers;
