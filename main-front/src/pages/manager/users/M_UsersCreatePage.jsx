import LeftNavbar from "../../../components/manager/LeftNavbar";
import HeadTitle from "../../../components/manager/HeadTitle";
import LinkButton from "../../../components/shared/LinkButton";
import CreateUserForm from "../../../components/manager/user/CreateUserForm";
import { ContentBox, ContentWrapper, ManagerContainer, NavRow } from "../../../styles/managerLayoutStyles";

export default function M_UsersCreatePage() {
  return (
    <ManagerContainer>
      <LeftNavbar />
      <ContentWrapper>
        <ContentBox>
          <HeadTitle title={"신규회원 등록"} desc={"신규회원 정보 등록하기 "}></HeadTitle>
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
          <CreateUserForm />
        </ContentBox>
      </ContentWrapper>
    </ManagerContainer>
  );
}
