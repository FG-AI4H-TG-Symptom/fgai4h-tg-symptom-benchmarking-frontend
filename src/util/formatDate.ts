const formatDate = (date: Date): string => {
  return `${date.toLocaleDateString()} ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
};

export default formatDate;
