import styled from "@emotion/styled/macro";
import axios from "axios";
import { useEffect, useState } from "react";
import { HEIGHT_LIST } from "../../../constants/height";
import { useNavigate } from "react-router-dom";
import { SERVER_URL } from "../../../constants/urlList";
import { toast } from "react-toastify";
import { useAlertContext } from "../../../contexts/AlertContextProvider";
import { useSelector } from "react-redux";
import { ClearLoadingOverlay } from "../../../styles/managerLayoutStyles";
import { ClipLoader } from "react-spinners";

export default function CarSellPage() {
  const { open } = useAlertContext();
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [selectedColor, setSelectedColor] = useState(""); // 차량 색상 상태
  const [specialNotes, setSpecialNotes] = useState(""); // 차량 특이사항 상태
  const [formData, setFormData] = useState({
    username: user?.username,
    orderUserId: user?.id,
    email: user?.email,
    region: "",
    phone: "",
    time: "",
    mileage: "",
    price: "",
  });

  useEffect(() => {
    setIsLoading(true);
    if (user === null) {
      alert("로그인 후 이용 가능합니다.");
      navigate("/signin");
    }
    setIsLoading(false);
  }, [navigate, user]);

  // 색상 목록
  const colors = [
    { name: "검정색", value: "#000000" },
    { name: "흰색", value: "#FFFFFF" },
    { name: "쥐색", value: "#7D7D7D" },
    { name: "청색", value: "#0000FF" },
    { name: "은회색", value: "#C0C0C0" },
    { name: "진주색", value: "#FDEBD0" },
    { name: "흰색투톤", value: "#F5F5F5" },
    { name: "검정투톤", value: "#2C2C2C" },
    { name: "빨간색", value: "#fa3f3f" },
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const confirmCreate = (e) => {
    e.preventDefault();
    open({
      title: "신청서 제출",
      description: "신청서를 제출 하시겠습니까?",
      isCancel: true,
      onButtonClick: () => submitForm(),
    });
  };

  const submitForm = async () => {
    const payload = {
      ...formData,
      color: selectedColor,
      notes: specialNotes,
    };

    try {
      const response = await axios.post(`${SERVER_URL.LOCAL}/api/carsell`, payload);
      if (response.status === 200) {
        toast.success("신청서가 성공적으로 제출되었습니다!");
        navigate("/");
      } else {
        toast.error("제출에 실패했습니다. 다시 시도해주세요.");
      }
    } catch (error) {
      console.error("Error submitting form", error);
      toast.error("서버와 통신 중 오류가 발생했습니다.");
    }
  };

  return (
    <CarListContainer>
      {isLoading && (
        <ClearLoadingOverlay>
          <ClipLoader color="#000" z-index={11} />
        </ClearLoadingOverlay>
      )}
      <CarListWrapper>
        <TopTittle>방문 차량 판매신청</TopTittle>

        {/* 지역 입력 */}
        <TextArea>
          <Text>원하시는 지역을 입력해주세요</Text>
          <InputBox name="region" placeholder="ex)서울 특별시 구로구 OO길 OO" onChange={handleInputChange} />
        </TextArea>
        <TextArea>
          <Text>휴대폰 번호를 입력해 주세요.</Text>
          <InputBox name="phone" placeholder="ex) 010-0000-0000" onChange={handleInputChange} />
        </TextArea>
        <TextArea>
          <Text>원하는 시간대를 입력해주세요</Text>
          <InputBox name="time" placeholder="ex)14시20분" onChange={handleInputChange} />
        </TextArea>
        <TextArea>
          <Text>차량 주행거리를 입력해주세요 (km)</Text>
          <InputBox name="mileage" placeholder="ex) 120,000" onChange={handleInputChange} />
        </TextArea>
        <TextArea>
          <Text>판매 희망 금액을 입력해주세요 (만원)</Text>
          <InputBox name="price" placeholder="ex) 500" onChange={handleInputChange} />
        </TextArea>
        <TextArea>
          <Text>차량 색상을 선택해주세요</Text>
          <ColorGrid>
            {colors.map((color) => (
              <ColorOption key={color.name}>
                <ColorBox style={{ backgroundColor: color.value }} />
                <ColorName>{color.name}</ColorName>
                <RadioLabel>
                  <RadioInput
                    type="radio"
                    name="carColor"
                    value={color.name}
                    checked={selectedColor === color.name}
                    onChange={(e) => setSelectedColor(e.target.value)}
                  />
                </RadioLabel>
              </ColorOption>
            ))}
          </ColorGrid>
        </TextArea>
        <TextArea>
          <Text>차량 특이사항</Text>
          <TextAreaInput
            value={specialNotes}
            onChange={(e) => setSpecialNotes(e.target.value)}
            placeholder="특이사항을 입력해주세요."
          />
        </TextArea>
        {/* 제출 버튼 */}
        <FormBtn onClick={confirmCreate}>신청서 제출하기</FormBtn>
      </CarListWrapper>
    </CarListContainer>
  );
}

const CarListContainer = styled.div`
  user-select: none;
  min-height: 100%;
  width: 100%;
  margin-bottom: 100px;
  display: flex;
  justify-content: center;
  padding-top: ${HEIGHT_LIST.HEADER + HEIGHT_LIST.NAVBAR}px;

  @media (max-width: 600px) {
    flex-direction: column;
  }
`;

const CarListWrapper = styled.div`
  width: 600px;
  min-height: 100%;
  padding: 20px;
  border: 2px solid #eee;
  box-shadow: 0px 0px 10px 5px #eee;
  border-radius: 20px;
  margin-top: 50px;
`;

const FormBtn = styled.div`
  border-radius: 8px;
  font-size: 15px;
  font-weight: 600;
  height: 50px;
  line-height: 50px;
  width: 80%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 30px auto;
  color: #fff;
  background-color: #d72e36;
  cursor: pointer;
`;

const TextAreaInput = styled.textarea`
  width: 100%;
  height: 150px;
  resize: vertical;
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 10px;
  font-size: 16px;
  font-weight: bold;
  line-height: 1.5;
  margin-top: 10px;

  ::placeholder {
    color: #c4c4c4;
  }
`;

const TopTittle = styled.h1`
  text-align: center;
  font-size: 22px;
  font-weight: bold;
  height: 50px;
`;

const ColorGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  gap: 20px;
  margin-top: 15px;
`;

const ColorOption = styled.div`
  text-align: center;
`;

const ColorBox = styled.div`
  width: 80px;
  height: 80px;
  margin: 0 auto;
  margin-top: 10px;
  border: 1px solid #ccc;
  border-radius: 8px;
`;

const ColorName = styled.div`
  margin-top: 10px;
  font-size: 16px;
  font-weight: 600;
`;

const RadioLabel = styled.label`
  display: flex;
  justify-content: center;
  margin-top: 5px;
`;

const RadioInput = styled.input`
  cursor: pointer;
`;

const TextArea = styled.div`
  margin-top: 20px;
`;

const Text = styled.span`
  color: #333;
  display: block;
  font-size: 14px;
  font-weight: 700;
  letter-spacing: -0.44px;
  line-height: 30px;
`;

const InputBox = styled.input`
  margin-top: 5px;
  background: none;
  border: 1px solid #eee;
  border-radius: 5px;
  box-sizing: border-box;
  color: rgb(51, 51, 51);
  font-size: 18px;
  font-weight: 600;
  height: 100%;
  letter-spacing: 0.5px;
  line-height: 36px;
  outline: none;
  padding: 7px 20px;
  width: 100%;
  margin-bottom: 10px;

  ::placeholder {
    color: #c4c4c4;
  }

  &:disabled {
    background-color: rgba(0, 0, 0, 0.1);
    color: #a0a0a0;
    cursor: not-allowed;
    border: 1px solid rgba(0, 0, 0, 0.2);
    box-shadow: none;
  }
`;
