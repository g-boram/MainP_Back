import styled from "@emotion/styled";
import Flex from "../shared/Flex";
import Badge from "../shared/Badge";
import { colorPalette } from "../../styles/colorPalette";
import { useState } from "react";
import { FaAngleUp, FaAngleDown } from "react-icons/fa";

export default function QnABoardRow({ title, content, createdAt }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleContent = (e) => {
    e.stopPropagation();
    setIsOpen((prev) => !prev);
  };

  return (
    <BoardRowWrapper>
      <Flex justify={"space-between"} align={"flex-start"} direction="column">
        <Flex align="center">
          <Badge label={"FAQ"} />
          <div id="title" onClick={toggleContent}>
            {title}
          </div>
          <ToggleButton onClick={toggleContent}>{isOpen ? <FaAngleDown /> : <FaAngleUp />}</ToggleButton>
        </Flex>
        {isOpen && <div id="content">{content}</div>}
      </Flex>
      <Flex>
        <div id="date">{createdAt.slice(0, 10)}</div>
      </Flex>
    </BoardRowWrapper>
  );
}

const ToggleButton = styled.div`
  display: flex;
  margin-left: 15px;
  width: 50px;
  cursor: pointer;
  font-size: 14px;
  color: ${colorPalette.fontGrey};

  &:hover {
    color: ${colorPalette.fontBlack};
  }
`;

const BoardRowWrapper = styled.div`
  user-select: none;
  height: auto;
  padding: 10px;
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #eee;
  cursor: pointer;

  #title {
    font-weight: bold;
    color: ${colorPalette.fontBlack};
    margin: 10px 0;

    @media (max-width: 600px) {
      font-size: 16px;
    }
  }
  #content {
    font-size: 12px;
    color: ${colorPalette.fontDarkGrey};
    padding: 30px 60px;
    overflow: hidden;
    white-space: pre-line;
    transition: 1s;

    @media (max-width: 600px) {
      margin-left: 5px;
    }
  }
  #date {
    font-size: 12px;
    color: ${colorPalette.fontGrey};
    margin-top: 10px;
    @media (max-width: 600px) {
      display: none;
    }
  }
`;
