import LeftNavbar from "../../../components/manager/LeftNavbar";
import HeadTitle from "../../../components/manager/HeadTitle";
import LinkButton from "../../../components/shared/LinkButton";
import CarForm from "../../../components/manager/car/CarForm";
import { ContentBox, ContentWrapper, ManagerContainer, NavRow } from "../../../styles/managerLayoutStyles";

export default function M_CarCreatePage() {
  return (
    <ManagerContainer>
      <LeftNavbar />
      <ContentWrapper>
        <ContentBox>
          <HeadTitle title={"상품 차량 등록"} desc={"차량 등록하기"}></HeadTitle>
          <NavRow>
            <LinkButton
              to="/manager/car"
              color="white"
              bgColor="black"
              text="상품 목록"
              width="100px"
              height="40px"
              fontSize="12px"
            />
          </NavRow>
          <CarForm />
        </ContentBox>
      </ContentWrapper>
    </ManagerContainer>
  );
}
