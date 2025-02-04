import styled from "@emotion/styled";

export const ModalContent500 = styled.div`
  width: 100%;
  height: 470px;
  padding: 15px;

  #title {
    height: 60px;
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    font-size: 14px;
    font-weight: bold;
    padding-bottom: 5px;
    border-bottom: 1px solid #000;
  }
  #box {
    height: 360px;
    overflow: scroll;
  }
`;

export const ModalHead40 = styled.div`
  width: 100%;
  height: 40px;
  background-color: #000;
  border-radius: 10px 10px 0 0;
`;
export const ModalHead50 = styled.div`
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding-right: 10px;
  background-color: #000;
  border-radius: 10px 10px 0 0;
`;

export const BottomBtn = styled.div`
  height: 50px;
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
