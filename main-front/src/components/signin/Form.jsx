import { colorPalette } from "../../styles/colorPalette";
import { css } from "@emotion/react";
import { useCallback, useMemo, useState } from "react";
import { Link } from "react-router-dom";
// import validator from "validator";
import Button from "../shared/Button";
import Flex from "../shared/Flex";
import Spacing from "../shared/Spacing";
import Text from "../shared/Text";
import TextField from "../shared/TextField";
import styled from "@emotion/styled";
import axios from "axios";

function Form({ onSubmit }) {
  const REST_API_KEY = process.env.REACT_APP_KAKAO_REST_API_KEY;
  const REDIRECT_URI = process.env.REACT_APP_KAKAO_REDIRECT_URL;
  const link = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;

  const loginHandler = () => {
    window.location.href = link;
  };

  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
  });

  // 입력 되었는지 여부체크
  const [dirty, setDirty] = useState({});

  const handleFormValues = useCallback((e) => {
    setFormValues((preFormValues) => ({
      ...preFormValues,
      [e.target.name]: e.target.value,
    }));
  }, []);

  // 입력 확인
  const handleBlur = useCallback((e) => {
    setDirty((prevDirty) => ({
      ...prevDirty,
      [e.target.name]: "true",
    }));
  }, []);

  // error 값
  const errors = useMemo(() => validate(formValues), [formValues]);
  // error값이 없는 제출가능한 상태인가
  const isValidate = Object.keys(errors).length === 0;

  return (
    <FormWrapper>
      <Flex direction="column">
        <Spacing size={10} />
        <TextField
          label="이메일"
          name="email"
          placeholder="abc@abc.com"
          onChange={handleFormValues}
          value={formValues.email}
          hasError={Boolean(dirty.email) && Boolean(errors.email)}
          helpMessage={Boolean(dirty.email) ? errors.email : ""}
          onBlur={handleBlur}
        />
        <TextField
          label="패스워드"
          name="password"
          type="password"
          onChange={handleFormValues}
          value={formValues.password}
          hasError={Boolean(dirty.password) && Boolean(errors.password)}
          helpMessage={Boolean(dirty.password) ? errors.password : ""}
          onBlur={handleBlur}
        />

        <Spacing size={50} />
        <Button
          size="medium"
          color="black"
          disabled={isValidate === false}
          onClick={() => {
            onSubmit(formValues);
          }}
        >
          로그인 하기
        </Button>

        <Spacing size={15} />
        <Link to="/signup" css={linkStyles}>
          <Text typography="t11" color="black">
            이메일 계정 만들러 가기
          </Text>
        </Link>
      </Flex>
    </FormWrapper>
  );
}

// 유효성 체크하기
function validate(formValues) {
  let errors = {};

  // if (validator.isEmail(formValues.email) === false) {
  //   errors.email = "이메일 형식을 확인해주세요";
  // }

  if (formValues.password.length < 8) {
    errors.password = "비밀번호를 8글자 이상 입력해주세요";
  }

  return errors;
}

// CSS
const linkStyles = css`
  text-align: center;
  & > span:hover {
    color: ${colorPalette.hoverPink};
  }
`;

export default Form;

const FormWrapper = styled.div`
  width: 100%;
`;
