import styled from "@emotion/styled";
import LeftNavbar from "../../../components/manager/LeftNavbar";
import HeadTitle from "../../../components/manager/HeadTitle";
import LinkButton from "../../../components/shared/LinkButton";
import Flex from "../../../components/shared/Flex";
import ListHeader from "../../../components/shared/ListHeader";
import CarFilterRow from "../../../components/manager/car/CarFilterRow";
import CustomPagination from "../../../components/shared/pagination/CustomPagination";
import RepairCarRow from "../../../components/manager/repair/RepairCarRow";
import { useEffect, useState } from "react";
import { ClipLoader } from "react-spinners";
import {
  ClearLoadingOverlay,
  ContentBox,
  ContentWrapper,
  ManagerContainer,
  NavRow,
} from "../../../styles/managerLayoutStyles";
import { BaseIconBox } from "../../../styles/miniComponentStyles";
import { TbClipboardSearch } from "react-icons/tb";
import { getCarListAll } from "../../../api/carApi";
import { useDispatch, useSelector } from "react-redux";
import { setPage, setTotalItems } from "../../../reduxSlice/paginationSlice";

export default function M_RepairPage() {
  const dispatch = useDispatch();

  const [carData, setCarData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentItems, setCurrentItems] = useState([]);
  const { currentPage, itemsPerPage } = useSelector((state) => state.pagination);

  useEffect(() => {
    const allData = async () => {
      const data = await getCarListAll();
      setCarData(data.data);
    };
    allData();
  }, []);

  useEffect(() => {
    dispatch(setTotalItems(carData.length));

    const startIndex = currentPage * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    setCurrentItems(carData.slice(startIndex, endIndex));
  }, [carData, currentPage, itemsPerPage, dispatch]);

  return (
    <ManagerContainer>
      <LeftNavbar />
      <ContentWrapper>
        <ContentBox>
          <HeadTitle title={"자동차정비 목록"} desc={"자동차정비 관련 작업페이지"}></HeadTitle>
          <NavRow>
            <LinkButton
              to="/manager/repair/create"
              color="white"
              bgColor="black"
              text="점검 등록하기"
              width="120px"
              height="40px"
              fontSize="12px"
            />
          </NavRow>
          {/* 필터 버튼 */}
          <CarFilterRow setIsLoading={setIsLoading} setCarData={setCarData} />
          <CarListWrapper>
            {isLoading && (
              <ClearLoadingOverlay>
                <ClipLoader color="#000" z-index={11} />
              </ClearLoadingOverlay>
            )}
            {carData && carData.length !== 0 ? (
              <Flex direction="column">
                <ListHeader
                  height="30px"
                  borderB="#000"
                  borderT="#000"
                  fontSize="13px"
                  bgColor="#eeeeee"
                  rowTitle={[
                    "ID.-50",
                    "제조사-100",
                    "모델명-150",
                    "가격-100",
                    "제조 연도-100",
                    "연료종류-100",
                    "주행거리-120",
                    "변속기종류-100",
                    "판매자 ID-80",
                    "색상-40",
                    "작성일-120",
                    "점검상태-130",
                    "-100",
                  ]}
                />
                {currentItems.map((car) => (
                  <RepairCarRow key={car.id} {...car} />
                ))}
              </Flex>
            ) : (
              <NotDataWrapper>
                <BaseIconBox>
                  <TbClipboardSearch size={40} />
                  <div>차량이 없습니다.</div>
                </BaseIconBox>
              </NotDataWrapper>
            )}
          </CarListWrapper>
          <CustomPagination
            currentPage={currentPage}
            totalItems={carData.length}
            itemsPerPage={itemsPerPage}
            onPageChange={(page) => dispatch(setPage(page))}
          />
        </ContentBox>
      </ContentWrapper>
    </ManagerContainer>
  );
}

const CarListWrapper = styled.div`
  height: 400px;
`;

const NotDataWrapper = styled.div`
  width: 100%;
  height: 400px;
  background-color: #eee;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
