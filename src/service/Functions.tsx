export const FormatDate = (dateStr:any, type:number) => {
  const dateD = new Date(dateStr);
  let date, month, year;
  date = dateD.getDate();
  month = dateD.getMonth() + 1;
  year = dateD.getFullYear();

  date = date.toString().padStart(2, '0');
  month = month.toString().padStart(2, '0');
  if (type === 0) {
    return `${year.toString().slice(2)}.${month}.${date}`;
  }
}

export const FormatDateTime = (dateStr:any, type:number) => {
  const dateD = new Date(dateStr);
  let date, month, year, time, weekday;
  date = dateD.getDate();
  month = dateD.getMonth() + 1;
  year = dateD.getFullYear();
  time = dateD.toLocaleTimeString("en-GB", { hour: "numeric", minute: "numeric" });
  weekday = dateD.getDay();

  date = date.toString().padStart(2, '0');
  month = month.toString().padStart(2, '0');

  const dayText = ['일', '월', '화', '수', '목', '금', '토']
  
  if (type === 0) {
      return {date: `${year.toString().slice(2)}.${month}.${date}(${dayText[weekday]})`, time: `${time}`};
  } else {
    return {date: `${year.toString().slice(2)}.${month}.${date}`, time: `${time}`};
  }
}

export const FormatDateRange = (startDate:any, endDate:any) => {
  const sDate = new Date(startDate);
  const eDate = new Date(endDate);
  let sDay, sMonth, sYear, eDay, eMonth, eYear;
  sDay = sDate.getDate();
  sMonth = sDate.getMonth() + 1;
  sYear = sDate.getFullYear();
  
  sDay = sDay.toString().padStart(2, '0');
  sMonth = sMonth.toString().padStart(2, '0');

  eDay = eDate.getDate();
  eMonth = eDate.getMonth() + 1;
  eYear = eDate.getFullYear();

  eDay = eDay.toString().padStart(2, '0');
  eMonth = eMonth.toString().padStart(2, '0');

  if (sYear === eYear) {
    return `${sYear.toString().slice(2)}.${sMonth}.${sDay} - ${eMonth}.${eDay}`;
  } else if (sYear < eYear) {
    return `${sYear.toString().slice(2)}.${sMonth}.${sDay} - ${eYear.toString().slice(2)}.${eMonth}.${eDay}`;
  }
}