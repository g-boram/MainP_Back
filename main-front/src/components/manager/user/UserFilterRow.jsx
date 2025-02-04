import styled from "@emotion/styled";
import Spacing from "../../shared/Spacing";
import Flex from "../../shared/Flex";
import { useState } from "react";
import { IoMdSearch } from "react-icons/io";
import { colorPalette } from "../../../styles/colorPalette";
import { getUserSearch } from "../../../api/userApi";

export default function UserFilterRow({ setIsLoading, setUserData }) {
  const [filters, setFilters] = useState({
    username: "",
    email: "",
    phoneNumber: "",
    gender: "",
    address: "",
  });

  const handleReset = () => {
    setFilters({
      username: "",
      email: "",
      phoneNumber: "",
      gender: "",
      address: "",
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  const handleSearch = async () => {
    setIsLoading(true);
    const queryParams = {
      username: filters.username || undefined,
      email: filters.email || undefined,
      phoneNumber: filters.phoneNumber || undefined,
      gender: filters.gender || undefined,
      address: filters.address || undefined,
    };

    try {
      const response = await getUserSearch(queryParams);
      setUserData(response.data);
    } catch (error) {
      console.error("Failed to fetch cars", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <UserFilterWrapper>
      <FilterRow>
        <FilterBox>
          <Box />
          <Label>회원 이름</Label>
          <input name="username" placeholder="name" value={filters.username} onChange={handleChange} />
        </FilterBox>
        <FilterBox>
          <Box />
          <Label>이메일</Label>
          <input name="email" placeholder="Email" value={filters.email} onChange={handleChange} />
        </FilterBox>
        <FilterBox>
          <Box />
          <Label>핸드폰번호</Label>
          <input
            name="phoneNumber"
            placeholder="- 제거 하고 입력"
            value={filters.phoneNumber}
            onChange={handleChange}
          />
        </FilterBox>
        <FilterBox>
          <Box />
          <Label>성별</Label>
          <input name="gender" placeholder="남 / 여" value={filters.gender} onChange={handleChange} />
        </FilterBox>
        <FilterBox>
          <Box />
          <Label>주소</Label>
          <input name="address" placeholder="Address" value={filters.address} onChange={handleChange} />
        </FilterBox>
      </FilterRow>
      <Flex width="100%" height="80px" justify="flex-end" align="center">
        <SearchBtn onClick={handleSearch}>
          <IoMdSearch size={15} />
          <div>Search</div>
        </SearchBtn>
        <Spacing size={5} direction="width" />
        <SearchBtn onClick={handleReset}>
          <div>초기화</div>
        </SearchBtn>
      </Flex>
    </UserFilterWrapper>
  );
}

const UserFilterWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-direction: column;
`;

const FilterRow = styled.div`
  min-height: 50px;
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const Box = styled.div`
  height: 10px;
  width: 5px;
  background-color: #000;
`;
const Label = styled.div`
  width: 80px;
  text-align: start;
  font-size: 12px;
  color: #000;
  padding-left: 10px;
`;

const FilterBox = styled.div`
  min-height: 50px;
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;

  > input {
    height: 30px;
    width: 100px;
    text-align: end;
    padding: 0 10px;
    font-size: 12px;
    border: 1px solid #eee;
  }
`;

const SearchBtn = styled.button`
  height: 35px;
  min-width: 100px;
  padding: 2px 15px;
  gap: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  background-color: ${colorPalette.btnBlack};
  border: none;
  cursor: pointer;
  color: #fff;
  font-weight: bold;

  :hover {
    font-weight: bold;
    background-color: ${colorPalette.hoverBlack};
  }
`;
