import axios from "axios";
import { SERVER_URL } from "../constants/urlList";
import { fetchPagedBoards } from "../reduxSlice/boardListSlice";

// 전체 게시판 조회
export const getAllBoardList = async () => {
  try {
    const response = await axios.get(`${SERVER_URL.LOCAL}/board/all`);

    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};

// 게시판 수정
export const updateBoard = async (formData) => {
  try {
    const response = await axios.put(`${SERVER_URL.LOCAL}/board`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};

// 게시판 삭제
export const deleteBoard = async (boardId, dispatch) => {
  try {
    const response = await axios.delete(`${SERVER_URL.LOCAL}/board/${boardId}`);
    dispatch(fetchPagedBoards({ page: 0, size: 10 }));
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};

// 게시판 삭제
export const detailBoardById = async (boardId) => {
  try {
    const response = await axios.get(`${SERVER_URL.LOCAL}/board/${boardId}`);

    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};

// 게시판 수정내역 조회
export const getUpdatedBoardHistory = async (boardId) => {
  try {
    const response = await axios.get(
      `${SERVER_URL.LOCAL}/board/history/${boardId}`
    );
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};
