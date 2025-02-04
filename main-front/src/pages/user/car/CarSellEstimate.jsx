import styled from "@emotion/styled/macro";
import axios from "axios";
import priceImg from "../../../assert/market_price_graph.png";
import Flex from "../../../components/shared/Flex";
import Spacing from "../../../components/shared/Spacing";
import { motion } from "framer-motion";
import { useState } from "react";
import { HEIGHT_LIST } from "../../../constants/height";
import { Link } from "react-router-dom";
import { SERVER_URL } from "../../../constants/urlList";
import { ClearLoadingOverlay } from "../../../styles/managerLayoutStyles";
import { ClipLoader } from "react-spinners";
import { IoCheckmark } from "react-icons/io5";

export default function CarSellEstimate() {
  const [step, setStep] = useState(1); // 1: 차량번호 입력, 2: 소유자명 입력, 3: 생년월일 입력, 4: 시세 결과
  const [carNumber, setCarNumber] = useState("");
  const [ownerName, setOwnerName] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [carDetails, setCarDetails] = useState(null); // 차량 정보 상태 추가

  const [isTrue, setIsTrue] = useState({
    step1: false,
    step2: false,
    step3: false,
  });
  const [isLoading, setIsLoading] = useState(false);

  // 차량번호 유효성 검증 API 호출
  const validateCarNumber = async (carNumber) => {
    try {
      const response = await axios.get(`${SERVER_URL.LOCAL}/details/validate/${carNumber}`);
      return response.data.valid;
    } catch (error) {
      console.error("Error validating car number:", error);
      return false;
    }
  };

  // 소유자명 유효성 검증 API 호출
  const validateOwnerName = async (ownerName, carNumber) => {
    try {
      const response = await axios.get(`${SERVER_URL.LOCAL}/details/validate/ownername`, {
        params: { ownerName, carNumber },
      });
      return response.data.valid;
    } catch (error) {
      console.error("Error validating owner name:", error);
      return false;
    }
  };

  // 생년월일 유효성 검증 API 호출
  const validateBirthDateOnServer = async (birthDate, carNumber) => {
    try {
      const response = await axios.get(`${SERVER_URL.LOCAL}/details/validate/birthdate`, {
        params: { birthDate, carNumber },
        withCredentials: true,
      });
      return response.data.valid;
    } catch (error) {
      console.error("Error validating birth date:", error);
      return false;
    }
  };

  // 생년월일 유효성 검사 (형식 확인)
  const validateBirthDate = (date) => {
    const regex = /^\d{4}-\d{2}-\d{2}$/;
    if (!regex.test(date)) return false;
    const parsedDate = new Date(date);
    return !isNaN(parsedDate.getTime());
  };

  // 생년월일 입력 포맷팅
  const handleBirthDateChange = (e) => {
    const input = e.target.value.replace(/[^0-9]/g, "");
    let formattedDate = input;

    if (input.length > 4) {
      formattedDate = `${input.slice(0, 4)}-${input.slice(4)}`;
    }
    if (input.length > 6) {
      formattedDate = `${formattedDate.slice(0, 7)}-${input.slice(6)}`;
    }
    setBirthDate(formattedDate.slice(0, 10));
  };

  // 다음 버튼 클릭 시
  const handleNext = async () => {
    setIsLoading(true);
    if (step === 1 && carNumber.trim()) {
      const isValid = await validateCarNumber(carNumber);
      if (isValid) {
        setIsTrue((prev) => ({ ...prev, step1: true }));
        setStep(2);
      } else alert("유효하지 않은 차량번호입니다.");
    } else if (step === 2 && ownerName.trim()) {
      const isValid = await validateOwnerName(ownerName, carNumber);
      if (isValid) {
        setIsTrue((prev) => ({ ...prev, step2: true }));
        setStep(3);
      } else alert("차량번호와 소유자명이 일치하지 않습니다.");
    } else if (step === 3 && validateBirthDate(birthDate)) {
      const isValid = await validateBirthDateOnServer(birthDate, carNumber);
      if (isValid) {
        handleResult();
      } else alert("생년월일이 일치하지 않습니다.");
    } else {
      alert("모든 필드를 올바르게 입력해주세요.");
    }
    setIsLoading(false);
  };

  // 차량 정보 API 호출 후 결과 처리
  const handleResult = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`${SERVER_URL.LOCAL}/details/${carNumber}`);
      setCarDetails(response.data); // 차량 정보 저장
      setIsTrue((prev) => ({ ...prev, step3: true }));
      setStep(4); // 시세 결과 단계로 변경
    } catch (error) {
      console.error("Error fetching car details:", error);
    }
    setIsLoading(false);
  };

  // 애니메이션 설정
  const slideVariants = {
    hidden: { opacity: 0, x: -100 },
    visible: { opacity: 1, x: 0 },
  };
  const slideVariants2 = {
    hidden: { opacity: 0, x: 100 },
    visible: { opacity: 1, x: 0 },
  };

  const renderStep1 = () => {
    if (step >= 1) {
      return (
        <motion.div variants={slideVariants} initial="hidden" animate="visible" transition={{ duration: 0.5 }}>
          <TextArea>
            <Text>먼저,</Text>
            <Text>차량의 번호를 입력해주세요</Text>
            <Flex justify="center" align="center">
              <InputBox
                placeholder="123가 1234"
                value={carNumber}
                onChange={(e) => setCarNumber(e.target.value)}
                disabled={step > 1}
              />
              {isTrue.step1 && <IoCheckmark size={40} style={{ margin: "0 10px", color: "#d72e36" }} />}
            </Flex>
          </TextArea>
        </motion.div>
      );
    }
  };

  const renderStep2 = () => {
    if (step >= 2) {
      return (
        <motion.div
          variants={slideVariants}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <TextArea>
            <Text>이제,</Text>
            <Text>소유주 이름을 입력해주세요</Text>
            <Flex justify="center" align="center">
              <InputBox
                placeholder="홍길동"
                value={ownerName}
                onChange={(e) => setOwnerName(e.target.value)}
                disabled={step > 2}
              />
              {isTrue.step2 && <IoCheckmark size={40} style={{ margin: "0 10px", color: "#d72e36" }} />}
            </Flex>
          </TextArea>
        </motion.div>
      );
    }
  };

  const renderStep3 = () => {
    if (step >= 3) {
      return (
        <motion.div
          variants={slideVariants}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <TextArea>
            <Text>마지막으로,</Text>
            <Text>소유주의 생년월일을 입력해주세요</Text>
            <Flex justify="center" align="center">
              <InputBox placeholder="YYYY-MM-DD" value={birthDate} onChange={handleBirthDateChange} />
              {isTrue.step3 && <IoCheckmark size={40} style={{ margin: "0 10px", color: "#d72e36" }} />}
            </Flex>
          </TextArea>
        </motion.div>
      );
    }
  };

  return (
    <CarListContainer>
      {isLoading && (
        <ClearLoadingOverlay>
          <ClipLoader color="#000" />
        </ClearLoadingOverlay>
      )}
      <SlideWrapper>
        <SlideBox>
          <motion.div
            key={step}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.5 }}
            style={{
              position: "absolute",
              width: "400px",
              top: `${(step - 1) * 0}%`,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {renderStep1()}
            {renderStep2()}
            {renderStep3()}
            <FormBtn onClick={handleNext}>{step >= 3 ? "완료" : "다음"}</FormBtn>
          </motion.div>
        </SlideBox>
      </SlideWrapper>

      <CarListWrapper>
        {/* 차량 시세 결과 화면 */}
        {step === 4 && carDetails && (
          <motion.div
            variants={slideVariants2}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.5 }}
            style={{
              position: "absolute",
              width: "500px",
              right: 0,
            }}
          >
            <TopText>안녕하세요 {carDetails.ownerName}님!</TopText>
            <Spacing size={5} />
            <TopText>이 차의 시세는 {carDetails.carPrice}만원 입니다.</TopText>
            <SubText>{carDetails.carName} 기준</SubText>
            <ImgArea>
              <img src={priceImg} alt="car price" />
            </ImgArea>
            <DescArea>
              <SubText2>·시세는 최근 3개월 내 시장가격이 반영된 차량의 견적가 기준으로 반영됩니다</SubText2>
              <SubText2>·차량의 상태에 따라 실제 견적 가격은 달라질 수 있습니다.</SubText2>
            </DescArea>
            <LinkStyle to={`/carsell`}>
              <FormBtn2>계속 진행하기</FormBtn2>
            </LinkStyle>
            <LinkStyle to={`/`}>메인으로</LinkStyle>
          </motion.div>
        )}
      </CarListWrapper>
    </CarListContainer>
  );
}

const CarListContainer = styled.div`
  min-height: 100%;
  width: 1200px;
  display: flex;
  align-items: center;
  margin: 0 auto;
  padding-top: ${HEIGHT_LIST.HEADER + HEIGHT_LIST.NAVBAR}px;
`;
const CarListWrapper = styled.div`
  width: 600px;
  height: 600px;
  position: relative; /* 필요한 경우, 절대 위치 조정을 위해 설정 */
`;

const SlideWrapper = styled.div`
  width: 500px;
  height: 700px;
  padding-top: 100px;
  position: relative;
`;
const SlideBox = styled.div`
  width: 500px;
  height: 250px;
`;

const FormBtn = styled.div`
  border-radius: 5px;
  font-size: 15px;
  font-weight: 600;
  height: 40px;
  line-height: 50px;
  width: 400px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 30px auto;
  color: #fff;
  background-color: #d72e36;
  cursor: pointer;
`;
const FormBtn2 = styled.div`
  border-radius: 5px;
  font-size: 15px;
  font-weight: 600;
  height: 40px;
  line-height: 50px;
  width: 500px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 30px auto;
  color: #fff;
  background-color: #d72e36;
  cursor: pointer;
`;

const Text = styled.span`
  color: #1a1a1a;
  display: block;
  font-size: 18px;
  font-weight: 700;
  letter-spacing: -0.44px;
  line-height: 30px;
`;

const TextArea = styled.div`
  margin-top: 30px;
  width: 400px;
  margin-bottom: 20px;
  display: flex;
  flex-direction: column; /* 세로로 정렬 */
`;

const InputBox = styled.input`
  margin-top: 15px;
  background: none;
  border: 1px solid #bbb;
  border-radius: 5px;
  color: rgb(51, 51, 51);
  font-size: 16px;
  font-weight: 600;
  padding: 10px 30px;
  letter-spacing: 0.5px;
  width: 100%;
`;

const LinkStyle = styled(Link)`
  color: #000;
  display: flex;
  justify-content: center;
  line-height: 0;
  font-size: 13px;
  text-decoration: none;
`;

const SubText2 = styled.p`
  font-weight: bold;
  margin-left: 10px;
  font-size: 12px;
  color: #a3a0a8;

  &:nth-of-type(1) {
    height: 6px;
  }
`;

const DescArea = styled.div`
  background-color: rgb(246, 246, 246);
  padding: 3px;
  border-radius: 8px;
`;

const ImgArea = styled.div`
  margin: 0 auto;
  text-align: center;

  img {
    width: 500px;
  }
`;

const SubText = styled.p`
  font-weight: bold;
  font-size: 13px;
  color: rgba(0, 0, 0, 0.5);
`;

const TopText = styled.h2`
  line-height: 12px;
  font-weight: 800;

  &:nth-of-type(1) {
    margin-top: 50px;
  }
`;
