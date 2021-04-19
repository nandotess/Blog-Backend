const formatDate = (stringDate, format = 'en_us') => {
  if (!stringDate) {
    return '';
  }

  let date = new Date(stringDate);

  if (format === 'en_us') {
    const formatter = new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });

    return formatter.format(date);
  } else if (format === 'iso') {
    return date.toISOString();
  }

  return '';
};

export default formatDate;
