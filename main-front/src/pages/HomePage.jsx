import styled from "@emotion/styled";
import ImgSlideBanner from "../components/main/ImgSlideBanner";
import CenterToBanner from "../components/main/CenterToBanner";
import { HEIGHT_LIST } from "../constants/height";
import MainCarBox from "../components/main/MainCarBox";
import MainBoardList from "../components/main/MainBoardList";
import SideSlideCar from "../components/main/SideSlideCar";
import Spacing from "../components/shared/Spacing";

// 메인 페이지
// : 누구나 볼수있음
export default function HomePage() {
  return (
    <HomeContainer>
      <PageWrapper>
        <CenterToBanner />
        <MainCarBox />
        <Spacing size={30} />
        <SideSlideCar />
        <Spacing size={30} />
        <BoardRow>
          <MainBoardList />
          <ImgSlideBanner />
        </BoardRow>
      </PageWrapper>
    </HomeContainer>
  );
}

const HomeContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  padding-top: ${HEIGHT_LIST.HEADER + HEIGHT_LIST.NAVBAR}px;
`;

const PageWrapper = styled.div`
  width: 1200px;
  height: auto;
  display: block;
`;
const BoardRow = styled.div`
  /* width: 1200px; */
  height: auto;
  display: flex;
  justify-content: space-between;
`;
