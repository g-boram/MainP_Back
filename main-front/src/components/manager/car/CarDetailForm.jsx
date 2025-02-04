import React from "react";
import styled from "@emotion/styled";
import Spacing from "../../shared/Spacing";
import Flex from "../../shared/Flex";
import Text from "../../shared/Text";
import addDelimiter from "../../../utils/addDelimiter";
import Badge from "../../shared/Badge";
import CarIconOption from "./CarIconOption";
import CarDetailInfoBox from "./CarDetailInfoBox";
import CarSellerInfoBox from "./CarSellerInfoBox";
import CarDetailTimer from "../../car/CarDetailTimer";
import LogoImg from "../../../assert/Logo.png";
import { css } from "@emotion/react";
import { useLocation, useNavigate } from "react-router-dom";
import { CAR_OPTION_FUELTYPE } from "../../../constants/carOption";
import { ClearLoadingOverlay } from "../../../styles/managerLayoutStyles";
import { ClipLoader } from "react-spinners";
import { useAlertContext } from "../../../contexts/AlertContextProvider";
import { toast } from "react-toastify";
import { deleteCar } from "../../../api/carApi";
import { MdOutlineImageNotSupported } from "react-icons/md";
import CarDetailOptionBox from "../../car/CarDetailOptionBox";

export default function CarDetailForm() {
  const location = useLocation();
  const navigate = useNavigate();
  const { open } = useAlertContext();

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

  const confirmDelete = () => {
    open({
      title: "게시글 삭제",
      description: "게시글을 삭제 하시겠습니까?",
      isCancel: true,
      onButtonClick: () => handleSubmit(),
    });
  };

  const handleSubmit = async () => {
    try {
      await deleteCar(carId);

      toast.success("🚓 차량 게시글 삭제 완료!");
      navigate("/manager/car");
    } catch (error) {
      toast.error("차량 게시글 삭제 실패! 관리자 문의 바랍니다.");
      console.log(error.message || error);
    }
  };

  return (
    <FormContainer>
      {location.state ? (
        <>
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
                  {make} {model} {fuel[0].label} {transmission}
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
                <OnCovenantBtn>HiCar에서 구매하기</OnCovenantBtn>
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
                <Spacing size={40} />
              </CarDataBox>
            </ScrollBox>
          </MainContainer>
        </>
      ) : (
        <ClearLoadingOverlay>
          <ClipLoader color="#000" z-index={11} />
        </ClearLoadingOverlay>
      )}
    </FormContainer>
  );
}
const MainContainer = styled.div`
  display: flex;
`;

// 왼쪽
const FixedBox = styled.div`
  width: 600px;
  height: 700px;
`;

const CarImgBox = styled.div`
  background-color: #f4f4f4;
  width: 100%;
  height: 400px;
  margin-bottom: 10px;
  justify-content: center;
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  border-radius: 15px;
  position: relative;

  > img {
    width: 100%;
    border-radius: 15px;
    object-fit: contain;
  }
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

// 오른쪽
const ScrollBox = styled.div`
  flex: 1;
  height: 700px;
  overflow-y: auto;
  padding: 0 30px;
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
  flex-wrap: wrap;
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
