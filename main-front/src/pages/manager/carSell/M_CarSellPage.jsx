import styled from "@emotion/styled";
import LeftNavbar from "../../../components/manager/LeftNavbar";
import HeadTitle from "../../../components/manager/HeadTitle";
import Flex from "../../../components/shared/Flex";
import ListHeader from "../../../components/shared/ListHeader";
import CustomPagination from "../../../components/shared/pagination/CustomPagination";
import CarSellRow from "../../../components/manager/sell/CarSellRow";
import CreatableSelect from "react-select/creatable";
import addDelimiter from "../../../utils/addDelimiter";
import BaseButton from "../../../components/shared/Button";
import Spacing from "../../../components/shared/Spacing";
import { useEffect, useState } from "react";
import { ClipLoader } from "react-spinners";
import { BaseIconBox } from "../../../styles/miniComponentStyles";
import { useDispatch, useSelector } from "react-redux";
import { LuUserRoundX } from "react-icons/lu";
import { getAllCarSellList, patchCarSellStatus } from "../../../api/CarSellApi";
import { setPage, setTotalItems } from "../../../reduxSlice/paginationSlice";
import {
  ClearLoadingOverlay,
  ContentBox,
  ContentWrapper,
  ManagerContainer,
  NavRow,
} from "../../../styles/managerLayoutStyles";
import Modal from "../../../components/shared/Modal";
import { ModalHead50 } from "../../../styles/modalLayoutStyles";
import { useAlertContext } from "../../../contexts/AlertContextProvider";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { SELLER_STATUS } from "../../../constants/carOption";

export default function M_CarSellPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { open } = useAlertContext();

  const [carSellData, setCarSellData] = useState([]);
  const [modalData, setModalData] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [status, setStatus] = useState(null);

  const [currentItems, setCurrentItems] = useState([]);
  const { currentPage, itemsPerPage } = useSelector((state) => state.pagination);

  useEffect(() => {
    setIsLoading(true);
    const allData = async () => {
      const data = await getAllCarSellList();
      setCarSellData(data);
    };
    allData();
    setIsLoading(false);
  }, [isLoading]);

  useEffect(() => {
    dispatch(setTotalItems(carSellData.length));
    const startIndex = currentPage * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    setCurrentItems(carSellData.slice(startIndex, endIndex));
  }, [carSellData, currentPage, itemsPerPage, dispatch]);

  const handleFilterNoStatus = () => {
    const filterData = carSellData.filter((v) => v.orderStatus === "no" || null);
    setCarSellData(filterData);
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const confirmUpdateStatus = () => {
    open({
      title: "상태변경",
      description: "현재 상태를 변경 하시겠습니까?",
      isCancel: true,
      onButtonClick: () => handleUpdate(),
    });
  };

  const handleUpdate = async () => {
    try {
      const reqData = {
        id: modalData.id,
        status: status.value,
      };
      await patchCarSellStatus(reqData);
      setIsLoading(true);
      toast.success("상태 업데이트 완료.");
      toggleModal();
    } catch (err) {
      console.log(err);
      toast.error("변경 실패! 관리자 문의 바랍니다.");
    }
  };

  const selectStyle = {
    container: (containerStyles) => ({
      ...containerStyles,
      width: "100%",
      fontSize: "14px",
      borderRadius: 0,
    }),
    control: (controlStyles) => ({
      ...controlStyles,
      borderRadius: 0,
      border: "1px solid #eee",
    }),
    menu: (controlStyles) => ({
      ...controlStyles,
      borderRadius: 0,
    }),
  };
  return (
    <ManagerContainer>
      <LeftNavbar />
      <ContentWrapper>
        <ContentBox>
          <HeadTitle title={"온라인 신청 목록"} desc={"온라인 견적신청 관련 작업 페이지"}></HeadTitle>
          <NavRow>
            <BaseButton size="small" color="black" height="40px" width="100px" onClick={() => setIsLoading(true)}>
              초기화
            </BaseButton>
            <Spacing size={10} direction="width" />
            <BaseButton size="small" color="black" height="40px" width="150px" onClick={() => handleFilterNoStatus()}>
              미확인 신청 보기
            </BaseButton>
          </NavRow>

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
                    "No.-50",
                    "userID-60",
                    "이름-60",
                    "sellerID-60",
                    "핸드폰 번호-120",
                    "이메일-110",
                    "처리상태-110",
                    "희망시간-80",
                    "희망지역-200",
                    "-220",
                  ]}
                />
                {currentItems.map((car) => (
                  <CarSellRow key={car.id} carSellData={car} toggleModal={toggleModal} setModalData={setModalData} />
                ))}
              </Flex>
            ) : (
              <NotDataWrapper>
                <BaseIconBox>
                  <LuUserRoundX size={40} />
                  <div>신청자가 없습니다.</div>
                </BaseIconBox>
              </NotDataWrapper>
            )}
          </CarListWrapper>
          <CustomPagination
            currentPage={currentPage}
            totalItems={carSellData.length}
            itemsPerPage={itemsPerPage}
            onPageChange={(page) => dispatch(setPage(page))}
          />
        </ContentBox>
      </ContentWrapper>
      {/* 모달 */}
      {isModalOpen && (
        <Modal onClickToggleModal={toggleModal} height={600} width={500}>
          <ModalHead50 />
          {modalData !== null ? (
            <ModalContent>
              <Flex>
                <Label>신청자 ID</Label>
                <Value>{modalData.orderUserId}</Value>
                <Label>신청자 이름</Label>
                <Value>{modalData.username}</Value>
              </Flex>
              <Flex>
                <Label>연락처</Label>
                <Value>{modalData.phone}</Value>
                <Label>이메일</Label>
                <Value>{modalData.email}</Value>
              </Flex>
              <Flex>
                <Label>판매자 ID</Label>
                <Value>{modalData.sellerId ? modalData.sellerId : "미지정"}</Value>
                <Label>진행 상태</Label>
                <Value>{SELLER_STATUS.find((item) => item.value === modalData.orderStatus).label}</Value>
              </Flex>
              <Flex>
                <Label>희망 지역</Label>
                <Value>{modalData.region}</Value>
                <Label>희망 시간</Label>
                <Value>{modalData.time}</Value>
              </Flex>
              <Flex>
                <Label>희망 가격</Label>
                <Value>{addDelimiter(modalData.price)}</Value>
                <Label>주행 거리 (km)</Label>
                <Value>{addDelimiter(modalData.mileage)}</Value>
              </Flex>
              <Flex>
                <Label>색상</Label>
                <Value>{modalData.color}</Value>
                <Label>신청일</Label>
                <Value>{modalData.createdAt}</Value>
              </Flex>
              <Flex>
                <Label>특이사항</Label>
                <Value>{modalData.notes}</Value>
              </Flex>
              <Spacing size={30} />
              <CreatableSelect
                placeholder="진행상태"
                name="orderStatus"
                id="orderStatus"
                onChange={(newValue) => setStatus(newValue)}
                options={SELLER_STATUS}
                value={status}
                styles={selectStyle}
              />
              <Spacing size={50} />
              <BaseButton size="medium" color="black" full height="40px" onClick={() => confirmUpdateStatus()}>
                상태값 변경
              </BaseButton>
              <Spacing size={10} />
            </ModalContent>
          ) : (
            <ClearLoadingOverlay>
              <ClipLoader color="#000" z-index={11} />
            </ClearLoadingOverlay>
          )}
          <Flex justify="center" align="center">
            <BottomBtn onClick={toggleModal}>닫기</BottomBtn>
          </Flex>
        </Modal>
      )}
    </ManagerContainer>
  );
}

const CarListWrapper = styled.div`
  height: 500px;
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

const BottomBtn = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  color: white;
  background-color: black;
  width: 100px;
  height: 40px;
  font-size: 12px;
  cursor: pointer;
`;

const ModalContent = styled.div`
  min-height: 80%;
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 15px 20px;
  overflow: auto;
  > div {
    font-size: 12px;
  }
`;

const Label = styled.div`
  min-width: 100px;
  min-height: 40px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  font-size: 12px;
  padding: 0 10px;
  color: #000;
  background-color: #f4f4f4;
`;
const Value = styled.div`
  width: 80%;
  min-height: 40px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  font-size: 12px;
  padding: 0 10px;
  color: #000;
`;
