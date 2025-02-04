// 입력값을 받으면 구분자를 넣어주는 함수

// 콤마 , 로 구분하기
export default function addDelimiter(value, delimiter = ",") {
  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, delimiter);
}
