import styled from "@emotion/styled";
import Spacing from "../../shared/Spacing";
import Flex from "../../shared/Flex";
import BaseButton from "../../shared/Button";
import addDelimiter from "../../../utils/addDelimiter";
import CarDetailOptionForm from "./CarDetailOptionForm";

import { colorPalette } from "../../../styles/colorPalette";
import { useLocation, useNavigate } from "react-router-dom";
import { BarLoader } from "react-spinners";
import { LoadingOverlay } from "../../../styles/managerLayoutStyles";
import { deleteCar } from "../../../api/carApi";
import { toast } from "react-toastify";
import { MdOutlinePhoneIphone } from "react-icons/md";
import { CAR_OPTION_FUELTYPE } from "../../../constants/carOption";
import { css } from "@emotion/react";
import { useAlertContext } from "../../../contexts/AlertContextProvider";
import { formatPhoneNumber } from "../../../utils/formatNumber";
import { useSelector } from "react-redux";

// 관리자-자동차정비 상세보기
export default function RepairCarDetailForm() {
  const location = useLocation();
  const navigate = useNavigate();

  const { open } = useAlertContext();
  const { user } = useSelector((state) => state.auth);

  const fuel = CAR_OPTION_FUELTYPE.filter((f) => f.value === location.state.fuelType);

  const confirmDelete = () => {
    open({
      title: "게시글 삭제",
      description: "게시글을 삭제 하시겠습니까?",
      isCancel: true,
      onButtonClick: () => handleDelete(),
    });
  };

  const handleDelete = async (e) => {
    try {
      await deleteCar(location.state.carId);

      toast.success("🚓 차량 게시글 삭제 완료!");
      navigate("/manager/repair");
    } catch (error) {
      toast.error("차량 게시글 삭제 실패! 관리자 문의 바랍니다.");
      console.log(error.message || error);
    }
  };
  const handleDetailPage = () => {
    navigate("/manager/repair/update", { state: { ...location.state } });
  };

  return (
    <FormContainer>
      {location.state === "" ? (
        <LoadingOverlay>
          <BarLoader color="#000" z-index={11} />
        </LoadingOverlay>
      ) : (
        <>
          <InfoContainer>
            <MdOutlinePhoneIphone size={20} />
            {/* @TODO */}
            {/* 판매담당자 : id, 이름, 핸드폰번호 / 점검담당자 : {user?.id}, {user?.username}, {formatPhoneNumber(user?.phone)} */}
            판매 담당자 : / 점검 담당자 : {user?.id}, {user?.username}, {formatPhoneNumber(user?.phone)}
          </InfoContainer>

          <TitleRow>차량 기본정보</TitleRow>
          <FormContainer>
            <Row>
              <Label>제조사</Label>
              <InputBox>{location.state.make}</InputBox>
              <Label>모델</Label>
              <InputBox>{location.state.model}</InputBox>
              <Label>차량번호</Label>
              <InputBox>{location.state.carNumber}</InputBox>
            </Row>

            <Row>
              <Label>차량색상</Label>
              <InputBox>
                <ColorBox bgColor={location.state.color} />
                {location.state.color}
              </InputBox>
              <Label>가격</Label>
              <InputBox>{addDelimiter(location.state.price)}</InputBox>
              <Label>주행거리(km)</Label>
              <InputBox>{addDelimiter(location.state.mileage)}</InputBox>
            </Row>

            <Row>
              <Label>제조 연도</Label>
              <InputBox>{location.state.year}</InputBox>
              <Label>연료 종류</Label>
              <InputBox>{fuel[0]?.label}</InputBox>
              <Label>변속기 종류</Label>
              <InputBox>{location.state.transmission}</InputBox>
            </Row>

            <HighRow>
              <Label>차량 이미지</Label>
              <Flex direction="column" justify="center" align="center" width="100%">
                <FileBox>{location.state.imageUrl !== "" ? <img src={location.state.imageUrl} alt="" /> : ""}</FileBox>
              </Flex>
              <Label>특이사항</Label>
              <TextareaBox>{location.state.description}</TextareaBox>
            </HighRow>
          </FormContainer>
          <TitleRow>차량 옵션</TitleRow>
          <CarDetailOptionForm carOptionData={location.state?.carOptionData} />

          <Spacing size={80} />
          <Flex justify={"center"}>
            <BaseButton size="small" color="error" height={"40px"} width={"100px"} onClick={confirmDelete}>
              삭제하기
            </BaseButton>
            <Spacing size={10} direction="width" />
            <BaseButton size="small" color="primary" height={"40px"} width={"100px"} onClick={handleDetailPage}>
              수정하기
            </BaseButton>
          </Flex>
        </>
      )}
      <Spacing size={50} />
    </FormContainer>
  );
}

const FormContainer = styled.div`
  height: auto;
  width: 100%;
  position: relative;
`;

const TitleRow = styled.div`
  height: 50px;
  margin-bottom: 10px;
  display: flex;
  justify-content: flex-start;
  align-items: flex-end;
  font-size: 16px;
  font-weight: 700;
  color: ${colorPalette.fontDarkGrey};
`;

const FileBox = styled.div`
  height: 200px;
  width: 200px;
  border: 1px solid #eee;
  background-color: #f9f9f9;
  margin: 10px 0;

  > img {
    width: 200px;
    height: auto;
    object-fit: contain;
  }
`;

const InfoContainer = styled.div`
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  font-size: 12px;
  padding: 0 10px;
  margin-bottom: 20px;
  background-color: #eee;
`;

const Row = styled.div`
  display: flex;
  min-height: 45px;
  margin-bottom: 3px;
  border-top: 1px solid #eee;
  border-bottom: 1px solid #eee;
`;

const HighRow = styled.div`
  display: flex;
  min-height: 45px;
  margin-bottom: 3px;
  border-top: 1px solid #eee;
  border-bottom: 1px solid #eee;
`;

const Label = styled.div`
  width: 50%;
  min-height: 45px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  font-size: 12px;
  padding: 0 10px;
  color: #000;
  background-color: #eee;
`;

const InputBox = styled.div`
  height: 45px;
  width: 100%;
  padding: 5px;
  font-size: 12px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const TextareaBox = styled.div`
  width: 100%;
  max-height: 350px;
  overflow: scroll;
  white-space: pre-line;
  font-size: 12px;
  padding: 10px;
`;

const ColorBox = styled.div`
  width: 25px;
  height: 25px;
  margin-right: 15px;

  ${({ bgColor }) =>
    bgColor === "#FFFFFF"
      ? css`
          background-color: ${bgColor};
          border: 1px solid #f4f4f4;
        `
      : css`
          background-color: ${bgColor};
        `};
`;
