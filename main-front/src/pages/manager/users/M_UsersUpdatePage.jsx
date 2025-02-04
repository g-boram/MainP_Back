import LeftNavbar from "../../../components/manager/LeftNavbar";
import HeadTitle from "../../../components/manager/HeadTitle";
import LinkButton from "../../../components/shared/LinkButton";

import { ContentBox, ContentWrapper, ManagerContainer, NavRow } from "../../../styles/managerLayoutStyles";
import UpdateUserForm from "../../../components/manager/user/UpdateUserForm";

export default function M_UsersUpdatePage() {
  return (
    <ManagerContainer>
      <LeftNavbar />
      <ContentWrapper>
        <ContentBox>
          <HeadTitle title={"회원정보 수정"} desc={"회원정보 수정하기 "}></HeadTitle>
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
          <UpdateUserForm />
        </ContentBox>
      </ContentWrapper>
    </ManagerContainer>
  );
}
