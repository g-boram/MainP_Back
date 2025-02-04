import React from "react";
import styled from "@emotion/styled";
import Spacing from "../../shared/Spacing";
import Flex from "../../shared/Flex";
import { colorPalette } from "../../../styles/colorPalette";
import { useLocation } from "react-router-dom";
import { FaUserCog } from "react-icons/fa";
import { icons } from "../../../constants/icons";

export default function UsersDetailForm() {
  const location = useLocation();

  const { userId, address, email, role, birth, imageUrl, createdAt, phoneNumber, updatedAt, username, gender } =
    location.state || null;

  const imageIcon = icons.filter((icon) => icon.name === imageUrl);
  return (
    <FormContainer>
      <Flex height="250px" width="100%" align="center" justify="space-between">
        <UserImgBox>{imageUrl !== null ? imageIcon[0].iconComp : <FaUserCog size={40} color="#ddd" />}</UserImgBox>

        <InfoBox>
          <Flex direction="column" width="50%">
            <Flex>
              <Label>· User Id</Label>
              <ValueRow>{userId}</ValueRow>
            </Flex>
            <Flex>
              <Label>· 권한</Label>
              <ValueRow>{role}</ValueRow>
            </Flex>
            <Flex>
              <Label>· 이름</Label>
              <ValueRow>{username}</ValueRow>
            </Flex>
            <Flex>
              <Label>· 핸드폰 번호</Label>
              <ValueRow>{phoneNumber}</ValueRow>
            </Flex>
            <Flex>
              <Label>· 생년월일</Label>
              <ValueRow>{birth}</ValueRow>
            </Flex>
          </Flex>

          <Flex direction="column" width="50%">
            <Flex>
              <Label>· 이메일</Label>
              <ValueRow>{email}</ValueRow>
            </Flex>
            <Flex>
              <Label>· 성별</Label>
              <ActiveRow gender={gender}>{gender}</ActiveRow>
            </Flex>
            <Flex>
              <Label>· 주소</Label>
              <ValueRow>{address}</ValueRow>
            </Flex>
            <Flex>
              <Label>· 생성일</Label>
              <ValueRow>{createdAt}</ValueRow>
            </Flex>
            <Flex>
              <Label>· 수정일</Label>
              <ValueRow>{updatedAt}</ValueRow>
            </Flex>
          </Flex>
        </InfoBox>
        <Spacing size={30} />
      </Flex>
    </FormContainer>
  );
}

const FormContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  border-bottom: 1px solid #eee;
`;

const InfoBox = styled.div`
  width: 900px;
  display: flex;
`;

const Label = styled.div`
  width: 100%;
  height: 40px;
  margin-bottom: 5px;
  display: flex;
  margin-right: 10px;
  align-items: center;
  justify-content: flex-start;
  font-size: 11px;
  padding-left: 20px;
  font-weight: bold;
  background-color: #fafafa;
  color: ${colorPalette.fontBlack};
`;

const ValueRow = styled.div`
  height: 100%;
  width: 100%;
  color: ${colorPalette.fontDarkGrey};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
`;

const UserImgBox = styled.div`
  height: 200px;
  width: 200px;
  font-size: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f4f4f4;
  margin-right: 10px;

  > img {
    height: 200px;
    width: 200px;
    object-fit: contain;
  }
`;

const ActiveRow = styled.div`
  height: 35px;
  width: 100%;
  color: ${({ gender }) => (gender === "남" ? "green" : "red")};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: bold;
`;
