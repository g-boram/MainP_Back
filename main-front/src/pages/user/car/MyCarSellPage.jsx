import styled from "@emotion/styled/macro";
import CarSellimg from "../../../assert/carSellimg.png";
import { HEIGHT_LIST } from "../../../constants/height";
import { SlArrowRight } from "react-icons/sl";
import { Link } from "react-router-dom";
import { PageContainer } from "../../../styles/pageLayoutStyles";

export default function MyCarSellPage() {
  return (
    <PageContainer>
      <CarListContainer>
        <ScArea>
          <SellContainer>
            <TopText>딜러견적 비교해서 최고가에 팔기</TopText>
            <LinkStyle to="/carsellestimate">
              <SellButton>
                HiCar 비교견적
                <SlArrowRight />
              </SellButton>
            </LinkStyle>
          </SellContainer>
          <ImgArea>
            <Img src={CarSellimg} alt="Logoimg" />
          </ImgArea>
        </ScArea>

        <SellContainer2>
          <TopText>원하는 가격에 팔기</TopText>
        </SellContainer2>
        <SellButton2>
          직거래 간편등록
          <SlArrowRight />
        </SellButton2>
      </CarListContainer>
    </PageContainer>
  );
}

const ImgArea = styled.div`
  width: 100%;
  display: flex;
  justify-content: right;
`;

const Img = styled.img`
  width: 200px;
  border-radius: 10px;
`;

const SellContainer2 = styled.div`
  width: 140px;
`;
const SellButton2 = styled.div`
  display: flex;
  cursor: pointer;
  align-items: center;
  justify-content: center;
  padding: 10px;
  border-radius: 5px;
  color: #000;
  box-sizing: border-box;
  width: 250px;
  font-weight: 700;
  background-color: #fff;
  border: 1px solid rgba(0, 0, 0, 0.3);
  font-size: 16px;

  svg {
    font-size: 10px;
    margin-left: 5px;
  }

  :hover {
    transition: 0.5s;
    font-weight: bold;
    color: #fff;
    background-color: #000000;
  }
`;

const LinkStyle = styled(Link)`
  color: #000;
  text-decoration: none;
`;

const ScArea = styled.div`
  height: 350px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.3);
`;

const SellContainer = styled.div`
  width: 160px;
`;

const TopText = styled.h3`
  line-height: 30px;
  font-weight: 800;
  width: 150px;
`;

const SellButton = styled.div`
  display: flex;
  cursor: pointer;
  align-items: center;
  justify-content: center;
  padding: 10px;
  border-radius: 5px;
  color: #fff;
  box-sizing: border-box;
  width: 250px;
  font-weight: 700;
  background-color: #d72e36;
  font-size: 16px;

  svg {
    font-size: 10px;
    margin-left: 5px;
  }
  :hover {
    transition: 0.5s;
    font-weight: bold;
    background-color: #b50009;
  }
`;

const CarListContainer = styled.div`
  /* background-color: #fbfbfb; */
  width: 900px;
  margin: 0 auto;
  padding-top: ${HEIGHT_LIST.HEADER + HEIGHT_LIST.NAVBAR}px;

  @media (max-width: 600px) {
    flex-direction: column;
  }
`;
