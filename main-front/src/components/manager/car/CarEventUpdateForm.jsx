import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import Spacing from "../../shared/Spacing";
import Flex from "../../shared/Flex";
import addDelimiter from "../../../utils/addDelimiter";

import { colorPalette } from "../../../styles/colorPalette";
import { useLocation } from "react-router-dom";
import { css } from "@emotion/react";
import { CAR_ICON } from "../../../constants/carOption";
import Text from "../../shared/Text";

export default function CarEventUpdateForm() {
  const location = useLocation();
  console.log("location.state : ", location.state);
  const [formValues, setFormValues] = useState();
  const [optionValues, setOptionValues] = useState();

  useEffect(() => {
    if (location.state) {
      setFormValues({
        ...location.state,
      });
      setOptionValues({ ...location.state.carOptionData[0] });
    }
  }, [location.state]);

  return (
    <FormContainer>
      <Spacing size={30} />
      <Flex width="100%" align={"flex-start"} direction="column">
        <Flex width="100%">
          <TopLabel>No.</TopLabel>
          <ValueRow>{formValues?.carId}</ValueRow>
          <TopLabel>차량번호</TopLabel>
          <ValueRow>{formValues?.carNumber}</ValueRow>
          <TopLabel>등록일</TopLabel>
          <ValueRow>{formValues?.createdAt.slice(0, 10)}</ValueRow>
          <TopLabel>게시상태</TopLabel>
          <ValueRow>{formValues?.status === "AVAILABLE" ? "판매중" : "판매완료"}</ValueRow>
        </Flex>
        <Flex width="100%">
          <TopLabel>Seller Id</TopLabel>
          <ValueRow>{formValues?.sellerId}</ValueRow>
          <TopLabel>소유주 거래상태</TopLabel>
          <ValueRow>{formValues?.sellerStatus}</ValueRow>
          <TopLabel>Repair Id</TopLabel>
          <ValueRow>{formValues?.repairUserId}</ValueRow>
          <TopLabel>점검상태</TopLabel>
          <ValueRow>{formValues?.carStatus}</ValueRow>
        </Flex>
      </Flex>

      <Spacing size={50} />
      <Title>
        <Text typography="t19" bold>
          기본정보
        </Text>
      </Title>
      <Spacing size={20} />
      <Flex direction="column">
        <Flex width="100%">
          <Label>
            <Box />
            자동차 이미지
          </Label>
          <Flex direction="column">
            <FileBox>{formValues?.imageUrl ? <img src={formValues?.imageUrl} alt="" /> : ""}</FileBox>
            <UrlBox>{formValues?.imageUrl}</UrlBox>
          </Flex>
          <Spacing size={10} direction="width" />

          <Flex width="100%" align={"flex-start"} direction="column">
            <Flex>
              <Label>
                <Box />
                제조사
              </Label>
              <ValueRow>{formValues?.make}</ValueRow>
            </Flex>
            <Spacing size={10} />
            <Flex>
              <Label>
                <Box />
                제조 연도
              </Label>
              <ValueRow>{formValues?.year}</ValueRow>
            </Flex>
            <Spacing size={10} />
            <Flex>
              <Label>
                <Box />
                주행거리(km)
              </Label>
              <ValueRow>{addDelimiter(Number(formValues?.mileage))} km</ValueRow>
            </Flex>
            <Spacing size={10} />
            <Flex>
              <Label>
                <Box />
                연료 종류
              </Label>
              <ValueRow>{formValues?.fuelType}</ValueRow>
            </Flex>
          </Flex>
          <Flex width="100%" align={"flex-start"} direction="column">
            <Flex>
              <Label>
                <Box />
                모델
              </Label>
              <ValueRow>{formValues?.model}</ValueRow>
            </Flex>
            <Spacing size={10} />
            <Flex>
              <Label>
                <Box />
                가격
              </Label>
              <ValueRow>{addDelimiter(Number(formValues?.price))} 원</ValueRow>
            </Flex>
            <Spacing size={10} />
            <Flex>
              <Label>
                <Box />
                차량 색상
              </Label>
              <ValueRow>
                {formValues?.color}
                <ColorBox bgColor={formValues?.color} />
              </ValueRow>
            </Flex>
            <Spacing size={10} />
            <Flex>
              <Label>
                <Box />
                변속기 종류
              </Label>
              <ValueRow>{formValues?.transmission}</ValueRow>
            </Flex>
          </Flex>
        </Flex>
        <Line />

        <Spacing size={50} />
        <Title>
          <Text typography="t19" bold>
            Option
          </Text>
        </Title>
        <Spacing size={20} />
        <Flex width="100%">
          <Flex width="100%" align={"flex-start"} direction="column">
            <Flex>
              <Label>
                <Box />
                배출가스
              </Label>
              <ValueRow>{optionValues?.eEmission}</ValueRow>
            </Flex>
            <Spacing size={10} />
            <Flex>
              <Label>
                <Box />
                튜닝여부
              </Label>
              <ValueRow>{optionValues?.tuning === "1" ? "있음" : "없음"}</ValueRow>
            </Flex>
            <Spacing size={10} />
          </Flex>

          <Flex width="100%" align={"flex-start"} direction="column">
            <Flex>
              <Label>
                <Box />
                사고이력
              </Label>
              <ValueRow>{optionValues?.accident === "1" ? "있음" : "없음"}</ValueRow>
            </Flex>
            <Spacing size={10} />
            <Flex>
              <Label>
                <Box />
                특별이력
              </Label>
              <ValueRow>{optionValues?.special === "1" ? "있음" : "없음"}</ValueRow>
            </Flex>
          </Flex>

          <Flex width="100%" align={"flex-start"} direction="column">
            <Flex>
              <Label>
                <Box />
                용도변경
              </Label>
              <ValueRow>{optionValues?.changeUsed === "1" ? "있음" : "없음"}</ValueRow>
            </Flex>
            <Spacing size={10} />
            <Flex>
              <Label>
                <Box />
                단순수리
              </Label>
              <ValueRow>{optionValues?.simpleRepair === "1" ? "있음" : "없음"}</ValueRow>
            </Flex>
          </Flex>
        </Flex>
        <Flex>
          <Label>
            <Box />
            아이콘 옵션 배열
          </Label>
          <OptionListRow>
            {optionValues?.optionIcon.map((v, i) =>
              optionValues?.optionIcon.length === i + 1 ? CAR_ICON[i] : `${CAR_ICON[i]}, `
            )}
          </OptionListRow>
        </Flex>
        <Line />

        <Spacing size={50} />
        <Title>
          <Text typography="t19" bold>
            Event
          </Text>
        </Title>
        <Spacing size={20} />
        <Flex width="100%" align={"center"}>
          <Label>
            <Box />
            이벤트 이름
          </Label>
          <ValueRow>{formValues?.eventName !== "" ? "진행중인 이벤트가 없습니다." : formValues?.eventName}</ValueRow>
          <Label>
            <Box />
            이벤트 종료일
          </Label>
          <ValueRow>{formValues?.eventEndTime}</ValueRow>
        </Flex>
        <Spacing size={10} />
        <Flex width="100%" align={"center"}>
          <Label>
            <Box />
            해시태그
          </Label>
          <ValueRow>
            {formValues?.hashTags.map((v) => (
              <HashTag>{`#${v}`}</HashTag>
            ))}
          </ValueRow>
        </Flex>
        <Line />

        <Spacing size={50} />
        <Label>차량 상세 설명</Label>
        <Line />
        <TextareaBox>{formValues?.description}</TextareaBox>
      </Flex>
      <Spacing size={50} />
    </FormContainer>
  );
}

const FormContainer = styled.div`
  height: auto;
  width: 100%;
  position: relative;
  z-index: 1;
`;

const HashTag = styled.div`
  min-width: 30px;
  height: 30px;
  padding: 5px 10px;
  border: 1px solid #eee;
  border-radius: 15px;
  font-size: 11px;
`;

const UrlBox = styled.div`
  width: 150px;
  height: 50px;
  padding: 3px 0;
  overflow: hidden;
  font-size: 11px;
`;

const ColorBox = styled.div`
  width: 20px;
  height: 20px;
  margin-left: 10px;
  ${({ bgColor }) => css`
    background-color: ${bgColor};
  `};
`;

const TopLabel = styled.div`
  min-width: 120px;
  height: 35px;
  display: flex;
  margin-right: 10px;
  align-items: center;
  justify-content: flex-start;
  font-size: 12px;
  padding: 0 10px;
  font-weight: bold;
  color: ${colorPalette.fontBlack};
  background-color: #f4f4f4;
  margin-bottom: 3px;
`;

const Label = styled.div`
  min-width: 150px;
  height: 35px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  font-size: 12px;
  padding: 0 10px;
  font-weight: bold;
  color: ${colorPalette.fontBlack};
`;

const TextareaBox = styled.div`
  height: 200px;
  width: 100%;
  padding: 10px;
  display: flex;
  justify-content: flex-start;
  white-space: pre-line;
  border: 1px solid #eee;

  & textarea {
    border: 1px solid #eee;
    width: 100%;
    font-size: 12px;
    padding: 10px;
    min-height: 300px;
  }
`;

const Line = styled.div`
  height: 1px;
  width: 100%;
  border-bottom: 1px solid #eee;
  margin: 10px 0;
`;
const Title = styled.div`
  height: 40px;
  width: 100%;
  padding-left: 10px;
  padding-left: 10px;
  border-left: 3px solid ${colorPalette.notice_form};
  color: ${colorPalette.fontDarkGrey};
  display: flex;
  align-items: center;
  justify-content: flex-start;
  font-size: 14px;
`;

const ValueRow = styled.div`
  height: 35px;
  width: 100%;
  color: ${colorPalette.fontDarkGrey};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
`;

const OptionListRow = styled.div`
  height: 35px;
  width: 100%;
  color: ${colorPalette.fontDarkGrey};
  display: flex;
  align-items: center;
  justify-content: flex-start;
  background-color: #f4f4f4;
  font-size: 12px;
  padding-left: 10px;
`;

const FileBox = styled.div`
  height: 150px;
  width: 150px;
  border: 1px solid #eee;
  background-color: #eee;
  margin-right: 10px;

  > img {
    height: 150px;
    width: 150px;
    object-fit: contain;
  }
`;

const Box = styled.div`
  height: 5px;
  width: 5px;
  margin-right: 10px;
  background-color: #000;
`;
