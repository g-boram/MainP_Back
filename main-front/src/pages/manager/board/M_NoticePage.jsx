import styled from "@emotion/styled";
import LeftNavbar from "../../../components/manager/LeftNavbar";
import HeadTitle from "../../../components/manager/HeadTitle";
import LinkButton from "../../../components/shared/LinkButton";
import PaginationComponent from "../../../components/shared/pagination/PaginationComponent";
import Flex from "../../../components/shared/Flex";
import ListHeader from "../../../components/shared/ListHeader";
import BoardRow from "../../../components/manager/board/BoardRow";
import FilterButtons from "../../../components/shared/FilterButtons";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchPagedBoards,
  setStatusFilter,
} from "../../../reduxSlice/boardListSlice";
import { MdDoNotDisturbAlt } from "react-icons/md";
import { useEffect, useState } from "react";
import { ClipLoader } from "react-spinners";
import {
  ClearLoadingOverlay,
  ContentBox,
  ContentWrapper,
  ErrorBox,
  ErrorOverlay,
  ErrorText,
  ManagerContainer,
  NavRow,
  NotBoardBox,
  NotBoardOverlay,
  NotBoardText,
} from "../../../styles/managerLayoutStyles";
import BoardCategoryButtons from "../../../components/shared/BoardCategoryButtons";
import Text from "../../../components/shared/Text";
import Spacing from "../../../components/shared/Spacing";

export default function M_NoticePage() {
  const dispatch = useDispatch();
  const [category, setCategory] = useState("ALL");
  const [boardData, setBoardData] = useState([]);

  const { filteredBoards, isLoading, error, statusFilter } = useSelector((state) => state.boardList);
  console.log("boardData", boardData);
  // 게시글 데이터 로딩 및 필터 적용
  useEffect(() => {
    dispatch(fetchPagedBoards({ page: 0, size: 10, sort: "boardId,desc" }));
  }, [dispatch]);

  useEffect(() => {
    setBoardData(filteredBoards);
  }, [filteredBoards]);

  useEffect(() => {
    if (category === "ALL") {
      setBoardData(filteredBoards); // If category is "ALL", show all data
    } else if (category === "공지사항") {
      setBoardData(filteredBoards.filter((data) => data.category === "notice"));
    } else if (category === "이벤트") {
      setBoardData(filteredBoards.filter((data) => data.category === "event"));
    } else if (category === "FAQ") {
      setBoardData(filteredBoards.filter((data) => data.category === "faq"));
    } else if (category === "기타") {
      setBoardData(filteredBoards.filter((data) => data.category === "other"));
    }
  }, [category, filteredBoards]);
  const handleFilterChange = (filter) => {
    dispatch(setStatusFilter(filter));
  };

  const handlePageChange = (newPage) => {
    dispatch(
      fetchPagedBoards({ page: newPage, size: 10, sort: "boardId,desc" })
    );
  };

  return (
    <ManagerContainer>
      <LeftNavbar />
      <ContentWrapper>
        <ContentBox>
          <HeadTitle
            title={"공지사항 목록"}
            desc={"공지사항 게시글 작업 페이지"}
          ></HeadTitle>
          <NavRow>
            <LinkButton
              to="/manager/board/notice/create"
              color="white"
              bgColor="black"
              text="게시글 등록"
              width="100px"
              height="40px"
              fontSize="12px"
            />
          </NavRow>
          {/* 필터 버튼 */}
          <FilterButtons
            currentFilter={statusFilter}
            onFilterChange={handleFilterChange}
          />
          <BoardCategoryButtons
            currentFilter={category}
            setCategory={setCategory}
          />
          <NoticeListWrapper>
            {isLoading && (
              <ClearLoadingOverlay>
                <ClipLoader color="#000" z-index={11} />
              </ClearLoadingOverlay>
            )}
            {error && (
              <ErrorOverlay>
                <ErrorBox>
                  <ErrorText>ERROR: {error}</ErrorText>
                </ErrorBox>
              </ErrorOverlay>
            )}
            {!isLoading && !error && (
              <Flex direction="column">
                <ListHeader
                  height="30px"
                  borderB="#000"
                  borderT="#000"
                  fontSize="13px"
                  bgColor="#eeeeee"
                  rowTitle={[
                    "ID.-40",
                    "카테고리-80",
                    "제목-340",
                    "내용-470",
                    "작성자-80",
                    "작성일-100",
                    "게시상태-80",
                    "-130",
                  ]}
                />
                {boardData && boardData.length > 0 ? (
                  boardData.map((board) => (
                    <BoardRow {...board} key={board.boardId} />
                  ))
                ) : (
                  <NotBoardOverlay>
                    <NotBoardBox>
                      <NotBoardText>
                        <Flex direction="column" align="center">
                          <MdDoNotDisturbAlt size={50} color="#eee" />
                          <Spacing size={10} />
                          <Text typography="t11" color="#999">
                            게시글이 없습니다.
                          </Text>
                        </Flex>
                      </NotBoardText>
                    </NotBoardBox>
                  </NotBoardOverlay>
                )}
              </Flex>
            )}
          </NoticeListWrapper>
          <PaginationComponent onPageChange={handlePageChange} />
        </ContentBox>
      </ContentWrapper>
    </ManagerContainer>
  );
}

const NoticeListWrapper = styled.div`
  min-height: 500px;
  position: relative;
`;
