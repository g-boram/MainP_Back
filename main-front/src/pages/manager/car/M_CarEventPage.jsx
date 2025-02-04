import styled from "@emotion/styled";
import LeftNavbar from "../../../components/manager/LeftNavbar";
import HeadTitle from "../../../components/manager/HeadTitle";
import Flex from "../../../components/shared/Flex";
import ListHeader from "../../../components/shared/ListHeader";
import CarRow from "../../../components/manager/car/CarRow";
import CarFilterRow from "../../../components/manager/car/CarFilterRow";
import CustomPagination from "../../../components/shared/pagination/CustomPagination";
import { useEffect, useState } from "react";
import { ClipLoader } from "react-spinners";
import { ClearLoadingOverlay, ContentBox, ContentWrapper, ManagerContainer } from "../../../styles/managerLayoutStyles";
import { BaseIconBox } from "../../../styles/miniComponentStyles";
import { TbClipboardSearch } from "react-icons/tb";
import { getCarListAll } from "../../../api/carApi";
import { useDispatch, useSelector } from "react-redux";
import { setPage, setTotalItems } from "../../../reduxSlice/paginationSlice";
import CarEventRow from "../../../components/manager/car/CarEventRow";

export default function M_CarEventPage() {
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
          <HeadTitle
            title={"자동차 정보 상세조회 및 이벤트 등록"}
            desc={"자동차 상세보기 이벤트 관련 작업 페이지"}
          ></HeadTitle>

          {/* 필터 버튼 */}
          <CarFilterRow setIsLoading={setIsLoading} setCurrentItems={setCurrentItems} />
          <CarListWrapper>
            {isLoading && (
              <ClearLoadingOverlay>
                <ClipLoader color="#000" z-index={11} />
              </ClearLoadingOverlay>
            )}
            {currentItems && currentItems.length !== 0 ? (
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
                    "모델명-200",
                    "가격-100",
                    "제조 연도-100",
                    "연료종류-100",
                    "주행거리-120",
                    "변속기종류-100",
                    "판매자 ID-80",
                    "색상-40",
                    "작성일-120",
                    "판매상태-80",
                    "-100",
                  ]}
                />
                {currentItems.map((car) => (
                  <CarEventRow key={car.id} {...car} />
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
  height: 450px;
`;

const NotDataWrapper = styled.div`
  width: 100%;
  height: 450px;
  background-color: #eee;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
