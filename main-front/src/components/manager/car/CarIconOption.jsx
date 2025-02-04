import styled from "@emotion/styled";
import { carIcons } from "../../../constants/icons";

export default function CarIconOption() {
  return (
    <IconContainer>
      <IconWrapper>
        {carIcons.map((icon) => (
          <IconBox>
            {icon.icon}
            {icon.value}
          </IconBox>
        ))}
      </IconWrapper>
    </IconContainer>
  );
}

const IconContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
`;

const IconWrapper = styled.div`
  max-width: 450px;
  display: flex;
  flex-wrap: wrap;
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
  margin-top: 20px;
  color: grey;
`;
