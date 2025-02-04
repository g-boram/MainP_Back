import styled from "@emotion/styled";
import { colorPalette } from "../../../styles/colorPalette";
import { useNavigate } from "react-router-dom";
import { SELLER_STATUS } from "../../../constants/carOption";
import addDelimiter from "../../../utils/addDelimiter";

export default function RepairCarRow(car) {
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
    sellerStatus,
    createdAt,
    status,
    transmission,
    year,
  } = car;
  const rStatus = SELLER_STATUS.find((item) => item.value === sellerStatus);
  const handleDetailPage = () => {
    navigate("/manager/repair/detail", { state: { ...car } });
  };

  return (
    <CarRowWrapper status={status} color={color}>
      <div id="carId">{carId}</div>
      <div id="make">{make}</div>
      <div id="model">{model}</div>
      <div id="price">{addDelimiter(price)}</div>
      <div id="year">{year}</div>
      <div id="fuelType">{fuelType}</div>
      <div id="mileage">{addDelimiter(mileage)}</div>
      <div id="transmission">{transmission}</div>
      <div id="sellerId">{sellerId}</div>
      <div id="color"></div>
      <div id="createdAt">{createdAt.slice(0, 10)}</div>
      <div id="status">{rStatus.label}</div>
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
    width: 150px;
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
    width: 130px;
    color: green;
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
