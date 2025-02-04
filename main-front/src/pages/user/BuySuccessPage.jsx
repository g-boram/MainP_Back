import styled from "@emotion/styled";
import BackBg from "../../assert/toss/success_bg.png";
import { PageContainer, PageWrapper } from "../../styles/pageLayoutStyles";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { ClearLoadingOverlay } from "../../styles/managerLayoutStyles";
import { ClipLoader } from "react-spinners";
import { sendBuyCar } from "../../api/carApi";
import { useSelector } from "react-redux";

export default function BuySuccessPage() {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const orderId = params.get("orderId");
    const paymentKey = params.get("paymentKey");
    const amount = params.get("amount");

    // 추출된 데이터를 서버로 전송
    const sendDataToServer = async () => {
      try {
        const response = await sendBuyCar({
          userId: user?.id,
          orderId,
          paymentKey,
          amount,
        });
        console.log("success:", response.data);
      } catch (error) {
        console.error("Error:", error);
      } finally {
        const timer = setTimeout(() => {
          navigate("/mypage");
        }, 2000);
        return () => clearTimeout(timer);
      }
    };

    sendDataToServer();
  }, [user?.id, navigate]);

  return (
    <PageContainer>
      <PageWrapper>
        <ClearLoadingOverlay>
          <ClipLoader color="#000" z-index={11} />
        </ClearLoadingOverlay>
        <ImgWrapper>
          <TitleBox>Thank you!</TitleBox>
          <TextBox>구매해주셔서 감사합니다!</TextBox>
          <ImgBox>
            <img src={BackBg} alt="BackBg" />
          </ImgBox>
        </ImgWrapper>
      </PageWrapper>
    </PageContainer>
  );
}

const ImgWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 700px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const TitleBox = styled.div`
  position: absolute;
  top: 230px;
  font-size: 40px;
`;
const TextBox = styled.div`
  position: absolute;
  top: 300px;
  font-size: 20px;
`;

const ImgBox = styled.div`
  width: 500px;
  height: 500px;

  > img {
    width: 100%;
    height: auto;
  }
`;
