import LeftNavbar from "../../../components/manager/LeftNavbar";
import HeadTitle from "../../../components/manager/HeadTitle";
import CarSellChart from "../../../components/manager/sell/CarSellChart";
import { useEffect, useState } from "react";
import { ContentBox, ContentWrapper, ManagerContainer } from "../../../styles/managerLayoutStyles";
import { getAllCarSellList } from "../../../api/CarSellApi";
import { getSellCarList } from "../../../api/carApi";
import { useSelector } from "react-redux";

export default function M_SellerPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [sellerItem, setSellerItems] = useState([]);
  const [carSellData, setCarSellData] = useState([]);

  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    const sellerData = async () => {
      const data = await getSellCarList(user.id);
      setSellerItems(data);
    };
    sellerData();
  }, [user.id]);

  useEffect(() => {
    setIsLoading(true);
    const allData = async () => {
      const data = await getAllCarSellList();
      setCarSellData(data);
    };
    allData();
    setIsLoading(false);
  }, []);

  return (
    <ManagerContainer>
      <LeftNavbar />
      <ContentWrapper>
        <ContentBox>
          <HeadTitle title={"M_SellerPage"} desc={"SELLER 권한 메인 페이지"}></HeadTitle>
          {/* 메인 차트 */}
          <CarSellChart carSellData={carSellData} isLoading={isLoading} sellerItem={sellerItem} />
        </ContentBox>
      </ContentWrapper>
    </ManagerContainer>
  );
}
