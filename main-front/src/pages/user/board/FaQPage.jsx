import styled from "@emotion/styled";
import PageTopImgBox from "../../../components/shared/PageTopImgBox";
import BoardSearch from "../../../components/shared/BoardSearch";
import FaQBoardRow from "../../../components/board/FaQBoardRow";
import CustomPagination from "../../../components/shared/pagination/CustomPagination";
import Badge from "../../../components/shared/Badge";

import { PageContainer } from "../../../styles/pageLayoutStyles";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { fetchPagedBoards } from "../../../reduxSlice/boardListSlice";
import { ClearLoadingOverlay } from "../../../styles/managerLayoutStyles";
import { ClipLoader } from "react-spinners";
import { TbClipboardSearch } from "react-icons/tb";
import { BaseIconBox } from "../../../styles/miniComponentStyles";
import { setPage, setTotalItems } from "../../../reduxSlice/paginationSlice";
import { getAllBoardList } from "../../../api/boardApi";

export default function QnAPage() {
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(false);
  const [boardList, setBoardList] = useState([]);

  const [currentItems, setCurrentItems] = useState([]);
  const { currentPage, itemsPerPage } = useSelector((state) => state.pagination);

  useEffect(() => {
    setIsLoading(true);
    const allBoardData = async () => {
      const data = await getAllBoardList();
      setBoardList(data);
    };
    allBoardData();
    setIsLoading(false);
  }, []);

  useEffect(() => {
    const setNoticeData = boardList.filter((board) => board.category === "faq" && board.status === "ACTIVE");
    dispatch(setTotalItems(setNoticeData.length));

    const startIndex = currentPage * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    setCurrentItems(setNoticeData.slice(startIndex, endIndex));
  }, [currentPage, itemsPerPage, boardList, dispatch]);

  return (
    <PageContainer>
      <PageTopImgBox imgName={"board"} title={"FAQ"} desc={"자주하는 질문"} />
      <BoardListContainer>
        {isLoading && (
          <ClearLoadingOverlay>
            <ClipLoader color="#000" z-index={11} />
          </ClearLoadingOverlay>
        )}
        {currentItems && currentItems.length !== 0 ? (
          currentItems.map((board) => (
            <>
              <FaQBoardRow key={board.id} {...board} />
            </>
          ))
        ) : (
          <NotBoardWrapper>
            <BaseIconBox>
              <TbClipboardSearch size={40} />
              <div>게시글이 없습니다.</div>
            </BaseIconBox>
          </NotBoardWrapper>
        )}
      </BoardListContainer>
      <CustomPagination
        currentPage={currentPage}
        totalItems={boardList.length}
        itemsPerPage={itemsPerPage}
        onPageChange={(page) => dispatch(setPage(page))}
      />
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
