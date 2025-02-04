import styled from "@emotion/styled";
import { colorPalette } from "../../../styles/colorPalette";
import { useNavigate } from "react-router-dom";
import Flex from "../../shared/Flex";

export default function CarRow(car) {
  const navigate = useNavigate();

  const {
    carId,
    color,
    make,
    model,
    fuelType,
    mileage,
    price,
    sellerId,
    createdAt,
    status,
    transmission,
    year,
    imageUrl,
    eventName,
  } = car;

  const handleDetailPage = () => {
    navigate("/manager/car/detail", { state: { ...car } });
  };
  console.log("car", car);
  return (
    <CarRowWrapper status={status} color={color}>
      <div id="carId">{carId}</div>
      <ImagWrapper>{imageUrl ? <img src={imageUrl} alt="" /> : <></>}</ImagWrapper>
      <Flex width="15%" direction="column">
        <div id="make">{make}</div>
        <div id="model">{model}</div>
        <div id="year">{year}</div>
      </Flex>
      <Flex width="10%">
        <div id="price">{price}</div>
      </Flex>
      <Flex width="15%">
        {eventName ? (
          <Flex direction="column">
            <div>Event</div>
            <div>{eventName}</div>
          </Flex>
        ) : (
          <Flex>이벤트 없음</Flex>
        )}
      </Flex>
      <Flex width="10%" direction="column">
        <div id="fuelType">{fuelType}</div>
        <div id="transmission">{transmission}</div>
      </Flex>
      <Flex width="10%">
        <div id="mileage">{mileage}</div>
      </Flex>
      <div id="color"></div>
      <div id="createdAt">{createdAt.slice(0, 10)}</div>
      <div id="status">{status === "AVAILABLE" ? "판매중" : "판매종료"}</div>
      <div id="btnBox">
        <DetailBtn onClick={handleDetailPage}>상세보기</DetailBtn>
      </div>
    </CarRowWrapper>
  );
}

const ImagWrapper = styled.div`
  width: 100px;
  height: 100px;
  background-color: #eee;
  margin: 10px;

  > img {
    width: 100px;
    height: auto;
    object-fit: contain;
  }
`;

const CarRowWrapper = styled.div`
  min-height: 35px;
  width: 100%;
  display: flex;
  align-items: center;
  font-size: 12px;
  border-bottom: 1px solid #ccc;
  color: ${colorPalette.fontBlack};
  cursor: pointer;
  gap: 10px;

  > div {
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: hidden;
  }

  #color {
    width: 30px;
    height: 30px;
    background-color: ${({ color }) => color};
  }
  #status {
    width: 50px;
    color: ${({ status }) => (status === "AVAILABLE" ? "green" : "red")};
  }
  #createdAt {
    width: 120px;
    color: ${colorPalette.fontGrey};
  }
  #btnBox {
    width: 100px;
  }

  :hover {
    background-color: #f7f7f7;
  }
`;

const DetailBtn = styled.button`
  height: 30px;
  padding: 2px 10px;
  font-size: 12px;
  background-color: ${colorPalette.btnBlack};
  border: none;
  border-radius: 5px;
  cursor: pointer;
  color: #fff;

  :hover {
    font-weight: bold;
    background-color: ${colorPalette.hoverBlack};
  }
`;
