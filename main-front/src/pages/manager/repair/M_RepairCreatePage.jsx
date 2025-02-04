import LeftNavbar from "../../../components/manager/LeftNavbar";
import HeadTitle from "../../../components/manager/HeadTitle";
import LinkButton from "../../../components/shared/LinkButton";
import RepairCarForm from "../../../components/manager/repair/RepairCarForm";
import { ContentBox, ContentWrapper, ManagerContainer, NavRow } from "../../../styles/managerLayoutStyles";

export default function M_RepairCreatePage() {
  return (
    <ManagerContainer>
      <LeftNavbar />
      <ContentWrapper>
        <ContentBox>
          <HeadTitle title={"자동차정비 등록"} desc={"자동차정비 내용 등록하기"}></HeadTitle>
          <NavRow>
            <LinkButton
              to="/manager/repair"
              color="white"
              bgColor="black"
              text="자동차정비 목록"
              width="120px"
              height="40px"
              fontSize="12px"
            />
          </NavRow>
          <RepairCarForm />
        </ContentBox>
      </ContentWrapper>
    </ManagerContainer>
  );
}
