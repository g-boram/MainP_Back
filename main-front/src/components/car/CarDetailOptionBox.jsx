import styled from "@emotion/styled";

import { css } from "@emotion/react";
import { CAR_OPTION_EEMISSION } from "../../constants/carOption";
import { carIcons } from "../../constants/icons";
import Text from "../shared/Text";
import Spacing from "../shared/Spacing";

export default function CarDetailOptionBox({ carOptionData }) {
  const eEmision = CAR_OPTION_EEMISSION.filter((f) => f.value === carOptionData.eEmission);

  return (
    <FormContainer>
      <Spacing size={15} />
      <Text typography="t15" bold>
        옵션
      </Text>
      <IconContainer>
        {carIcons.map((v, index) => {
          const isIcon = carOptionData.optionIcon?.includes(index);
          return (
            <IconBox color={isIcon ? "#c3453c" : "grey"}>
              {v.icon}
              {v.value}
            </IconBox>
          );
        })}
      </IconContainer>
      <Line />
      <Text typography="t15" bold>
        정비내역
      </Text>
      <Spacing size={10} />
      <Row>
        <Label>배출가스</Label>
        <InputBox>{eEmision[0]?.label}</InputBox>
        <Label>튜닝여부</Label>
        <RadioBox>
          <InputBox>{carOptionData.tuning === "0" ? "없음" : "있음"}</InputBox>
        </RadioBox>
        <Label>특별이력</Label>
        <RadioBox>
          <InputBox>{carOptionData.special === "0" ? "없음" : "있음"}</InputBox>
        </RadioBox>
      </Row>
      <Row>
        <Label>용도변경</Label>
        <RadioBox>
          <InputBox>{carOptionData.changeUsed === "0" ? "없음" : "있음"}</InputBox>
        </RadioBox>
        <Label>사고이력</Label>
        <RadioBox>
          <InputBox>{carOptionData.accident === "0" ? "없음" : "있음"}</InputBox>
        </RadioBox>
        <Label>단순수리</Label>
        <RadioBox>
          <InputBox>{carOptionData.simpleRepair === "0" ? "없음" : "있음"}</InputBox>
        </RadioBox>
      </Row>
      <Spacing size={30} />
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
  /* border-bottom: 1px solid #eee; */
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
  background-color: #f0f6ff;
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

const IconContainer = styled.div`
  width: 100%;
  height: 180px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 15px;
  padding: 10px;
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

const Line = styled.div`
  height: 1px;
  width: 100%;
  background-color: #eee;
  margin: 20px 0 20px 0;
`;
