import React from 'react';
import './Homepage.css';
import { Button, Card, Layout as AntLayout, Typography, Carousel, Row, Col } from 'antd';
import Layout from '../components/Layout';
import CourseCard from '../components/CourseCard';
import HeroCarousel from '../components/HeroCarousel';
const { Header, Content } = AntLayout;
const { Title, Paragraph } = Typography;


const featuredCourses = [
  {
    courseImage: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=600&q=80",
    courseName: "ReactJS Cơ Bản Đến Nâng Cao",
    description: "Khóa học giúp bạn làm chủ ReactJS từ cơ bản đến nâng cao, thực hành qua dự án thực tế.",
    instructorAvatar: "https://randomuser.me/api/portraits/men/32.jpg",
    instructorName: "Nguyễn Văn A",
    courseCategory: "Lập trình Web",
    rating: 4.8,
    ratingCount: 1200,
    level: "Beginner",
    duration: "10h"
  },
  {
    courseImage: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=600&q=80",
    courseName: "NodeJS Thực Chiến",
    description: "Học NodeJS qua dự án thực tế, xây dựng API và ứng dụng backend chuyên nghiệp.",
    instructorAvatar: "https://randomuser.me/api/portraits/women/44.jpg",
    instructorName: "Trần Thị B",
    courseCategory: "Backend",
    rating: 4.6,
    ratingCount: 950,
    level: "Intermediate",
    duration: "15h"
  },
  {
    courseImage: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80",
    courseName: "UI/UX Design Cơ Bản",
    description: "Nắm vững các nguyên lý thiết kế giao diện và trải nghiệm người dùng hiện đại.",
    instructorAvatar: "https://randomuser.me/api/portraits/men/65.jpg",
    instructorName: "Lê Văn C",
    courseCategory: "Thiết kế",
    rating: 4.7,
    ratingCount: 780,
    level: "Beginner",
    duration: "8h"
  },
  {
    courseImage: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80",
    courseName: "UI/UX Design Cơ Bản",
    description: "Nắm vững các nguyên lý thiết kế giao diện và trải nghiệm người dùng hiện đại.",
    instructorAvatar: "https://randomuser.me/api/portraits/men/65.jpg",
    instructorName: "Lê Văn C",
    courseCategory: "Thiết kế",
    rating: 4.7,
    ratingCount: 780,
    level: "Beginner",
    duration: "8h"
  },
  {
    courseImage: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80",
    courseName: "UI/UX Design Cơ Bản",
    description: "Nắm vững các nguyên lý thiết kế giao diện và trải nghiệm người dùng hiện đại.",
    instructorAvatar: "https://randomuser.me/api/portraits/men/65.jpg",
    instructorName: "Lê Văn C",
    courseCategory: "Thiết kế",
    rating: 4.7,
    ratingCount: 780,
    level: "Beginner",
    duration: "8h"
  },
  {
    courseImage: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80",
    courseName: "UI/UX Design Cơ Bản",
    description: "Nắm vững các nguyên lý thiết kế giao diện và trải nghiệm người dùng hiện đại.",
    instructorAvatar: "https://randomuser.me/api/portraits/men/65.jpg",
    instructorName: "Lê Văn C",
    courseCategory: "Thiết kế",
    rating: 4.7,
    ratingCount: 780,
    level: "Beginner",
    duration: "8h"
  }
  // Thêm nhiều khóa hơn nếu muốn
];


const reviews = [
  {
    content: "This platform has transformed my learning experience!",
    author: "Student A"
  },
  {
    content: "The courses are well-structured and easy to follow.",
    author: "Student B"
  },
  {
    content: "I love the interactive quizzes and assignments.",
    author: "Student C"
  }
];

const Homepage: React.FC = () => {
  return (
    <Layout>
      <Content>
        <section className="hero-section">
          <HeroCarousel />
        </section>
        <section className="featured-courses">
          <Title level={2} style={{ textAlign: 'center', marginBottom: 32 }}>Featured Courses</Title>
            <div style={{ maxWidth: 1400, margin: '0 auto' }}>
              <Row gutter={[24, 24]} style={{ marginBottom: 32 }}>
                {featuredCourses.map((course, idx) => (
                  <Col key={idx} xs={24} sm={12} md={6} lg={6}>
                    <CourseCard
                      courseImage={course.courseImage}
                      courseName={course.courseName}
                      instructorAvatar={course.instructorAvatar}
                      instructorName={course.instructorName}
                      courseCategory={course.courseCategory}
                      description={course.description}
                      rating={course.rating}
                      ratingCount={course.ratingCount}
                      level={course.level}
                      duration={course.duration}
                      style={{
                        width: 340, 
                        minHeight: 320}}
                    />
                  </Col>
                ))}
              </Row>
            </div>
        </section>
        <section className="reviews">
          <Title level={2} style={{ textAlign: 'center', marginBottom: 32 }}>What Our Students Say</Title>
          <div className="review-list">
            <Card bordered={false} style={{ width: 300 }}>
              <Paragraph>"This platform has transformed my learning experience!"</Paragraph>
              <Paragraph>- Student A</Paragraph>
            </Card>
            <Card bordered={false} style={{ width: 300 }}>
              <Paragraph>"The courses are well-structured and easy to follow."</Paragraph>
              <Paragraph>- Student B</Paragraph>
            </Card>
            <Card bordered={false} style={{ width: 300 }}>
              <Paragraph>"I love the interactive quizzes and assignments."</Paragraph>
              <Paragraph>- Student C</Paragraph>
            </Card>
          </div>
        </section>
      </Content>
    </Layout>
  );
};

export default Homepage;
