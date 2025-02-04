import styled from "@emotion/styled";
import { colorPalette } from "../../../styles/colorPalette";
import { useNavigate } from "react-router-dom";

export default function CarEventRow(car) {
  const navigate = useNavigate();

  const { carId, color, make, model, fuelType, mileage, price, sellerId, createdAt, status, transmission, year } = car;

  const handleDetailPage = () => {
    navigate("/manager/car/event/detail", { state: { ...car } });
  };

  return (
    <CarRowWrapper status={status} color={color}>
      <div id="carId">{carId}</div>
      <div id="make">{make}</div>
      <div id="model">{model}</div>
      <div id="price">{price}</div>
      <div id="year">{year}</div>
      <div id="fuelType">{fuelType}</div>
      <div id="mileage">{mileage}</div>
      <div id="transmission">{transmission}</div>
      <div id="sellerId">{sellerId}</div>
      <div id="color"></div>
      <div id="createdAt">{createdAt.slice(0, 10)}</div>
      <div id="status">{status === "AVAILABLE" ? "판매중" : "판매종료"}</div>
      <div id="btnBox">
        <DetailBtn onClick={handleDetailPage}>상세보기</DetailBtn>
      </div>
    </CarRowWrapper>
  );
}

const CarRowWrapper = styled.div`
  height: 35px;
  width: 100%;
  display: flex;
  align-items: center;
  font-size: 12px;
  border-bottom: 1px solid #ccc;
  color: ${colorPalette.fontBlack};
  cursor: pointer;

  > div {
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  #carId {
    width: 50px;
  }
  #make {
    width: 100px;
  }
  #model {
    width: 200px;
  }
  #price {
    width: 100px;
  }
  #year {
    width: 100px;
  }
  #fuelType {
    width: 100px;
  }
  #mileage {
    width: 120px;
  }
  #transmission {
    width: 100px;
  }
  #sellerId {
    width: 80px;
  }
  #color {
    width: 40px;
    height: 30px;
    background-color: ${({ color }) => color};
  }
  #status {
    width: 80px;
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
