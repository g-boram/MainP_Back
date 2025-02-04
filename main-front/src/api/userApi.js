import axios from "axios";
import { SERVER_URL } from "../constants/urlList";

// 모든 사용자 조회
export const getAllUser = async (id) => {
  try {
    const response = await axios.get(`${SERVER_URL.LOCAL}/users`);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};

// 필터로 사용자 조회
export const getUserSearch = async (queryParams) => {
  try {
    const response = await axios.get(`${SERVER_URL.LOCAL}/users/filter`, {
      params: queryParams,
    });
    return response;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};

// 권한별 사용자 조회
export const getUserByRoll = async (role) => {
  try {
    const response = await axios.get(`${SERVER_URL.LOCAL}/users/role/${role}`);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};

// 특정 사용자 조회
export const getSimpleUser = async (id) => {
  try {
    const response = await axios.get(`${SERVER_URL.LOCAL}/users/${id}`);
    return response;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};

// 이메일 중복체크
export const checkUserEmail = async (email) => {
  try {
    const response = await axios.get(
      `${SERVER_URL.LOCAL}/users/checkEmail?email=${email}`
    );
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};

// 특정 사용자 수정
export const updateUser = async (data) => {
  const id = data.userId;
  try {
    const response = await axios.put(`${SERVER_URL.LOCAL}/users/${id}`, data);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};

// 특정 사용자 삭제
export const deleteUser = async (id) => {
  try {
    const response = await axios.delete(`${SERVER_URL.LOCAL}/users/${id}`);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};
