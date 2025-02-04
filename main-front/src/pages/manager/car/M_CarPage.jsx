import styled from "@emotion/styled";
import LeftNavbar from "../../../components/manager/LeftNavbar";
import HeadTitle from "../../../components/manager/HeadTitle";
import LinkButton from "../../../components/shared/LinkButton";
import Flex from "../../../components/shared/Flex";
import ListHeader from "../../../components/shared/ListHeader";
import CarRow from "../../../components/manager/car/CarRow";
import CarFilterRow from "../../../components/manager/car/CarFilterRow";
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
import CustomPagination from "../../../components/shared/pagination/CustomPagination";

export default function M_CarPage() {
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
          <HeadTitle title={"자동차 게시글 조회"} desc={"등록된 자동차 관련 게시글 조회 페이지"}></HeadTitle>

          {/* 필터 버튼 */}
          <CarFilterRow setIsLoading={setIsLoading} setCurrentItems={setCurrentItems} />
          <CarListWrapper>
            {isLoading && (
              <ClearLoadingOverlay>
                <ClipLoader color="#000" z-index={11} />
              </ClearLoadingOverlay>
            )}
            {currentItems && currentItems.length !== 0 ? (
              <DataWrapper>
                <Flex direction="column">
                  {currentItems.map((car) => (
                    <CarRow key={car.id} {...car} />
                  ))}
                </Flex>
              </DataWrapper>
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

const DataWrapper = styled.div`
  width: 100%;
  height: 450px;
  display: flex;
  flex-direction: column;
  overflow: scroll;
  border-top: 1px solid #777;
  border-bottom: 1px solid #777;
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
