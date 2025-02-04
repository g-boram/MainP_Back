import styled from "@emotion/styled";
import Flex from "../shared/Flex";
import Badge from "../shared/Badge";
import { useNavigate } from "react-router-dom";
import { colorPalette } from "../../styles/colorPalette";

export default function NoticeBoardRow({ boardId, title, content, createdAt, imageUrl }) {
  const navigate = useNavigate();
  return (
    <BoardRowWrapper onClick={() => navigate(`/board/notice/detail/${boardId}`)}>
      <Flex justify={"space-between"} align={"flex-start"} direction="column">
        <Flex align="center">
          <Badge label={"공지"} />
          <div id="title">{title}</div>
        </Flex>
        <div id="content">{content}</div>
      </Flex>
      <Flex>
        {/* {imageUrl && <ImgBox src={imageUrl} alt="Event_Img" />} */}
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
    color: ${colorPalette.fontGrey};
    bottom: 0;
    margin-top: 10px;
    @media (max-width: 600px) {
      display: none;
    }
  }
`;

// const ImgBox = styled.img`
//   width: 150px;
//   height: 140px;
//   margin-right: 10px;
//   border-radius: 5px;
//   @media (max-width: 600px) {
//     display: none;
//   }
// `;
