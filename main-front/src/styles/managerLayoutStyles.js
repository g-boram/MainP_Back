import styled from "@emotion/styled";

export const ManagerContainer = styled.div`
  display: flex;
  width: 100vw;
`;

export const ContentWrapper = styled.div`
  width: 1300px;
  min-height: 100vh;
  padding-left: 250px;
  padding-top: 30px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
`;

export const ContentBox = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

export const NavRow = styled.div`
  display: flex;
  justify-content: flex-end;
  margin: 10px 0;
`;

export const ClearLoadingOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
`;

export const LoadingOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(153, 153, 153, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
`;

export const ErrorOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(255, 0, 0, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
`;

export const ErrorBox = styled.div`
  height: 150px;
  width: 300px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
`;

export const ErrorText = styled.div`
  font-size: 12px;
  color: #000;
  overflow-x: "hidden";
`;

export const NotBoardOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(153, 153, 153, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
`;

export const NotBoardBox = styled.div`
  height: 150px;
  width: 300px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
`;

export const NotBoardText = styled.div`
  font-size: 12px;
  color: #000;
`;
