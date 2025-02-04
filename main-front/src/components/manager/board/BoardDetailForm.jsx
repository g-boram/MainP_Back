import React from "react";
import styled from "@emotion/styled";
import Spacing from "../../shared/Spacing";
import Flex from "../../shared/Flex";
import { colorPalette } from "../../../styles/colorPalette";
import { useLocation } from "react-router-dom";

export default function BoardDetailForm() {
  const location = useLocation();

  const {
    boardId,
    category,
    title,
    content,
    createdAt,
    updatedAt,
    status,
    username,
    imageUrl,
  } = location.state || {};

  return (
    <FormContainer>
      <Flex direction="column">
        <Spacing size={10} />
        <Flex align={"center"}>
          <>
            <Label>Board Id</Label>
            <ValueRow>{boardId}</ValueRow>
          </>
          <>
            <Label>Category</Label>
            <ValueRow>{category}</ValueRow>
          </>
          <>
            <Label>생성일</Label>
            <ValueRow>{createdAt.slice(0, 10)}</ValueRow>
          </>
          <>
            <Label>수정일</Label>
            <ValueRow>{updatedAt.slice(0, 10)}</ValueRow>
          </>
        </Flex>
        <Spacing size={20} />

        <Flex>
          <>
            <Label>작성자</Label>
            <ValueRow>{username}</ValueRow>
          </>
          <>
            <Label>활성화 여부</Label>
            <ActiveRow status={status}>
              {status === "ACTIVE" ? "활성화" : "비활성화"}
            </ActiveRow>
          </>
        </Flex>
        <Spacing size={20} />

        <Flex>
          <>
            <Label>제목</Label>
            <ValueRow>{title}</ValueRow>
          </>
          <>
            <Label>첨부파일</Label>
            <ValueRow>{imageUrl}</ValueRow>
          </>
        </Flex>
        <Spacing size={50} />

        <Flex direction="column">
          <ContentLabel>내용</ContentLabel>
          <ContentBox>{content}</ContentBox>
        </Flex>
      </Flex>
    </FormContainer>
  );
}

const FormContainer = styled.div`
  height: auto;
  width: 100%;
  position: relative;
  z-index: 1;
`;

const Label = styled.div`
  min-width: 10%;
  height: 35px;
  display: flex;
  margin-right: 10px;
  align-items: center;
  justify-content: flex-start;
  font-size: 12px;
  padding-left: 10px;
  font-weight: bold;
  background-color: #fafafa;
  color: ${colorPalette.fontBlack};
  border-left: 3px solid ${colorPalette.notice_form};
`;

const ContentLabel = styled.div`
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  font-size: 14px;
  padding-left: 10px;
  font-weight: bold;
  color: ${colorPalette.fontBlack};
  border-bottom: 2px solid ${colorPalette.notice_form};
`;

const ContentBox = styled.div`
  min-height: 300px;
  margin-top: 10px;
  margin-bottom: 100px;
  padding: 10px;
  font-size: 12px;
  display: flex;
  justify-content: flex-start;
  color: ${colorPalette.fontBlack};
  border: 1px solid #eee;
  white-space: pre-line;
`;

const ValueRow = styled.div`
  height: 35px;
  width: 100%;
  color: ${colorPalette.fontDarkGrey};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 11px;
  padding-right: 10px;
`;

const ActiveRow = styled.div`
  height: 35px;
  width: 100%;
  color: ${({ status }) => (status === "ACTIVE" ? "green" : "red")};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 11px;
  font-weight: bold;
  padding-right: 10px;
`;
