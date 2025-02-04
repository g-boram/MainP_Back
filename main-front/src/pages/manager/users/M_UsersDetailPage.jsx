import LeftNavbar from "../../../components/manager/LeftNavbar";
import HeadTitle from "../../../components/manager/HeadTitle";
import LinkButton from "../../../components/shared/LinkButton";
import UsersDetailForm from "../../../components/manager/user/UsersDetailForm";
import { ContentBox, ContentWrapper, ManagerContainer, NavRow } from "../../../styles/managerLayoutStyles";

export default function M_UsersDetailPage() {
  return (
    <ManagerContainer>
      <LeftNavbar />
      <ContentWrapper>
        <ContentBox>
          <HeadTitle title={"회원정보 상세보기"} desc={"등록된 회원정보 상세보기 "}></HeadTitle>
          <NavRow>
            <LinkButton
              to="/manager/users"
              color="white"
              bgColor="black"
              text="회원 목록"
              width="100px"
              height="40px"
              fontSize="12px"
            />
          </NavRow>
          <UsersDetailForm />
        </ContentBox>
      </ContentWrapper>
    </ManagerContainer>
  );
}
