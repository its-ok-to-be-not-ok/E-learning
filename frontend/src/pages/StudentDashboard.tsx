import React, { useState } from 'react';
import { Layout, Menu, Avatar, Dropdown, Row, Col, Typography, Input, Progress, Tag, Tabs, Card, Button, Divider, List } from 'antd';
import { HomeOutlined, UserOutlined, ArrowRightOutlined } from '@ant-design/icons';
import CourseCard from '../components/CourseCard';

const { Header, Sider, Content } = Layout;
const { Title, Text } = Typography;
const { Search } = Input;

const studentCourses = [
  {
    courseImage: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=600&q=80",
    courseName: "ReactJS Cơ Bản Đến Nâng Cao",
    description: "Học ReactJS từ cơ bản đến nâng cao, thực hành dự án thực tế.",
    instructorAvatar: "https://randomuser.me/api/portraits/men/32.jpg",
    instructorName: "Nguyễn Văn A",
    courseCategory: "Lập trình Web",
    rating: 4.8,
    ratingCount: 1200,
    level: "Beginner",
    duration: "10h",
    progress: 80,
    status: "Đang học"
  },
  {
    courseImage: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=600&q=80",
    courseName: "NodeJS Thực Chiến",
    description: "Thực hành NodeJS qua dự án, xây dựng API backend.",
    instructorAvatar: "https://randomuser.me/api/portraits/women/44.jpg",
    instructorName: "Trần Thị B",
    courseCategory: "Backend",
    rating: 4.6,
    ratingCount: 950,
    level: "Intermediate",
    duration: "15h",
    progress: 100,
    status: "Hoàn thành"
  },
  {
    courseImage: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80",
    courseName: "UI/UX Design Cơ Bản",
    description: "Nguyên lý thiết kế giao diện và trải nghiệm người dùng.",
    instructorAvatar: "https://randomuser.me/api/portraits/men/65.jpg",
    instructorName: "Lê Văn C",
    courseCategory: "Thiết kế",
    rating: 4.7,
    ratingCount: 780,
    level: "Beginner",
    duration: "8h",
    progress: 40,
    status: "Đang học"
  },
  {
    courseImage: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80",
    courseName: "UI/UX Design Cơ Bản",
    description: "Nguyên lý thiết kế giao diện và trải nghiệm người dùng.",
    instructorAvatar: "https://randomuser.me/api/portraits/men/65.jpg",
    instructorName: "Lê Văn C",
    courseCategory: "Thiết kế",
    rating: 4.7,
    ratingCount: 780,
    level: "Beginner",
    duration: "8h",
    progress: 40,
    status: "Đang học"
  },
  {
    courseImage: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80",
    courseName: "UI/UX Design Cơ Bản",
    description: "Nguyên lý thiết kế giao diện và trải nghiệm người dùng.",
    instructorAvatar: "https://randomuser.me/api/portraits/men/65.jpg",
    instructorName: "Lê Văn C",
    courseCategory: "Thiết kế",
    rating: 4.7,
    ratingCount: 780,
    level: "Beginner",
    duration: "8h",
    progress: 40,
    status: "Đang học"
  },
  
  
];

const assignmentTabs = [
  { key: 'not_completed', label: 'Chưa hoàn thành' },
  { key: 'completed', label: 'Đã hoàn thành' },
  { key: 'late', label: 'Hoàn thành muộn' },
  { key: 'overdue', label: 'Quá hạn' }
];

const assignmentsData = [
  {
    id: 1,
    title: 'Bài tập 1: Cài đặt Python',
    createdAt: '2024-05-01',
    dueAt: '2024-05-10',
    score: 7,
    maxScore: 10,
    weight: 10,
    status: 'not_completed',
    course: 'Python Cho Người Mới',
    instructor: 'Nguyễn Văn A'
  },
  {
    id: 2,
    title: 'Bài tập 2: Biến & Kiểu dữ liệu',
    createdAt: '2024-05-02',
    dueAt: '2024-05-12',
    score: 10,
    maxScore: 10,
    weight: 20,
    status: 'completed',
    course: 'Python Cho Người Mới',
    instructor: 'Nguyễn Văn A'
  },
  {
    id: 3,
    title: 'Bài tập 3: NodeJS API',
    createdAt: '2024-04-20',
    dueAt: '2024-04-27',
    score: 8,
    maxScore: 10,
    weight: 15,
    status: 'late',
    course: 'NodeJS Thực Chiến',
    instructor: 'Trần Thị B'
  },
  {
    id: 4,
    title: 'Bài tập 4: UI/UX Wireframe',
    createdAt: '2024-03-10',
    dueAt: '2024-03-17',
    score: 0,
    maxScore: 10,
    weight: 10,
    status: 'overdue',
    course: 'UI/UX Design Cơ Bản',
    instructor: 'Lê Văn C'
  },
  {
    id: 4,
    title: 'Bài tập 4: UI/UX Wireframe',
    createdAt: '2024-03-10',
    dueAt: '2024-03-17',
    score: 0,
    maxScore: 10,
    weight: 10,
    status: 'overdue',
    course: 'UI/UX Design Cơ Bản',
    instructor: 'Lê Văn C'
  }
];

const archivedCourses = [
  {
    id: 1,
    name: 'Python Cho Người Mới',
    instructor: 'Nguyễn Văn A',
    endDate: '05/10/2024',
    finalScore: 8.4,
    assignments: [
      { title: 'Bài tập 1', score: 7, maxScore: 10, file: 'baitap1.pdf' },
      { title: 'Bài tập 2', score: 7, maxScore: 10, file: 'baitap2.pdf' },
      { title: 'Bài tập 3', score: 8, maxScore: 10, file: 'baitap3.pdf' },
      { title: 'Bài tập 4', score: 9, maxScore: 10, file: 'baitap4.pdf' }
    ],
    certificate: 'python_certificate.pdf'
  }
];

const menu = (
  <Menu>
    <Menu.Item key="profile">Profile</Menu.Item>
    <Menu.Item key="settings">Settings</Menu.Item>
    <Menu.Divider />
    <Menu.Item key="logout">Logout</Menu.Item>
  </Menu>
);

const StudentDashboard: React.FC = () => {
  const [searchText, setSearchText] = useState('');
  const [activeTab, setActiveTab] = useState('not_completed');
  const [selectedCourse, setSelectedCourse] = useState<number | null>(null);

  // Lọc khoá học theo tên
  const filteredCourses = studentCourses.filter(course =>
    course.courseName.toLowerCase().includes(searchText.trim().toLowerCase())
  );

  const filteredAssignments = assignmentsData.filter(a => a.status === activeTab);

  return (
    <Layout style={{ minHeight: '100vh' }}>
      {/* Custom Header */}
      <Header style={{ background: '#fff', padding: '0 20px', display: 'flex', alignItems: 'center' }}>
        <HomeOutlined style={{ fontSize: '24px', marginRight: '10px' }} />
        <Title level={3} style={{ margin: 0, flex: 1 }}>My Courses</Title>
        <Dropdown overlay={menu} trigger={['click']}>
          <Avatar size="large" icon={<UserOutlined />} style={{ cursor: 'pointer' }} />
        </Dropdown>
      </Header>

      <Layout>
        {/* Vertical Navbar */}
        <Sider width={200} style={{ background: '#fff' }}>
          <Menu mode="inline" defaultSelectedKeys={['1']} style={{ height: '100%' }}>
            <Menu.Item key="1">Active Courses</Menu.Item>
            <Menu.Item key="2">Assignments</Menu.Item>
            <Menu.Item key="3">Archived Courses</Menu.Item>
            <Menu.Item key="4">Achievements</Menu.Item>
          </Menu>
        </Sider>

        {/* Course Display Section */}
        <Content style={{ padding: '20px' }}>
          {/* Thanh tìm kiếm */}
          <div style={{ maxWidth: 1600, margin: '0 auto' }}>
            <div
              style={{
                marginBottom: 24,
                display: 'flex',
                alignItems: 'center',
                gap: 16,
                justifyContent: 'flex-start'
              }}
            >
              <Search
                placeholder="Tìm kiếm tên khoá học..."
                allowClear
                enterButton
                size="large"
                style={{ maxWidth: 340, height: 48 }}
                value={searchText}
                onChange={e => setSearchText(e.target.value)}
              />
            </div>
            {/* Danh sách khoá học */}
            <Row gutter={[16, 16]} justify="start">
              {filteredCourses.map((course, idx) => (
                <Col key={idx} xs={24} sm={12} md={8} lg={6}>
                  <div style={{ position: "relative", textAlign: "left" }}>
                    <CourseCard
                      courseImage={course.courseImage}
                      courseName={course.courseName}
                      description={course.description}
                      instructorAvatar={course.instructorAvatar}
                      instructorName={course.instructorName}
                      courseCategory={course.courseCategory}
                      rating={course.rating}
                      ratingCount={course.ratingCount}
                      level={course.level}
                      duration={course.duration}
                      style={{ maxWidth: 400, margin: 2 }}
                    />
                    {/* Hiển thị tiến độ và trạng thái nếu muốn */}
                    <div style={{ position: "absolute", top: 16, right: 16 }}>
                      <Tag color={course.status === "Hoàn thành" ? "green" : "blue"}>{course.status}</Tag>
                    </div>
                    <div style={{ margin: "0 16px 8px 16px" }}>
                      <Progress percent={course.progress} size="small" showInfo={false} />
                    </div>
                  </div>
                </Col>
              ))}
            </Row>
          </div>
          <Divider style={{ margin: '40px 0 24px 0' }} />
          <Title level={2}>Assignments</Title>
          <Tabs
            activeKey={activeTab}
            onChange={setActiveTab}
            style={{ marginBottom: 24 }}
          >
            {assignmentTabs.map(tab => (
              <Tabs.TabPane tab={tab.label} key={tab.key} />
            ))}
          </Tabs>
          <div>
            {filteredAssignments.length === 0 ? (
              <Text type="secondary">Không có bài tập nào.</Text>
            ) : (
              filteredAssignments.map(a => (
                <Card key={a.id} style={{ marginBottom: 16 }} bodyStyle={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ textAlign: 'left' }}>
                    <Title level={4} style={{ marginBottom: 4 }}>{a.title}</Title>
                    <Text type="secondary">Tạo lúc: {a.createdAt} - Đến hạn: {a.dueAt}</Text><br />
                    <Text>Điểm: {a.score}/{a.maxScore} | Trọng số: {a.weight}%</Text><br />
                    <Text>Khoá học: {a.course} | Giảng viên: {a.instructor}</Text>
                  </div>
                  <Button type="primary" icon={<ArrowRightOutlined />}>
                    Đến bài tập
                  </Button>
                </Card>
              ))
            )}
          </div>
          <Divider style={{ margin: '40px 0 24px 0' }} />
          <Title level={2}>Archived Courses</Title>
          <Row gutter={[24, 24]}>
            {archivedCourses.map(course => (
              <Col xs={24} md={12} lg={8} key={course.id}>
                <Card
                  title={course.name}
                  extra={<Button type="link" onClick={() => setSelectedCourse(course.id)}>Xem chi tiết</Button>}
                  style={{ marginBottom: 16 }}
                >
                  <Text>Giảng viên: {course.instructor}</Text><br />
                  <Text type="secondary">Kết thúc: {course.endDate}</Text><br />
                  <Text strong>Điểm tổng kết: {course.finalScore}</Text><br />
                  <Text type="success">Chứng chỉ: <a href={course.certificate} download>Tải về PDF</a></Text>
                </Card>
              </Col>
            ))}
          </Row>
          {selectedCourse && (
            <Card
              title={`Kết quả học tập - ${archivedCourses.find(c => c.id === selectedCourse)?.name}`}
              style={{ marginTop: 32 }}
              extra={<Button onClick={() => setSelectedCourse(null)}>Đóng</Button>}
            >
              <Text strong>Điểm tổng kết: {archivedCourses.find(c => c.id === selectedCourse)?.finalScore}</Text><br />
              <Text type="success">Chứng chỉ: <a href={archivedCourses.find(c => c.id === selectedCourse)?.certificate} download>Tải về PDF</a></Text>
              <Divider />
              <Title level={4}>Assignments</Title>
              <List
                dataSource={archivedCourses.find(c => c.id === selectedCourse)?.assignments || []}
                renderItem={item => (
                  <List.Item>
                    <List.Item.Meta
                      title={item.title}
                      description={<span>Điểm: {item.score}/{item.maxScore} | File: <a href={item.file} download>{item.file}</a></span>}
                    />
                  </List.Item>
                )}
              />
            </Card>
          )}
        </Content>
      </Layout>
    </Layout>
  );
};

export default StudentDashboard;
