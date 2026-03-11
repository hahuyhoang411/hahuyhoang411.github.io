const dateFormatOptions: Intl.DateTimeFormatOptions = {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
};

export const formatDate = (dateString: string): string =>
  new Date(dateString).toLocaleDateString(undefined, dateFormatOptions);
