import React, { useState, useEffect } from "react";
import styled from "@emotion/styled";
import { TfiTimer } from "react-icons/tfi";

const CarDetailTimer = ({ eventName, eventEndTime }) => {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

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

  if (!timeLeft) {
    return <></>;
  }

  return (
    <Container>
      <TfiTimer size={20} color="#fff" />
      <div id="eventName">{eventName}</div>
      {timeLeft.days} 일 {timeLeft.hours} 시간 {timeLeft.minutes} 분 {timeLeft.seconds} 초
    </Container>
  );
};

const Container = styled.div`
  position: absolute;
  top: 350px;
  width: 600px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #000;
  border-radius: 0 0 15px 15px;
  color: #fff;
  font-size: 16px;
  font-weight: bold;
  opacity: 0.5;
  z-index: 10;

  #eventName {
    font-size: 16px;
    margin: 0 20px;
    background-color: #fff;
    color: #000;
    opacity: 1;
    padding: 5px 10px;
    border-radius: 20px;
  }
`;

export default CarDetailTimer;
