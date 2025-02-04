import styled from "@emotion/styled";
import Spacing from "../shared/Spacing";
import Flex from "../shared/Flex";
import { colorPalette } from "../../styles/colorPalette";
import { CAR_COUNTRY, CAR_MANUFACTURERE } from "../../constants/carOption";
import { RiResetRightLine } from "react-icons/ri";
import { GoCheck } from "react-icons/go";
import { useState } from "react";

const CarFilterCountry = ({ country, manufacturer, model, setCountry, setManufacturer, setModel }) => {
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedManufacturer, setSelectedManufacturer] = useState("");
  const [selectedModel, setSelectedModel] = useState("");

  // 나라
  const handleCountryChange = (e) => {
    setCountry(e.target.value);
    setSelectedCountry(e.target.value);

    setManufacturer("");
    setSelectedManufacturer("");

    setModel("");
    setSelectedModel("");
  };

  // 제조사
  const handleManufacturerChange = (e) => {
    setManufacturer(e.target.value);
    setSelectedManufacturer(e.target.value);

    setModel("");
    setSelectedModel("");
  };

  // 모델 선택 핸들러
  const handleModelChange = (e) => {
    setModel(e.target.value);
    setSelectedModel(e.target.value);
  };

  // 초기화
  const handleReset = (e) => {
    setCountry("");
    setSelectedCountry("");

    setManufacturer("");
    setSelectedManufacturer("");

    setModel("");
    setSelectedModel("");
  };

  return (
    <RowWrapper>
      <Flex justify="flex-end">
        <RiResetRightLine style={{ cursor: "pointer" }} onClick={handleReset} />
      </Flex>
      <FlexRow>
        <Label>
          <Box />
          나라
        </Label>
        <OptionBox>
          {Object.keys(CAR_COUNTRY).map((country) => (
            <Flex
              justify="space-between"
              width="100%"
              height="25px"
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "5px 10px",
                borderRadius: "15px",
                backgroundColor: selectedCountry === country ? "#000" : "#fff",
                color: selectedCountry === country ? "#fff" : "#000",
                fontWeight: selectedCountry === country ? "bold" : "",
              }}
            >
              <label for={country} key={country}>
                {country}
              </label>
              <input
                type="radio"
                id={country}
                name={country}
                value={country}
                checked={selectedCountry === country}
                onChange={handleCountryChange}
              />
              {selectedCountry === country ? <GoCheck size={15} /> : <></>}
            </Flex>
          ))}
        </OptionBox>
      </FlexRow>
      <Spacing size={10} />

      <FlexRow>
        <Label>
          <Box />
          제조사
        </Label>
        {country && (
          <OptionBox>
            {CAR_COUNTRY[country].map((manufacturer) => (
              <Flex
                justify="space-between"
                width="100%"
                height="25px"
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "5px 10px",
                  borderRadius: "15px",
                  backgroundColor: selectedManufacturer === manufacturer ? "#000" : "#fff",
                  color: selectedManufacturer === manufacturer ? "#fff" : "#000",
                  fontWeight: selectedManufacturer === manufacturer ? "bold" : "",
                }}
              >
                <label for={manufacturer} key={manufacturer}>
                  {manufacturer}
                </label>
                <input
                  type="radio"
                  id={manufacturer}
                  name={manufacturer}
                  value={manufacturer}
                  checked={selectedManufacturer === manufacturer}
                  onChange={handleManufacturerChange}
                />
                {selectedManufacturer === manufacturer ? <GoCheck size={15} /> : <></>}
              </Flex>
            ))}
          </OptionBox>
        )}
      </FlexRow>

      <FlexRow>
        <Label>
          <Box />
          모델
        </Label>
        {manufacturer && (
          <OptionBox>
            {CAR_MANUFACTURERE[manufacturer].map((mol) => (
              <Flex
                justify="space-between"
                width="100%"
                height="25px"
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "5px 10px",
                  borderRadius: "15px",
                  backgroundColor: selectedModel === mol ? "#000" : "#fff",
                  color: selectedModel === mol ? "#fff" : "#000",
                  fontWeight: selectedModel === mol ? "bold" : "",
                }}
              >
                <label for={mol} key={mol}>
                  {mol}
                </label>
                <input
                  type="radio"
                  id={mol}
                  name={mol}
                  value={mol}
                  checked={selectedModel === mol}
                  onChange={handleModelChange}
                />
                {selectedModel === mol ? <GoCheck size={15} /> : <></>}
              </Flex>
            ))}
          </OptionBox>
        )}
      </FlexRow>
    </RowWrapper>
  );
};

const RowWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;
const FlexRow = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const Box = styled.div`
  height: 5px;
  width: 5px;
  background-color: ${colorPalette.black};
  margin-right: 10px;
`;

const Label = styled.div`
  width: 100%;
  height: 35px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  font-size: 12px;
  color: ${colorPalette.fontBlack};
`;

const OptionBox = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  flex-direction: column;
  font-size: 13px;
  gap: 15px;
  padding: 0 10px;
  border-left: 1px solid ${colorPalette.grey};

  div > label {
    cursor: pointer;
  }
  div > input {
    display: none;
  }
`;

export default CarFilterCountry;
