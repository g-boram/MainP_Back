import styled from "@emotion/styled";
import formatDateByHyphen from "../../../utils/formatDate";
import Spacing from "../../shared/Spacing";
import { colorPalette } from "../../../styles/colorPalette";
import { useNavigate } from "react-router-dom";
import { formatPhoneNumber } from "../../../utils/formatNumber";
import { useAlertContext } from "../../../contexts/AlertContextProvider";
import { deleteUser } from "../../../api/userApi";
import { toast } from "react-toastify";

export default function UserRow(userData) {
  const navigate = useNavigate();
  const { open } = useAlertContext();
  const { userId, address, email, birth, role, createdAt, phoneNumber, updatedAt, username, gender } = userData;

  const confirmDeleteUser = () => {
    open({
      title: "회원삭제",
      description: "회원정보를 삭제 하시겠습니까?",
      isCancel: true,
      onButtonClick: () => handleDelete(),
    });
  };

  const handleDetailPage = () => {
    navigate("/manager/users/detail", { state: { ...userData } });
  };
  const handleUpdatePage = () => {
    navigate("/manager/users/update", { state: { ...userData } });
  };
  const handleDelete = async () => {
    try {
      await deleteUser(userId);
      toast.success("회원정보 삭제 완료.");
      navigate(0);
    } catch (err) {
      console.log(err);
      toast.error("삭제 실패! 관리자 문의 바랍니다.");
    }
  };

  return (
    <UserRowWrapper gender={gender} role={role}>
      <div id="userId">{userId}</div>
      <div id="role">{role}</div>
      <div id="username">{username}</div>
      <div id="phoneNumber">{formatPhoneNumber(phoneNumber)}</div>
      <div id="email">{email}</div>
      <div id="userAddress">{address}</div>
      <div id="birth">{birth}</div>
      <div id="gender">{gender}</div>
      <div id="createdAt">{formatDateByHyphen(createdAt)}</div>
      <div id="updatedAt">{formatDateByHyphen(updatedAt)}</div>
      <div id="btnBox">
        <DetailBtn onClick={handleDetailPage}>상세보기</DetailBtn>
        <UpdateBtn onClick={handleUpdatePage}>수정</UpdateBtn>
        <DeleteBtn onClick={confirmDeleteUser}>삭제</DeleteBtn>
      </div>
    </UserRowWrapper>
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

  #userId {
    width: 50px;
  }
  #role {
    width: 70px;
    font-weight: bold;
    color: ${({ role }) =>
      role === "USER" ? "#000" : role === "ADMIN" ? "red" : role === "SELLER" ? "green" : "blue"};
  }
  #username {
    width: 90px;
  }
  #email {
    width: 110px;
  }
  #userAddress {
    width: 220px;
    justify-content: flex-start;
    margin-left: 10px;
  }
  #phoneNumber {
    width: 120px;
  }
  #birth {
    width: 80px;
  }
  #gender {
    width: 30px;
    color: ${({ gender }) => (gender === "남" ? "#002fff" : "#ff0053")};
  }
  #createdAt {
    width: 80px;
    color: ${colorPalette.fontGrey};
  }
  #updatedAt {
    width: 80px;
    color: ${colorPalette.fontGrey};
  }
  #btnBox {
    width: 180px;
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
const UpdateBtn = styled.button`
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
const DeleteBtn = styled.button`
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
