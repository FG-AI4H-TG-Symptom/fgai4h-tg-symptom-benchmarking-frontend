const formatDate = (date: Date): string => {
  let hours = date.getHours();
  const minutes = date.getMinutes();
  const ampm = hours >= 12 ? "pm" : "am";
  hours = hours % 12;
  hours = hours || 12; // the hour '0' should be '12'
  const minutesStr = minutes < 10 ? `0${minutes}` : minutes;
  const strTime = `${hours}:${minutesStr} ${ampm}`;
  return `${date.getDate()}/${date.getMonth() +
    1}/${date.getFullYear()}  ${strTime}`;
};

export default formatDate;
