import styled from "@emotion/styled";
import EventCarBox from "./EventCarBox";

export default function EventCarWrapper() {
  return (
    <EventCarBoxContainer>
      <HeadTitleRow>
        <div>판매중 차량 (100대)</div>
        <div>최근등록순 / 연식 등등의 필터</div>
      </HeadTitleRow>
      <CarListRow>
        <TitleRow>
          <div>한정특가</div>
          <div>전체보기</div>
        </TitleRow>
        <ListWrapper>
          <EventCarBox />
          <EventCarBox />
          <EventCarBox />
          <EventCarBox />
          <EventCarBox />
          <EventCarBox />
        </ListWrapper>
      </CarListRow>
    </EventCarBoxContainer>
  );
}

const EventCarBoxContainer = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
`;

const HeadTitleRow = styled.div`
  height: 50px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const TitleRow = styled.div`
  height: 50px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const CarListRow = styled.div`
  min-height: 350px;
  padding: 20px;
  background-color: #fff;
  border: 1px solid #eee;
  border-radius: 10px;
  box-shadow: 0px 0px 10px -2px #eee;
`;

const ListWrapper = styled.div`
  display: flex;
  width: 100%;
  overflow-x: scroll;
  gap: 40px;
`;
