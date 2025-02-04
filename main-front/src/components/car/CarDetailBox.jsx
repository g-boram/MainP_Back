import React from "react";
import styled from "@emotion/styled";
import Spacing from "../shared/Spacing";
import Flex from "../shared/Flex";
import Text from "../shared/Text";
import addDelimiter from "../../utils/addDelimiter";
import Badge from "../shared/Badge";
import CarDetailInfoBox from "../manager/car/CarDetailInfoBox";
import CarSellerInfoBox from "../manager/car/CarSellerInfoBox";
import CarDetailTimer from "./CarDetailTimer";
import LogoImg from "../../assert/Logo.png";
import { FaCheckCircle } from "react-icons/fa";
import { RiCustomerService2Fill } from "react-icons/ri";
import { css } from "@emotion/react";
import { useLocation, useNavigate } from "react-router-dom";
import { CAR_OPTION_FUELTYPE } from "../../constants/carOption";
import { ClearLoadingOverlay } from "../../styles/managerLayoutStyles";
import { ClipLoader } from "react-spinners";
import { MdOutlineImageNotSupported } from "react-icons/md";
import { useState } from "react";
import CarDetailOptionBox from "./CarDetailOptionBox";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

export default function CarDetailBox() {
  const { user } = useSelector((state) => state.auth);
  const location = useLocation();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);

  const handleOpenPaymentModal = () => {
    setIsPaymentModalOpen(true);
  };

  const handleClosePaymentModal = () => {
    setIsPaymentModalOpen(false);
  };

  const handleOpenModal = () => {
    if (user) {
      setIsModalOpen(true);
    } else {
      toast.error("로그인 후 이용가능합니다!");
      navigate("/signin");
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const {
    carId,
    color,
    make,
    model,
    fuelType,
    mileage,
    price,
    createdAt,
    status,
    description,
    transmission,
    year,
    imageUrl,
    sellerId,
    eventName,
    eventEndTime,
    hashTags,
  } = location.state;

  const fuel = CAR_OPTION_FUELTYPE.filter((f) => f.value === fuelType);

  return (
    <FormContainer>
      {location.state ? (
        <MainContainer>
          {/* 왼쪽 고정 영역 */}
          <FixedBox>
            {eventName ? <CarDetailTimer eventEndTime={eventEndTime} eventName={eventName} /> : <></>}
            <CarImgBox>
              {imageUrl ? <img src={imageUrl} alt="carImg" /> : <MdOutlineImageNotSupported size={50} color="#ddd" />}
            </CarImgBox>
            <CarDetailInfoBox />
            <CarSellerInfoBox id={sellerId} />
          </FixedBox>
          {/* 오른쪽 스크롤 영역 */}
          <ScrollBox>
            <TopIconRow>
              <LogoImgBox>
                <img src={LogoImg} alt="Logo" />
              </LogoImgBox>
              <TopRowRight>
                {hashTags && hashTags?.length !== 0 ? hashTags.map((tag) => <TagText>#{tag}</TagText>) : <></>}
              </TopRowRight>
            </TopIconRow>
            <CarMainTitleRow>
              <Flex justify="flex-start">
                <Badge
                  label={status === "AVAILABLE" ? "판매중" : "판매완료"}
                  color={status === "AVAILABLE" ? "#1a831d" : "#c3453c"}
                />
              </Flex>
              <div id="topTitle">
                {make} {model} {fuel[0]?.label} {transmission}
              </div>
              <Flex justify="space-between" align="flex-end">
                <div id="lPrice">{addDelimiter(price)}</div>
                <div id="rPrice">{addDelimiter(price)}</div>
              </Flex>
              <Spacing size={30} />
              <Flex>
                <CallBtn>
                  <a href={`tel:01058290424`} style={{ textDecoration: "none", color: "#000" }}>
                    판매자에게 전화하기
                  </a>
                </CallBtn>
                <Spacing size={10} direction="width" />
                <CounselBtn>온라인 견적내기</CounselBtn>
              </Flex>
              <OnCovenantBtn onClick={handleOpenModal}>HiCar에서 구매하기</OnCovenantBtn>
            </CarMainTitleRow>

            <CarDataBox>
              <Flex height="60px" justify="space-between" align="center">
                <Text typography="t15" bold>
                  기본정보
                </Text>
                <Text typography="t11" color="grey">
                  매물등록일: {createdAt.slice(0, 10)}
                </Text>
              </Flex>
              <Flex height="30px" justify="space-between" align="center">
                <Text typography="t13" color="grey" width="80px" textAlign="left">
                  제조사
                </Text>
                <Text typography="t13" color="black" width="100px" textAlign="left">
                  {make}
                </Text>
                <Text typography="t13" color="grey" width="80px" textAlign="left">
                  모델명
                </Text>
                <Text typography="t13" color="black" width="100px" textAlign="left">
                  {model}
                </Text>
              </Flex>
              <Flex height="30px" justify="space-between" align="center">
                <Text typography="t13" color="grey" width="80px" textAlign="left">
                  차량번호
                </Text>
                <Text typography="t13" color="black" width="100px" textAlign="left">
                  {carId}
                </Text>
                <Text typography="t13" color="grey" width="80px" textAlign="left">
                  주행거리
                </Text>
                <Text typography="t13" color="black" width="100px" textAlign="left">
                  {addDelimiter(mileage)} km
                </Text>
              </Flex>
              <Flex height="30px" justify="space-between" align="center">
                <Text typography="t13" color="grey" width="80px" textAlign="left">
                  연식
                </Text>
                <Text typography="t13" color="black" width="100px" textAlign="left">
                  {year}
                </Text>
                <Text typography="t13" color="grey" width="80px" textAlign="left">
                  색상
                </Text>
                <Text typography="t13" color="black" width="100px" textAlign="left">
                  <ColorBox color={color} />
                </Text>
              </Flex>
              <Flex height="30px" justify="space-between" align="center">
                <Text typography="t13" color="grey" width="80px" textAlign="left">
                  연료타입
                </Text>
                <Text typography="t13" color="black" width="100px" textAlign="left">
                  {fuel[0].label}
                </Text>
                <Text typography="t13" color="grey" width="80px" textAlign="left">
                  변속기
                </Text>
                <Text typography="t13" color="black" width="100px" textAlign="left">
                  {transmission}
                </Text>
              </Flex>
            </CarDataBox>
            <CarDataBox>
              <Flex height="60px" justify="space-between" align="center">
                <Text typography="t15" bold>
                  기본설명
                </Text>
              </Flex>
              <DescBox>{description}</DescBox>
            </CarDataBox>
            <CarDataBox>
              <CarDetailOptionBox carOptionData={location.state?.carOptionData[0]} />
            </CarDataBox>
          </ScrollBox>
        </MainContainer>
      ) : (
        <ClearLoadingOverlay>
          <ClipLoader color="#000" z-index={11} />
        </ClearLoadingOverlay>
      )}

      {/* 모달 */}
      {isModalOpen && (
        <ModalOverlay onClick={handleCloseModal}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <ModalHeader>
              <h2>HiCar 구매하기</h2>
              <CloseButton onClick={handleCloseModal}>×</CloseButton>
            </ModalHeader>
            <ModalBody>
              <h3>제공 혜택</h3>

              <Div>
                <FaCheckCircle />
                차량확시 시｜ 원하는 곳으로 배송
              </Div>
              <Spacing size={10} />
              <Div>
                <FaCheckCircle />
                구매 시｜7일간 타보고 환불가능
              </Div>
              <OrderBtn onClick={handleOpenPaymentModal}>즉시 결제하기</OrderBtn>
              <DivChat>
                <RiCustomerService2Fill />
                챗봇으로 문의하기
              </DivChat>
            </ModalBody>
            <ModalFooter>
              <ModalButton onClick={handleCloseModal}>닫기</ModalButton>
            </ModalFooter>
          </ModalContent>
        </ModalOverlay>
      )}

      {/* 토스 결제 모달 */}
      {isPaymentModalOpen && (
        <ModalOverlay onClick={handleClosePaymentModal}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <ModalHeader>
              <h2>결제 방식</h2>
              <CloseButton onClick={handleClosePaymentModal}>×</CloseButton>
            </ModalHeader>
            <ModalBody>
              <Toss
                onClick={() => {
                  const tossPayments = window.TossPayments(process.env.REACT_APP_TOSS_CLIENT_KEY);
                  tossPayments
                    .requestPayment("카드", {
                      amount: price,
                      orderId: `order-${Date.now()}`,
                      orderName: `${make} ${model}`,
                      successUrl: "https://boram-app.com.herokuapp.com/buy/success",
                      failUrl: "https://boram-app.com.herokuapp.com/buy/fail",
                    })
                    .catch((error) => {
                      console.error(error);
                    });
                }}
              >
                toss 결제하기
              </Toss>
            </ModalBody>
          </ModalContent>
        </ModalOverlay>
      )}
    </FormContainer>
  );
}

const Toss = styled.button`
  border: none;
  font-size: 15px;
  background-color: #4484ee;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  margin-top: 20px;
  padding: 15px;
  width: 100%;
`;

const OrderBtn = styled.div`
  border: 1px solid #000;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  margin-top: 20px;
  padding: 15px;
  width: 100%;
  cursor: pointer;

  svg {
    margin-right: 8px;
    font-size: 17px;
  }
  :hover {
    background-color: #000;
    color: #fff;
    transition: 1s;
  }
`;

const MainContainer = styled.div`
  display: flex;
`;

// 왼쪽
const FixedBox = styled.div`
  width: 600px;
  height: 700px;
`;

const LogoImgBox = styled.div`
  display: flex;
  width: 50px;
  height: 50px;
  > img {
    height: 50px;
    width: 100%;
    border-radius: 5px;
    object-fit: contain;
  }
`;
const CarImgBox = styled.div`
  background-color: #f4f4f4;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 400px;
  margin-bottom: 10px;
  border-radius: 15px;
  position: relative;

  > img {
    width: 100%;
    border-radius: 15px;
    object-fit: contain;
  }
`;

// 오른쪽
const ScrollBox = styled.div`
  flex: 1;
  height: 700px;
  overflow-y: auto;
  padding: 0 40px;
  background-color: #ffffff;
  border-left: 1px solid #eee;
  border-right: 1px solid #eee;
  margin-left: 10px;
`;

const TopIconRow = styled.div`
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
`;

const CarMainTitleRow = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;

  > div {
    #lPrice {
      font-size: 14px;
      color: grey;
    }
    #rPrice {
      font-size: 22px;
      color: #d42424;
    }
  }
  #topTitle {
    font-size: 24px;
    font-weight: 600;
    margin-top: 10px;
    height: 100px;
  }
`;

const ColorBox = styled.div`
  height: 25px;
  width: 25px;
  border: 1px solid #f4f4f4;
  ${({ color }) => css`
    background-color: ${color};
  `}
`;
const CallBtn = styled.div`
  width: 100%;
  padding: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  font-weight: 600;
  border-radius: 3px;
  background-color: #eee;
  cursor: pointer;
  :hover {
    color: #fff;
    background-color: #666;
    transition: 0.5s;
  }
`;
const CounselBtn = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid #000;
  border-radius: 3px;
  font-size: 14px;
  font-weight: 600;
  background-color: #fff;
  cursor: pointer;
  :hover {
    color: #fff;
    transition: 0.5s;
    background-color: #000;
  }
`;

const OnCovenantBtn = styled.div`
  width: 100%;
  height: 45px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 3px;
  font-size: 14px;
  font-weight: 600;
  color: #fff;
  background-color: #000;
  margin-top: 10px;
  cursor: pointer;
`;

const TopRowRight = styled.div`
  width: 350px;
  max-height: 40px;
  display: flex;
  flex-wrap: nowrap;
  justify-content: flex-end;
  align-items: center;
`;

const TagText = styled.div`
  font-size: 14px;
  color: #333;
  margin-right: 20px;
`;

const CarDataBox = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 230px;
  border-bottom: 1px solid #eee;
`;

const DescBox = styled.div`
  white-space: pre-line;
  font-size: 12px;
  min-height: 150px;
`;

const FormContainer = styled.div`
  min-height: 600px;
  width: 100%;
  position: relative;
`;

// 모달 스타일
const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: #fff;
  border-radius: 8px;
  padding: 20px;
  width: 400px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  position: relative;
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;

  h2 {
    font-size: 18px;
    margin: 0;
  }
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
`;

const ModalBody = styled.div`
  font-size: 14px;
  color: #333;
  margin-bottom: 20px;
`;

const ModalFooter = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const ModalButton = styled.button`
  background-color: #000;
  color: #fff;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;

  :hover {
    background-color: #333;
  }
`;
//
const Div = styled.div`
  display: flex;
  align-items: center;

  svg {
    margin-right: 5px;
  }
`;

const DivChat = styled.div`
  border: 1px solid #000;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  margin-top: 20px;
  padding: 15px;
  width: 100%;
  cursor: pointer;

  svg {
    margin-right: 8px;
    font-size: 17px;
  }
`;
