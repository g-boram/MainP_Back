import styled from "@emotion/styled";
import Flex from "../../shared/Flex";
import Text from "../../shared/Text";
import Spacing from "../../shared/Spacing";
import { useEffect, useState } from "react";
import { getSimpleUser } from "../../../api/userApi";
import { ImUserTie } from "react-icons/im";
import { ClearLoadingOverlay } from "../../../styles/managerLayoutStyles";
import { ClipLoader } from "react-spinners";
import { formatPhoneNumber } from "../../../utils/formatNumber";
import { Link } from "react-router-dom";

export default function CarSellerInfoBox({ id }) {
  const [seller, setSeller] = useState();

  useEffect(() => {
    const fetchUser = async () => {
      const res = await getSimpleUser(18);
      setSeller(res.data);
    };
    if (id) {
      fetchUser();
    }
  }, []);

  return (
    <>
      {seller ? (
        <Container>
          <Flex justify="center" align="flex-start" direction="column">
            <ImgBox>{seller.imageUrl ? <img src={seller.imageUrl} alt="user" /> : <ImUserTie size={60} />}</ImgBox>
          </Flex>
          <Flex width="60%" direction="column">
            <Text typography="t15" bold>
              판매사원
            </Text>
            <Spacing size={10} />
            <Flex justify="space-between">
              <Text typography="t13" color="grey">
                No.
              </Text>
              <Text typography="t13">{seller.userId}</Text>
            </Flex>
            <Flex justify="space-between">
              <Text typography="t13" color="grey">
                Name.
              </Text>
              <Text typography="t13">{seller.username}</Text>
            </Flex>
            <Flex justify="space-between">
              <Text typography="t13" color="grey">
                Email.
              </Text>
              <Text typography="t13">{seller.email}</Text>
            </Flex>
            <Flex justify="space-between">
              <Text typography="t13" color="grey">
                Phone.
              </Text>
              <Text typography="t13">{formatPhoneNumber(seller.phoneNumber)}</Text>
            </Flex>
            <Spacing size={15} />
            <Flex justify="flex-end">
              <StyledLink to="/">판매중인 차량 보러가기</StyledLink>
            </Flex>
          </Flex>
        </Container>
      ) : (
        <Container>
          <ClearLoadingOverlay>
            <ClipLoader color="#000" z-index={11} />
          </ClearLoadingOverlay>
        </Container>
      )}
    </>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  min-height: 130px;
  padding: 10px 0;
  border-top: 1px solid #000;
  border-bottom: 1px solid #000;
`;

const ImgBox = styled.div`
  width: 100px;
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  border: 1px solid #000;
  border-radius: 50%;
`;

const StyledLink = styled(Link)`
  color: #fff;
  background-color: #000;
  font-weight: bold;
  font-size: 12px;
  padding: 5px 10px;
  border-radius: 5px;
  display: flex;

  justify-content: flex-end;
  align-items: center;
  cursor: pointer;
  text-decoration: none;

  hover {
    color: #fff;
  }
`;
