import styled from "@emotion/styled";
import CarImg from "../../../assert/carPageImg.jpg";
import CarBox from "../../../components/car/CarBox";
import SideMenuBar from "../../../components/shared/SideMenuBar";
import { HEIGHT_LIST } from "../../../constants/height";
import { useEffect, useState } from "react";
import { getCarListAll } from "../../../api/carApi";
import { ClearLoadingOverlay } from "../../../styles/managerLayoutStyles";
import { ClipLoader } from "react-spinners";
import { TbClipboardSearch } from "react-icons/tb";
import { BaseIconBox } from "../../../styles/miniComponentStyles";

export default function CarPage() {
  const [carData, setCarData] = useState([]);
  const [eventCarData, setEventCarData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const allData = async () => {
      setIsLoading(true);
      try {
        const res = await getCarListAll();
        const cars = res.data.filter((car) => car.status === "AVAILABLE");
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

  return (
    <CarListContainer>
      {isLoading && (
        <ClearLoadingOverlay>
          <ClipLoader color="#000" z-index={11} />
        </ClearLoadingOverlay>
      )}
      <LeftCategoryBox>
        <LeftTopBox>
          <Img src={CarImg}></Img>
        </LeftTopBox>
        <SideMenuBar setIsLoading={setIsLoading} setCarData={setCarData} />
      </LeftCategoryBox>
      <RightContentBox>
        <HeadTitle>한정특가</HeadTitle>
        {eventCarData && eventCarData.length !== 0 ? (
          <CarEventList>
            {eventCarData.map((car) => (
              <CarBox key={car.id} {...car} />
            ))}
          </CarEventList>
        ) : (
          <></>
        )}
        <CarListBox>
          {carData && carData.length !== 0 ? (
            <CarListWrapper>
              {carData.map((car) => (
                <CarBox key={car.id} {...car} />
              ))}
            </CarListWrapper>
          ) : (
            <NotDataWrapper>
              <BaseIconBox>
                <TbClipboardSearch size={40} />
                <div>차량이 없습니다.</div>
              </BaseIconBox>
            </NotDataWrapper>
          )}
        </CarListBox>
      </RightContentBox>
    </CarListContainer>
  );
}

const Img = styled.img`
  width: 300px;
  height: 200px;

  margin-bottom: 30px;
`;

const CarListContainer = styled.div`
  min-height: 100%;
  width: 1000px;
  margin: 0 auto;
  display: flex;
  margin-bottom: 100px;
  padding-top: ${HEIGHT_LIST.HEADER + HEIGHT_LIST.NAVBAR + 30}px;

  @media (max-width: 600px) {
    flex-direction: column;
  }
`;

const LeftCategoryBox = styled.div`
  height: 100%;
  min-width: 250px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const LeftTopBox = styled.div`
  width: 250px;
  height: 200px;
  margin-top: 30px;
  margin-bottom: 30px;
  background-color: #000;
  border-radius: 10px;
  > img {
    width: 250px;
    height: 100%;
  }
`;

const CarEventList = styled.div`
  width: 800px;
  height: auto;
  padding: 20px;
  display: flex;
  justify-content: flex-start;
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
  width: 100%;
  font-weight: bold;
  display: flex;
  align-items: flex-end;
  margin-top: 10px;
  color: #000;
  padding-left: 10px;
`;

const CarListBox = styled.div`
  width: 850px;
`;

const RightContentBox = styled.div`
  height: 100%;
  width: 800px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  margin-left: 30px;
`;

const CarListWrapper = styled.div`
  width: 100%;
  gap: 30px;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: flex-start;
  padding-left: 40px;
`;

const NotDataWrapper = styled.div`
  width: 100%;
  height: 500px;
  background-color: #f4f4f4;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
