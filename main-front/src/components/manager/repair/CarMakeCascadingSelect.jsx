import styled from "@emotion/styled";
import { CAR_COUNTRY, CAR_MANUFACTURERE } from "../../../constants/carOption";

const CarMakeCascadingSelect = ({ country, manufacturer, model, setCountry, setManufacturer, setModel, setTitle }) => {
  const handleCountryChange = (e) => {
    setCountry(e.target.value);
    setManufacturer("");
    setModel("");
  };
  const handleManufacturerChange = (e) => {
    setManufacturer(e.target.value);
    setModel("");
    setTitle("make");
  };
  const handleModelChange = (e) => {
    setModel(e.target.value);
    setTitle("model");
  };

  return (
    <RowWrapper>
      <Label>나라</Label>
      <FlexRow>
        <select value={country} onChange={handleCountryChange}>
          <option value="">Country</option>
          {Object.keys(CAR_COUNTRY).map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </FlexRow>
      <Label>제조사</Label>
      <FlexRow>
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

      <Label>모델</Label>
      <FlexRow>
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
  height: 45px;
  border-bottom: 1px solid #eee;
`;
const FlexRow = styled.div`
  height: 45px;
  width: 100%;
  padding: 5px;
  display: flex;
  justify-content: center;
  align-items: center;

  > select {
    font-size: "12px";
    width: 100%;
    height: 100%;
    border: 1px solid #eee;
  }
`;
const Label = styled.div`
  width: 50%;
  height: 45px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  font-size: 12px;
  padding: 0 10px;
  color: #000;
  background-color: #eee;
`;

export default CarMakeCascadingSelect;
