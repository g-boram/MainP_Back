import LeftNavbar from "../../../components/manager/LeftNavbar";
import NoticeForm from "../../../components/manager/board/NoticeForm";
import HeadTitle from "../../../components/manager/HeadTitle";
import { ContentBox, ContentWrapper, ManagerContainer, NavRow } from "../../../styles/managerLayoutStyles";
import LinkButton from "../../../components/shared/LinkButton";

export default function M_NoticeCreatePage() {
  return (
    <ManagerContainer>
      <LeftNavbar />
      <ContentWrapper>
        <ContentBox>
          <HeadTitle title={"공지사항 등록"} desc={"공지사항 게시글 등록하기 "}></HeadTitle>
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
          <NoticeForm />
        </ContentBox>
      </ContentWrapper>
    </ManagerContainer>
  );
}
