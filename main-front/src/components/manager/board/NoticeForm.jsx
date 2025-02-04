import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import Spacing from "../../shared/Spacing";
import Flex from "../../shared/Flex";
import BaseButton from "../../shared/Button";
import CreatableSelect from "react-select/creatable";
import { MANAGER_CATEGORY } from "../../../constants/category";
import { colorPalette } from "../../../styles/colorPalette";
import { useDispatch, useSelector } from "react-redux";

import { useAlertContext } from "../../../contexts/AlertContextProvider";
import { useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { createBoard, resetBoardState } from "../../../reduxSlice/boardCreateSlice";
import { LoadingOverlay } from "../../../styles/managerLayoutStyles";
import { toast } from "react-toastify";

// 관리자-공지사항 폼양식
export default function NoticeForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const { open } = useAlertContext();
  const { isLoading, board, error } = useSelector((state) => state.boardCreate);

  const [file, setFile] = useState(null);
  const [category, setCategory] = useState();
  const [isActive, setIsActive] = useState(true);
  const [formValues, setFormValues] = useState({
    title: "",
    content: "",
    category: "",
    userId: 0,
  });

  useEffect(() => {
    if (board) {
      dispatch(resetBoardState());
      toast.success("📋 게시글 등록 완료!");
      navigate("/manager/board/notice");
    }

    if (error) {
      toast.error("📋 등록 실패! 관리자 문의 바랍니다.");
      dispatch(resetBoardState());
    }
  }, [board, error, open, dispatch, navigate]);

  const handleCheckboxChange = (e) => {
    setIsActive(e.target.checked);
  };
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
  };

  const handleFormValues = (e) => {
    setFormValues((prevFormValues) => ({
      ...prevFormValues,
      [e.target.name]: e.target.value,
    }));
  };

  const confirmCreate = () => {
    open({
      title: "게시글 등록",
      description: "게시글을 등록 하시겠습니까?",
      isCancel: true,
      onButtonClick: () => handleSubmit(),
    });
  };

  const handleSubmit = async () => {
    const data = {
      title: formValues.title,
      content: formValues.content,
      category: category ? category.value : "other",
      userId: user ? user.id : 0,
      status: isActive ? "ACTIVE" : "INACTIVE",
      imageUrl: "",
    };

    const formTotalData = new FormData();
    formTotalData.append("boardReq", JSON.stringify(data));
    if (file != null) {
      formTotalData.append("file", file);
    }

    dispatch(createBoard(formTotalData));
  };

  return (
    <FormContainer>
      {isLoading && (
        <LoadingOverlay>
          <ClipLoader color="#000" z-index={11} />
        </LoadingOverlay>
      )}
      <Flex direction="column">
        <Spacing size={10} />
        <Flex align={"center"}>
          <Label>카테고리</Label>
          <>
            <CreatableSelect
              placeholder="카테고리를 선택해 주세요  (미선택시 기타로 등록)"
              onChange={(newValue) => setCategory(newValue)}
              options={MANAGER_CATEGORY}
              value={category}
              styles={{
                container: (containerStyles) => ({
                  ...containerStyles,
                  width: "100%",
                  fontSize: "13px",
                  border: "1px solid #eee",
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
              }}
            />
          </>
        </Flex>
        <Spacing size={10} />

        <Flex>
          <Label>활성화 여부</Label>
          <CheckBoxRow>
            <label id="active">바로 게시하기</label>
            <input id="active" type="checkbox" checked={isActive} onChange={handleCheckboxChange} />
          </CheckBoxRow>
        </Flex>
        <Spacing size={10} />

        <Flex>
          <Label>제목</Label>
          <InputBox>
            <input name="title" id="title" onChange={handleFormValues} value={formValues.title} />
          </InputBox>
        </Flex>
        <Spacing size={10} />

        <Flex>
          <Label>내용</Label>
          <TextareaBox>
            <textarea name="content" id="content" onChange={handleFormValues} value={formValues.content} />
          </TextareaBox>
        </Flex>
        <Spacing size={10} />

        <Flex>
          <Label>첨부파일</Label>
          <InputBox>
            <input type="file" name="file" onChange={handleFileChange} />
          </InputBox>
        </Flex>
      </Flex>
      <Spacing size={50} />
      <Flex justify={"center"}>
        <BaseButton size="medium" color="black" height={"40px"} full onClick={confirmCreate}>
          게시글 등록
        </BaseButton>
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
  min-width: 15%;
  height: 35px;
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

const TextareaBox = styled.div`
  height: auto;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  & textarea {
    border: 1px solid #eee;
    width: 100%;
    font-size: 12px;
    padding: 10px;
    min-height: 300px;
  }
`;

const InputBox = styled.div`
  height: 35px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  & input {
    border: 1px solid #eee;
    width: 100%;
    padding: 5px;
    height: 35px;
    font-size: 12px;
  }
`;

const CheckBoxRow = styled.div`
  height: 35px;
  width: 100%;
  gap: 10px;
  font-size: 12px;
  display: flex;
  align-items: center;
  justify-content: flex-end;

  & input {
    height: 20px;
    width: 20px;
    border: 1px solid #eee;
    padding: 0px 20px;
  }
`;
