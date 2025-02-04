import styled from "@emotion/styled";
import Flex from "../../shared/Flex";
import { useState } from "react";
import { icons } from "../../../constants/icons";
import Spacing from "../../shared/Spacing";

export default function UserIconBox({ imageUrl, setIcon }) {
  const [selectedIcon, setSelectedIcon] = useState({
    name: "",
    iconComp: "",
  });

  const handleIconClick = (icon) => {
    setIcon(icon.name);
    setSelectedIcon({
      name: icon.name,
      iconComp: icon.iconComp,
    });
  };

  return (
    <IconWrapper>
      {imageUrl !== "" ? (
        <IconBoxTitle>
          현재 아이콘: <IconName>{imageUrl}</IconName>
        </IconBoxTitle>
      ) : (
        <></>
      )}
      <IconBoxTitle>사용자 아이콘 선택</IconBoxTitle>
      <Spacing size={10} />
      <SelectIconBox>{selectedIcon !== "" ? selectedIcon.iconComp : ""}</SelectIconBox>
      <IconListBox>
        {icons.map((icon) => (
          <Flex direction="column" justify="center" align="center" width="60px">
            <IconBox key={icon.name} onClick={() => handleIconClick(icon)}>
              {icon.iconComp}
            </IconBox>
            <IconName selected={selectedIcon.name === icon.name ? true : false}>{icon.name}</IconName>
          </Flex>
        ))}
      </IconListBox>
    </IconWrapper>
  );
}

const IconWrapper = styled.div`
  height: 600px;
  width: 600px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const IconBoxTitle = styled.div`
  min-height: 30px;
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 13px;
`;

const SelectIconBox = styled.div`
  height: 150px;
  width: 150px;
  margin-bottom: 30px;
  display: flex;
  font-size: 70px;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  border: 1px solid #eee;
  background-color: #f4f4f4;
`;

const IconName = styled.div`
  font-size: 14px;
  padding: 3px 10px;
  border-radius: 15px;
  margin-top: 5px;
  margin-bottom: 10px;
  background-color: ${({ selected }) => (selected ? "#000" : "#fff")};
  color: ${({ selected }) => (selected ? "#fff" : "#000")};
  border: 1px solid #eee;
  cursor: pointer;
`;

const IconBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid #eee;
  background-color: #f4f4f4;
  height: 40px;
  width: 40px;
  font-size: 20px;
  border-radius: 50%;
  cursor: pointer;
`;

const IconListBox = styled.div`
  width: 300px;
  display: flex;
  justify-content: center;
  align-content: center;
  gap: 15px;
  flex-wrap: wrap;
`;
