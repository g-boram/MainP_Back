import styled from "@emotion/styled";
import { useSelector } from "react-redux";

export default function Footer() {
  const isManager = useSelector((state) => state.isManagerPath.isManager); // 상태 가져오기

  return (
    <>
      {isManager ? (
        <></>
      ) : (
        <FooterContainer>
          <P>
            O2O를 잇는 신뢰와 기술로 차량을 사고 파는 모습의 진화를 만듭니다
          </P>
          <Flex>
            <Span>고객센터 : 1588-0000</Span>
            <Span>FAX : 02-754-0000</Span>
            <Span>대표메일 : trust@hicar.com</Span>
            <Span>주소 : 서울특별시 강남구 테헤란로 25길 9, 18~19층</Span>
          </Flex>
          <Flex>
            <Span>사업자 등록번호 : 104-00-0000</Span>
            <Span>통신판매업신고 : 제 0000-서울강남구-0000호</Span>
            <Span>회사명 : HiCar</Span>
          </Flex>
          <Flex>
            <Span>
              <Span>Copyright © HiCar닷컴(주)</Span>
            </Span>
          </Flex>
          <Flex>
            <Spans>
              엔카닷컴(주)는 통신판매중개자로서 통신판매의 당사자가 아니며,
              상품·거래정보, 거래에 대하여 책임을 지지 않습니다.
            </Spans>
          </Flex>
        </FooterContainer>
      )}
    </>
  );
}

const Flex = styled.div`
  display: flex;
  justify-content: center;
`;

const Spans = styled.span`
  font-size: 10px;
  font-weight: bold;
  color: #aaa;
  margin-left: 35px;
  margin-top: 8px;
`;

const Span = styled.span`
  font-size: 12px;
  font-weight: bold;
  margin-left: 35px;
  margin-top: 8px;
`;

const P = styled.p`
  font-size: 12px;
  font-weight: bold;
  text-align: center;
`;

const FooterContainer = styled.div`
  padding: 10px;
  margin-top: 50px;
  background-color: #000;
  color: #fff;
`;
