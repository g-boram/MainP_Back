import { useAlertContext } from "../../contexts/AlertContextProvider";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ClipLoader } from "react-spinners";
import { registerUser, resetRegisterState } from "../../reduxSlice/registerSlice";
import { toast } from "react-toastify";
import { ClearLoadingOverlay } from "../../styles/managerLayoutStyles";

import SignUpImg from "../../assert/signupCar.png";
import Text from "../../components/shared/Text";
import Form from "../../components/signup/Form";
import styled from "@emotion/styled";
import Spacing from "../../components/shared/Spacing";

// 회원가입 페이지
export default function SignupPage() {
  const { open } = useAlertContext();
  const { message, isLoading, error } = useSelector((state) => state.register);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (message) {
      toast.success("🎉 회원가입 성공! 감사합니다!");
      dispatch(resetRegisterState());
      navigate("/signin");
    }

    if (error) {
      toast.error("가입 실패! 관리자 문의 바랍니다.");
      dispatch(resetRegisterState());
    }
  }, [message, error, open, navigate, dispatch]);

  const handleSubmit = (formValues) => {
    const { email, password, username, phoneNumber, year, month, day, gender } = formValues;

    const newUser = {
      email: email,
      password: password,
      username: username,
      phoneNumber: phoneNumber,
      gender: gender,
      imageUrl: "user",
      birth: `${year}/${month}/${day}`,
    };
    dispatch(registerUser(newUser));
  };

  return (
    <SignupContainer>
      {isLoading ? (
        <ImgBox>
          <TitleBox>
            <ClearLoadingOverlay>
              <ClipLoader color="#000" z-index={11} />
            </ClearLoadingOverlay>
          </TitleBox>
        </ImgBox>
      ) : (
        <ImgBox>
          <TitleBox>
            <Text typography="t30">Register</Text>
            <Spacing size={10} />
            <Text typography="t13" color="grey">
              하이미디어만의 특별함을 경험해보세요
            </Text>
          </TitleBox>
          <img src={SignUpImg} alt="signup" />
        </ImgBox>
      )}
      <FormWrapper>
        <Form onSubmit={handleSubmit} />
      </FormWrapper>
    </SignupContainer>
  );
}

// 넓은 화면: min
// 모바일 화면: max
const SignupContainer = styled.div`
  display: flex;
  width: 100%;
  min-height: 100vh;
  justify-content: center;
  align-items: center;
  margin: 0 auto;

  @media (max-width: 600px) {
    height: auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
`;

const ImgBox = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-end;

  & > img {
    width: 400px;
    height: 400px;
    object-fit: contain;
  }
`;

const TitleBox = styled.div`
  width: 100%;
  padding-right: 60px;
  display: flex;
  flex-direction: column;
  align-items: flex-end;

  @media (max-width: 600px) {
    margin-top: 100px;
    padding-right: 20px;
  }
`;

const FormWrapper = styled.div`
  min-width: 400px;
  @media (max-width: 600px) {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 90%;
    margin-bottom: 50px;
  }
`;
