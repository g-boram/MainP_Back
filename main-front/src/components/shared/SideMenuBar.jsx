import React, { useState } from "react";
import styled from "@emotion/styled";
import Spacing from "../shared/Spacing";
import CreatableSelect from "react-select/creatable";
import { IoMdSearch } from "react-icons/io";
import { colorPalette } from "../../styles/colorPalette";
import { getFilterCarList } from "../../api/carApi";
import CarFilterCountry from "../car/CarFilterCountry";
import CarFilterYears from "../car/CarFilterYears";
import { CAR_F_FUELTYPE, CAR_F_MILEAGE, CAR_F_TRANSMISSION } from "../../constants/carOption";
import CarFilterColor from "../car/CarFilterColor";

export default function SideMenuBar({ setIsLoading, setCarData }) {
  // 여러 개의 활성화된 항목을 저장
  const [activeIndices, setActiveIndices] = useState([]);

  const [country, setCountry] = useState("");
  const [manufacturer, setManufacturer] = useState("");
  const [model, setModel] = useState("");
  const [year, setYear] = useState("");
  const [color, setColor] = useState("");
  const [fuelType, setFuelType] = useState("");
  const [price, setPrice] = useState("");
  const [mileage, setMileage] = useState("");
  const [transmission, setTransmission] = useState("");

  const handleSearch = async () => {
    const [minPrice, maxPrice] = price ? price.value.split("-") : [null, null];
    const [minMileage, maxMileage] = mileage ? mileage.value.split("-") : [null, null];
    const data = {
      make: manufacturer,
      model: model,
      color,
      minPrice,
      maxPrice,
      minMileage,
      maxMileage,
      year: year,
      fuelType: fuelType.value,
      transmission: transmission.value,
    };

    setIsLoading(true);
    try {
      const response = await getFilterCarList(data);
      setCarData(response.data);
    } catch (error) {
      console.error("Failed to fetch cars", error);
    } finally {
      setIsLoading(false);
    }
  };
  const selectStyle = {
    container: (containerStyles) => ({
      ...containerStyles,
      width: "100%",
      fontSize: "12px",
      borderRadius: 0,
      border: "none",
    }),
    control: (controlStyles) => ({
      ...controlStyles,
      borderRadius: 0,
      border: "none",
    }),
    menu: (controlStyles) => ({
      ...controlStyles,
      borderRadius: 0,
    }),
  };
  const filterTitle = [
    {
      title: "제조사",
      content: (
        <CarFilterCountry
          country={country}
          manufacturer={manufacturer}
          model={model}
          setCountry={setCountry}
          setManufacturer={setManufacturer}
          setModel={setModel}
        />
      ),
    },
    {
      title: "차량 제조 연도",
      content: <CarFilterYears setYear={setYear} />,
    },
    {
      title: "주행거리",
      content: (
        <CreatableSelect
          placeholder="단위: km"
          name="mileage"
          onChange={(newValue) => setMileage(newValue)}
          options={CAR_F_MILEAGE}
          value={mileage}
          styles={selectStyle}
        />
      ),
    },
    {
      title: "연료타입",
      content: (
        <CreatableSelect
          placeholder="전체"
          name="fuelType"
          id="fuelType"
          onChange={(newValue) => setFuelType(newValue)}
          options={CAR_F_FUELTYPE}
          value={fuelType}
          styles={selectStyle}
        />
      ),
    },
    {
      title: "변속기",
      content: (
        <CreatableSelect
          placeholder="전체"
          name="transmission"
          onChange={(newValue) => setTransmission(newValue)}
          options={CAR_F_TRANSMISSION}
          value={transmission}
          styles={selectStyle}
        />
      ),
    },
    {
      title: "색상",
      content: <CarFilterColor color={color} setColor={setColor} />,
    },
  ];

  // 아코디언 항목의 열림/닫힘을 토글
  const toggleAccordion = (index) => {
    setActiveIndices((prevIndices) => {
      if (prevIndices.includes(index)) {
        return prevIndices.filter((i) => i !== index);
      } else {
        return [...prevIndices, index];
      }
    });
  };

  return (
    <Container>
      <Accordion>
        {filterTitle.map((item, index) => {
          const isActive = activeIndices.includes(index);
          return (
            <AccordionItem key={index}>
              <AccordionTitle
                onClick={() => toggleAccordion(index)}
                role="button"
                aria-expanded={isActive}
                aria-controls={`accordion-content-${index}`}
              >
                {item.title}
                <AccIcon>{isActive ? "-" : "+"}</AccIcon>
              </AccordionTitle>
              {isActive && <AccordionContent id={`accordion-content-${index}`}>{item.content}</AccordionContent>}
            </AccordionItem>
          );
        })}
      </Accordion>
      <BottomBtnRow>
        <SearchBtn onClick={handleSearch}>
          <IoMdSearch size={15} />
          <div>Search</div>
        </SearchBtn>
      </BottomBtnRow>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
  width: 100%;
`;

const BottomBtnRow = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin-top: 100px;
`;

const Accordion = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  background-color: white;
  width: 280px;
`;

const AccordionItem = styled.li`
  border-bottom: 1px solid #eee;
  &:last-of-type {
    border-bottom: none;
  }
`;

const AccordionTitle = styled.div`
  padding: 15px 20px;
  margin: 0;
  max-width: 280px;
  font-size: 14px;
  color: #000;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
`;

const AccIcon = styled.span`
  font-size: 14px;
`;

const AccordionContent = styled.div`
  padding: 0px 20px 20px 20px;
  font-size: 14px;
  min-height: 80px;
  color: #6c757d;
  line-height: 1.5;
`;

const SearchBtn = styled.button`
  height: 40px;
  min-width: 150px;
  padding: 2px 15px;
  gap: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  background-color: ${colorPalette.btnBlack};
  border: none;
  cursor: pointer;
  color: #fff;

  :hover {
    font-weight: bold;
    background-color: ${colorPalette.hoverBlack};
  }
`;
