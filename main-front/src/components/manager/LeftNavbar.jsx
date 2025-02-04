import styled from "@emotion/styled";
import Flex from "../shared/Flex";
import Text from "../shared/Text";
import Badge from "../shared/Badge";
import Spacing from "../shared/Spacing";

import { colorPalette } from "../../styles/colorPalette";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { IoHome } from "react-icons/io5";
import { FaCar } from "react-icons/fa";
import { FaUsersGear } from "react-icons/fa6";
import { formatPhoneNumber } from "../../utils/formatNumber";

export default function LeftNavbar() {
  const { user } = useSelector((state) => state.auth);

  return (
    <NavContainer>
      <ImgBox>{user.imageUrl ? <img src={user.imageUrl} alt="user" /> : <FaUsersGear size={80} />}</ImgBox>
      <UserInfoBox>
        <Flex justify="center">
          <Badge label={user.role} color={"#000"} />
        </Flex>
        <Spacing size={10} />
        <Flex justify="space-between">
          <Text typography="t11" color="#fff">
            Name.
          </Text>
          <Text typography="t11" color="#fff">
            {user.username}
          </Text>
        </Flex>
        <Flex justify="space-between">
          <Text typography="t11" color="#fff">
            Phone.
          </Text>
          <Text typography="t11" color="#fff">
            {formatPhoneNumber(user.phone)}
          </Text>
        </Flex>
        <Flex justify="space-between">
          <Text typography="t11" color="#fff">
            Email.
          </Text>
          <Text typography="t11" color="#fff">
            {user.email}
          </Text>
        </Flex>
      </UserInfoBox>
      {user.role === "ADMIN" ? (
        <LinkMenuBox>
          <StyledLink to="/manager">Manager 메인 페이지</StyledLink>
          <StyledLink to="/manager/users">회원 관리</StyledLink>
          <StyledLink to="/manager/board/notice">게시판 관리</StyledLink>
          <SubDescBox>
            <Desc>- 공지사항</Desc>
            <Desc>- 이벤트</Desc>
            <Desc>- FAQ</Desc>
            <Desc>- 기타</Desc>
          </SubDescBox>
          <StyledLink to="/manager/seller">Seller 메인 페이지</StyledLink>
          <StyledLink to="/manager/car/sell">온라인 상담신청 조회</StyledLink>
          <StyledLink to="/manager/car">자동차 게시글 조회</StyledLink>
          <StyledLink to="/manager/car/event">자동차 이벤트 등록</StyledLink>
          <StyledLink to="/manager/repair">Repair 메인 페이지</StyledLink>
          <StyledLink to="/manager/repair">자동차 정비 목록</StyledLink>
        </LinkMenuBox>
      ) : user.role === "SELLER" ? (
        <LinkMenuBox>
          <StyledLink to="/manager/seller">Seller 메인 페이지</StyledLink>
          <StyledLink to="/manager/car/sell">온라인 상담신청 조회</StyledLink>
          <StyledLink to="/manager/car">자동차 게시글 조회</StyledLink>
          <StyledLink to="/manager/car/event">자동차 이벤트 등록</StyledLink>
        </LinkMenuBox>
      ) : user.role === "REPAIR" ? (
        <LinkMenuBox>
          <StyledLink to="/manager/repair">Repair 메인 페이지</StyledLink>
          <StyledLink to="/manager/car">자동차 게시글 조회</StyledLink>
          <StyledLink to="/manager/repair">자동차 정비 목록</StyledLink>
        </LinkMenuBox>
      ) : (
        <></>
      )}
      <BottomLinkBox>
        <BottomLinkBtn to="/">
          <FaCar size={20} />
          SITE
        </BottomLinkBtn>
        {/* <BottomLinkBtn to="/manager">
          <IoHome size={20} />
          MAIN
        </BottomLinkBtn> */}
      </BottomLinkBox>
    </NavContainer>
  );
}

const NavContainer = styled.div`
  width: 200px;
  padding: 0 10px;
  height: 100vh;
  display: flex;
  position: fixed;
  flex-shrink: 0;
  z-index: 10;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  background-color: black;
  color: ${colorPalette.fontBlack};
`;

const UserInfoBox = styled.div`
  width: 100%;
  height: 100px;
  margin-top: 10px;
  margin-bottom: 50px;
`;

const ImgBox = styled.div`
  width: 120px;
  height: 120px;
  display: flex;
  margin-top: 30px;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  border: 1px solid #eee;
  background-color: #fff;
`;
const LinkMenuBox = styled.div`
  width: 100%;
  height: 500px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`;

const BottomLinkBox = styled.div`
  width: 100%;
  height: 60px;
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

const SubDescBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-items: center;
  padding-left: 20px;
  margin-bottom: 10px;
`;
const Desc = styled.div`
  font-size: 11px;
  color: #fff;
`;

const StyledLink = styled(Link)`
  color: #eee;
  height: 30px;
  font-weight: bold;
  font-size: 14px;
  margin: 0px 10px;
  cursor: pointer;
  text-decoration: none;

  :hover {
    color: #fef3bf;
  }
`;

const BottomLinkBtn = styled(Link)`
  width: 50px;
  height: 50px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 12px;
  color: ${colorPalette.fontBlack};
  background-color: #fff;
  font-weight: bold;
  border-radius: 50%;
  text-decoration: none;
  cursor: pointer;

  :hover {
    color: grey;
  }
`;
