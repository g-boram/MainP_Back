import styled from "@emotion/styled";
import PageTopImgBox from "../../../components/shared/PageTopImgBox";
import PageRouteBox from "../../../components/shared/PageRouteBox";
import Badge from "../../../components/shared/Badge";
import Flex from "../../../components/shared/Flex";
import LinkButton from "../../../components/shared/LinkButton";

import { PageContainer } from "../../../styles/pageLayoutStyles";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { detailBoardById } from "../../../api/boardApi";
import { colorPalette } from "../../../styles/colorPalette";
import { ClearLoadingOverlay } from "../../../styles/managerLayoutStyles";
import { ClipLoader } from "react-spinners";

export default function EventDetailPage() {
  const { id } = useParams();
  const [boardData, setBoardData] = useState();

  useEffect(() => {
    const getBoard = async () => {
      try {
        const board = await detailBoardById(id);
        setBoardData(board);
      } catch (error) {
        console.error("Error fetching board details:", error);
      }
    };
    getBoard();
  }, [id]);

  return (
    <PageContainer>
      <PageTopImgBox imgName={"board"} title={"Event"} desc={"00에서 진행중인 이벤트 소식을 확인해보세요."} />
      <BoardListContainer>
        <PageRouteBox width="300px" bgColor={colorPalette.routeBox_Base} rowTitle={["Home", "이벤트"]} />
        {boardData ? (
          <>
            <BoardDetailWrapper>
              <Header>
                <div id="title">
                  <Badge label={"이벤트"} />
                  {boardData.title}
                </div>
                <div id="headRight">
                  <div>{boardData.createdAt.slice(0, 10)}</div>
                </div>
              </Header>
              <Content>
                {boardData.imageUrl && <ImgBox src={boardData.imageUrl} alt="Event_Img" />}
                {boardData.content}
              </Content>
            </BoardDetailWrapper>
            <Flex justify="center">
              <LinkButton
                to="/board/event"
                color="white"
                bgColor="black"
                text="게시글 목록"
                width="100px"
                height="40px"
                fontSize="12px"
              />
            </Flex>
          </>
        ) : (
          <ClearLoadingOverlay>
            <ClipLoader color="#000" z-index={11} />
          </ClearLoadingOverlay>
        )}
      </BoardListContainer>
    </PageContainer>
  );
}

const BoardListContainer = styled.div`
  position: relative;
  min-height: 500px;
  width: 1200px;
  margin: 0px auto;
  display: flex;
  flex-direction: column;

  @media (max-width: 600px) {
    width: 90%;
  }
`;

const BoardDetailWrapper = styled.div`
  margin-bottom: 100px;
`;

const Header = styled.div`
  height: 70px;
  margin-top: 50px;
  display: flex;
  padding-bottom: 20px;
  border-bottom: 1px solid #eee;
  font-weight: bold;
  justify-content: space-between;
  align-items: flex-end;

  #title {
    display: flex;
    align-items: center;
    font-size: 16px;
    color: ${colorPalette.fontBlack};
  }
  #headRight {
    color: ${colorPalette.fontGrey};
    font-size: 12px;
    font-weight: 400;
  }
`;

const Content = styled.div`
  font-size: 12px;
  padding: 100px 0 0 0;
  white-space: pre-line;
  color: ${colorPalette.fontBlack};
`;

const ImgBox = styled.img`
  width: 100%;
  max-height: 500px;
  margin-bottom: 100px;
  object-fit: contain;
`;
