import styled from "@emotion/styled";
import Text from "./Text";
import Dimmed from "./Dimmed";
import Flex from "./Flex";
import Button from "./Button";
import { colorPalette } from "../../styles/colorPalette";

function Alert({ open, title, description, buttonLabel = "확인", isCancel = true, onButtonClick, onCancelClick }) {
  if (!open) return null;

  return (
    <Dimmed>
      <AlertContainer role="alertdialog" aria-labelledby="alert-title" aria-describedby="alert-description">
        <Text id="alert-title" typography="t15" bold display="block" style={{ marginBottom: 6, width: "100%" }}>
          {title}
        </Text>
        {description && (
          <Text id="alert-description" typography="t13">
            {description}
          </Text>
        )}
        <Flex justify="flex-end">
          {isCancel && (
            <StyledButton onClick={onCancelClick} weak>
              취소
            </StyledButton>
          )}
          <StyledButton onClick={onButtonClick} weak>
            {buttonLabel}
          </StyledButton>
        </Flex>
      </AlertContainer>
    </Dimmed>
  );
}

const AlertContainer = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  background-color: ${colorPalette.white};
  border-radius: 8px;
  overflow: hidden;
  z-index: 11;
  width: 320px;
  padding: 24px;
  box-sizing: border-box;
`;

const StyledButton = styled(Button)`
  margin-top: 12px;
  border: none;
`;

export default Alert;
