export default function formatDateByHyphen(dateArr) {
  const year = dateArr[0];
  const month = dateArr[1].length === 1 ? `0${dateArr[1]}` : dateArr[1];
  const day = dateArr[2].length === 1 ? `0${dateArr[2]}` : dateArr[2];

  return `${year}-${month}-${day}`;
}
