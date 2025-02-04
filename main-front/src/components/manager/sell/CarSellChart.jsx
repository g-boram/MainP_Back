import React, { useEffect } from "react";
import dayjs from "dayjs";
import styled from "@emotion/styled";
import Flex from "../../shared/Flex";
import Spacing from "../../shared/Spacing";
import Text from "../../shared/Text";
import { Bar, Doughnut, Pie } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from "chart.js";
import { makeRandomColor } from "../../../utils/makeRandomColor";
import { ClearLoadingOverlay } from "../../../styles/managerLayoutStyles";
import { ClipLoader } from "react-spinners";
import { useDispatch, useSelector } from "react-redux";
import { getAllCarSellList } from "../../../reduxSlice/carSellSlice";
import { Link } from "react-router-dom";

// Chart.js 기본 요소와 스케일을 등록
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

const CarSellChart = ({ carSellData, isLoading, sellerItem }) => {
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const { carSellList, notSellerList } = useSelector((state) => state.carSell);
  console.log("carSellList", carSellList);

  useEffect(() => {
    dispatch(getAllCarSellList());
  }, [dispatch]);

  // 월별 데이터 가공
  const groupedByMonth = carSellData.reduce((acc, curr) => {
    const month = dayjs(curr.createdAt).format("YYYY-MM"); // "2025-01", "2025-02" 형식
    if (!acc[month]) {
      acc[month] = {
        count: 0,
        regions: {},
        colors: {},
        priceRanges: { low: 0, mid: 0, high: 0 },
      };
    }
    // 월별 카운트 증가
    acc[month].count += 1;
    // 지역별 데이터 추가
    acc[month].regions[curr.region] = (acc[month].regions[curr.region] || 0) + 1;
    // 색상별 데이터 추가
    acc[month].colors[curr.color] = (acc[month].colors[curr.color] || 0) + 1;
    // 가격대 구분
    if (curr.price < 1500) {
      acc[month].priceRanges.low += 1;
    } else if (curr.price <= 2500) {
      acc[month].priceRanges.mid += 1;
    } else {
      acc[month].priceRanges.high += 1;
    }

    return acc;
  }, {});

  // [ 월별 신청 개수 데이터 준비 ]
  const months = Object.keys(groupedByMonth);
  const applicationCounts = months.map((month) => groupedByMonth[month].count);
  const monthsColors = months.map(() => makeRandomColor());
  const chartData = {
    labels: months,
    datasets: [
      {
        label: "월별 신청 개수",
        data: applicationCounts,
        backgroundColor: monthsColors,
      },
    ],
  };

  // [ 가격대별 신청 개수 데이터 ]
  const priceRanges = ["Low", "Mid", "High"];
  const priceCounts = priceRanges.map((range) =>
    Object.values(groupedByMonth).reduce((sum, month) => sum + month.priceRanges[range.toLowerCase()], 0)
  );
  const priceColors = priceCounts.map(() => makeRandomColor());
  const priceChartData = {
    labels: priceRanges,
    datasets: [
      {
        label: "가격대별 신청 개수",
        data: priceCounts,
        backgroundColor: priceColors,
      },
    ],
  };

  // [ 색상별 신청 개수 데이터 ]
  const colors = ["검정색", "흰색", "쥐색", "청색", "은회색", "진주색", "흰색투톤", "검정투톤", "빨간색"];
  const colorCounts = colors.map((color) =>
    Object.values(groupedByMonth).reduce((sum, month) => {
      // month.colors에서 해당 색상이 있으면 값을 더하고, 없으면 0으로 처리
      return sum + (month.colors[color] || 0);
    }, 0)
  );
  const colorColors = colors.map(() => makeRandomColor());

  const colorChartData = {
    labels: colors,
    datasets: [
      {
        label: "색상별 신청 개수",
        data: colorCounts,
        backgroundColor: colorColors,
      },
    ],
  };

  // [ 지역별 신청 개수 데이터 ]
  const regionCounts = carSellData.reduce((acc, curr) => {
    acc[curr.region] = (acc[curr.region] || 0) + 1;
    return acc;
  }, {}); // 지역별 카운트 집계

  const regions = Object.keys(regionCounts); // 지역명 목록
  const counts = Object.values(regionCounts); // 각 지역별 개수 목록
  const regionsColors = counts.map(() => makeRandomColor());
  const regionChartData = {
    labels: regions,
    datasets: [
      {
        label: "지역별 신청 개수",
        data: counts,
        backgroundColor: regionsColors,
      },
    ],
  };

  const chartOptions = {
    scales: {
      x: {
        type: "category",
        labels: months,
      },
      y: {
        type: "linear",
        beginAtZero: true,
      },
    },
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
        labels: {
          boxWidth: 10,
        },
      },
    },
  };
  const otherChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
        labels: {
          boxWidth: 10,
        },
      },
    },
  };
  const hideChartOptions = {
    plugins: {
      legend: {
        display: false, // 범례를 숨깁니다.
      },
    },
    responsive: true,
    maintainAspectRatio: false,
  };

  return (
    <ChartContainer>
      <Flex>
        <MainChartWrapper>
          <RowTitle>월별 신청 개수</RowTitle>
          <Desc>월별 온라인 신청 개수 입니다 마우스를 올리면 정확한 값이 나타납니다.</Desc>
          <Spacing size={10} />
          <Bar data={chartData} options={chartOptions} />
        </MainChartWrapper>
        <MainCharDesc>
          {isLoading && (
            <ClearLoadingOverlay>
              <ClipLoader color="#000" z-index={11} />
            </ClearLoadingOverlay>
          )}
          <Flex justify="flex-end" width="100%" height="50px">
            <Text typography="t18" bold color="#333">{`${user?.username} 님 반갑습니다!`}</Text>
          </Flex>
          <Flex height="60px" justify="space-between" align="flex-end">
            <Text typography="t14">내가 판매중인 차량</Text>
            <Text typography="t18" bold color="red">
              {sellerItem?.length} 건
            </Text>
          </Flex>
          <Flex height="60px" justify="space-between" align="flex-end">
            <Text typography="t14">미확인 견적서</Text>
            <Text typography="t18" bold color="red">
              {notSellerList.length} 건
            </Text>
          </Flex>
          <Spacing size={30} />
          <StyledLink to="/manager/car/sell">확인하러 가기</StyledLink>
        </MainCharDesc>
      </Flex>
      <Line />
      <Flex>
        <SubChartWrapper>
          <RowTitle>가격대별 신청 개수</RowTitle>
          <Desc>Low: 1500이하 / Mid: 2500이하 / High: 2500초과 </Desc>
          <Spacing size={10} />
          <CharBox>
            <Pie data={priceChartData} options={otherChartOptions} />
          </CharBox>
        </SubChartWrapper>
        <SubChartWrapper>
          <RowTitle>색상별 신청 개수</RowTitle>
          <Desc>색상별 신청 개수</Desc>
          <Spacing size={10} />
          <CharBox>
            <Doughnut data={colorChartData} options={otherChartOptions} />
          </CharBox>
        </SubChartWrapper>
        <SubChartWrapper>
          <RowTitle>지역별 신청 개수</RowTitle>
          <Desc>지역별 신청 개수</Desc>
          <Spacing size={10} />
          <CharBox>
            <Pie data={regionChartData} options={hideChartOptions} />
          </CharBox>
        </SubChartWrapper>
      </Flex>
    </ChartContainer>
  );
};

export default CarSellChart;

const ChartContainer = styled.div`
  height: 400px;
  width: 100%;
  margin-top: 30px;
`;

const MainChartWrapper = styled.div`
  height: 250px;
  width: 750px;
  margin-bottom: 50px;
`;
const MainCharDesc = styled.div`
  height: 300px;
  width: 250px;
  margin-left: 30px;
  border: 1px solid #eee;
  background-color: #f4f4f4;
  border-radius: 10px;
  padding: 30px 20px;
`;

const SubChartWrapper = styled.div`
  height: 400px;
  width: 350px;
`;

const CharBox = styled.div`
  width: 100%;
  height: 250px;
  margin-top: 10px;
`;

const RowTitle = styled.div`
  font-size: 14px;
  font-weight: bold;
  color: #333;
`;
const Desc = styled.div`
  font-size: 11px;
  color: #777;
`;
const Line = styled.div`
  height: 1px;
  width: 100%;
  background-color: #eee;
  margin: 30px 0 50px 0;
`;

const StyledLink = styled(Link)`
  color: #fff;
  background-color: #000;
  font-weight: bold;
  border-radius: 3px;
  font-size: 14px;
  margin-bottom: 15px;
  padding: 5px 0;
  display: flex;
  justify-content: center;
  align-items: center;
  text-decoration: none;
  cursor: pointer;
`;
