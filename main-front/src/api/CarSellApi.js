import axios from "axios";
import { SERVER_URL } from "../constants/urlList";

// 신청서 전부 조회
export const getAllCarSellList = async () => {
  try {
    const response = await axios.get(`${SERVER_URL.LOCAL}/api/carsell`);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};

// 온라인 신청서 상태값 변경
export const patchCarSellStatus = async ({ id, status }) => {
  try {
    const response = await axios.patch(`${SERVER_URL.LOCAL}/api/carsell/${id}/status?orderStatus=${status}`);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};
