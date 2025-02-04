import LeftNavbar from "../../../components/manager/LeftNavbar";
import HeadTitle from "../../../components/manager/HeadTitle";
import LinkButton from "../../../components/shared/LinkButton";
import Flex from "../../../components/shared/Flex";
import styled from "@emotion/styled";
import Modal from "../../../components/shared/Modal";
import CarEventUpdateForm from "../../../components/manager/car/CarEventUpdateForm";
import Spacing from "../../../components/shared/Spacing";
import BaseButton from "../../../components/shared/Button";

import {
  ClearLoadingOverlay,
  ContentBox,
  ContentWrapper,
  ManagerContainer,
  NavRow,
} from "../../../styles/managerLayoutStyles";
import { ModalContent500, ModalHead50 } from "../../../styles/modalLayoutStyles";
import { useState } from "react";
import { toast } from "react-toastify";
import { useAlertContext } from "../../../contexts/AlertContextProvider";
import { useLocation, useNavigate } from "react-router-dom";
import { updateCar } from "../../../api/carApi";
import { ClipLoader } from "react-spinners";
import { colorPalette } from "../../../styles/colorPalette";
import { RxCross2 } from "react-icons/rx";

export default function M_CarEventDetailPage() {
  const location = useLocation();
  const carId = location.state.carId;
  const navigate = useNavigate();
  const { open } = useAlertContext();

  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [hashTag, setHashTag] = useState("");
  const [tags, setTags] = useState([]);
  const [eventData, setEventData] = useState();

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  // 해시태그 입력
  const onChangeHashTag = (e) => {
    setHashTag(e?.target?.value?.trim());
  };
  const handleKeyUp = (e) => {
    if (e.keyCode === 32 && e.target.value.trim() !== "") {
      if (tags?.includes(e.target.value?.trim())) {
        toast.error("같은 태그가 있습니다.");
      } else {
        setTags((prev) => (prev?.length > 0 ? [...prev, hashTag] : [hashTag]));
        setHashTag("");
      }
    }
  };
  const removeTag = (tag) => {
    setTags(tags?.filter((val) => val !== tag));
  };

  const handleFormValues = (e) => {
    setEventData((prevFormValues) => ({
      ...prevFormValues,
      [e.target.name]: e.target.value,
    }));
  };

  const confirmCreate = (e) => {
    e.preventDefault();
    open({
      title: "이벤트를 등록",
      description: "이벤트를 등록 하시겠습니까?",
      isCancel: true,
      onButtonClick: () => handleSubmit(),
    });
  };

  const handleSubmit = async () => {
    const data = {
      ...location.state,
      eventName: eventData.eventName,
      eventEndTime: eventData.eventEndTime,
      hashTags: tags ? tags : [],
    };

    const formTotalData = new FormData();
    formTotalData.append("carReq", JSON.stringify(data));
    console.log("data", data);
    try {
      await updateCar({ carId, formTotalData });

      setIsLoading(false);
      toast.success("이벤트 등록 완료!");
      navigate("/manager/car/event");
    } catch (error) {
      console.error("Error car creation:", error);
      toast.error("이벤트 등록 실패! 관리자 문의 바랍니다.");
    }
  };
  return (
    <ManagerContainer>
      <LeftNavbar />
      <ContentWrapper>
        {isLoading && (
          <ClearLoadingOverlay>
            <ClipLoader color="#000" z-index={11} />
          </ClearLoadingOverlay>
        )}
        <ContentBox>
          <HeadTitle title={"자동차 상세보기"} desc={"자동차 상세보기 "}></HeadTitle>
          <NavRow>
            <Flex>
              <LinkButton
                to="/manager/car/event"
                color="white"
                bgColor="black"
                text="상품 목록"
                width="100px"
                height="40px"
                fontSize="12px"
              />
            </Flex>
          </NavRow>
          <CarEventUpdateForm />
          <Flex justify="center">
            <ModalButton onClick={toggleModal}>이벤트 등록하기</ModalButton>
          </Flex>
          <Spacing size={100} />
        </ContentBox>
      </ContentWrapper>
      {isModalOpen && (
        <Modal onClickToggleModal={toggleModal} height={500} width={800}>
          <ModalHead50>
            <RxCross2 color="#fff" size={30} onClick={toggleModal} />
          </ModalHead50>
          <ModalContent500>
            <div id="title">이벤트 등록하기</div>
            <div id="box">
              <Spacing size={10} />
              <Flex width="100%">
                <EventInput>
                  <Label htmlFor="eventEndTime">이벤트 이름</Label>
                  <input id="eventName" name="eventName" value={eventData?.eventName} onChange={handleFormValues} />
                </EventInput>
                <Spacing size={20} direction={"width"} />
                <EventInput>
                  <Label htmlFor="eventEndTime">이벤트 종료시간</Label>
                  <input
                    type="datetime-local"
                    id="eventEndTime"
                    name="eventEndTime"
                    value={eventData?.eventEndTime}
                    onChange={handleFormValues}
                  />
                </EventInput>
              </Flex>
              <Spacing size={10} />

              <Flex>
                <Label># 해시태그</Label>
                <Flex direction="column" height="250px" width="100%">
                  <HashTagForm>
                    {tags?.map((tag, index) => (
                      <Tags key={index} onClick={() => removeTag(tag)}>
                        # {tag}
                      </Tags>
                    ))}
                  </HashTagForm>
                  <Flex>
                    <TagInput
                      id="hashtag"
                      name="hashtag"
                      placeholder="해시태그 + 스페이스바 = 입력 / 삭제는 해시태그 클릭"
                      onChange={onChangeHashTag}
                      onKeyUp={handleKeyUp}
                      value={hashTag}
                    />
                  </Flex>
                </Flex>
              </Flex>
              <Flex justify="center" align="center">
                <BaseButton size="small" color="black" full height="40px" width="100px" onClick={confirmCreate}>
                  이벤트 등록
                </BaseButton>
              </Flex>
            </div>
          </ModalContent500>
        </Modal>
      )}
    </ManagerContainer>
  );
}

const EventInput = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  > label {
    font-size: 12px;
    width: 200px;
    text-align: end;
    margin-right: 10px;
  }

  & input {
    border: 1px solid #eee;
    width: 100%;
    padding: 0 10px;
    height: 30px;
    font-size: 12px;
    text-align: end;
  }
`;

const TagInput = styled.input`
  border: 1px solid #eee;
  width: 100%;
  font-size: 12px;
  padding-left: 10px;
  height: 35px;
`;
const Tags = styled.div`
  border: 1px solid #444;
  font-size: 12px;
  border-radius: 15px;
  padding: 5px 12px;
  width: max-content;
  height: max-content;
  margin-right: 5px;
`;
const HashTagForm = styled.div`
  display: flex;
  padding: 5px;
  flex-wrap: wrap;
  height: auto;
  min-height: 150px;
  margin-bottom: 10px;
  width: 100%;
`;

const ModalButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  color: white;
  background-color: black;
  width: 120px;
  height: 40px;
  font-size: 12px;
  cursor: pointer;
`;

const Label = styled.div`
  min-width: 150px;
  height: 40px;
  display: flex;
  margin-right: 10px;
  align-items: center;
  justify-content: flex-start;
  font-size: 14px;
  padding: 0 10px;
  font-weight: bold;
  color: ${colorPalette.fontBlack};
  border-left: 3px solid ${colorPalette.notice_form};
`;
