import Flex from "../shared/Flex";
import Button from "../shared/Button";
import Spacing from "../shared/Spacing";
import TextField from "../shared/TextField";
import styled from "@emotion/styled";
import validator from "validator";
import CreatableSelect from "react-select/creatable";
import { DAYS, MONTH, YEARS } from "../../constants/birth";
import { useCallback, useEffect, useMemo, useState } from "react";
import { css } from "@emotion/react";
import { useAlertContext } from "../../contexts/AlertContextProvider";
import { toast } from "react-toastify";
import { checkUserEmail } from "../../api/userApi";

// 회원가입 폼
function Form({ onSubmit }) {
  const { open } = useAlertContext();

  const [formValues, setFormValues] = useState({
    password: "",
    rePassword: "",
    username: "",
    email: "",
    phoneNumber: "",
  });

  const [year, setYear] = useState(undefined);
  const [month, setMonth] = useState(undefined);
  const [day, setDay] = useState(undefined);
  const [gender, setGender] = useState(0);
  const [isCheckEmail, setIsCheckEmail] = useState(false);

  // 입력 되었는지 여부체크
  const [dirty, setDirty] = useState({});

  useEffect(() => {
    setFormValues((preValue) => ({
      ...preValue,
      year: year?.value || "",
      month: month?.value ? month.value.toString().padStart(2, "0") : "",
      day: day?.value ? day.value.toString().padStart(2, "0") : "",
      gender: gender === 0 ? "남" : "여",
    }));
  }, [year, month, day, gender]);

  // 입력값 저장
  const handleFormValues = useCallback((e) => {
    setFormValues((prevFormValues) => ({
      ...prevFormValues,
      [e.target.name]: e.target.value,
    }));
  }, []);

  const handleBlur = useCallback((e) => {
    setDirty((prevDirty) => ({
      ...prevDirty,
      [e.target.name]: "true",
    }));
  }, []);

  const errors = useMemo(() => validate(formValues, isCheckEmail), [formValues, isCheckEmail]);
  const isValidate = Object.keys(errors).length === 0;

  const confirmRegister = () => {
    open({
      title: "회원가입",
      description: "회원가입 하시겠습니까?",
      isCancel: true,
      onButtonClick: () => onSubmit(formValues),
    });
  };

  const handleCheckEmail = async () => {
    try {
      const res = await checkUserEmail(formValues.email);
      if (res.isDuplicated) {
        toast.error(`${res.email} 사용불가!`);
      } else {
        toast.success(`${res.email} 사용가능!`);
        setIsCheckEmail(true);
      }
    } catch (err) {
      console.log(err);
      toast.error(err.message);
    }
  };

  const selectStyle = {
    container: (containerStyles) => ({
      ...containerStyles,
      width: "100%",
      fontSize: "13px",
      borderRadius: 0,
    }),
    control: (controlStyles) => ({
      ...controlStyles,
      borderRadius: 0,
      border: "1px solid #eee",
    }),
    menu: (controlStyles) => ({
      ...controlStyles,
      borderRadius: 0,
    }),
  };
  return (
    <FormWrapper>
      <Flex direction="column">
        <Spacing size={10} />
        <Flex width="100%" align="flex-end">
          <TextField
            label="이메일"
            name="email"
            width="100%"
            placeholder="abc@email.com"
            value={formValues.email}
            onChange={handleFormValues}
            hasError={Boolean(dirty.email) && Boolean(errors.email)}
            helpMessage={Boolean(dirty.email) ? errors.email : ""}
            onBlur={handleBlur}
          />
          <Spacing size={10} direction="width" />
          <Button color={isCheckEmail ? "grey" : "success"} width="150px" height="35px" onClick={handleCheckEmail}>
            {isCheckEmail ? "중복확인 완료" : "중복확인"}
          </Button>
        </Flex>

        <Spacing size={10} />
        <TextField
          label="패스워드"
          name="password"
          type="password"
          value={formValues.password}
          onChange={handleFormValues}
          hasError={Boolean(dirty.password) && Boolean(errors.password)}
          helpMessage={Boolean(dirty.password) ? errors.password : ""}
          onBlur={handleBlur}
        />
        <Spacing size={10} />
        <TextField
          label="패스워드 재확인"
          name="rePassword"
          type="password"
          value={formValues.rePassword}
          onChange={handleFormValues}
          hasError={Boolean(dirty.rePassword) && Boolean(errors.rePassword)}
          helpMessage={Boolean(dirty.rePassword) ? errors.rePassword : ""}
          onBlur={handleBlur}
        />
        <Spacing size={10} />
        <TextField
          label="이름"
          name="username"
          placeholder="김OO"
          value={formValues.username}
          onChange={handleFormValues}
          hasError={Boolean(dirty.username) && Boolean(errors.username)}
          helpMessage={Boolean(dirty.username) ? errors.username : ""}
          onBlur={handleBlur}
        />
        <Spacing size={10} />

        <TextField
          label="휴대폰 번호"
          name="phoneNumber"
          type="number"
          placeholder="숫자만 입력해주세요"
          value={formValues.phoneNumber}
          onChange={handleFormValues}
          hasError={Boolean(dirty.phoneNumber) && Boolean(errors.phoneNumber)}
          helpMessage={Boolean(dirty.phoneNumber) ? errors.phoneNumber : ""}
          onBlur={handleBlur}
        />
        <Spacing size={10} />

        <ValueRow>생년월일</ValueRow>
        <Flex>
          <CreatableSelect
            placeholder="Year"
            onChange={(newValue) => setYear(newValue)}
            options={YEARS}
            value={year}
            styles={selectStyle}
          />
          <Spacing size={10} direction="horizontal" />
          <CreatableSelect
            placeholder="Month"
            onChange={(newValue) => setMonth(newValue)}
            options={MONTH}
            value={month}
            styles={selectStyle}
          />
          <Spacing size={10} direction="horizontal" />
          <CreatableSelect
            placeholder="Day"
            onChange={(newValue) => setDay(newValue)}
            options={DAYS}
            value={day}
            styles={selectStyle}
          />
        </Flex>

        <Spacing size={10} />
        <ValueRow>성별</ValueRow>
        <Flex>
          <Button color={gender === 0 ? "primary" : "grey"} css={btnGender} onClick={() => setGender(0)}>
            남
          </Button>
          <Spacing size={10} direction="horizontal" />
          <Button color={gender === 1 ? "pink" : "grey"} css={btnGender} onClick={() => setGender(1)}>
            여
          </Button>
        </Flex>

        <Spacing size={50} />
        <Flex justify="center">
          <Button
            size="medium"
            color="black"
            full
            disabled={isValidate === false}
            onClick={() => {
              confirmRegister();
            }}
          >
            회원가입 하기
          </Button>
        </Flex>
      </Flex>
    </FormWrapper>
  );
}

// 유효성 체크하기
function validate(formValues, isCheckEmail) {
  let errors = {};

  if (validator.isEmail(formValues.email) === false) {
    errors.email = "이메일 형식을 확인해주세요";
  }
  if (validator.isEmail(formValues.email) === true) {
    if (isCheckEmail === false) {
      errors.email = "중복확인을 해주세요";
    }
  }

  if (formValues.password.length < 8) {
    errors.password = "비밀번호를 8글자 이상 입력해주세요";
  }

  if (formValues.rePassword.length < 8) {
    errors.rePassword = "비밀번호를 8글자 이상 입력해주세요";
  } else if (validator.equals(formValues.rePassword, formValues.password) === false) {
    errors.rePassword = "비밀번호를 확인해주세요";
  }

  if (formValues.username.length < 2) {
    errors.username = "이름은 2글자 이상 입력해주세요";
  }
  if (validator.isMobilePhone(formValues.phoneNumber) === false) {
    errors.phoneNumber = "핸드폰 번호를 확인해 주세요";
  }

  if (formValues.year === undefined) {
    errors.date = "생년월일(년도)을 입력해주세요";
  }
  if (formValues.month === undefined) {
    errors.date = "생년월일(달)을 확인해주세요";
  }
  if (formValues.day === undefined) {
    errors.date = "생년월일(일)을 확인해주세요";
  }
  return errors;
}

const btnGender = css`
  height: 40px;
  width: 100%;
`;

const ValueRow = styled.div`
  display: flex;
  font-size: 13px;
  color: #000;
  margin-top: 5px;
  margin-bottom: 10px;
`;
const FormWrapper = styled.div`
  width: 100%;
`;

export default Form;
