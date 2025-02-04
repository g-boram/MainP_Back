import React, { useState } from "react";
import styled from "@emotion/styled";
import Spacing from "../../shared/Spacing";
import Flex from "../../shared/Flex";
import BaseButton from "../../shared/Button";
import CreatableSelect from "react-select/creatable";
import CarMakeCascadingSelect from "./CarMakeCascadingSelect";
import CarColorList from "./CarColorList";

import { colorPalette } from "../../../styles/colorPalette";
import { useSelector } from "react-redux";
import { useAlertContext } from "../../../contexts/AlertContextProvider";
import { useNavigate } from "react-router-dom";
import { BarLoader } from "react-spinners";
import { LoadingOverlay } from "../../../styles/managerLayoutStyles";
import { css } from "@emotion/react";
import { createCar } from "../../../api/carApi";
import { toast } from "react-toastify";
import { CAR_OPTION_FUELTYPE, CAR_OPTION_TRANSMISSION, YEARS } from "../../../constants/carOption";

// 관리자-공지사항 폼양식
export default function CarForm() {
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);
  const { open } = useAlertContext();

  const [isLoading, setIsLoading] = useState(false);

  const [country, setCountry] = useState("");
  const [manufacturer, setManufacturer] = useState("");
  const [model, setModel] = useState("");
  const [year, setYear] = useState("");
  const [color, setColor] = useState("");
  const [fuelType, setFuelType] = useState("");
  const [transmission, setTransmission] = useState("");
  const [isAvailable, setIsAvailable] = useState(1);
  const [hashTag, setHashTag] = useState("");
  const [tags, setTags] = useState([]);
  const [currentImg, setCurrentImg] = useState();

  const [file, setFile] = useState(null);
  const [formValues, setFormValues] = useState({
    sellerId: 0,
    make: "",
    model: "",
    year: 0,
    price: "",
    mileage: "",
    fuelType: "",
    transmission: "",
    color: "",
    status: "",
    description: "",
    imageUrl: "",
    eventName: "",
    eventEndTime: null,
  });

  const handleFormValues = (e) => {
    setFormValues((prevValues) => ({
      ...prevValues,
      [e.target.name]: e.target.value,
    }));
  };

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
      sellerId: user.id,
      make: manufacturer,
      model: model,
      year: year.value,
      price: formValues.price,
      mileage: formValues.mileage,
      fuelType: fuelType.value,
      transmission: transmission.value,
      color: color,
      status: isAvailable ? "AVAILABLE" : "SOLD",
      description: formValues.description,
      imageUrl: "",
      eventName: formValues.eventName,
      eventEndTime: formValues.eventEndTime,
      hashTags: tags ? tags : [],
    };

    const formTotalData = new FormData();
    formTotalData.append("carReq", JSON.stringify(data));
    if (file != null) {
      formTotalData.append("file", file);
    }

    try {
      await createCar(formTotalData);

      setIsLoading(false);
      toast.success("🚓 차량 등록 완료!");
      navigate("/manager/car");
    } catch (error) {
      console.error("Error car creation:", error);
      toast.error("🚓 등록 실패! 관리자 문의 바랍니다.");
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

  // 해시태그 입력
  const onChangeHashTag = (e) => {
    setHashTag(e?.target?.value?.trim());
  };
  const handleKeyUp = (e) => {
    if (e.keyCode === 32 && e.target.value.trim() !== "") {
      // 만약 같은 태그가 있다면 에러를 띄운다.
      // 아니라면 태그를 생성해준다.
      if (tags?.includes(e.target.value?.trim())) {
        toast.error("같은 태그가 있습니다.");
      } else {
        setTags((prev) => (prev?.length > 0 ? [...prev, hashTag] : [hashTag]));
        setHashTag("");
      }
    }
  };
  const removeTag = (tag) => {
    setTags(tags?.filter((val) => val !== tag));
  };

  const selectStyle = {
    container: (containerStyles) => ({
      ...containerStyles,
      width: "100%",
      fontSize: "13px",
      borderRadius: 0,
    }),
    control: (controlStyles) => ({
      ...controlStyles,
      borderRadius: 0,
      border: "1px solid #eee",
    }),
    menu: (controlStyles) => ({
      ...controlStyles,
      borderRadius: 0,
    }),
  };

  return (
    <FormContainer>
      {isLoading && (
        <LoadingOverlay>
          <BarLoader color="#000" z-index={11} />
        </LoadingOverlay>
      )}
      <Flex direction="column">
        {/* 나라 / 제조사 / 모델 */}
        <Flex align={"center"}>
          <CarMakeCascadingSelect
            country={country}
            manufacturer={manufacturer}
            model={model}
            setCountry={setCountry}
            setManufacturer={setManufacturer}
            setModel={setModel}
          />
        </Flex>
        <Spacing size={15} />

        <Flex align={"center"}>
          <Label>제조 연도</Label>
          <CreatableSelect
            placeholder="Year"
            name="year"
            onChange={(newValue) => setYear(newValue)}
            options={YEARS}
            value={year}
            styles={selectStyle}
          />
          <Spacing size={20} direction={"width"} />

          <Label>가격</Label>
          <InputBox>
            <input name="price" id="price" placeholder="0" onChange={handleFormValues} value={formValues.price} />
          </InputBox>
          <Spacing size={20} direction={"width"} />

          <Label>주행거리(km)</Label>
          <InputBox>
            <input name="mileage" id="mileage" placeholder="0" onChange={handleFormValues} value={formValues.mileage} />
          </InputBox>
        </Flex>
        <Spacing size={15} />

        <Flex align={"center"}>
          {/* 연료 종류 */}
          <Label>연료 종류</Label>
          <CreatableSelect
            placeholder="연료"
            name="fuelType"
            id="fuelType"
            onChange={(newValue) => setFuelType(newValue)}
            options={CAR_OPTION_FUELTYPE}
            value={fuelType}
            styles={selectStyle}
          />
          <Spacing size={20} direction={"width"} />

          {/* 변속기 종류 */}
          <Label>변속기 종류</Label>
          <CreatableSelect
            placeholder="변속기"
            name="transmission"
            onChange={(newValue) => setTransmission(newValue)}
            options={CAR_OPTION_TRANSMISSION}
            value={transmission}
            styles={selectStyle}
          />
        </Flex>
        <Spacing size={15} />

        <Flex>
          <Label>차량 색상</Label>
          <CarColorList color={color} setColor={setColor} />
        </Flex>
        <Spacing size={15} />

        <Flex>
          <Label>활성화 여부</Label>
          <BaseButton color={isAvailable === 1 ? "success" : "grey"} css={activeBtn} onClick={() => setIsAvailable(1)}>
            판매중
          </BaseButton>
          <Spacing size={10} direction="horizontal" />
          <BaseButton color={isAvailable === 0 ? "error" : "grey"} css={activeBtn} onClick={() => setIsAvailable(0)}>
            판매완료
          </BaseButton>
        </Flex>
        <Spacing size={10} />

        <Flex>
          <Label>차량 상세 설명</Label>
          <TextareaBox>
            <textarea name="description" id="description" onChange={handleFormValues} value={formValues.description} />
          </TextareaBox>
        </Flex>
        <Spacing size={30} />

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

          <Label>이벤트</Label>
          <Flex direction="column" justify="flex-end">
            <EventInput>
              <label htmlFor="eventEndTime">이벤트 이름</label>
              <input id="eventName" name="eventName" value={formValues.eventName} onChange={handleFormValues} />
            </EventInput>
            <Spacing size={30} />
            <EventInput>
              <label htmlFor="eventEndTime">이벤트 종료시간</label>
              <input
                type="datetime-local"
                id="eventEndTime"
                name="eventEndTime"
                value={formValues.eventEndTime}
                onChange={handleFormValues}
              />
            </EventInput>
          </Flex>
        </FileRow>
        <Spacing size={20} />

        <Flex>
          <Label># 해시태그</Label>
          <Flex direction="column" height="120px" width="100%">
            <HashTagForm>
              {tags?.map((tag, index) => (
                <Tags key={index} onClick={() => removeTag(tag)}>
                  # {tag}
                </Tags>
              ))}
            </HashTagForm>
            <Flex>
              <TagInput
                id="hashtag"
                name="hashtag"
                placeholder="해시태그 + 스페이스바 = 입력 / 삭제는 해시태그 클릭"
                onChange={onChangeHashTag}
                onKeyUp={handleKeyUp}
                value={hashTag}
              />
            </Flex>
          </Flex>
        </Flex>
      </Flex>
      <Spacing size={50} />
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
  z-index: 1;
`;

const Label = styled.div`
  min-width: 15%;
  height: 35px;
  display: flex;
  margin-right: 10px;
  align-items: center;
  justify-content: flex-start;
  font-size: 14px;
  padding: 0 10px;
  font-weight: bold;
  color: ${colorPalette.fontBlack};
  border-left: 3px solid ${colorPalette.notice_form};
`;

const TextareaBox = styled.div`
  height: auto;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  & textarea {
    border: 1px solid #eee;
    width: 100%;
    font-size: 12px;
    padding: 10px;
    min-height: 300px;
  }
`;

const InputBox = styled.div`
  height: 35px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  & input {
    border: 1px solid #eee;
    width: 100%;
    padding: 0 10px;
    height: 35px;
    font-size: 12px;
    text-align: end;
  }
`;

const EventInput = styled.div`
  display: flex;
  flex-direction: column;

  > label {
    font-size: 12px;
  }

  & input {
    border: 1px solid #eee;
    width: 100%;
    padding: 0 10px;
    height: 30px;
    font-size: 12px;
    text-align: end;
  }
`;

const activeBtn = css`
  height: 40px;
  width: 100%;
`;

const TagInput = styled.input`
  border: 1px solid #eee;
  width: 100%;
  font-size: 12px;
  padding-left: 10px;
  height: 35px;
`;
const Tags = styled.div`
  border: 1px solid #444;
  font-size: 12px;
  border-radius: 15px;
  padding: 5px 12px;
  width: max-content;
  height: max-content;
  margin-right: 5px;
`;
const HashTagForm = styled.div`
  display: flex;
  padding: 5px;
  flex-wrap: wrap;
  height: auto;
  min-height: 80px;
  margin-bottom: 10px;
  width: 100%;
`;

const FileRow = styled.div`
  display: flex;
  min-height: 100px;
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
