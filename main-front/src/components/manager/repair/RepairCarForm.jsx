import React, { useState } from "react";
import styled from "@emotion/styled";
import Spacing from "../../shared/Spacing";
import Flex from "../../shared/Flex";
import BaseButton from "../../shared/Button";
import CarInfoForm from "./CarInfoForm";
import CarOptionForm from "./CarOptionForm";

import { colorPalette } from "../../../styles/colorPalette";
import { useSelector } from "react-redux";
import { useAlertContext } from "../../../contexts/AlertContextProvider";
import { useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { ClearLoadingOverlay } from "../../../styles/managerLayoutStyles";
import { createCar } from "../../../api/carApi";
import { toast } from "react-toastify";
import { MdOutlinePhoneIphone } from "react-icons/md";
import { formatPhoneNumber } from "../../../utils/formatNumber";

// 관리자-자동차정비 등록
export default function RepairCarForm() {
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);
  const { open } = useAlertContext();

  const [isLoading, setIsLoading] = useState(false);
  const [currentImg, setCurrentImg] = useState();
  const [file, setFile] = useState(null);

  // 차량 기본정보
  const [carInfoData, setCarInfoData] = useState({
    sellerId: "18", // 변경필요
    orderUserId: 0,
    repairUserId: user?.id,
    carNumber: "",
    make: "",
    model: "",
    year: 0,
    price: "",
    mileage: "",
    fuelType: "",
    transmission: "",
    color: "",
    status: "AVAILABLE",
    carStatus: "rSuccess",
    sellerStatus: "repair",
    description: "",
    imageUrl: "",
    eventName: "",
    eventEndTime: null,
    hashTags: [],
  });

  // 차량 옵션정보
  const [carOptionData, setCarOptionData] = useState({
    optionIcon: "", // icon
    eEmission: "soot", // 배출가스
    tuning: "", // 튜닝
    special: "", // 특별이력
    changeUsed: "", // 용도변경
    accident: "", // 사고이력
    simpleRepair: "", // 단순수리
  });

  const confirmCreate = (e) => {
    e.preventDefault();
    open({
      title: "차량 등록",
      description: "차량을 등록 하시겠습니까?",
      isCancel: true,
      onButtonClick: () => handleSubmit(),
    });
  };

  const handleSubmit = async () => {
    setIsLoading(true);

    const data = {
      orderUserId: "",
      carOptionData: [carOptionData],
      ...carInfoData,
    };

    // 이미지 등록시 사용
    const formTotalData = new FormData();
    formTotalData.append("carReq", JSON.stringify(data));
    if (file != null) {
      formTotalData.append("file", file);
    }

    try {
      await createCar(formTotalData);
      toast.success("🚓 차량 등록 완료!");
      navigate("/manager/repair");
    } catch (error) {
      console.error("Error car creation:", error);
      toast.error("🚓 등록 실패! 관리자 문의 바랍니다.");
    } finally {
      setIsLoading(false);
    }
  };

  // 선택된 이미지 미리보기 생성 하기
  const handleUploadFile = (e) => {
    const files = e.target.files;

    if (files !== null) {
      const theFile = files[0];
      setFile(e.target.files[0]);

      const reader = new FileReader();
      reader.onloadend = (finishedEvent) => {
        const result = finishedEvent.target.result;
        setCurrentImg(result);
      };
      if (!theFile) return;
      reader.readAsDataURL(theFile);
    }
  };
  const handleRemoveFile = (e) => {
    setFile(null);
    setCurrentImg(null);
  };

  return (
    <FormContainer>
      {isLoading && (
        <ClearLoadingOverlay>
          <ClipLoader color="#000" z-index={11} />
        </ClearLoadingOverlay>
      )}
      <InfoContainer>
        <MdOutlinePhoneIphone size={20} />
        {/* @TODO */}
        {/* 판매담당자 : id, 이름, 핸드폰번호 / 점검담당자 : {user?.id}, {user?.username}, {formatPhoneNumber(user?.phone)} */}
        판매 담당자 : / 점검 담당자 : {user?.id}, {user?.username}, {formatPhoneNumber(user?.phone)}
      </InfoContainer>

      <TitleRow>차량 기본정보</TitleRow>
      <CarInfoForm carInfoData={carInfoData} setCarInfoData={setCarInfoData} />

      <TitleRow>차량 옵션</TitleRow>
      <CarOptionForm carOptionData={carOptionData} setCarOptionData={setCarOptionData} />

      <TitleRow>차량 이미지</TitleRow>
      <FileRow>
        <Label>첨부파일</Label>
        <FileBox>{currentImg ? <img src={currentImg} alt="" /> : ""}</FileBox>
        <Flex direction="column" justify="flex-end">
          <input type="file" name="file" onChange={handleUploadFile} />
          <Spacing size={10} />
          <BaseButton size="small" color="black" height={"30px"} width={"100px"} onClick={handleRemoveFile}>
            파일 삭제
          </BaseButton>
        </Flex>
      </FileRow>

      <Spacing size={80} />
      <Flex justify={"center"}>
        <BaseButton size="medium" color="black" height={"40px"} full onClick={confirmCreate}>
          차량 등록하기
        </BaseButton>
      </Flex>
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

const Label = styled.div`
  width: 125px;
  min-height: 45px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  font-size: 12px;
  padding: 0 10px;
  color: #000;
  background-color: #e3edfb;
`;

const FileRow = styled.div`
  display: flex;
  min-height: 45px;
  margin-bottom: 3px;
  border-top: 1px solid #eee;
  border-bottom: 1px solid #eee;
  padding: 5px 0;
`;

const FileBox = styled.div`
  height: 200px;
  width: 200px;
  border: 1px solid #eee;
  background-color: #eee;
  margin: 0 10px;

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
