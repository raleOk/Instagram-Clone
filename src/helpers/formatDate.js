const formatDate = date => {
  const year = date.substring(0, 4);
  let month = date.substring(5, 7);
  const day = date.substring(8, 10);

  switch (Number(month)) {
    case 1:
      month = "Jan";
      break;
    case 2:
      month = "Feb";
      break;
    case 3:
      month = "Mar";
      break;
    case 4:
      month = "Apr";
      break;
    case 5:
      month = "May";
      break;
    case 6:
      month = "Jun";
      break;
    case 7:
      month = "Jul";
      break;
    case 8:
      month = "Aug";
      break;
    case 9:
      month = "Sep";
      break;
    case 10:
      month = "Oct";
      break;
    case 11:
      month = "Nov";
      break;
    case 12:
      month = "Dec";
      break;
    default:
      month = "";
  }

  const formattedDate = `${day}/${month}/${year}`;
  return formattedDate;
};

export default formatDate;
