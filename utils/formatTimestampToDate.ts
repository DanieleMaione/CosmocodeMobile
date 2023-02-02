/** @format */

export const utilityFormatTimestampToDate = (date: string | null) => {
  const data = new Date(date || '');
  const year = data.getFullYear();
  const month = (data.getMonth() + 1).toString().padStart(2, '0');
  const day = data.getDate().toString().padStart(2, '0');

  return `${day}/${month}/${year}`;
};
export const utilityFormatNumberToDate = (date: number | null) => {
  const data = new Date(date || NaN);
  const year = data.getFullYear();
  const month = (data.getMonth() + 1).toString().padStart(2, '0');
  const day = data.getDate().toString().padStart(2, '0');

  return `${day}/${month}/${year}`;
};

export const utilityFormatNumberToMonth = (monthNumber: number | null) => {
  switch (monthNumber) {
    case 0:
      return 'month.jan-complete';
    case 1:
      return 'month.feb-complete';
    case 2:
      return 'month.mar-complete';
    case 3:
      return 'month.apr-complete';
    case 4:
      return 'month.may-complete';
    case 5:
      return 'month.jun-complete';
    case 6:
      return 'month.jul-complete';
    case 7:
      return 'month.aug-complete';
    case 8:
      return 'month.sep-complete';
    case 9:
      return 'month.oct-complete';
    case 10:
      return 'month.nov-complete';
    case 11:
      return 'month.dec-complete';

    default:
      break;
  }
};
