import styled from "@emotion/styled";
import { colorPalette } from "../../../styles/colorPalette";
import { formatPhoneNumber } from "../../../utils/formatNumber";
import { SELLER_STATUS } from "../../../constants/carOption";
import { handleCall } from "../../../utils/handleCalling";

export default function CarSellRow({ carSellData, toggleModal, setModalData }) {
  const { id, orderUserId, username, sellerId, phone, email, time, region, orderStatus } = carSellData;

  // 진행 상태값
  const status = SELLER_STATUS.find((item) => item.value === orderStatus);

  return (
    <>
      <UserRowWrapper gender={orderStatus}>
        <div id="no">{id}</div>
        <div id="orderUserId">{orderUserId}</div>
        <div id="username">{username}</div>
        <div id="sellerId">{sellerId === null ? "미지정" : sellerId}</div>
        <div id="phone">{formatPhoneNumber(phone)}</div>
        <div id="email">{email}</div>
        <div id="orderStatus">{status ? status.label : ""}</div>
        <div id="time">{time}</div>
        <div id="region">{region}</div>
        <div id="btnBox">
          <DetailBtn
            onClick={() => {
              setModalData(carSellData);
              toggleModal();
            }}
          >
            상세보기
          </DetailBtn>
          <CallBtn onClick={() => handleCall(phone)}>전화하기</CallBtn>
          <MailBtn onClick={() => {}}>메일전송</MailBtn>
        </div>
      </UserRowWrapper>
    </>
  );
}

const UserRowWrapper = styled.div`
  height: 35px;
  width: 100%;
  display: flex;
  align-items: center;
  font-size: 12px;
  border-bottom: 1px solid #ccc;
  color: ${colorPalette.fontBlack};
  cursor: pointer;

  > div {
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: hidden;
    gap: 3px;
  }

  #no {
    width: 50px;
  }
  #orderUserId {
    width: 60px;
    font-weight: bold;
  }
  #username {
    width: 60px;
  }
  #sellerId {
    width: 60px;
  }
  #phone {
    width: 120px;
  }
  #email {
    width: 110px;
  }
  #time {
    width: 80px;
  }
  #region {
    width: 200px;
  }
  #orderStatus {
    width: 110px;
    color: #ff0053;
  }
  #btnBox {
    width: 220px;
  }

  :hover {
    background-color: #f7f7f7;
  }
`;

const DetailBtn = styled.button`
  height: 30px;
  padding: 2px 10px;
  font-size: 12px;
  background-color: ${colorPalette.btnBlack};
  border: none;
  border-radius: 5px;
  cursor: pointer;
  color: #fff;

  :hover {
    font-weight: bold;
    background-color: ${colorPalette.hoverBlack};
  }
`;
const CallBtn = styled.button`
  height: 30px;
  padding: 2px 10px;
  font-size: 12px;
  background-color: ${colorPalette.btnBlue};
  border: none;
  border-radius: 5px;
  cursor: pointer;
  color: #fff;

  :hover {
    font-weight: bold;
    background-color: ${colorPalette.hoverBlue};
  }
`;
const MailBtn = styled.button`
  height: 30px;
  padding: 2px 10px;
  font-size: 12px;
  background-color: ${colorPalette.btnRed};
  border: none;
  border-radius: 5px;
  cursor: pointer;
  color: #fff;

  :hover {
    font-weight: bold;
    background-color: ${colorPalette.hoverRed};
  }
`;
