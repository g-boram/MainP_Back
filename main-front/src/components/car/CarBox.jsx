import styled from "@emotion/styled";
import addDelimiter from "../../utils/addDelimiter";
import { CAR_OPTION_FUELTYPE } from "../../constants/carOption";
import { colorPalette } from "../../styles/colorPalette";
import { useNavigate } from "react-router-dom";
import { TfiTimer } from "react-icons/tfi";
import { useEffect, useState } from "react";
import { MdOutlineImageNotSupported } from "react-icons/md";

export default function CarBox(car) {
  const { make, model, fuelType, mileage, price, description, transmission, year, imageUrl, eventName, eventEndTime } =
    car;

  const navigate = useNavigate();
  const fuel = CAR_OPTION_FUELTYPE.filter((f) => f.value === fuelType);

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
  const [recentProducts, setRecentProducts] = useState([]);

  function calculateTimeLeft() {
    const endTime = new Date(eventEndTime).getTime(); // 종료 시간
    const now = new Date().getTime(); // 현재 시간
    const difference = endTime - now;

    if (difference > 0) {
      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / (1000 * 60)) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    } else {
      return null; // 시간이 종료되었음을 표시
    }
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <CarContainer onClick={() => navigate("/car/detail", { state: { ...car } })}>
      <ImgWrapper>
        {imageUrl ? <img src={imageUrl} alt="carImg" /> : <MdOutlineImageNotSupported size={30} color="#ddd" />}
        {eventName !== "" ? (
          <Container>
            <TfiTimer size={18} color="#fff" />
            <div id="eventName">{eventName}</div>
            {timeLeft?.days} 일 {timeLeft?.hours} 시간 {timeLeft?.minutes} 분 {timeLeft?.seconds} 초
          </Container>
        ) : (
          <></>
        )}
      </ImgWrapper>
      <CarWrapper>
        <NameText>
          {make} {model} {fuel[0]?.label} {transmission}
        </NameText>
        <GreyText>
          <div>{year}(년형)</div>
          <div>{addDelimiter(mileage)}km</div>
          <div>{fuel[0]?.label}</div>
        </GreyText>
        <DescRow>{description}</DescRow>
        <SaleText>{addDelimiter(price)}</SaleText>
        <PriceText>{addDelimiter(price)} 원</PriceText>
      </CarWrapper>
    </CarContainer>
  );
}

const CarContainer = styled.div`
  width: 230px;
  height: 360px;
  display: flex;
  flex-wrap: nowrap;
  flex-shrink: 0;
  flex-direction: column;
  background-color: white;
  border-radius: 5px;
  cursor: pointer;
`;

const CarWrapper = styled.div`
  padding: 0 10px;
`;

const ImgWrapper = styled.div`
  height: 150px;
  width: 230px;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f2f2f2;
  border: 1px solid #eee;
  border-radius: 5px;
  margin-bottom: 20px;

  & img {
    border-radius: 10px;
    width: 230px;
    height: 150px;
    object-fit: contain;
  }
`;

const DescRow = styled.div`
  display: flex;
  height: 30px;
  overflow: hidden;
  width: 100%;
  margin: 10px 0;
  font-size: 11px;
  white-space: pre-line;
  color: ${colorPalette.fontGrey};
`;

const NameText = styled.div`
  height: 50px;
  overflow: hidden;
  font-size: 16px;
  font-weight: 600;
  color: ${colorPalette.fontBlack};
`;

const PriceText = styled.div`
  font-size: 14px;
  font-weight: 600;
  color: ${colorPalette.fontRed};
`;

const SaleText = styled.div`
  font-size: 10px;
  color: ${colorPalette.fontGrey};
  text-decoration: line-through;
`;

const GreyText = styled.div`
  font-size: 11px;
  color: ${colorPalette.fontDarkGrey};
  margin: 5px 0;
  display: flex;
  justify-content: space-between;
`;

const Container = styled.div`
  position: absolute;
  bottom: 0px;
  width: 230px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #000;
  border-radius: 0 0 10px 10px;
  color: #fff;
  font-size: 12px;
  font-weight: bold;
  opacity: 0.7;
  z-index: 10;

  #eventName {
    font-size: 14px;
    margin: 0 10px;
    background-color: #fff;
    color: #000;
    padding: 3px 10px;
    border-radius: 20px;
  }
`;
