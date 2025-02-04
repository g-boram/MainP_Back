import styled from "@emotion/styled";
import Flex from "../shared/Flex";
import { CAR_UF_YEARS } from "../../constants/carOption";
import { useState } from "react";
import { RiResetRightLine } from "react-icons/ri";

const CarFilterYears = ({ setYear }) => {
  const [selectedYear, setSelectedYear] = useState(null);

  const handleSelected = (e) => {
    setYear(e.target.value);
    setSelectedYear(e.target.textContent);
  };

  // 초기화
  const handleReset = () => {
    setYear("");
    setSelectedYear("");
  };
  return (
    <RowWrapper>
      <Flex justify="flex-end" height="40px">
        <RiResetRightLine style={{ cursor: "pointer" }} onClick={handleReset} />
      </Flex>
      <FlexRow>
        {CAR_UF_YEARS.map((year, index) => (
          <YearBadge
            key={index}
            style={{
              backgroundColor: selectedYear === String(year) ? "#000" : "#fff",
              color: selectedYear === String(year) ? "#fff" : "#000",
              border: selectedYear === String(year) ? "1px solid #000" : "1px solid #ccc",
            }}
            onClick={handleSelected}
          >
            {year}
          </YearBadge>
        ))}
      </FlexRow>
    </RowWrapper>
  );
};

const RowWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 10px 0;
`;

const FlexRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  width: 100%;
`;

const YearBadge = styled.div`
  height: 24px;
  width: 45px;
  border-radius: 15px;
  padding: 2px 10px;
  margin-right: 5px;
  font-size: 11px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

export default CarFilterYears;
