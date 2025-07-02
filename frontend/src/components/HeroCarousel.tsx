import React, { useRef } from "react";
import { Carousel, Button } from "antd";
import type { CarouselRef } from "antd/es/carousel";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import "./HeroCarousel.css";

const heroSlides = [
  {
    image:
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80",
    title: "Khám phá tri thức mới mỗi ngày",
    desc: "Tham gia các khoá học hấp dẫn, cập nhật kiến thức hiện đại, phát triển bản thân cùng cộng đồng học tập năng động."
  },
  {
    image:
      "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=1200&q=80",
    title: "Học mọi lúc, mọi nơi",
    desc: "Nền tảng học trực tuyến giúp bạn chủ động thời gian và địa điểm, chinh phục mọi mục tiêu."
  },
  {
    image:
      "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=1200&q=80",
    title: "Kết nối đam mê, vươn tới thành công",
    desc: "Học hỏi từ chuyên gia, kết nối bạn bè cùng chí hướng, xây dựng sự nghiệp vững chắc."
  }
];

const HeroCarousel = () => {
  const carouselRef = useRef<CarouselRef>(null);

  const handlePrev = () => carouselRef.current?.prev();
  const handleNext = () => carouselRef.current?.next();

  return (
    <div className="hero-section">
      <Carousel
        ref={carouselRef}
        autoplay
        dots={{ className: "hero-carousel-dots" }}
        effect="scrollx"
        className="hero-carousel"
      >
        {heroSlides.map((slide, idx) => (
          <div key={idx}>
            <div
              className="hero-slide"
              style={{
                backgroundImage: `url(${slide.image})`
              }}
            >
              <div className="hero-slide-content">
                <h1>{slide.title}</h1>
                <p>{slide.desc}</p>
              </div>
            </div>
          </div>
        ))}
      </Carousel>
      <div className="hero-arrows">
        <Button
          shape="circle"
          icon={<LeftOutlined />}
          size="large"
          onClick={handlePrev}
        />
        <Button
          shape="circle"
          icon={<RightOutlined />}
          size="large"
          onClick={handleNext}
        />
      </div>
    </div>
  );
};

export default HeroCarousel;
