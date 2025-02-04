import styled from "@emotion/styled";
import LeftNavbar from "../../components/manager/LeftNavbar";
import { ContentBox, ContentWrapper, ManagerContainer } from "../../styles/managerLayoutStyles";
import Flex from "../../components/shared/Flex";

export default function ManagerPage() {
  return (
    <ManagerContainer>
      <LeftNavbar />
      <ContentWrapper>
        <ContentBox>
          <h1>ManagerPage</h1>
        </ContentBox>
      </ContentWrapper>
    </ManagerContainer>
  );
}
