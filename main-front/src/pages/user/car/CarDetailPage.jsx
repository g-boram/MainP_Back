import CarDetailBox from "../../../components/car/CarDetailBox";
import Flex from "../../../components/shared/Flex";
import LinkButton from "../../../components/shared/LinkButton";
import Spacing from "../../../components/shared/Spacing";
import { PageContainer, PageWrapper } from "../../../styles/pageLayoutStyles";

export default function CarDetailPage() {
  return (
    <PageContainer>
      <PageWrapper>
        <Flex justify="flex-end">
          <LinkButton
            to="/car"
            color="white"
            bgColor="black"
            text="상품 목록"
            width="100px"
            height="40px"
            fontSize="12px"
          />
        </Flex>
        <Spacing size={10} />
        <CarDetailBox />
      </PageWrapper>
    </PageContainer>
  );
}
