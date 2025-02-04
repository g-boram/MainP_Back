import styled from "@emotion/styled";
import LeftNavbar from "../../../components/manager/LeftNavbar";
import HeadTitle from "../../../components/manager/HeadTitle";
import LinkButton from "../../../components/shared/LinkButton";
import Flex from "../../../components/shared/Flex";
import ListHeader from "../../../components/shared/ListHeader";
import UserFilterRow from "../../../components/manager/user/UserFilterRow";
import UserRow from "../../../components/manager/user/UserRow";
import CustomPagination from "../../../components/shared/pagination/CustomPagination";
import { useEffect, useState } from "react";
import { ClipLoader } from "react-spinners";
import { BaseIconBox } from "../../../styles/miniComponentStyles";
import { useDispatch, useSelector } from "react-redux";
import { getAllUser } from "../../../api/userApi";
import { LuUserRoundX } from "react-icons/lu";
import { setPage, setTotalItems } from "../../../reduxSlice/paginationSlice";
import {
  ClearLoadingOverlay,
  ContentBox,
  ContentWrapper,
  ManagerContainer,
  NavRow,
} from "../../../styles/managerLayoutStyles";

export default function M_UsersPage() {
  const dispatch = useDispatch();

  const [userData, setUserData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentItems, setCurrentItems] = useState([]);
  const { currentPage, itemsPerPage } = useSelector((state) => state.pagination);

  useEffect(() => {
    const allData = async () => {
      const data = await getAllUser();
      setUserData(data);
    };
    allData();
  }, []);

  useEffect(() => {
    dispatch(setTotalItems(userData.length));

    const startIndex = currentPage * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    setCurrentItems(userData.slice(startIndex, endIndex));
  }, [userData, currentPage, itemsPerPage, dispatch]);

  return (
    <ManagerContainer>
      <LeftNavbar />
      <ContentWrapper>
        <ContentBox>
          <HeadTitle title={"회원 목록"} desc={"회원정보 관련 작업 페이지"}></HeadTitle>
          <NavRow>
            <LinkButton
              to="/manager/users/create"
              color="white"
              bgColor="black"
              text="회원 등록하기"
              width="100px"
              height="40px"
              fontSize="12px"
            />
          </NavRow>
          {/* 필터 영역 */}
          <UserFilterRow setIsLoading={setIsLoading} setUserData={setUserData} />
          <CarListWrapper>
            {isLoading && (
              <ClearLoadingOverlay>
                <ClipLoader color="#000" z-index={11} />
              </ClearLoadingOverlay>
            )}
            {userData && userData.length !== 0 ? (
              <Flex direction="column">
                <ListHeader
                  height="30px"
                  borderB="#000"
                  borderT="#000"
                  fontSize="13px"
                  bgColor="#eeeeee"
                  rowTitle={[
                    "ID.-50",
                    "권한-70",
                    "이름-100",
                    "핸드폰 번호-110",
                    "이메일-110",
                    "주소-230",
                    "생년월일-80",
                    "성별-40",
                    "등록일-80",
                    "수정일-80",
                    "-170",
                  ]}
                />
                {currentItems.map((user) => (
                  <UserRow key={user.userId} {...user} />
                ))}
              </Flex>
            ) : (
              <NotDataWrapper>
                <BaseIconBox>
                  <LuUserRoundX size={40} />
                  <div>사용자가 없습니다.</div>
                </BaseIconBox>
              </NotDataWrapper>
            )}
          </CarListWrapper>
          <CustomPagination
            currentPage={currentPage}
            totalItems={userData.length}
            itemsPerPage={itemsPerPage}
            onPageChange={(page) => dispatch(setPage(page))}
          />
        </ContentBox>
      </ContentWrapper>
    </ManagerContainer>
  );
}

const CarListWrapper = styled.div`
  height: 500px;
  /* overflow-y: scroll; */
`;

const NotDataWrapper = styled.div`
  width: 100%;
  height: 500px;
  background-color: #eee;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
