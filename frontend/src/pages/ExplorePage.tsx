import React from 'react';
import { Layout as AntLayout, Menu, Input, Card, Row, Col, Typography } from 'antd';
import Layout from '../components/Layout';
import CourseCard from '../components/CourseCard';

const { Content, Sider } = AntLayout;
const { Title } = Typography;

const courses = [
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
      courseImage: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=600&q=80",
      courseName: "Python Cho Người Mới",
      description: "Khóa học Python cơ bản cho người mới bắt đầu, dễ học, dễ hiểu, thực hành liên tục.",
      instructorAvatar: "https://randomuser.me/api/portraits/women/68.jpg",
      instructorName: "Phạm Thị D",
      courseCategory: "Lập trình Python",
      rating: 4.9,
      ratingCount: 2100,
      level: "Beginner",
      duration: "12h"
    },
    {
      courseImage: "https://images.unsplash.com/photo-1555066931-6f7e2ecddb9c?auto=format&fit=crop&w=600&q=80",
      courseName: "Lập trình Game với Unity",
      description: "Khám phá thế giới lập trình game với Unity, từ cơ bản đến xây dựng sản phẩm hoàn chỉnh.",
      instructorAvatar: "https://randomuser.me/api/portraits/men/71.jpg",
      instructorName: "Vũ Văn E",
      courseCategory: "Game Dev",
      rating: 4.5,
      ratingCount: 670,
      level: "Intermediate",
      duration: "20h"
    },
    {
      courseImage: "https://images.unsplash.com/photo-1522542550221-31fd19575a2d?auto=format&fit=crop&w=600&q=80",
      courseName: "Machine Learning Cơ Bản",
      description: "Nhập môn Machine Learning với các thuật toán và bài tập thực tiễn dễ hiểu.",
      instructorAvatar: "https://randomuser.me/api/portraits/women/75.jpg",
      instructorName: "Hoàng Thị F",
      courseCategory: "AI/ML",
      rating: 4.7,
      ratingCount: 890,
      level: "Beginner",
      duration: "18h"
    },
    // ... (bạn có thể copy thêm để đủ 12 khóa học hoặc tùy ý)
  ];
  
  // (Bạn có thể thêm nhiều khóa hơn để đủ 12)
  

const ExplorePage: React.FC = () => {
  return (
    <Layout>
        <AntLayout style={{ minHeight: '100vh' }}>
            <Sider width={300} style={{ background: '#fff', padding: '20px' }}>
                <Title level={4}>Filter Courses</Title>
                <Menu mode="inline" defaultSelectedKeys={['1']}>
                <Menu.Item key="1">Category 1</Menu.Item>
                <Menu.Item key="2">Category 2</Menu.Item>
                <Menu.Item key="3">Category 3</Menu.Item>
                </Menu>
                <Input.Search placeholder="Search by keyword" style={{ marginTop: '20px' }} />
            </Sider>
            <Content style={{ padding: '20px' }}>
                <Title level={2}>Explore Courses</Title>
                <Row gutter={[24, 24]}>
                    {courses.map((course, idx) => (
                        <Col key={idx} xs={24} sm={12} md={8} lg={6}>
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
                        />
                        </Col>
                    ))}
                </Row>
            </Content>
        </AntLayout>
    </Layout>
  );
};

export default ExplorePage; 