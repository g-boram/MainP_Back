import styled from "@emotion/styled";
import LogoImg from "../../assert/Logo.png";
import { colorPalette } from "../../styles/colorPalette";

export default function HeadTitle({ title, desc, line }) {
  return (
    <>
      <TitleContainer>
        <TitleWrapper>
          <Title>{title ? title : "title"}</Title>
          <Desc>{desc ? desc : "desc"}</Desc>
        </TitleWrapper>
        <RightWrapper>
          <LogoImgBox>
            <img src={LogoImg} alt="Logo" />
          </LogoImgBox>
        </RightWrapper>
      </TitleContainer>
      {line ? <NoticeLineWrapper></NoticeLineWrapper> : <></>}
    </>
  );
}

const TitleContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  height: 70px;
  border-bottom: 2px solid black;
  padding-bottom: 5px;
`;

const TitleWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const Title = styled.div`
  font-size: 22px;
  font-weight: bold;
  color: ${colorPalette.fontBlack};
`;

const Desc = styled.div`
  font-size: 11px;
  color: ${colorPalette.fontGrey};
`;

const RightWrapper = styled.div`
  font-size: 12px;
  font-weight: bold;
`;

const NoticeLineWrapper = styled.div`
  height: 30px;
  background-color: yellow;
`;
const LogoImgBox = styled.div`
  display: flex;
  width: 50px;
  height: 50px;
  > img {
    height: 50px;
    width: 100%;
    border-radius: 5px;
    object-fit: contain;
  }
`;
