// 랜덤 색상 생성 함수
export const makeRandomColor = () => {
  const randomColor = `rgb(${Math.floor(Math.random() * 128 + 127)}, ${Math.floor(
    Math.random() * 128 + 127
  )}, ${Math.floor(Math.random() * 128 + 127)})`;
  return randomColor;
};
