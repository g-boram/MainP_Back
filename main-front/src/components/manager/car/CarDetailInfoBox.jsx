import styled from "@emotion/styled";
import Flex from "../../shared/Flex";
import Text from "../../shared/Text";
import Spacing from "../../shared/Spacing";

import { TfiDashboard } from "react-icons/tfi";
import { BsClipboard2Check } from "react-icons/bs";
import { BsClipboard2Pulse } from "react-icons/bs";
import { BsMotherboard } from "react-icons/bs";
import { HiOutlineClipboardDocumentList } from "react-icons/hi2";

export default function CarDetailInfoBox() {
  return (
    <Container>
      <Flex justify="center" align="flex-start" direction="column">
        <Text typography="t15" color="#444" bold>
          투명하고 믿을 수 있는
        </Text>
        <Text typography="t15" color="#d42424" bold>
          HiCar 인증 중고차
        </Text>
      </Flex>
      <Flex width="60%">
        <Flex align="center" direction="column">
          <HiOutlineClipboardDocumentList size={25} />
          <Spacing size={10} />
          <Text typography="t11" color="#444" bold>
            관리이력조회
          </Text>
        </Flex>
        <Spacing size={20} direction="width" />

        <Flex align="center" direction="column">
          <TfiDashboard size={25} />
          <Spacing size={10} />
          <Text typography="t11" color="#444" bold>
            성능 점검
          </Text>
        </Flex>
        <Spacing size={20} direction="width" />

        <Flex align="center" direction="column">
          <BsClipboard2Check size={25} />
          <Spacing size={10} />
          <Text typography="t11" color="#444" bold>
            자체 인증검사
          </Text>
        </Flex>
        <Spacing size={20} direction="width" />

        <Flex align="center" direction="column">
          <BsMotherboard size={25} />
          <Spacing size={10} />
          <Text typography="t11" color="#444" bold>
            자체 인증검사
          </Text>
        </Flex>
        <Spacing size={20} direction="width" />

        <Flex align="center" direction="column">
          <BsClipboard2Pulse size={25} />
          <Spacing size={10} />
          <Text typography="t11" color="#444" bold>
            자체 인증검사
          </Text>
        </Flex>
      </Flex>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  height: 130px;
  margin-bottom: 10px;
  border-radius: 10px;
  background-color: #f4f4f4;
`;
