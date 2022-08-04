function createEmployeeRecord(empArray) {
    let empRecord = {
      firstName: empArray[0],
      familyName: empArray[1],
      title: empArray[2],
      payPerHour: empArray[3],
      timeInEvents: [],
      timeOutEvents: []
    }
    return empRecord
  }
  function createEmployeeRecords(empArrays) {
    return empArrays.map(element => {
      return createEmployeeRecord(element)
    })
  }
  function createTimeInEvent(timecard, dateStamp) {
    let timeInEvent = {
      type: "TimeIn",
      hour: parseInt((dateStamp).split(" ")[1]),
      date: dateStamp.split(" ")[0]
    }
    timecard.timeInEvents.push(timeInEvent)
    return timecard
  }
  function createTimeOutEvent(timecard, dateStamp) {
    let timeOutEvent = {
      type: "TimeOut",
      hour: parseInt((dateStamp).split(" ")[1]),
      date: dateStamp.split(" ")[0]
    }
    timecard.timeOutEvents.push(timeOutEvent)
    return timecard
  }
  function hoursWorkedOnDate(timecard, date){
    let timeIn = timecard.timeInEvents.find(event => event.date === date)
    let timeOut = timecard.timeOutEvents.find(event => event.date === date)
    let hoursWorked = (timeOut.hour - timeIn.hour) / 100
    return hoursWorked
  }
  function wagesEarnedOnDate(timecard, date) {
    let hoursWorked = hoursWorkedOnDate(timecard, date);
    let payOwed = hoursWorked * timecard.payPerHour;
    return payOwed;
  };
  function allWagesFor(timecard) {
    // find available dates
    const datesWorked = timecard.timeInEvents.map(event => event.date);
    const allWagesArray = datesWorked.map(date => wagesEarnedOnDate(timecard, date));
    const totalWages = allWagesArray.reduce((total, wageOfDay) => (total + wageOfDay), 0);
    return totalWages;
  }
  function calculatePayroll(employeesRecs) {
    const totalPay = employeesRecs.reduce((total, timecard) => total + allWagesFor(timecard), 0);
    return totalPay;
  };
  function findEmployeeByFirstName(srcArray, firstName) {
    const employee = srcArray.find(timecard => timecard.firstName === firstName);
    return employee;
  };


