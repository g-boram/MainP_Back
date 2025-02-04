import React, { useCallback, useEffect, useMemo, useState } from "react";
import styled from "@emotion/styled";
import Spacing from "../../shared/Spacing";
import Flex from "../../shared/Flex";
import BaseButton from "../../shared/Button";
import validator from "validator";
import CreatableSelect from "react-select/creatable";
import TextField from "../../shared/TextField";
import Button from "../../shared/Button";
import UserIconBox from "./UserIconBox";
import { useDispatch, useSelector } from "react-redux";
import { useAlertContext } from "../../../contexts/AlertContextProvider";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { YEARS } from "../../../constants/carOption";
import { DAYS, MONTH } from "../../../constants/birth";
import { css } from "@emotion/react";
import { registerUser, resetRegisterState } from "../../../reduxSlice/registerSlice";

export default function CreateUserForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { open } = useAlertContext();
  const { message, error } = useSelector((state) => state.register);
  const [formValues, setFormValues] = useState({
    password: "",
    rePassword: "",
    username: "",
    email: "",
    phoneNumber: "",
    address: "",
  });

  const [year, setYear] = useState(undefined);
  const [month, setMonth] = useState(undefined);
  const [day, setDay] = useState(undefined);
  const [gender, setGender] = useState(0);
  const [role, setRole] = useState("USER");
  const [icon, setIcon] = useState("");

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

  const confirmCreateUser = () => {
    open({
      title: "회원등록",
      description: "신규 회원을 등록 하시겠습니까?",
      isCancel: true,
      onButtonClick: () => handleSubmit(),
    });
  };

  useEffect(() => {
    if (message) {
      toast.success("🎉 회원가입 성공!");
      dispatch(resetRegisterState());
      navigate("/manager/users");
    }

    if (error) {
      toast.error("가입 실패! 관리자 문의 바랍니다.");
      dispatch(resetRegisterState());
    }
  }, [message, error, navigate, dispatch]);
  const handleSubmit = () => {
    const { email, password, username, phoneNumber, year, month, day, gender, address } = formValues;

    const newUser = {
      email: email,
      password: password,
      username: username,
      phoneNumber: phoneNumber,
      gender: gender,
      role: role,
      address: address,
      imageUrl: icon === "" ? "user" : icon,
      birth: `${year}/${month}/${day}`,
    };
    dispatch(registerUser(newUser));
  };

  // error값을 가지고있음
  const errors = useMemo(() => validate(formValues), [formValues]);

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

  const openAddressSearch = () => {
    // 카카오 주소 API 열기
    new window.daum.Postcode({
      oncomplete: (data) => {
        setFormValues((prev) => ({ ...prev, address: data.address })); // 선택된 주소 설정
      },
    }).open();
  };

  return (
    <FormContainer>
      <Flex justify="space-between">
        <IconContainer>
          <UserIconBox imageUrl={""} setIcon={setIcon} />
        </IconContainer>
        <Flex direction="column" width="600px" justify="center">
          <Flex width="100%" align="center">
            <TextField
              label="이름"
              width="100%"
              name="username"
              placeholder="김OO"
              value={formValues.username}
              onChange={handleFormValues}
              hasError={Boolean(dirty.username) && Boolean(errors.username)}
              helpMessage={Boolean(dirty.username) ? errors.username : ""}
              onBlur={handleBlur}
            />
          </Flex>
          <Spacing size={10} />

          <Flex width="100%" align="center">
            <TextField
              label="휴대폰 번호"
              width="100%"
              name="phoneNumber"
              type="number"
              placeholder="- 제외 숫자만 입력해주세요"
              value={formValues.phoneNumber}
              onChange={handleFormValues}
              hasError={Boolean(dirty.phoneNumber) && Boolean(errors.phoneNumber)}
              helpMessage={Boolean(dirty.phoneNumber) ? errors.phoneNumber : ""}
              onBlur={handleBlur}
            />
          </Flex>
          <Spacing size={10} />

          <Flex width="100%" align="center">
            <TextField
              label="패스워드"
              width="100%"
              name="password"
              type="password"
              value={formValues.password}
              onChange={handleFormValues}
              hasError={Boolean(dirty.password) && Boolean(errors.password)}
              helpMessage={Boolean(dirty.password) ? errors.password : ""}
              onBlur={handleBlur}
            />
            <Spacing size={20} direction="width" />
            <TextField
              label="패스워드 재확인"
              width="100%"
              name="rePassword"
              type="password"
              value={formValues.rePassword}
              onChange={handleFormValues}
              hasError={Boolean(dirty.rePassword) && Boolean(errors.rePassword)}
              helpMessage={Boolean(dirty.rePassword) ? errors.rePassword : ""}
              onBlur={handleBlur}
            />
          </Flex>
          <Spacing size={10} />

          <Flex width="100%" align="center">
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
          </Flex>
          <Spacing size={10} />

          <Flex direction="column" width="100%">
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
          </Flex>
          <Spacing size={10} />

          <Flex direction="column" width="100%">
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
          </Flex>
          <Spacing size={10} />

          <Flex direction="column" width="100%">
            <ValueRow>권한 (기본 USER)</ValueRow>
            <Flex>
              <Button color={role === "USER" ? "primary" : "grey"} css={btnGender} onClick={() => setRole("USER")}>
                USER
              </Button>
              <Spacing size={10} direction="horizontal" />
              <Button color={role === "ADMIN" ? "error" : "grey"} css={btnGender} onClick={() => setRole("ADMIN")}>
                ADMIN
              </Button>
              <Spacing size={10} direction="horizontal" />
              <Button color={role === "SELLER" ? "yellow" : "grey"} css={btnGender} onClick={() => setRole("SELLER")}>
                SELLER
              </Button>
              <Spacing size={10} direction="horizontal" />
              <Button color={role === "REPAIR" ? "success" : "grey"} css={btnGender} onClick={() => setRole("REPAIR")}>
                REPAIR
              </Button>
            </Flex>
          </Flex>
          <Spacing size={10} />
          <Flex align="flex-end">
            <TextField
              label="주소"
              width="100%"
              name="address"
              type="address"
              value={formValues.address}
              onChange={handleFormValues}
              readOnly
            />
            <Spacing size={10} direction="width" />
            <BaseButton size="small" color="black" height={"35px"} width={"150px"} onClick={openAddressSearch}>
              주소 검색
            </BaseButton>
          </Flex>
        </Flex>
      </Flex>
      <Spacing size={50} />
      <Flex justify={"center"}>
        <BaseButton size="medium" color="black" height={"40px"} full onClick={confirmCreateUser}>
          신규회원 등록
        </BaseButton>
      </Flex>
    </FormContainer>
  );
}

// 유효성 체크하기
function validate(formValues) {
  let errors = {};

  if (validator.isEmail(formValues.email) === false) {
    errors.email = "이메일 형식을 확인해주세요";
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

const FormContainer = styled.div`
  height: auto;
  width: 100%;
  position: relative;
  z-index: 1;
`;

const IconContainer = styled.div`
  height: 600px;
  width: 600px;
  display: flex;
  flex-direction: column;
  margin-right: 10px;
`;

const ValueRow = styled.div`
  display: flex;
  font-size: 13px;
  color: #000;
  margin-top: 5px;
  margin-bottom: 5px;
`;

const btnGender = css`
  height: 40px;
  width: 100%;
`;
