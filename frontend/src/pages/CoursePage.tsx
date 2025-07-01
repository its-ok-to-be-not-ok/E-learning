import React from 'react';
import { Layout as AntLayout, Typography, Avatar, Button, Tabs, Row, Col, List, Card } from 'antd';
import Layout from '../components/Layout';
import './CoursePage.css';
import CourseCard from '../components/CourseCard';
import SyllabusItem from '../components/SyllabusItem';
import InstructorInfo from '../components/InstructorInfo';
import Reviews from '../components/Reviews';

const { Content } = AntLayout;
const { Title, Paragraph } = Typography;

const relatedCourses = [
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
  }
];



const CoursePage: React.FC = () => {
  return (
    <Layout>
      <AntLayout className="course-page">
        <Content>
          <div className="course-content-wrapper">
            {/* Hero Section */}
            <div className="course-hero">
              <Avatar size={80} src="https://via.placeholder.com/80" />
              <div>
                <Title level={1} className="course-hero-title">Course Title</Title>
                <Paragraph className="course-hero-instructor">Instructor Name</Paragraph>
                <Button type="primary" className="course-hero-btn">Enroll Now</Button>
                <Paragraph className="course-hero-enrolled">1000 students enrolled</Paragraph>
              </div>
            </div>
            {/* Course Highlights */}
            <Row gutter={20} className="course-highlights">
              <Col xs={24} sm={12} md={4}><Card title="Modules">5</Card></Col>
              <Col xs={24} sm={12} md={4}><Card title="Rating">4.5</Card></Col>
              <Col xs={24} sm={12} md={4}><Card title="Level">Beginner</Card></Col>
              <Col xs={24} sm={12} md={4}><Card title="Duration">10 hours</Card></Col>
              <Col xs={24} sm={12} md={4}><Card title="Schedule">Flexible</Card></Col>
            </Row>
            {/* Tabs */}
            <Tabs defaultActiveKey="1" className="course-tabs">
              <Tabs.TabPane tab="Introduction" key="1">
                <Paragraph>This is an introduction to the course.</Paragraph>
              </Tabs.TabPane>
              <Tabs.TabPane tab="Result" key="2">
                <Paragraph>Upon completion, you will achieve these results.</Paragraph>
              </Tabs.TabPane>
              <Tabs.TabPane tab="Syllabus" key="3">
                <List
                  itemLayout="horizontal"
                  dataSource={[
                    {
                      moduleNumber: 1,
                      moduleName: 'Christiano Ronaldo',
                      hoursToComplete: 5,
                      description: 'Ronaldo is a great player in the world of football and he is the best player in the world',
                      moduleDetails: '3 videos, 1 document, 4 assignments, 3 quizzes',
                      learningPath: [
                        { type: 'Video', name: 'Introduction to Python', time: '35 phút' },
                        { type: 'Document', name: 'Python Basics', time: '20 phút' },
                        { type: 'Assignment', name: 'Basic Exercises', time: '45 phút' },
                        { type: 'Quiz', name: 'Quiz 1', time: '15 phút' }
                      ]
                    },
                    {
                      moduleNumber: 2,
                      moduleName: 'Messi Lionel',
                      hoursToComplete: 4,
                      description: 'Messi is a great player in the world of football and he is the best player in the world',
                      moduleDetails: '2 videos, 2 documents, 3 assignments, 2 quizzes',
                      learningPath: [
                        { type: 'Video', name: 'Advanced Python', time: '40 phút' },
                        { type: 'Document', name: 'Advanced Topics', time: '25 phút' },
                        { type: 'Assignment', name: 'Advanced Exercises', time: '50 phút' },
                        { type: 'Quiz', name: 'Quiz 2', time: '20 phút' }
                      ]
                    }
                  ]}
                  renderItem={item => (
                    <SyllabusItem
                      moduleNumber={item.moduleNumber}
                      moduleName={item.moduleName}
                      hoursToComplete={item.hoursToComplete}
                      description={item.description}
                      moduleDetails={item.moduleDetails}
                      learningPath={item.learningPath}
                    />
                  )}
                />
              </Tabs.TabPane>
              <Tabs.TabPane tab="Instructor" key="4">
                <InstructorInfo
                  instructorName="Nguyễn Văn A"
                  rating={4.8}
                  ratingCount={1200}
                  avatar="https://randomuser.me/api/portraits/men/32.jpg"
                  organization="Đại học Bách Khoa"
                  courseCount={5}
                  studentCount={10000}
                  bio="Nguyễn Văn A là một giảng viên xuất sắc với nhiều năm kinh nghiệm trong lĩnh vực lập trình web."
                />
              </Tabs.TabPane>
              <Tabs.TabPane tab="Reviews" key="5">
                <Reviews
                  isEnrolled={true}
                  reviews={[
                    {
                      id: 1,
                      studentName: 'Nguyễn Văn B',
                      avatar: 'https://randomuser.me/api/portraits/men/45.jpg',
                      rating: 5,
                      comment: 'Khoá học rất tuyệt vời, giảng viên dạy dễ hiểu!',
                      date: '2024-05-01'
                    },
                    {
                      id: 2,
                      studentName: 'Trần Thị C',
                      avatar: 'https://randomuser.me/api/portraits/women/22.jpg',
                      rating: 4,
                      comment: 'Nội dung đầy đủ, thực tế, áp dụng được ngay.',
                      date: '2024-05-03'
                    },
                    {
                      id: 3,
                      studentName: 'Lê Văn D',
                      rating: 5,
                      comment: 'Giảng viên rất nhiệt tình, giải đáp mọi thắc mắc.',
                      date: '2024-05-05'
                    }
                  ]}
                />
              </Tabs.TabPane>
              <Tabs.TabPane tab="Related Courses" key="6">
                <Row gutter={[24, 24]}>
                  {relatedCourses.map((course, idx) => (
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
              </Tabs.TabPane>
            </Tabs>
          </div>
        </Content>
      </AntLayout>
    </Layout>
  );
};

export default CoursePage;
