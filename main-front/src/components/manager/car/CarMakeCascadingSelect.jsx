import styled from "@emotion/styled";
import Spacing from "../../shared/Spacing";
import { colorPalette } from "../../../styles/colorPalette";
import { CAR_COUNTRY, CAR_MANUFACTURERE } from "../../../constants/carOption";

const CarMakeCascadingSelect = ({ country, manufacturer, model, setCountry, setManufacturer, setModel }) => {
  // 나라
  const handleCountryChange = (e) => {
    setCountry(e.target.value);
    setManufacturer("");
    setModel("");
  };

  // 제조사
  const handleManufacturerChange = (e) => {
    setManufacturer(e.target.value);
    setModel("");
  };

  // 모델 선택 핸들러
  const handleModelChange = (e) => {
    setModel(e.target.value);
  };

  return (
    <RowWrapper>
      <FlexRow>
        <Label>나라</Label>
        <select value={country} onChange={handleCountryChange}>
          <option value="">Country</option>
          {Object.keys(CAR_COUNTRY).map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </FlexRow>
      <Spacing size={10} direction={"width"} />
      <FlexRow>
        <Label>제조사</Label>
        {country && (
          <>
            <select value={manufacturer} onChange={handleManufacturerChange}>
              <option value="">Manufacturer</option>
              {CAR_COUNTRY[country].map((m) => (
                <option key={m} value={m}>
                  {m}
                </option>
              ))}
            </select>
          </>
        )}
      </FlexRow>
      <Spacing size={10} direction={"width"} />
      <FlexRow>
        <Label>모델: </Label>
        {manufacturer && (
          <select value={model} onChange={handleModelChange}>
            <option value="">Model</option>
            {CAR_MANUFACTURERE[manufacturer].map((mdl) => (
              <option key={mdl} value={mdl}>
                {mdl}
              </option>
            ))}
          </select>
        )}
      </FlexRow>
    </RowWrapper>
  );
};

const RowWrapper = styled.div`
  display: flex;
  width: 100%;
`;
const FlexRow = styled.div`
  display: flex;
  width: 100%;

  > select {
    font-size: "13px";
    width: 100%;
    border: 1px solid #eee;
  }
`;
const Label = styled.div`
  width: 87%;
  height: 35px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  font-size: 14px;
  padding: 0 10px;
  font-weight: bold;
  color: ${colorPalette.fontBlack};
  border-left: 3px solid ${colorPalette.notice_form};
`;

export default CarMakeCascadingSelect;
