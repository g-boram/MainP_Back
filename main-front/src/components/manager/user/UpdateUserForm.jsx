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
import { useSelector } from "react-redux";
import { useAlertContext } from "../../../contexts/AlertContextProvider";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { YEARS } from "../../../constants/carOption";
import { DAYS, MONTH } from "../../../constants/birth";
import { css } from "@emotion/react";
import { checkUserEmail, updateUser } from "../../../api/userApi";
import { ClearLoadingOverlay } from "../../../styles/managerLayoutStyles";
import { ClipLoader } from "react-spinners";

export default function UpdateUserForm() {
  const navigate = useNavigate();
  const location = useLocation();

  const { open } = useAlertContext();
  const { user } = useSelector((state) => state.auth);

  const [isLoading, setIsLoading] = useState(false);
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
  const [isCheckEmail, setIsCheckEmail] = useState(false);
  const [dirty, setDirty] = useState({});

  useEffect(() => {
    setIsLoading(true);
    const [year, month, day] = location.state.birth?.split("/");

    if (location.state) {
      setFormValues({
        userId: location.state.userId,
        password: location.state.password,
        username: location.state.username,
        email: location.state.email,
        phoneNumber: location.state.phoneNumber,
        address: location.state.address,
        imageUrl: location.state.imageUrl,
      });
    }
    setYear({ label: `${year} 년`, value: year });
    setMonth({ label: `${month} 월`, value: month });
    setDay({ label: `${day} 일`, value: day });
    setGender(location.state.gender === "남" ? 0 : 1);
    setRole(location.state.role);
    setIcon(location.state.imageUrl);
    setIsLoading(false);
  }, [location.state]);

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
      title: "회원수정",
      description: "회원정보를 수정 하시겠습니까?",
      isCancel: true,
      onButtonClick: () => handleSubmit(),
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

  const handleSubmit = async () => {
    const { userId, email, password, username, phoneNumber, year, month, day, gender, address } = formValues;

    const newUser = {
      userId: userId,
      email: email,
      password: password,
      username: username,
      phoneNumber: phoneNumber,
      gender: gender,
      role: role,
      address: address,
      imageUrl: icon === "" ? "user" : icon,
      birth: `${year}/${month}/${day}`,
      updatedUserId: user.id,
      updatedUserName: user.username,
    };
    try {
      await updateUser(newUser);
      toast.success("🎉 회원정보 수정 성공!");
      navigate("/manager/users");
    } catch (err) {
      console.log(err);
      toast.error("수정 실패! 관리자 문의 바랍니다.");
    }
  };

  // error값을 가지고있음
  const errors = useMemo(() => validate(formValues, isCheckEmail), [formValues, isCheckEmail]);

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
    <>
      {isLoading ? (
        <ClearLoadingOverlay>
          <ClipLoader color="#000" z-index={11} />
        </ClearLoadingOverlay>
      ) : (
        <FormContainer>
          <Flex justify="space-between">
            <IconContainer>
              <UserIconBox imageUrl={formValues.imageUrl} setIcon={setIcon} />
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
                  label="패스워드 변경불가"
                  width="100%"
                  name="password"
                  type="password"
                  value={formValues.password}
                  readOnly
                  disabled
                />
              </Flex>
              <Spacing size={10} />

              <Flex width="100%" align="flex-end">
                <TextField
                  label="이메일 (중복확인 필수)"
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
                <Button
                  color={isCheckEmail ? "grey" : "success"}
                  width="150px"
                  height="35px"
                  onClick={handleCheckEmail}
                >
                  {isCheckEmail ? "중복확인 완료" : "중복확인"}
                </Button>
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
                  <Button
                    color={role === "SELLER" ? "yellow" : "grey"}
                    css={btnGender}
                    onClick={() => setRole("SELLER")}
                  >
                    SELLER
                  </Button>
                  <Spacing size={10} direction="horizontal" />
                  <Button
                    color={role === "REPAIR" ? "success" : "grey"}
                    css={btnGender}
                    onClick={() => setRole("REPAIR")}
                  >
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
              회원정보 수정
            </BaseButton>
          </Flex>
        </FormContainer>
      )}
    </>
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
