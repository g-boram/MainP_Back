import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import Spacing from "../../shared/Spacing";
import Flex from "../../shared/Flex";
import BaseButton from "../../shared/Button";
import CreatableSelect from "react-select/creatable";
import { MANAGER_CATEGORY } from "../../../constants/category";
import { colorPalette } from "../../../styles/colorPalette";
import { useSelector } from "react-redux";
import { useAlertContext } from "../../../contexts/AlertContextProvider";
import { useLocation, useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { ClearLoadingOverlay } from "../../../styles/managerLayoutStyles";
import { updateBoard } from "../../../api/boardApi";
import { css } from "@emotion/react";
import { toast } from "react-toastify";

// 관리자-공지사항 폼양식
export default function NoticeUpdateForm() {
  const navigate = useNavigate();
  const location = useLocation();

  const { user } = useSelector((state) => state.auth);
  const { open } = useAlertContext();

  const [file, setFile] = useState(null);
  const [isCategory, setIsCategory] = useState();
  const [isActive, setIsActive] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [formValues, setFormValues] = useState(null);

  useEffect(() => {
    if (location.state) {
      setFormValues({
        boardId: location.state.boardId,
        title: location.state.title,
        content: location.state.content,
        category: location.state.category,
        status: location.state.status,
        createdAt: location.state.createdAt,
        updatedAt: location.state.updatedAt,
        username: location.state.username,
        imageUrl: location.state.imageUrl,
        updateUserId: user.id,
      });
      setIsLoading(false);
      setIsActive(location.state.status === "ACTIVE" ? 1 : 0);
    }
  }, [location.state, user.id]);

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

  const confirmUpdate = (e) => {
    e.preventDefault();

    open({
      title: "게시글 수정",
      description: "게시글을 수정 하시겠습니까?",
      isCancel: true,
      onButtonClick: () => handleSubmit(),
    });
  };

  const handleSubmit = async () => {
    const updateData = {
      title: formValues.title,
      content: formValues.content,
      category: isCategory ? isCategory.value : formValues.category,
      boardId: formValues.boardId,
      updateUserId: user ? user.id : 0,
      status: isActive ? "ACTIVE" : "INACTIVE",
      imageUrl: formValues.imageUrl || "",
    };

    const formData = new FormData();
    formData.append("boardReq", JSON.stringify(updateData));
    if (file) {
      formData.append("file", file);
    }
    console.log("updateData", updateData);
    try {
      await updateBoard(formData);

      toast.success("📋 게시글 수정 완료!");
      navigate("/manager/board/notice");
    } catch (error) {
      toast.error("게시글 수정 실패! 관리자 문의 바랍니다.");
      console.log(error.message || error);
    }
  };

  return (
    <FormContainer>
      {isLoading || formValues == null ? (
        <ClearLoadingOverlay>
          <ClipLoader color="#000" z-index={11} />
        </ClearLoadingOverlay>
      ) : (
        <>
          <Flex direction="column">
            <Spacing size={10} />
            <Flex align={"center"}>
              <>
                <Label>Board Id</Label>
                <ValueRow>{formValues.boardId}</ValueRow>
              </>
              <>
                <Label>작성자</Label>
                <ValueRow>{formValues.username}</ValueRow>
              </>
              <>
                <Label>생성일</Label>
                <ValueRow>{formValues.createdAt.slice(0, 10)}</ValueRow>
              </>
              <>
                <Label>수정일</Label>
                <ValueRow>{formValues.updatedAt.slice(0, 10)}</ValueRow>
              </>
            </Flex>
            <Spacing size={20} />
            <Flex align={"center"}>
              <>
                <Label>현재 카테고리</Label>
                <ValueRow>{formValues.category}</ValueRow>
              </>
              <>
                <Label>변경 카테고리</Label>
                <CreatableSelect
                  placeholder="카테고리를 선택해 주세요"
                  onChange={(newValue) => setIsCategory(newValue)}
                  options={MANAGER_CATEGORY}
                  value={isCategory}
                  styles={{
                    container: (containerStyles) => ({
                      ...containerStyles,
                      width: "100%",
                      fontSize: "11px",
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
            <Spacing size={20} />

            <Flex>
              <>
                <Label>활성화 여부</Label>
                <BaseButton
                  color={isActive === 1 ? "success" : "grey"}
                  css={activeBtn}
                  onClick={() => setIsActive(1)}
                >
                  활성화
                </BaseButton>
                <Spacing size={10} direction="horizontal" />
                <BaseButton
                  color={isActive === 0 ? "error" : "grey"}
                  css={activeBtn}
                  onClick={() => setIsActive(0)}
                >
                  비활성화
                </BaseButton>
              </>
            </Flex>
            <Spacing size={20} />

            <Flex>
              <Label>제목</Label>
              <InputBox>
                <input
                  name="title"
                  id="title"
                  onChange={handleFormValues}
                  value={formValues.title}
                />
              </InputBox>
            </Flex>
            <Spacing size={10} />

            <Flex>
              <Label>내용</Label>
              <TextareaBox>
                <textarea
                  name="content"
                  id="content"
                  onChange={handleFormValues}
                  value={formValues.content}
                />
              </TextareaBox>
            </Flex>
            <Spacing size={30} />

            <Flex>
              <>
                <Label>첨부파일</Label>
                <ValueRow>{formValues.imageUrl}</ValueRow>
              </>
              <Label>변경 첨부파일</Label>
              <InputBox>
                <input type="file" name="file" onChange={handleFileChange} />
              </InputBox>
            </Flex>
          </Flex>
          <Spacing size={50} />
          <Flex justify={"center"}>
            <BaseButton
              size="medium"
              color="black"
              height={"40px"}
              full
              onClick={confirmUpdate}
            >
              게시글 수정
            </BaseButton>
          </Flex>
        </>
      )}
    </FormContainer>
  );
}

const FormContainer = styled.div`
  width: 100%;
  min-height: 600px;
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
  font-size: 12px;
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
    padding: 10px 10px;
    min-height: 300px;
  }
`;

const InputBox = styled.div`
  height: 35px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  & input {
    border: 1px solid #eee;
    width: 100%;
    padding: 0 10px;
    height: 35px;
  }
`;

const ValueRow = styled.div`
  height: 35px;
  width: 100%;
  color: ${colorPalette.fontDarkGrey};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  padding-right: 10px;
`;

const activeBtn = css`
  height: 40px;
  width: 100%;
`;
