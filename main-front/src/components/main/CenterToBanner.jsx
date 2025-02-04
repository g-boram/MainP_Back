import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import { css, keyframes } from "@emotion/react";

// 이미지 리스트
import img1 from "../../assert/main_slide/centerTo1.png";
import img2 from "../../assert/main_slide/centerTo1.png";
import img3 from "../../assert/main_slide/centerTo1.png";
import img4 from "../../assert/main_slide/centerTo1.png";
import img5 from "../../assert/main_slide/centerTo1.png";
import { HEIGHT_LIST } from "../../constants/height";

const images = [
  { src: img1, position: "center" },
  { src: img2, position: "left" },
  { src: img3, position: "right" },
  { src: img4, position: "left_left" },
  { src: img5, position: "right_right" },
];

const CenterToBanner = () => {
  const [visibleImages, setVisibleImages] = useState([]);

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      if (index < images.length) {
        setVisibleImages((prev) => [...prev, images[index]]);
        index++;
      } else {
        clearInterval(interval);
      }
    }, 5000); // 1초 간격으로 등장

    return () => clearInterval(interval);
  }, []);

  return (
    <ImageContainer>
      {images.map((image, idx) => (
        <Image key={idx} src={image.src} position={image.position} isVisible={visibleImages.includes(image)} />
      ))}
    </ImageContainer>
  );
};

export default CenterToBanner;

// 애니메이션 키프레임 (중앙에서 등장)
const fadeInCenter = keyframes`
  from {
    opacity: 0;
    transform: scale(0.6);
  }
  to {
    opacity: 1;
    transform: scale(1.6);
  }
`;

const fadeInLeft = keyframes`
  from {
    opacity: 0;
    transform: translateX(100px); 
  }
  to {
    opacity: 0.8;
    transform: translateX(0); 
  }
`;

const fadeInRight = keyframes`
  from {
    opacity: 0;
    transform: translateX(-50px); 
  }
  to {
    opacity: 0.8;
    transform: translateX(0); 
  }
`;

// 이미지 컨테이너
const ImageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  width: 100%;
  height: 400px;
  overflow: hidden;
  /* padding-top: ${HEIGHT_LIST.HEADER + HEIGHT_LIST.NAVBAR}px; */
`;

// 이미지 스타일
const Image = styled.img`
  position: absolute;
  width: 250px;
  height: 250px;
  object-fit: cover;
  opacity: 0;

  ${({ position }) =>
    position === "center" &&
    css`
      animation: ${fadeInCenter} 1s ease-in-out forwards;
      z-index: 5;
    `}

  ${({ position }) =>
    position === "left" &&
    css`
      left: 250px;
      animation: ${fadeInLeft} 2s ease-in-out forwards;
    `}

  ${({ position }) =>
    position === "right" &&
    css`
      right: 250px;
      animation: ${fadeInRight} 2s ease-in-out forwards;
    `}



  ${({ isVisible }) =>
    isVisible &&
    css`
      opacity: 1;
    `}
`;
