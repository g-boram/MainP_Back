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

export default function QnADetailPage() {
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
      <PageTopImgBox imgName={"board"} title={"FAQ"} desc={"자주하는 질문"} />
      <BoardListContainer>
        <PageRouteBox width="300px" bgColor={colorPalette.routeBox_Base} rowTitle={["Home", "FAQ"]} />
        {boardData ? (
          <>
            <BoardDetailWrapper>
              <Header>
                <div id="title">
                  <Badge label={"FAQ"} />
                  {boardData.title}
                </div>
                <div id="headRight">
                  <div>Todo</div>
                  <div>{boardData.createdAt}</div>
                </div>
              </Header>
              <Content>{boardData.content}</Content>
            </BoardDetailWrapper>
            <Flex justify="center">
              <LinkButton
                to="/board/faq"
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
  height: 80px;
  margin-top: 50px;
  display: flex;
  padding-bottom: 20px;
  border-bottom: 2px solid #000;
  font-weight: bold;
  justify-content: space-between;
  align-items: flex-end;

  #title {
    display: flex;
    margin-left: 10px;
    align-items: center;
    font-size: 16px;
    color: #000;
  }
  #headRight {
    font-size: 11px;
    color: grey;
    font-weight: 400;
  }
`;

const Content = styled.div`
  font-size: 12px;
  padding: 100px 0 0 0;
  white-space: pre-line;
  color: ${colorPalette.fontBlack};
`;
