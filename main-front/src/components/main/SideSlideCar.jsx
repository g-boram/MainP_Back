import styled from "@emotion/styled";
import Flex from "../shared/Flex";
import Spacing from "../shared/Spacing";
import mainToSide1 from "../../assert/main_slide/mainToSide1.png";
import mainToSide2 from "../../assert/main_slide/mainToSide2.png";
import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

export default function SideSlideCar() {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  // Intersection Observer 설정
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true); // 뷰포트에 진입하면 애니메이션 시작
        }
      },
      { threshold: 0.1 } // 10%가 뷰포트에 보이면 트리거
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  // Framer Motion 애니메이션 설정
  // left
  const variants1 = {
    hidden: {
      opacity: 0,
      x: -100, // 왼쪽/오른쪽 방향 설정
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.8 }, // 애니메이션 속도
    },
  };
  // right
  const variants2 = {
    hidden: {
      opacity: 0,
      x: 100, // 왼쪽/오른쪽 방향 설정
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.8 }, // 애니메이션 속도
    },
  };

  return (
    <Container>
      <motion.div
        ref={ref}
        initial="hidden"
        animate={isVisible ? "visible" : "hidden"}
        variants={variants1}
        style={{ marginBottom: "20px" }}
      >
        <ImgBox>
          <img src={mainToSide1} alt={"mainToSide1"} style={{ width: "500px", height: "auto" }} />
        </ImgBox>
      </motion.div>
      <Flex direction="column">
        <Flex direction="column">
          <TopText>딜러견적 비교해서 최고가에 팔기</TopText>
          <LinkStyle to="/carsellestimate">
            <SellButton>HiCar 비교견적</SellButton>
          </LinkStyle>
        </Flex>
        <Spacing size={70} />
        <Flex direction="column">
          <SellContainer2>
            <TopText>원하는 가격에 팔기</TopText>
          </SellContainer2>
          <SellButton2>직거래 간편등록</SellButton2>
        </Flex>
      </Flex>
      <motion.div
        ref={ref}
        initial="hidden"
        animate={isVisible ? "visible" : "hidden"}
        variants={variants2}
        style={{ marginBottom: "20px" }}
      >
        <ImgBox>
          <img src={mainToSide2} alt={"mainToSide2"} style={{ width: "500px", height: "auto" }} />
        </ImgBox>
      </motion.div>
    </Container>
  );
}

const Container = styled.div`
  width: 1200px;
  height: 300px;
  display: flex;
  margin: 20px 0;
  justify-content: space-between;
  background-color: #fefefe;
`;

const ImgBox = styled.div`
  > img {
    width: 500px;
    height: 100%;
  }
`;
const TopText = styled.h3`
  /* line-height: 30px; */
  font-weight: 700;
  width: 200px;
  font-size: 14px;
`;
const LinkStyle = styled(Link)`
  color: #000;
  text-decoration: none;
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
  width: 200px;
  font-weight: 700;
  background-color: #d72e36;
  font-size: 14px;

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

const SellContainer2 = styled.div`
  width: 200px;
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
  width: 200px;
  font-weight: 700;
  background-color: #fff;
  border: 1px solid rgba(0, 0, 0, 0.3);
  font-size: 14px;

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
