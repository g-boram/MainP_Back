import styled from "@emotion/styled/macro";
import Map from "../../components/map/Map";
import { HEIGHT_LIST } from "../../constants/height";
import CompanyImg from "../../assert/companyimg.jpg";
import Compan from "../../assert/compan.png";
import { useAlertContext } from "../../contexts/AlertContextProvider";
import Comlogo from "../../assert/comlogo.png";
import { isCancel } from "axios";
import { toast } from "react-toastify";

//123123
export default function CompanyPage() {
  const { open } = useAlertContext();

  const copyToClipboard = () => {
    const address = "서울특별시 구로구 경인로 557";
    navigator.clipboard
      .writeText(address)
      .then(() => {
        toast.success(`🎉 복사 완료 `);
      })
      .catch((err) => {
        alert("주소 복사 실패: " + err);
      });
  };

  return (
    <CarListContainer>
      <ImgArea>
        <Img src={CompanyImg}></Img>
        <Tittle>HiCar 소개</Tittle>
      </ImgArea>

      <ContentWrapper>
        <LeftContent>
          <TopIntroduceTittle>사업 소개</TopIntroduceTittle>
          <Highlights>중고 자동차 시장의 선두주자,HiCar</Highlights>
          <P>
            HiCar는 2025년 1월에 설립되어, 신뢰와 투명성을 바탕으로 중고차 거래
            시장에서 새로운 기준을 세우고 있습니다.
          </P>
          <P>
            HiCar는 2025년, 빠르게 성장하는 중고차 시장에서 눈에 띄는 성과를
            거두고 있습니다. 특히, 혁신적인 "HiCar 온라인 차량 거래 서비스"와
            고객 중심의 서비스를 통해 시장에서 큰 주목을 받고 있으며, 지속적으로
            성장 가능성을 보여주고 있습니다. 코로나19의 영향에도 불구하고,
            HiCar는 고객의 신뢰를 얻으며 안정적인 서비스 운영을 이어가고 있으며,
            앞으로 더욱 큰 성장을 기대할 수 있는 기반을 마련했습니다.
          </P>
          <P>“고객의 가치를 최우선으로, 믿을 수 있는 거래를 제공합니다.”</P>
        </LeftContent>
        <RightContent>
          <Img2 src={Compan}></Img2>
        </RightContent>
      </ContentWrapper>
      <TopIntroduceTittle>위치</TopIntroduceTittle>
      <Map />
      {/* <P>
        주소 : 서울특별시 구로구 경인로 557
        <Copy onClick={copyToClipboard}>복사</Copy>
      </P> */}
    </CarListContainer>
  );
}

const Copy = styled.span`
  margin-left: 13px;
  border: 1px solid rgba(0, 0, 0, 0.7);
  padding: 3px;
  border-radius: 3px;
  width: 100%;
  color: "blue";
  cursor: pointer;
`;

const ContentWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-top: 30px;
  justify-content: space-between;
  width: 100%;
`;

const LeftContent = styled.div`
  flex: 1;
  padding-right: 20px;
`;

const RightContent = styled.div`
  margin-top: 70px;
  margin-left: 70px;
  flex: 0.4;
`;

const TopIntroduceTittle = styled.h1`
  margin-top: 50px;
  font-size: 27px;
`;

const Highlights = styled.p`
  color: #d72e36;
  font-weight: bold;
  font-size: 18px;
`;

const P = styled.p`
  font-size: 13px;
  font-weight: bold;

  &:nth-of-type(4) {
    font-size: 14px;
  }
`;

const Tittle = styled.h2`
  position: absolute;
  top: 35%;
  left: 5%;
  transform: translate(0, -50%);
  color: white;
  font-size: 32px;
  font-weight: bold;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.7);
`;

const Img = styled.img`
  width: 100%;
  height: 300px;
  object-fit: cover;
`;

const Img2 = styled.img`
  width: 200px;
`;

const ImgArea = styled.div`
  position: relative;
  width: 100%;
  height: 300px;
`;

const CarListContainer = styled.div`
  user-select: none;
  min-height: 100%;
  width: 1200px;
  margin: 0 auto;
  margin-bottom: 100px;
  padding-top: ${HEIGHT_LIST.HEADER + HEIGHT_LIST.NAVBAR}px;

  @media (max-width: 600px) {
    flex-direction: column;
  }
`;
