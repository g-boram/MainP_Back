import styled from "@emotion/styled";
import { CAR_COLOR } from "../../constants/carOption";
import { RiResetRightLine } from "react-icons/ri";
import { css } from "@emotion/react";
import { useState } from "react";
import Flex from "../shared/Flex";

export default function CarFilterColor({ color, setColor }) {
  const [selectedColor, setSelectedColor] = useState();

  const handleReset = (e) => {
    setColor("");
  };

  return (
    <>
      <Flex justify="flex-end" height="30px">
        <RiResetRightLine style={{ cursor: "pointer" }} onClick={handleReset} />
      </Flex>
      <Container>
        {CAR_COLOR.map((colorOption) => (
          <label
            for={colorOption.hex}
            style={{
              width: "50px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              marginBottom: "20px",
            }}
          >
            <ColorBox key={colorOption.id} bgColor={colorOption.hex} />
            <input
              id={colorOption.hex}
              name={colorOption.hex}
              type="radio"
              value={colorOption.hex}
              checked={color === colorOption.hex} // 전달받은 color와 비교
              onChange={() => setColor(colorOption.hex)} // 변경 시 호출
            />
          </label>
        ))}
      </Container>
    </>
  );
}

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
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
