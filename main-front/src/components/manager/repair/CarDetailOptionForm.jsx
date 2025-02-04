import styled from "@emotion/styled";
import Spacing from "../../shared/Spacing";
import { CAR_OPTION_EEMISSION } from "../../../constants/carOption";
import { carIcons } from "../../../constants/icons";
import { css } from "@emotion/react";

// 자동차 옵션정보 상세보기 폼
export default function CarDetailOptionForm({ carOptionData }) {
  const optionData = carOptionData[0];
  const eEmision = CAR_OPTION_EEMISSION.filter((f) => f.value === optionData.eEmission);

  return (
    <FormContainer>
      <Row>
        <RowLabel>옵션선택</RowLabel>
        <IconContainer>
          {carIcons.map((v, index) => {
            const isIcon = optionData.optionIcon?.includes(index);
            return (
              <IconBox color={isIcon ? "#c3453c" : "grey"}>
                {v.icon}
                {v.value}
              </IconBox>
            );
          })}
        </IconContainer>
      </Row>
      <Row>
        <Label>배출가스</Label>
        <InputBox>{eEmision[0]?.label}</InputBox>
        <Label>튜닝여부</Label>
        <RadioBox>
          <input id="notTuning" name="tuning" type="radio" checked={optionData.tuning === "0"} readOnly />
          <label for="notTuning">없음</label>
          <Spacing size={10} />
          <input id="isTuning" name="tuning" type="radio" checked={optionData.tuning === "1"} readOnly />
          <label for="isTuning">있음</label>
        </RadioBox>
        <Label>특별이력</Label>
        <RadioBox>
          <input id="notSpecial" name="special" type="radio" checked={optionData.special === "0"} readOnly />
          <label for="notSpecial">없음</label>
          <Spacing size={10} />
          <input id="isSpecial" name="special" type="radio" checked={optionData.special === "1"} readOnly />
          <label for="isSpecial">있음</label>
        </RadioBox>
      </Row>

      <Row>
        <Label>용도변경</Label>
        <RadioBox>
          <input id="notChangeUsed" name="changeUsed" type="radio" checked={optionData.changeUsed === "0"} readOnly />
          <label for="notChangeUsed">없음</label>
          <Spacing size={10} />
          <input id="isChangeUsed" name="changeUsed" type="radio" checked={optionData.changeUsed === "1"} readOnly />
          <label for="isChangeUsed">있음</label>
        </RadioBox>
        <Label>사고이력</Label>
        <RadioBox>
          <input id="notAccident" name="accident" type="radio" checked={optionData.accident === "0"} readOnly />
          <label for="notAccident">없음</label>
          <Spacing size={10} />
          <input id="isAccident" name="accident" type="radio" checked={optionData.accident === "1"} readOnly />
          <label for="isAccident">있음</label>
        </RadioBox>
        <Label>단순수리</Label>
        <RadioBox>
          <input
            id="notSimpleRepair"
            name="simpleRepair"
            type="radio"
            checked={optionData.simpleRepair === "0"}
            readOnly
          />
          <label for="notSimpleRepair">없음</label>
          <Spacing size={10} />
          <input
            id="isSimpleRepair"
            name="simpleRepair"
            type="radio"
            checked={optionData.simpleRepair === "1"}
            readOnly
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
  height: 45px;
  width: 100%;
  padding: 5px;
  font-size: 11px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const RadioBox = styled.div`
  height: 45px;
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
