export const formatDateToString = (date: number) => {
  return new Date(date * 1000).toLocaleString();
};

export const formatDateToUnix = (date: Date) => {
  return Math.floor(date.getTime() / 1000);
};
