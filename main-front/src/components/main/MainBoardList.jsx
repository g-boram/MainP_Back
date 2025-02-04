import styled from "@emotion/styled";
import Text from "../shared/Text";
import Flex from "../shared/Flex";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ClearLoadingOverlay } from "../../styles/managerLayoutStyles";
import { ClipLoader } from "react-spinners";
import { getAllBoardList } from "../../api/boardApi";

export default function MainBoardList() {
  const navigate = useNavigate();
  const [noticeData, setNoticeData] = useState(null);
  const [eventData, setEventData] = useState(null);
  const [isLoading, setIsLoading] = useState();

  useEffect(() => {
    setIsLoading(true);
    const allBoardData = async () => {
      const data = await getAllBoardList();
      const notice = data.filter((board) => board.category === "notice" && board.status === "ACTIVE");
      const event = data.filter((board) => board.category === "event" && board.status === "ACTIVE");

      setNoticeData(notice.slice(0, 5));
      setEventData(event.slice(0, 5));
    };
    allBoardData();
    setIsLoading(false);
  }, []);

  console.log(noticeData);
  console.log(eventData);
  return (
    <BoardListWrapper>
      {isLoading ? (
        <ClearLoadingOverlay>
          <ClipLoader color="#000" z-index={11} />
        </ClearLoadingOverlay>
      ) : (
        <></>
      )}
      <TitleRow>
        <Text typography="t16" bold>
          공지사항
        </Text>
        <Text typography="t11" color="grey" onClick={() => navigate("/board/notice")}>
          더보기
        </Text>
      </TitleRow>
      <Flex>
        <MainBoardContainer>
          {noticeData?.map((v) => (
            <Row>
              <div id="title">{v.title}</div>
              <div id="created">{v.createdAt}</div>
            </Row>
          ))}
        </MainBoardContainer>
        <MainBoardContainer>
          {eventData?.map((v) => (
            <Row>
              <div id="title">{v.title}</div>
              <div id="created">{v.createdAt}</div>
            </Row>
          ))}
        </MainBoardContainer>
      </Flex>
    </BoardListWrapper>
  );
}

const BoardListWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;
const TitleRow = styled.div`
  width: 770px;
  height: 50px;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 10px;
`;
const MainBoardContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  width: 380px;
  height: 200px;
  margin-right: 10px;
  background-color: #f9f9f9;
  border-top: 1px solid #000;
  border-bottom: 1px solid #000;
`;

const LoadingBox = styled.div`
  position: absolute;
  left: 45%;
  bottom: 40%;
`;

const Row = styled.div`
  width: 380px;
  height: 40px;
  display: flex;
  font-size: 12px;
  color: #333;
  background-color: #fff;
  border-bottom: 1px solid #eee;

  #title {
    width: 280px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-wrap: nowrap;
    overflow: hidden;
  }
  #created {
    width: 100px;
    overflow: hidden;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    flex-wrap: nowrap;
    color: grey;
  }
`;
