import styled from "@emotion/styled";
import PageTopImgBox from "../../../components/shared/PageTopImgBox";
import CustomPagination from "../../../components/shared/pagination/CustomPagination";
import EventBoardRow from "../../../components/board/EventBoardRow";
import Badge from "../../../components/shared/Badge";
import Flex from "../../../components/shared/Flex";

import { PageContainer } from "../../../styles/pageLayoutStyles";
import { useDispatch, useSelector } from "react-redux";
import { useCallback, useEffect, useState } from "react";
import { fetchPagedBoards } from "../../../reduxSlice/boardListSlice";
import { ClearLoadingOverlay } from "../../../styles/managerLayoutStyles";
import { ClipLoader } from "react-spinners";
import { TbClipboardSearch } from "react-icons/tb";
import { BaseIconBox } from "../../../styles/miniComponentStyles";
import { setPage, setTotalItems } from "../../../reduxSlice/paginationSlice";
import { getAllBoardList } from "../../../api/boardApi";

export default function EventPage() {
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(false);
  const [boardList, setBoardList] = useState([]);
  const [currentItems, setCurrentItems] = useState([]);
  const [activeTab, setActiveTab] = useState("ing");

  const { currentPage, itemsPerPage } = useSelector((state) => state.pagination);

  useEffect(() => {
    setIsLoading(true);
    const allBoardData = async () => {
      const data = await getAllBoardList();
      setBoardList(data.filter((board) => board.category === "event" && board.status === "ACTIVE"));
    };
    allBoardData();
    setIsLoading(false);
  }, []);

  useEffect(() => {
    const setNoticeData = boardList.filter((board) => board.category === "event" && board.status === "ACTIVE");
    dispatch(setTotalItems(boardList.length));

    const startIndex = currentPage * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    setCurrentItems(setNoticeData.slice(startIndex, endIndex));
  }, [currentPage, itemsPerPage, boardList, dispatch]);

  useEffect(() => {
    if (activeTab === "ing") {
      const status = boardList.filter((board) => board.status === "ACTIVE");
      setCurrentItems(status);
    } else {
      const status = boardList.filter((board) => board.status === "INACTIVE");
      setCurrentItems(status);
    }
  }, [activeTab, boardList]);

  return (
    <PageContainer>
      <PageTopImgBox imgName={"board"} title={"이벤트"} desc={"HiCar 에서 진행중인 이벤트 소식을 확인해보세요."} />
      <EventBtnRow>
        <Flex>
          <Badge onClickFn={() => setActiveTab("ing")} label={"진행 중 이벤트"} color={"#1a831d"} />
          <Badge onClickFn={() => setActiveTab("finish")} label={"종료된 이벤트"} color={"#c3453c"} />
        </Flex>
      </EventBtnRow>
      <BoardListContainer>
        {isLoading && (
          <ClearLoadingOverlay>
            <ClipLoader color="#000" z-index={11} />
          </ClearLoadingOverlay>
        )}
        {currentItems && currentItems.length !== 0 ? (
          currentItems.map((board) => (
            <>
              <EventBoardRow key={board.id} {...board} />
            </>
          ))
        ) : (
          <NotBoardWrapper>
            <BaseIconBox>
              <TbClipboardSearch size={40} />
              <div>이벤트가 없습니다.</div>
            </BaseIconBox>
          </NotBoardWrapper>
        )}
      </BoardListContainer>
      {currentItems && currentItems.length !== 0 ? (
        <CustomPagination
          currentPage={currentPage}
          totalItems={boardList.length}
          itemsPerPage={itemsPerPage}
          onPageChange={(page) => dispatch(setPage(page))}
        />
      ) : (
        <></>
      )}
    </PageContainer>
  );
}

const BoardListContainer = styled.div`
  width: 1200px;
  margin: 50px auto;
  display: flex;
  flex-direction: column;
  border-top: 1px solid black;

  @media (max-width: 600px) {
    width: 100%;
  }
`;

const NotBoardWrapper = styled.div`
  width: 100%;
  min-height: 400px;
  background-color: #eee;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const EventBtnRow = styled.div`
  background-color: #f8f8f8;
  height: 60px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  padding: 10px 20px;
`;
