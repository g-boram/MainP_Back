import LeftNavbar from "../../../components/manager/LeftNavbar";
import HeadTitle from "../../../components/manager/HeadTitle";
import LinkButton from "../../../components/shared/LinkButton";
import CarEventUpdateForm from "../../../components/manager/car/CarEventUpdateForm";
import { ContentBox, ContentWrapper, ManagerContainer, NavRow } from "../../../styles/managerLayoutStyles";

export default function M_CarEventUpdatePage() {
  return (
    <ManagerContainer>
      <LeftNavbar />
      <ContentWrapper>
        <ContentBox>
          <HeadTitle title={"자동차 이벤트 등록하기"} desc={"자동차 이벤트 등록하기"}></HeadTitle>
          <NavRow>
            <LinkButton
              to="/manager/car/event"
              color="white"
              bgColor="black"
              text="상품 목록"
              width="100px"
              height="40px"
              fontSize="12px"
            />
          </NavRow>
          <CarEventUpdateForm />
        </ContentBox>
      </ContentWrapper>
    </ManagerContainer>
  );
}
