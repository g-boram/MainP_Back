import LeftNavbar from "../../../components/manager/LeftNavbar";
import HeadTitle from "../../../components/manager/HeadTitle";
import LinkButton from "../../../components/shared/LinkButton";
import CarDetailForm from "../../../components/manager/car/CarDetailForm";
import Flex from "../../../components/shared/Flex";
import { ContentBox, ContentWrapper, ManagerContainer, NavRow } from "../../../styles/managerLayoutStyles";

export default function M_CarDetailPage() {
  return (
    <ManagerContainer>
      <LeftNavbar />
      <ContentWrapper>
        <ContentBox>
          <HeadTitle title={"자동차 상세보기"} desc={"자동차 게시글 상세보기 "}></HeadTitle>
          <NavRow>
            <Flex>
              <LinkButton
                to="/manager/car"
                color="white"
                bgColor="black"
                text="상품 목록"
                width="100px"
                height="40px"
                fontSize="12px"
              />
            </Flex>
          </NavRow>
          <CarDetailForm />
        </ContentBox>
      </ContentWrapper>
    </ManagerContainer>
  );
}
