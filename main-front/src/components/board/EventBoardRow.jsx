import styled from "@emotion/styled";
import { colorPalette } from "../../styles/colorPalette";
import Flex from "../shared/Flex";
import { useNavigate } from "react-router-dom";
import Badge from "../shared/Badge";

export default function EventBoardRow({ boardId, title, content, createdAt, imageUrl, status }) {
  const navigate = useNavigate();
  return (
    <BoardRowWrapper onClick={() => navigate(`/board/event/detail/${boardId}`)}>
      <Flex justify={"space-between"} align={"flex-start"} direction="column">
        <Flex align="center">
          <Badge label={"이벤트"} color={status === "ACTIVE" ? "#1a831d" : "#c3453c"} />
          <div id="title">{title}</div>
        </Flex>
        <div id="content">{content}</div>
      </Flex>
      <Flex>
        {imageUrl && <ImgBox src={imageUrl} alt="Event_Img" />}

        <div id="date">{createdAt.slice(0, 10)}</div>
      </Flex>
    </BoardRowWrapper>
  );
}

const BoardRowWrapper = styled.div`
  height: 140px;
  padding: 10px;
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #eee;
  cursor: pointer;

  #title {
    font-size: 18px;
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
    height: 100%;
    padding: 10px 0;
    overflow: hidden;
    white-space: pre-line;

    @media (max-width: 600px) {
      margin-left: 5px;
    }
  }
  #date {
    font-size: 12px;
    width: 70px;
    color: ${colorPalette.fontGrey};
    bottom: 0;
    margin-top: 10px;
    @media (max-width: 600px) {
      display: none;
    }
  }
`;

const ImgBox = styled.img`
  width: 110px;
  height: 110px;
  margin-right: 10px;
  border-radius: 5px;
  @media (max-width: 600px) {
    display: none;
  }
`;
