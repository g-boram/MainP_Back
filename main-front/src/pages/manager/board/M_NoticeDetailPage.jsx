import LeftNavbar from "../../../components/manager/LeftNavbar";
import HeadTitle from "../../../components/manager/HeadTitle";
import LinkButton from "../../../components/shared/LinkButton";
import BoardDetailForm from "../../../components/manager/board/BoardDetailForm";
import { ContentBox, ContentWrapper, ManagerContainer, NavRow } from "../../../styles/managerLayoutStyles";

export default function M_NoticeDetailPage() {
  return (
    <ManagerContainer>
      <LeftNavbar />
      <ContentWrapper>
        <ContentBox>
          <HeadTitle title={"공지사항 상세보기"} desc={"공지사항 게시글 상세보기 "}></HeadTitle>
          <NavRow>
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
          <BoardDetailForm />
        </ContentBox>
      </ContentWrapper>
    </ManagerContainer>
  );
}
