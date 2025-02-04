import styled from "@emotion/styled";
import Flex from "../shared/Flex";
import Text from "../shared/Text";
import Spacing from "../shared/Spacing";
import addDelimiter from "../../utils/addDelimiter";
import formatTime from "../../utils/formatTime";
import Tag from "../shared/Tag";

import { FaStar } from "react-icons/fa";
import { css } from "@emotion/react";
import { useEffect, useState } from "react";
import { differenceInMilliseconds, parseISO } from "date-fns";
import { useNavigate } from "react-router-dom";
import carImg from "../../assert/CarBoximg.png";

// function CarBox({ car }) { @TODO: 추후 데이터 통신값 보여주기
export default function EventCarBox() {
  const car = {
    id: "1",
    name: "(Test) K3",
    brand_name: "(Test) KIA",
    price: 1000000,
    salePercent: 10,
    desc: "태산씨의 씽씽이 1호",
    comment: "머찌다 씽씽!",
    color: ["블랙", "화이트", "레드"],
    type: "KIA",
    volume: "100",
    scent: "100",
    rating: 4,
    like: 10,
    url: "",
    subUrl: [],
    contentUrl: "",
    count: 5,
    reviews: [],
    totalSale: 100,
    category: "KIA",
    hashTags: ["kia", "씽씽이", "car"],
    events: {
      name: "이벤트1",
      promoEndTime: "2025-05-30T00:00:00+10:00",
      tagThemeStyle: {
        backgroundColor: "#000",
        fontColor: "#fff",
      },
    },
  };

  const navigete = useNavigate();
  const [remainedTime, setRemainedTime] = useState(0);

  useEffect(() => {
    if (car.events?.name === "" || car.events?.promoEndTime == null) {
      return;
    }

    const promoEndTime = car.events.promoEndTime;

    const timer = setInterval(() => {
      const 남은초 = differenceInMilliseconds(parseISO(promoEndTime), new Date());
      if (남은초 < 0) {
        clearInterval(timer);
        return;
      }
      setRemainedTime(남은초);
    }, 1_000);

    return () => {
      clearInterval(timer);
    };
  }, [car.events]);

  // 태그 컴포넌트
  const tagComponent = () => {
    if (car.events == null) {
      return null;
    }

    const { name, tagThemeStyle } = car.events;

    const promotionTxt = remainedTime > 0 ? `-${formatTime(remainedTime)} 남음` : "";

    if (promotionTxt === "") return;

    return (
      <div>
        <Tag color={tagThemeStyle.fontColor} backgroundColor={tagThemeStyle.backgroundColor}>
          {name.concat(promotionTxt)}
        </Tag>
      </div>
    );
  };

  return (
    <CarContainer onClick={() => navigete(`/car/detail/${car.id}`)}>
      <ImgWrapper>
        {/* {car.url ? <img src={car.url} alt={car.name} /> : null} */}
        <img src={carImg} alt={"carImg"} />
        {car.events?.name !== "" ? <span css={tagStyle}>{tagComponent()}</span> : null}
      </ImgWrapper>

      <Flex direction="column" css={nameStyle}>
        <Text typography="t13">{car.brand_name}</Text>
        <Spacing size={5} />
        <Text typography="t17" bold>
          {car.name}
        </Text>
      </Flex>

      <DescRow>
        {/* desc 넣기 3가지? */}
        <Text typography="t11">{car.name}</Text>
        <Text typography="t11">{car.name}</Text>
        <Text typography="t11">{car.name}</Text>
      </DescRow>

      <Flex justify={"flex-end"}>
        <FaStar fill="#ffdb00" />
        <Spacing size={5} direction={"horizontal"} />
        <Text typography="t13" bold>
          {car.rating}
        </Text>
      </Flex>

      <Flex justify={"flex-start"}>
        <Text typography="t9" css={saleTextStyle}>
          {addDelimiter(car.price)}
        </Text>
      </Flex>

      <Flex justify={"space-between"}>
        <Text typography="t15" color="red" bold>
          {addDelimiter(Number(car.price) - Number(car.totalSale))} / 24개월
        </Text>
      </Flex>

      <TagRow>tag1 / tag2 / tag3</TagRow>
    </CarContainer>
  );
}

const CarContainer = styled.div`
  display: flex;
  flex-wrap: nowrap;
  flex-shrink: 0;
  flex-direction: column;
  background-color: white;
  width: 200px;
  cursor: pointer;
`;
const ImgWrapper = styled.div`
  height: 150px;
  width: 200px;
  position: relative;
  border-radius: 10px;
  background-color: #eee;
  margin-bottom: 35px;
  & img {
    height: 100%;
    width: 100%;
    object-fit: contain;
  }
`;
const DescRow = styled.div`
  display: flex;
  height: 25px;
  width: 100%;
  margin: 5px 0 10px 0;
`;
const TagRow = styled.div`
  display: flex;
  height: 25px;
  width: 100%;
  margin: 10px 0;
`;

const nameStyle = css`
  height: 30px;
  overflow: hidden;
`;

const tagStyle = css`
  position: absolute;
  width: 100%;
  bottom: 0;
  left: 0;
`;

const saleTextStyle = css`
  text-decoration: line-through;
`;
