import styled from "@emotion/styled/macro";
import HeadTitle from "../../components/manager/HeadTitle";
import Flex from "../../components/shared/Flex";
import Spacing from "../../components/shared/Spacing";
import Text from "../../components/shared/Text";
import { useEffect, useState } from "react";
import { getSimpleUser } from "../../api/userApi";
import { HEIGHT_LIST } from "../../constants/height";
import { colorPalette } from "../../styles/colorPalette";
import { FaUserCog } from "react-icons/fa";
import { icons } from "../../constants/icons";
import { MdDoNotDisturb } from "react-icons/md";
import { getBuyCar } from "../../api/carApi";
import { ClearLoadingOverlay } from "../../styles/managerLayoutStyles";
import { ClipLoader } from "react-spinners";

export default function MyPage() {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [orderData, setOrderData] = useState(null);
  const sessionUser = JSON.parse(sessionStorage.getItem("user"));

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userId = localStorage.getItem("userId");
        if (userId) {
          const data = await getSimpleUser(userId);
          setUser(data.data);
        }
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchUser();
  }, []);

  useEffect(() => {
    const getOrderData = async () => {
      try {
        const data = await getBuyCar();
        setOrderData(data);
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    };
    getOrderData();
  }, []);

  const imageIcon = user && icons.filter((icon) => icon.name === user.imageUrl);
  console.log(orderData);
  return (
    <CarListContainer>
      <HeadTitle title={"회원정보 상세보기"} desc={"회원정보 상세보기 "} />
      {user && (
        <FormContainer>
          <Flex height="250px" width="100%" align="center" justify="space-between">
            {isLoading && (
              <ClearLoadingOverlay>
                <ClipLoader color="#000" z-index={11} />
              </ClearLoadingOverlay>
            )}
            <UserImgBox>
              {user.imageUrl !== null ? (
                imageIcon.length > 0 ? (
                  imageIcon[0].iconComp
                ) : (
                  <FaUserCog size={40} color="#ddd" />
                )
              ) : (
                <FaUserCog size={40} color="#ddd" />
              )}
            </UserImgBox>

            <InfoBox>
              <Flex direction="column" width="50%">
                <Flex>
                  <Label>· 권한</Label>
                  <ValueRow>{sessionUser.role}</ValueRow>
                </Flex>
                <Flex>
                  <Label>· 이름</Label>
                  <ValueRow>{sessionUser.username}</ValueRow>
                </Flex>
                <Flex>
                  <Label>· 핸드폰 번호</Label>
                  <ValueRow>{user.phoneNumber}</ValueRow>
                </Flex>
                <Flex>
                  <Label>· 생년월일</Label>
                  <ValueRow>{sessionUser.birth}</ValueRow>
                </Flex>
              </Flex>

              <Flex direction="column" width="50%">
                <Flex>
                  <Label>· 이메일</Label>
                  <ValueRow>{sessionUser.email}</ValueRow>
                </Flex>
                <Flex>
                  <Label>· 성별</Label>
                  <ActiveRow gender={sessionUser.gender}>{sessionUser.gender}</ActiveRow>
                </Flex>
                <Flex>
                  <Label>· 주소</Label>
                  <ValueRow>{sessionUser.address}</ValueRow>
                </Flex>
                <Flex>
                  <Label>· 생성일</Label>
                  <ValueRow>{sessionUser.createdAt}</ValueRow>
                </Flex>
              </Flex>
            </InfoBox>
          </Flex>
          <Spacing size={30} />
        </FormContainer>
      )}
      <FormContainer>
        {isLoading && (
          <ClearLoadingOverlay>
            <ClipLoader color="#000" z-index={11} />
          </ClearLoadingOverlay>
        )}
        <TextBox>구매한 차량</TextBox>
        {orderData && orderData.length !== 0 ? (
          <BuyCarBox>
            {orderData.map((data) => (
              <OrderBox>
                <div>ID: {data.id}</div>
                <Spacing size={10} />
                <Text typography="t13" color="#444">
                  주문번호
                </Text>
                <Text typography="t13" color="#444">
                  {data.orderId}
                </Text>
                <Spacing size={10} />
                <Text typography="t13" color="#444">
                  결제정보
                </Text>
                <TossKeyBox color="#444">{data.paymentKey}</TossKeyBox>
                <Text typography="t13" color="#444">
                  결제금액
                </Text>
                <Text color="#444">{data.amount}</Text>
              </OrderBox>
            ))}
          </BuyCarBox>
        ) : (
          <NoBuyCarBox>
            <MdDoNotDisturb size={50} color="#eee" />
          </NoBuyCarBox>
        )}
      </FormContainer>
    </CarListContainer>
  );
}

const CarListContainer = styled.div`
  user-select: none;
  min-height: 100%;
  width: 1200px;
  margin: 0 auto;
  margin-bottom: 100px;
  padding-top: ${HEIGHT_LIST.HEADER + HEIGHT_LIST.NAVBAR}px;

  @media (max-width: 600px) {
    flex-direction: column;
  }
`;

const FormContainer = styled.div`
  width: 100%;
  min-height: 300px;
  display: flex;
  flex-direction: column;
  border-bottom: 1px solid #eee;
`;

const BuyCarBox = styled.div`
  width: 100%;
  min-height: 300px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;
const NoBuyCarBox = styled.div`
  width: 100%;
  min-height: 300px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f9f9f9;
`;
const TextBox = styled.div`
  width: 100%;
  height: 70px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid #eee;
  margin-bottom: 10px;
`;

const InfoBox = styled.div`
  width: 900px;
  display: flex;
`;
const TossKeyBox = styled.div`
  width: 150px;
  min-height: 70px;
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 10px;
`;
const OrderBox = styled.div`
  width: 250px;
  height: 250px;
  display: flex;
  margin-bottom: 10px;
  margin-right: 10px;
  flex-direction: column;
  border-radius: 10px;
  padding: 10px;
  border: 1px solid #eee;
  background-color: #f5f7fc;
`;

const Label = styled.div`
  width: 100%;
  height: 40px;
  margin-bottom: 5px;
  display: flex;
  margin-right: 10px;
  align-items: center;
  justify-content: flex-start;
  font-size: 11px;
  padding-left: 20px;
  font-weight: bold;
  background-color: #fafafa;
  color: ${colorPalette.fontBlack};
`;

const ValueRow = styled.div`
  height: 100%;
  width: 100%;
  color: ${colorPalette.fontDarkGrey};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
`;

const UserImgBox = styled.div`
  height: 200px;
  width: 200px;
  font-size: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f4f4f4;
  margin-right: 10px;

  > img {
    height: 200px;
    width: 200px;
    object-fit: contain;
  }
`;

const ActiveRow = styled.div`
  height: 35px;
  width: 100%;
  color: ${({ gender }) => (gender === "남" ? "green" : "red")};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: bold;
`;
