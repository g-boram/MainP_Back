import styled from "@emotion/styled";
import BoardMainImg from "../../assert/boardMainImg.jpg";

import { colorPalette } from "../../styles/colorPalette";

export default function PageTopImgBox({ imgName, title, desc, color = "#fff" }) {
  // 이미지 경로를 결정하는 함수
  const getImgPath = (name) => {
    switch (name) {
      case "board":
        return BoardMainImg;
      default:
        return "";
    }
  };

  const img = getImgPath(imgName);

  return (
    <ImgContainer fontColor={colorPalette[color] || colorPalette.fontWhite}>
      {img ? <img src={img} alt="TopImg" /> : null}

      <TitleWrapper>
        <div id="title">{title}</div>
        <div id="desc">{desc}</div>
      </TitleWrapper>
    </ImgContainer>
  );
}

const ImgContainer = styled.div`
  height: 250px;
  width: 100%;
  position: relative;
  background-color: ${colorPalette.imgBackBG};
  color: ${({ fontColor }) => fontColor};

  > img {
    height: 250px;
    width: 100%;
    object-fit: cover;
  }
`;

const TitleWrapper = styled.div`
  position: absolute;
  bottom: 10px;
  left: 80px;
  text-align: left;

  #title {
    font-size: 40px;
    font-weight: bold;
  }
  #desc {
    font-size: 14px;
  }
`;
