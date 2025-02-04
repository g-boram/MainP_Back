import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { ClipLoader } from "react-spinners";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, resetLoginState } from "../../reduxSlice/authSlice";
import { toast } from "react-toastify";
import { ClearLoadingOverlay } from "../../styles/managerLayoutStyles";

import styled from "@emotion/styled";
import Form from "../../components/signin/Form";
import SignInImg from "../../assert/signinCar.png";
import Text from "../../components/shared/Text";

// ****************************** //
// 로그인 페이지
// ****************************** //
export default function SigninPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, isLoading, error } = useSelector((state) => state.auth);

  useEffect(() => {
    if (user) {
      localStorage.setItem("userId", user.id);
      toast.success(`🎉 ${user.username} 님, 환영합니다!`);
      dispatch(resetLoginState());
      navigate("/");
    }

    if (error) {
      toast.error("로그인 실패! 다시 확인바랍니다.");
      dispatch(resetLoginState());
    }
  }, [user, error, navigate, dispatch]);

  const handleSubmit = (formValues) => {
    const { email, password } = formValues;
    dispatch(loginUser({ email, password }));
  };

  return (
    <SigninContainer>
      <FormWrapper>
        {isLoading ? (
          <ImgBox>
            <ClearLoadingOverlay>
              <ClipLoader color="#000" z-index={11} />
            </ClearLoadingOverlay>
          </ImgBox>
        ) : (
          <ImgBox>
            <img src={SignInImg} alt="signin" />
          </ImgBox>
        )}
        <Form onSubmit={handleSubmit} />
      </FormWrapper>
    </SigninContainer>
  );
}

// 스타일 컴포넌트
const SigninContainer = styled.div`
  display: flex;
  width: 100%;
  min-height: 100vh;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
`;

const FormWrapper = styled.div`
  @media (min-width: 600px) {
    display: flex;
    flex-direction: column;
    width: 50%;
  }
  @media (max-width: 600px) {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 90%;
  }
`;

const ImgBox = styled.div`
  height: 300px;
  width: 100%;
  margin: 0 auto;

  & > img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;
