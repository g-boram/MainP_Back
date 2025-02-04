import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import styled from "@emotion/styled";
import { ClipLoader } from "react-spinners";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { ClearLoadingOverlay } from "../../styles/managerLayoutStyles";

import mainSlideImg1 from "../../assert/main_slide/mainSlide1.jpg";
import mainSlideImg2 from "../../assert/main_slide/mainSlide2.jpg";
import mainSlideImg3 from "../../assert/main_slide/mainSlide3.jpg";
import mainSlideImg4 from "../../assert/main_slide/mainSlide4.jpg";
import mainSlideImg5 from "../../assert/main_slide/mainSlide5.jpg";
import Text from "../shared/Text";
import Flex from "../shared/Flex";

const ImgSlideBanner = () => {
  const navigate = useNavigate();
  const [bannerImage, setBannerImage] = useState(null);
  const [isLoading, setIsLoading] = useState();

  useEffect(() => {
    setIsLoading(true);

    setBannerImage([
      { img: mainSlideImg1, alt: "mainSlideImg1" },
      { img: mainSlideImg2, alt: "mainSlideImg1" },
      { img: mainSlideImg3, alt: "mainSlideImg1" },
      { img: mainSlideImg4, alt: "mainSlideImg1" },
      { img: mainSlideImg5, alt: "mainSlideImg1" },
    ]);
    setIsLoading(false);
  }, []);

  return (
    <Flex direction="column">
      {bannerImage == null || isLoading ? (
        <ClearLoadingOverlay>
          <ClipLoader color="#000" z-index={11} />
        </ClearLoadingOverlay>
      ) : (
        <></>
      )}
      <TitleRow>
        <Text typography="t16" bold>
          이벤트
        </Text>
        <Text typography="t11" color="grey" onClick={() => navigate("/board/event")}>
          자세히보기
        </Text>
      </TitleRow>
      <MainBannerContainer>
        <Swiper
          className="custom-swiper"
          spaceBetween={30}
          centeredSlides={true}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
          }}
          navigation={true}
          modules={[Autoplay, Pagination, Navigation]}
        >
          {bannerImage ? (
            bannerImage.map((image, idx) => (
              <SwiperSlide key={idx}>
                <img src={image.img} alt={image.alt} />
              </SwiperSlide>
            ))
          ) : (
            <ClearLoadingOverlay>
              <ClipLoader color="#000" z-index={11} />
            </ClearLoadingOverlay>
          )}
        </Swiper>
      </MainBannerContainer>
    </Flex>
  );
};
const TitleRow = styled.div`
  width: 400px;
  height: 50px;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 10px;
`;
const MainBannerContainer = styled.div`
  display: flex;
  width: 400px;
  height: 200px;

  .custom-swiper {
    .swiper {
      width: 400px;
      height: 200px;
    }
    .swiper-button-next,
    .swiper-button-prev {
      color: #fff !important; /* 기본 스타일 덮어쓰기 */
    }
    .swiper-pagination-bullet-active {
      background: #fff !important; /* 기본 스타일 덮어쓰기 */
    }
    .swiper-slide {
      width: 400px;
      height: 200px;
      > img {
        width: 100%;
        height: 200px;
        object-fit: cover;
      }
    }
  }
`;

export default ImgSlideBanner;
