import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import Spacing from "../../shared/Spacing";
import Flex from "../../shared/Flex";
import BaseButton from "../../shared/Button";
import CarOptionForm from "./CarOptionForm";
import CarInfoUpdateForm from "./CarInfoUpdateForm";

import { colorPalette } from "../../../styles/colorPalette";
import { useSelector } from "react-redux";
import { useAlertContext } from "../../../contexts/AlertContextProvider";
import { useLocation, useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { ClearLoadingOverlay } from "../../../styles/managerLayoutStyles";
import { updateCar } from "../../../api/carApi";
import { toast } from "react-toastify";
import { MdOutlinePhoneIphone } from "react-icons/md";
import { formatPhoneNumber } from "../../../utils/formatNumber";

// 관리자-자동차정비 수정
export default function RepairCarUpdateForm() {
  const navigate = useNavigate();
  const location = useLocation();

  const { user } = useSelector((state) => state.auth);
  const { open } = useAlertContext();

  const [isLoading, setIsLoading] = useState(false);
  const [currentImg, setCurrentImg] = useState();
  const [file, setFile] = useState(null);
  console.log("location", location.state);
  // 차량 기본정보
  const [carInfoData, setCarInfoData] = useState({
    sellerId: location.state.sellerId,
    orderUserId: location.state.orderUserId,
    carId: location.state.carId,
    repairUserId: user?.id,
    carNumber: "",
    make: "",
    model: "",
    year: 0,
    price: "",
    mileage: "",
    fuelType: "",
    transmission: "",
    color: location.state.color,
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
    eEmission: "", // 배출가스
    tuning: "", // 튜닝
    special: "", // 특별이력
    changeUsed: "", // 용도변경
    accident: "", // 사고이력
    simpleRepair: "", // 단순수리
  });

  useEffect(() => {
    setIsLoading(true);
    if (location.state) {
      setCarInfoData((preValue) => ({
        ...preValue,
        carNumber: location.state.carNumber,
        make: location.state.make,
        model: location.state.model,
        year: location.state.year,
        price: location.state.price,
        mileage: location.state.mileage,
        fuelType: location.state?.fuelType,
        transmission: location.state.transmission,
        color: location.state.color,
        status: "AVAILABLE",
        carStatus: "rSuccess",
        sellerStatus: "repair",
        description: location.state.description,
        imageUrl: location.state.imageUrl,
      }));
    }
    setIsLoading(false);
  }, [location.state]);

  const confirmCreate = (e) => {
    e.preventDefault();
    open({
      title: "정비내용 수정",
      description: "정비내용을 수정 하시겠습니까?",
      isCancel: true,
      onButtonClick: () => handleSubmit(),
    });
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    const carId = location.state.carId;
    const data = {
      orderUserId: "",
      carOptionData: [carOptionData],
      ...carInfoData,
    };
    console.log("data", data);
    // 이미지 등록시 사용
    const formTotalData = new FormData();
    formTotalData.append("carReq", JSON.stringify(data));
    if (file != null) {
      formTotalData.append("file", file);
    }

    try {
      await updateCar({ carId, formTotalData });
      toast.success("🔧 수정 완료!");
      navigate("/manager/repair");
    } catch (error) {
      console.error("Error car creation:", error);
      toast.error("🔧 수정 실패! 관리자 문의 바랍니다.");
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
      <CarInfoUpdateForm carInfoData={carInfoData} setCarInfoData={setCarInfoData} />

      <TitleRow>차량 옵션</TitleRow>
      <CarOptionForm carOptionData={carOptionData} setCarOptionData={setCarOptionData} />

      <TitleRow>차량 이미지</TitleRow>
      <FileRow>
        <Label>첨부파일</Label>
        <FileBox>
          {currentImg ? (
            <img src={currentImg} alt="" />
          ) : location.state.imageUrl ? (
            <img src={location.state.imageUrl} alt="" />
          ) : (
            ""
          )}
        </FileBox>
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
          차량 수정하기
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
