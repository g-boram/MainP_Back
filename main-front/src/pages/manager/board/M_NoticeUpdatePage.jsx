import styled from "@emotion/styled";
import LeftNavbar from "../../../components/manager/LeftNavbar";
import HeadTitle from "../../../components/manager/HeadTitle";
import LinkButton from "../../../components/shared/LinkButton";
import NoticeUpdateForm from "../../../components/manager/board/NoticeUpdateForm";
import Modal from "../../../components/shared/Modal";
import Flex from "../../../components/shared/Flex";
import Spacing from "../../../components/shared/Spacing";
import Text from "../../../components/shared/Text";
import {
  ContentBox,
  ContentWrapper,
  ManagerContainer,
  NavRow,
} from "../../../styles/managerLayoutStyles";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { getUpdatedBoardHistory } from "../../../api/boardApi";
import { MdDoNotDisturbAlt } from "react-icons/md";
import { colorPalette } from "../../../styles/colorPalette";

export default function M_NoticeUpdatePage() {
  const location = useLocation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [history, setHistory] = useState([]);

  const boardId = location.state.boardId;

  useEffect(() => {
    if (boardId) {
      const getHistory = async () => {
        const res = await getUpdatedBoardHistory(boardId);
        setHistory(res);
      };
      getHistory();
    }
  }, [boardId]);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <ManagerContainer>
      <LeftNavbar />
      <ContentWrapper>
        <ContentBox>
          <HeadTitle
            title={"공지사항 수정"}
            desc={"공지사항 게시글 수정하기 "}
          ></HeadTitle>
          <NavRow>
            <ModalButton onClick={toggleModal}>수정 History 보기</ModalButton>
            <Spacing size={10} direction={"width"} />
            <LinkButton
              to="/manager/board/notice"
              color="white"
              bgColor="black"
              text="게시글 목록"
              width="100px"
              height="40px"
              fontSize="12px"
            />
          </NavRow>
          <NoticeUpdateForm />
        </ContentBox>
      </ContentWrapper>
      {/* 모달 */}
      {isModalOpen && (
        <Modal onClickToggleModal={toggleModal} height={500} width={800}>
          <ModalHead />
          <ModalContent>
            <div id="title">해당 게시글의 수정내역</div>
            <div id="box">
              {/* history && history.length !== 0 */}
              {history && history.length !== 0 ? (
                <HistoryBox>
                  {history.map((v, i) => {
                    return (
                      <HistoryRow>
                        <Flex>
                          <Text typography="t11" color="grey">
                            {new Date(
                              v.updatedAt[0],
                              v.updatedAt[1] - 1,
                              v.updatedAt[2],
                              v.updatedAt[3],
                              v.updatedAt[4],
                              v.updatedAt[5]
                            ).toLocaleString()}
                          </Text>
                          <Spacing size={10} direction="width" />
                          <Text typography="t11" color="grey">
                            - 수정자 ID: {v.updatedBy}
                          </Text>
                        </Flex>
                        <Flex>
                          <Text typography="t11" color="grey">
                            수정된 필드 {v.fieldName}
                          </Text>
                        </Flex>
                        <Flex>
                          <Text typography="t11" color="grey">
                            수정 전 : {v.oldValue}
                          </Text>
                        </Flex>
                        <Flex>
                          <Text typography="t11" color="grey">
                            수정 후 : {v.newValue}
                          </Text>
                        </Flex>
                      </HistoryRow>
                    );
                  })}
                </HistoryBox>
              ) : (
                <NoHistoryBox>
                  <MdDoNotDisturbAlt size={50} color="#eee" />
                  수정사항이 없습니다.
                </NoHistoryBox>
              )}
            </div>
            <Flex justify="center" align="center">
              <BottomBtn onClick={toggleModal}>닫기</BottomBtn>
            </Flex>
          </ModalContent>
        </Modal>
      )}
    </ManagerContainer>
  );
}

const HistoryBox = styled.div`
  width: 100%;
  display: flex;
  padding-left: 10px;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  overflow: scroll;
`;
const HistoryRow = styled.div`
  height: 90px;
  width: 100%;
  border-bottom: 1px solid #eee;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
`;
const NoHistoryBox = styled.div`
  height: 300px;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
  color: ${colorPalette.fontGrey};
  font-size: 11px;
`;
const ModalButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  color: white;
  background-color: black;
  width: 120px;
  height: 40px;
  font-size: 12px;
  cursor: pointer;
`;

const BottomBtn = styled.div`
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  color: white;
  background-color: black;
  width: 100px;
  height: 40px;
  font-size: 12px;
  cursor: pointer;
`;

const ModalContent = styled.div`
  width: 100%;
  height: 470px;
  padding: 15px;

  #title {
    height: 50px;
    display: flex;
    align-items: flex-end;
    font-size: 14px;
    font-weight: bold;
    padding-bottom: 5px;
    border-bottom: 1px solid #000;
  }
  #box {
    height: 340px;
    padding: 15px 0;
    overflow: scroll;
  }
`;

const ModalHead = styled.div`
  width: 100%;
  height: 40px;
  background-color: #000;
  border-radius: 10px 10px 0 0;
`;
