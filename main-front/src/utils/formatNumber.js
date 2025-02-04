export const formatPhoneNumber = (value) => {
  const cleaned = value.replace(/\D/g, ""); // 숫자 이외의 문자 제거
  const match = cleaned.match(/^(\d{3})(\d{4})(\d{4})$/);
  if (match) {
    return `${match[1]}-${match[2]}-${match[3]}`;
  }
  return value;
};
