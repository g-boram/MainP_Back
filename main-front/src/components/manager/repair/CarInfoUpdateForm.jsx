import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import Spacing from "../../shared/Spacing";
import Flex from "../../shared/Flex";
import CreatableSelect from "react-select/creatable";
import CarColorList from "./CarColorList";
import CarUpdateCascadingSelect from "./CarUpdateCascadingSelect";
import { CAR_OPTION_FUELTYPE, CAR_OPTION_TRANSMISSION, YEARS } from "../../../constants/carOption";
import { useLocation } from "react-router-dom";

// 자동차 기본정보 입력폼
export default function CarInfoUpdateForm({ carInfoData, setCarInfoData }) {
  const location = useLocation();
  const prevValue = location.state;

  const [country, setCountry] = useState("");
  const [manufacturer, setManufacturer] = useState();
  const [model, setModel] = useState("");
  const [year, setYear] = useState("");
  const [color, setColor] = useState(carInfoData.color);
  const [fuelType, setFuelType] = useState("");
  const [transmission, setTransmission] = useState("");
  const [title, setTitle] = useState("");

  useEffect(() => {
    if (title != null) {
      switch (title) {
        case "year":
          setCarInfoData((prevValues) => ({ ...prevValues, year: year.value }));
          setTitle("");
          break;
        case "make":
          setCarInfoData((prevValues) => ({ ...prevValues, make: manufacturer }));
          setTitle("");
          break;
        case "model":
          setCarInfoData((prevValues) => ({ ...prevValues, model: model }));
          setTitle("");
          break;
        case "color":
          setCarInfoData((prevValues) => ({ ...prevValues, color: color }));
          setTitle("");
          break;
        case "fuelType":
          setCarInfoData((prevValues) => ({ ...prevValues, fuelType: fuelType.value }));
          setTitle("");
          break;
        case "transmission":
          setCarInfoData((prevValues) => ({ ...prevValues, transmission: transmission.value }));
          setTitle("");
          break;
        default:
      }
    }
  }, [year, manufacturer, model, color, fuelType, transmission, title, setCarInfoData]);

  const handleFormValues = (e) => {
    setCarInfoData((prevValues) => ({
      ...prevValues,
      [e.target.name]: e.target.value,
    }));
  };

  const selectStyle = {
    container: (containerStyles) => ({
      ...containerStyles,
      width: "100%",
      fontSize: "12px",
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
      <Row>
        <CarUpdateCascadingSelect
          country={country}
          manufacturer={manufacturer}
          model={model}
          setCountry={setCountry}
          setManufacturer={setManufacturer}
          setModel={setModel}
          setTitle={setTitle}
          prevValue={prevValue}
        />
      </Row>

      <Row>
        <Label>차량번호</Label>
        <InputBox>
          <input
            name="carNumber"
            id="carNumber"
            placeholder="00가 0000"
            onChange={handleFormValues}
            value={carInfoData.carNumber}
          />
        </InputBox>
        <Label>가격</Label>
        <InputBox>
          <input name="price" id="price" placeholder="0" onChange={handleFormValues} value={carInfoData.price} />
        </InputBox>
        <Label>주행거리(km)</Label>
        <InputBox>
          <input name="mileage" id="mileage" placeholder="0" onChange={handleFormValues} value={carInfoData.mileage} />
        </InputBox>
      </Row>

      <Row>
        <Label>제조 연도</Label>
        <InputBox>
          <PreValue>{prevValue?.year}</PreValue>
          <CreatableSelect
            placeholder="Year"
            name="year"
            onChange={(newValue) => {
              setYear(newValue);
              setTitle("year");
            }}
            options={YEARS}
            value={year}
            styles={selectStyle}
          />
        </InputBox>
        <Label>연료 종류</Label>
        <InputBox>
          <PreValue>{prevValue?.fuelType}</PreValue>
          <CreatableSelect
            placeholder="연료"
            name="fuelType"
            id="fuelType"
            onChange={(newValue) => {
              setFuelType(newValue);
              setTitle("fuelType");
            }}
            options={CAR_OPTION_FUELTYPE}
            value={fuelType}
            styles={selectStyle}
          />
        </InputBox>
        <Label>변속기 종류</Label>
        <InputBox>
          <PreValue>{prevValue?.transmission}</PreValue>
          <CreatableSelect
            placeholder="변속기"
            name="transmission"
            onChange={(newValue) => {
              setTransmission(newValue);
              setTitle("transmission");
            }}
            options={CAR_OPTION_TRANSMISSION}
            value={transmission}
            styles={selectStyle}
          />
        </InputBox>
      </Row>

      <Flex height="110px">
        <RowLabel>차량 색상</RowLabel>
        <CarColorList color={color} setColor={setColor} setTitle={setTitle} />
      </Flex>
      <Spacing size={3} />

      <Row>
        <RowLabel>특이사항</RowLabel>
        <TextareaBox>
          <textarea name="description" id="description" onChange={handleFormValues} value={carInfoData.description} />
        </TextareaBox>
      </Row>
    </FormContainer>
  );
}

const FormContainer = styled.div`
  height: auto;
  width: 100%;
  position: relative;
`;

const Row = styled.div`
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

const RowLabel = styled.div`
  width: 139px;
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
  min-height: 45px;
  width: 100%;
  padding: 5px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  & input {
    border: 1px solid #eee;
    width: 100%;
    padding: 0 10px;
    height: 100%;
    font-size: 12px;
    text-align: end;
  }
`;

const TextareaBox = styled.div`
  height: 120px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  & textarea {
    border: 1px solid #eee;
    width: 98%;
    font-size: 12px;
    padding: 10px;
    height: 110px;
  }
`;

const PreValue = styled.div`
  height: 30px;
  font-size: 11px;
  color: red;
`;
