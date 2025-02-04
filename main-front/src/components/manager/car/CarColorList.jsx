import styled from "@emotion/styled";
import { CAR_COLOR } from "../../../constants/carOption";
import { colorPalette } from "../../../styles/colorPalette";
import { css } from "@emotion/react";

export default function CarColorList({ color, setColor }) {
  return (
    <Container>
      {CAR_COLOR.map((colorOption) => (
        <ColorListWrapper>
          <ColorBox key={colorOption.id} bgColor={colorOption.hex} />
          <Name>{colorOption.name}</Name>
          <input
            name="color"
            type="radio"
            value={colorOption.hex}
            checked={color === colorOption.hex} // 전달받은 color와 비교
            onChange={() => setColor(colorOption.hex)} // 변경 시 호출
          />
        </ColorListWrapper>
      ))}
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  min-height: 60px;
  display: flex;
  justify-content: space-between;
`;

const ColorListWrapper = styled.div`
  width: 80px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Name = styled.div`
  font-size: 11px;
  color: ${colorPalette.fontDarkGrey};
`;

const ColorBox = styled.div`
  width: 20px;
  height: 20px;
  margin: 10px;

  ${({ bgColor }) =>
    bgColor === "#FFFFFF"
      ? css`
          background-color: ${bgColor};
          border: 1px solid #f4f4f4;
        `
      : css`
          background-color: ${bgColor};
        `};
`;
