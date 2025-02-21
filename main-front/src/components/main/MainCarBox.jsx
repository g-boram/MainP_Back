import styled from "@emotion/styled";
import CarBox from "../car/CarBox";
import Text from "../shared/Text";
import Flex from "../shared/Flex";
import Spacing from "../shared/Spacing";
import { ClipLoader } from "react-spinners";
import { useEffect, useState } from "react";
import { getCarListAll } from "../../api/carApi";
import { ClearLoadingOverlay } from "../../styles/managerLayoutStyles";
import { FaArrowRightLong } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

export default function MainCarBox() {
  const navigate = useNavigate();
  const [carData, setCarData] = useState([]);
  const [eventCarData, setEventCarData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const allData = async () => {
      setIsLoading(true);
      try {
        const res = await getCarListAll();
        const cars = res.data.filter((car) => car.status === "Available" && car.eventName === "");
        const eventCars = res.data.filter((car) => car.eventName !== "");
        setCarData(cars);
        setEventCarData(eventCars);
      } catch (e) {
        console.log("carList Error : ", e);
      } finally {
        setIsLoading(false);
      }
    };
    allData();
  }, []);

  const handleCarPage = () => {
    navigate("/car");
  };

  return (
    <CarListContainer>
      {isLoading && (
        <ClearLoadingOverlay>
          <ClipLoader color="#000" z-index={11} />
        </ClearLoadingOverlay>
      )}
      <CarListBox>
        <HeadTitle>
          <Flex justify="flex-start" align="center" width="100%">
            <Text typography="t16" bold height="40px">
              한정특가
            </Text>
            <Spacing size={20} direction="width" />
            <Text typography="t11" bold color="grey">
              지금 할인중인 상품을 만나 보세요!
            </Text>
          </Flex>
          <Flex onClick={handleCarPage} style={{ cursor: "pointer" }}>
            <Text typography="t11" bold color="grey" width="80px">
              확인하러 가기
            </Text>
            <FaArrowRightLong color="grey" size={15} />
          </Flex>
        </HeadTitle>
        {eventCarData && eventCarData.length !== 0 ? (
          <CarEventList>
            {eventCarData.map((car) => (
              <CarBox key={car.id} {...car} />
            ))}
          </CarEventList>
        ) : (
          <></>
        )}
      </CarListBox>
      <CarListBox>
        <HeadTitle>
          <Flex justify="flex-start" align="center" width="100%">
            <Text typography="t16" bold height="40px">
              최근 등록된 상품
            </Text>
            <Spacing size={20} direction="width" />
            <Text typography="t11" bold color="grey">
              등록된지 얼마안된 상품을 빠르게 만나보세요!
            </Text>
          </Flex>
          <Flex onClick={handleCarPage} style={{ cursor: "pointer" }}>
            <Text typography="t11" bold color="grey" width="80px">
              확인하러 가기
            </Text>
            <FaArrowRightLong color="grey" size={15} />
          </Flex>
        </HeadTitle>
        {carData && carData.length !== 0 ? (
          <CarListWrapper>
            {carData.map((car) => (
              <CarBox key={car.id} {...car} />
            ))}
          </CarListWrapper>
        ) : (
          <></>
        )}
      </CarListBox>
      <Spacing size={30} />
    </CarListContainer>
  );
}

const CarListContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const CarListBox = styled.div`
  width: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
`;

const CarEventList = styled.div`
  width: 1150px;
  height: 400px;
  padding: 10px;
  display: flex;
  justify-content: flex-start;
  flex-wrap: nowrap;
  align-items: center;
  overflow-x: scroll;
  margin-top: 10px;
  margin-bottom: 50px;
  margin-left: 15px;
  gap: 20px;
  border-radius: 10px;
  box-shadow: 0px 0px 10px -2px #ccc;
`;

const HeadTitle = styled.div`
  height: 40px;
  font-weight: bold;
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
  color: #000;
  padding-left: 10px;
`;

const CarListWrapper = styled.div`
  width: 100%;
  gap: 20px;
  display: flex;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: flex-start;
`;
