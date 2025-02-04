import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import Spacing from "../../shared/Spacing";
import CreatableSelect from "react-select/creatable";
import { CAR_OPTION_EEMISSION } from "../../../constants/carOption";
import { carIcons } from "../../../constants/icons";
import { css } from "@emotion/react";
import { useLocation } from "react-router-dom";

// 자동차 옵션정보 입력폼
export default function CarOptionForm({ carOptionData, setCarOptionData }) {
  const location = useLocation();

  const [optionIcon, setOptionIcon] = useState(); // icon
  const [selectedIconArr, setSelectedIconArr] = useState(location.state?.carOptionData[0].optionIcon || []);
  const [eEmission, setEEmission] = useState(""); // 배출가스
  const [tuning, setTuning] = useState(location.state?.carOptionData[0].tuning); // 튜닝
  const [special, setSpecial] = useState(location.state?.carOptionData[0].special); // 특별이력
  const [changeUsed, setChangeUsed] = useState(location.state?.carOptionData[0].changeUsed); // 용도변경
  const [accident, setAccident] = useState(location.state?.carOptionData[0].accident); // 사고이력
  const [simpleRepair, setSimpleRepair] = useState(location.state?.carOptionData[0].simpleRepair); // 단순수리

  const [title, setTitle] = useState(null);

  useEffect(() => {
    if (title != null) {
      switch (title) {
        case "optionIcon":
          setCarOptionData((prevValues) => ({
            ...prevValues,
            optionIcon: selectedIconArr,
          }));
          setTitle("");
          break;
        case "eEmission":
          setCarOptionData((prevValues) => ({
            ...prevValues,
            eEmission: eEmission.value,
          }));
          setTitle("");
          break;
        case "tuning":
          setCarOptionData((prevValues) => ({ ...prevValues, tuning: tuning }));
          setTitle("");
          break;
        case "special":
          setCarOptionData((prevValues) => ({
            ...prevValues,
            special: special,
          }));
          setTitle("");
          break;
        case "changeUsed":
          setCarOptionData((prevValues) => ({
            ...prevValues,
            changeUsed: changeUsed,
          }));
          setTitle("");
          break;
        case "accident":
          setCarOptionData((prevValues) => ({
            ...prevValues,
            accident: accident,
          }));
          setTitle("");
          break;
        case "simpleRepair":
          setCarOptionData((prevValues) => ({
            ...prevValues,
            simpleRepair: simpleRepair,
          }));
          setTitle("");
          break;
        default:
      }
    }
  }, [
    setCarOptionData,
    title,
    optionIcon,
    eEmission,
    tuning,
    special,
    changeUsed,
    accident,
    simpleRepair,
    selectedIconArr,
  ]);

  const handleOptionIcon = (index) => {
    if (selectedIconArr?.includes(index)) {
      setSelectedIconArr(selectedIconArr.filter((item) => item !== index));
    } else {
      setSelectedIconArr([...selectedIconArr, index]);
    }
  };
  useEffect(() => {
    setTitle("optionIcon");
  }, [selectedIconArr]);

  const handleIsTuning = (e) => {
    setTuning(e.target.value);
    setTitle("tuning");
  };
  const handleSpecial = (e) => {
    setSpecial(e.target.value);
    setTitle("special");
  };
  const handleChangeUsed = (e) => {
    setChangeUsed(e.target.value);
    setTitle("changeUsed");
  };
  const handleAccident = (e) => {
    setAccident(e.target.value);
    setTitle("accident");
  };
  const handleSimpleRepair = (e) => {
    setSimpleRepair(e.target.value);
    setTitle("simpleRepair");
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
        <RowLabel>옵션선택</RowLabel>
        <IconContainer>
          {carIcons.map((v, index) => {
            const isIcon = selectedIconArr?.includes(index);
            return (
              <IconBox color={isIcon ? "#c3453c" : "grey"} onClick={() => handleOptionIcon(index)}>
                {v.icon}
                {v.value}
              </IconBox>
            );
          })}
        </IconContainer>
      </Row>
      <Row>
        <Label>배출가스</Label>
        <InputBox>
          {location.state?.carOptionData[0] ? <PreValue>{location.state.carOptionData[0]?.eEmission}</PreValue> : <></>}
          <CreatableSelect
            placeholder="배출가스"
            name="eEmission"
            onChange={(newValue) => {
              setEEmission(newValue);
              setTitle("eEmission");
            }}
            options={CAR_OPTION_EEMISSION}
            value={eEmission}
            styles={selectStyle}
          />
        </InputBox>
        <Label>튜닝여부</Label>
        <RadioBox>
          <input
            id="notTuning"
            name="tuning"
            type="radio"
            value={0}
            checked={tuning === "0"}
            onChange={handleIsTuning}
          />
          <label for="notTuning">없음</label>
          <Spacing size={10} />
          <input
            id="isTuning"
            name="tuning"
            type="radio"
            value={1}
            checked={tuning === "1"}
            onChange={handleIsTuning}
          />
          <label for="isTuning">있음</label>
        </RadioBox>
        <Label>특별이력</Label>
        <RadioBox>
          <input
            id="notSpecial"
            name="special"
            type="radio"
            value={0}
            checked={special === "0"}
            onChange={handleSpecial}
          />
          <label for="notSpecial">없음</label>
          <Spacing size={10} />
          <input
            id="isSpecial"
            name="special"
            type="radio"
            value={1}
            checked={special === "1"}
            onChange={handleSpecial}
          />
          <label for="isSpecial">있음</label>
        </RadioBox>
      </Row>

      <Row>
        <Label>용도변경</Label>
        <RadioBox>
          <input
            id="notChangeUsed"
            name="changeUsed"
            type="radio"
            checked={changeUsed === "0"}
            value={0}
            onChange={handleChangeUsed}
          />
          <label for="notChangeUsed">없음</label>
          <Spacing size={10} />
          <input
            id="isChangeUsed"
            name="changeUsed"
            type="radio"
            checked={changeUsed === "1"}
            value={1}
            onChange={handleChangeUsed}
          />
          <label for="isChangeUsed">있음</label>
        </RadioBox>
        <Label>사고이력</Label>
        <RadioBox>
          <input
            id="notAccident"
            name="accident"
            type="radio"
            value={0}
            checked={accident === "0"}
            onChange={handleAccident}
          />
          <label for="notAccident">없음</label>
          <Spacing size={10} />
          <input
            id="isAccident"
            name="accident"
            type="radio"
            value={1}
            checked={accident === "1"}
            onChange={handleAccident}
          />
          <label for="isAccident">있음</label>
        </RadioBox>
        <Label>단순수리</Label>
        <RadioBox>
          <input
            id="notSimpleRepair"
            name="simpleRepair"
            type="radio"
            value={0}
            checked={simpleRepair === "0"}
            onChange={handleSimpleRepair}
          />
          <label for="notSimpleRepair">없음</label>
          <Spacing size={10} />
          <input
            id="isSimpleRepair"
            name="simpleRepair"
            type="radio"
            value={1}
            checked={simpleRepair === "1"}
            onChange={handleSimpleRepair}
          />
          <label for="isSimpleRepair">있음</label>
        </RadioBox>
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
  background-color: #e3edfb;
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

const RadioBox = styled.div`
  min-height: 45px;
  width: 100%;
  padding: 5px;
  gap: 10px;
  display: flex;
  justify-content: center;
  align-items: center;

  > label {
    font-size: 11px;
    color: #000;
    cursor: pointer;
  }
  & input {
    margin: 0;
  }
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
  background-color: #e3edfb;
`;

const IconContainer = styled.div`
  width: 100%;
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const IconBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 80px;
  font-size: 11px;
  gap: 10px;
  cursor: pointer;
  ${({ color }) => css`
    color: ${color};
  `};
`;

const PreValue = styled.div`
  height: 30px;
  font-size: 11px;
  color: red;
`;
