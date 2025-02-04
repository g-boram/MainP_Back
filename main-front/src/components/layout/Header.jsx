/** @jsxImportSource @emotion/react */

import { Z_INDEX_LIST } from "../../constants/zIndex";
import { colorPalette } from "../../styles/colorPalette";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { isManagerPath } from "../../reduxSlice/isManagerPathSlice";
import { HEIGHT_LIST } from "../../constants/height";
import { logout } from "../../reduxSlice/authSlice";
import LogoImg from "../../assert/Logo.png";
import styled from "@emotion/styled";
import Flex from "../shared/Flex";
import BaseButton from "../shared/Button";
import Spacing from "../shared/Spacing";

export default function Header() {
  const { user } = useSelector((state) => state.auth);
  const [isPath, setIsPath] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();
  const isManager = useSelector((state) => state.isManagerPath.isManager); // 상태 가져오기
  const dispatch = useDispatch(); // 액션 디스패치

  useEffect(() => {
    const segments = location.pathname.split("/");
    setIsPath(segments[1] === "manager" ? true : false);
  }, [location]);
  dispatch(isManagerPath(isPath));

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <>
      {isManager ? (
        <></>
      ) : (
        <UserHeaderContainer>
          <HeaderBox>
            <LogoBox onClick={() => navigate("/")}>
              <img src={LogoImg} alt="Logo" />
            </LogoBox>
            <div>
              {user == null ? (
                <Flex>
                  <StyledLink to="/signin">로그인</StyledLink>
                  <StyledLink to="/signup">회원가입</StyledLink>
                </Flex>
              ) : (
                <LoginUserBox>
                  <Flex>
                    <TextRow>{user.username} 님 환영합니다.</TextRow>
                    <Link to={`/`}>
                      <BaseButton size="small" color="white" height="30px" width="70px" onClick={handleLogout}>
                        로그아웃
                      </BaseButton>
                    </Link>
                    <Spacing size={10} direction="width" />
                    {user !== null ? (
                      <Link to={`/mypage`}>
                        <BaseButton size="small" color="white" height="30px" width="80px">
                          마이페이지
                        </BaseButton>
                      </Link>
                    ) : (
                      <></>
                    )}
                    <Spacing size={20} direction="width" />
                  </Flex>
                  {user.role === "ADMIN" ? (
                    <ManagerLink to="/manager">관리자 페이지</ManagerLink>
                  ) : user.role === "SELLER" ? (
                    <ManagerLink to="/manager/seller">관리자 페이지</ManagerLink>
                  ) : user.role === "REPAIR" ? (
                    <ManagerLink to="/manager/repair">관리자 페이지</ManagerLink>
                  ) : (
                    <></>
                  )}
                </LoginUserBox>
              )}
            </div>
          </HeaderBox>
          <NavbarContainer>
            <StyledLink to="/company">회사 소개</StyledLink>
            <StyledLink to="/mycarsellpage">내차 팔기</StyledLink>
            <StyledLink to="/car">내차 사기</StyledLink>
            <StyledLink to="/board/notice">공지사항</StyledLink>
            <StyledLink to="/board/event">이벤트</StyledLink>
            <StyledLink to="/board/faq">FAQ</StyledLink>
          </NavbarContainer>
        </UserHeaderContainer>
      )}
    </>
  );
}

const Img = styled.img`
  position: absolute;
  top: -10px;

  @media (max-width: 900px) {
    display: none;
  }
`;

const UserHeaderContainer = styled.div`
  height: auto;
  width: 100%;
  display: flex;
  flex-direction: column;
  color: ${colorPalette.fontWhite};
  z-index: ${Z_INDEX_LIST.HEADER};
  background-color: ${colorPalette.headerBG};
  position: fixed;

  @media (max-width: 600px) {
    padding: 0px;
  }
`;

const HeaderBox = styled.div`
  height: ${HEIGHT_LIST.HEADER}px;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;

  @media (max-width: 600px) {
    justify-content: space-around;
    align-items: center;
  }
`;
const NavbarContainer = styled.div`
  width: 100%;
  height: ${HEIGHT_LIST.NAVBAR}px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${colorPalette.fontWhite};
  background-color: ${colorPalette.navbarBG};

  @media (max-width: 600px) {
    font-size: 12px;
  }
`;

const LogoBox = styled.div`
  margin-left: 20px;

  cursor: pointer;
  width: 60px;
  height: 60px;

  > img {
    width: 100px;
    margin-top: 10px;
    position: absolute;
    object-fit: contain;
  }
`;

const TextRow = styled.div`
  min-width: 100px;
  height: auto;
  font-size: 12px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  color: #fff;
  margin-right: 10px;
`;

const LoginUserBox = styled.div`
  display: flex;
  justify-content: space-between;

  @media (max-width: 600px) {
    font-size: 11px;
  }
`;

const StyledLink = styled(Link)`
  color: #eee;
  font-weight: bold;
  margin: 0px 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  text-decoration: none;
  @media (max-width: 600px) {
    margin: 0px 20px;
  }
  :hover {
    color: #fff;
  }
`;

const ManagerLink = styled(Link)`
  color: #eee;
  font-weight: bold;
  margin: 0px 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 15px;
  font-size: 13px;
  text-decoration: none;
  min-width: 100px;
  cursor: pointer;
  @media (max-width: 600px) {
    display: none;
  }
  :hover {
    color: #ffd000;
  }
`;
