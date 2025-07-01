import React, { useState } from 'react';
import { Layout, Menu, Avatar, Dropdown, Row, Col, Typography, Input, Button, Modal, Form, Select, message, Space } from 'antd';
import { HomeOutlined, UserOutlined, EditOutlined, DeleteOutlined, PlayCircleOutlined } from '@ant-design/icons';
import CourseCard from '../components/CourseCard';
import { PlusOutlined } from '@ant-design/icons';
import EditCourse, { CourseData, Module } from '../components/EditCourse';
import GradingPanel from '../components/GradingPanel';

const { Header, Sider, Content } = Layout;
const { Title } = Typography;
const { Search } = Input;
const { Option } = Select;

type Course = CourseData & {
  courseImage: string;
  instructorAvatar: string;
  instructorName: string;
  rating: number;
  ratingCount: number;
  duration: string;
  isActive: boolean;
};

const initialCourses: Course[] = [
  {
    courseImage: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=600&q=80",
    courseName: "ReactJS Cơ Bản Đến Nâng Cao",
    description: "Dạy ReactJS từ cơ bản tới nâng cao, thực hành dự án thực tế.",
    instructorAvatar: "https://randomuser.me/api/portraits/men/32.jpg",
    instructorName: "Nguyễn Văn A",
    courseCategory: "Lập trình Web",
    rating: 4.8,
    ratingCount: 1200,
    level: "Beginner",
    duration: "10h",
    isActive: true,
    modules: [],
  },
  {
    courseImage: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=600&q=80",
    courseName: "NodeJS Thực Chiến",
    description: "Xây dựng API và ứng dụng backend với NodeJS.",
    instructorAvatar: "https://randomuser.me/api/portraits/women/44.jpg",
    instructorName: "Trần Thị B",
    courseCategory: "Backend",
    rating: 4.6,
    ratingCount: 950,
    level: "Intermediate",
    duration: "15h",
    isActive: false,
    modules: [],
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
    isActive: false,
    modules: [],
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
    isActive: false,
    modules: [],
  },
  {
    courseImage: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=600&q=80",
    courseName: "NodeJS Thực Chiến",
    description: "Xây dựng API và ứng dụng backend với NodeJS.",
    instructorAvatar: "https://randomuser.me/api/portraits/women/44.jpg",
    instructorName: "Trần Thị B",
    courseCategory: "Backend",
    rating: 4.6,
    ratingCount: 950,
    level: "Intermediate",
    duration: "15h",
    isActive: false,
    modules: [],
  },
];

const menu = (
  <Menu>
    <Menu.Item key="profile">Profile</Menu.Item>
    <Menu.Item key="settings">Settings</Menu.Item>
    <Menu.Divider />
    <Menu.Item key="logout">Logout</Menu.Item>
  </Menu>
);

const TeacherDashboard: React.FC = () => {
  const [searchText, setSearchText] = useState('');
  const [courses, setCourses] = useState<Course[]>(initialCourses);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [form] = Form.useForm();
  const [editingCourseIdx, setEditingCourseIdx] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState<'courses' | 'grading' | 'records'>('courses');

  // Lọc theo tên khoá học
  const filteredCourses = courses.filter(course =>
    course.courseName.toLowerCase().includes(searchText.trim().toLowerCase())
  );

  // Xử lý tạo khoá học mới
  const handleCreateCourse = (values: any) => {
    const newCourse: Course = {
      ...values,
      courseImage: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=600&q=80', // default
      instructorAvatar: 'https://randomuser.me/api/portraits/men/32.jpg', // default
      instructorName: 'Bạn',
      rating: 0,
      ratingCount: 0,
      duration: '0h',
      isActive: false,
      modules: [],
    };
    setCourses([newCourse, ...courses]);
    setIsCreateModalOpen(false);
    form.resetFields();
    message.success('Tạo khoá học thành công!');
  };

  // Xử lý xoá khoá học
  const handleDeleteCourse = (idx: number) => {
    Modal.confirm({
      title: 'Xác nhận xoá',
      content: 'Bạn có chắc muốn xoá khoá học này?',
      okText: 'Xoá',
      cancelText: 'Huỷ',
      onOk: () => {
        setCourses(courses.filter((_, i) => i !== idx));
        message.success('Đã xoá khoá học.');
      },
    });
  };

  // Xử lý khởi động khoá học
  const handleActivateCourse = (idx: number) => {
    setCourses(courses.map((c, i) => i === idx ? { ...c, isActive: true } : c));
    message.success('Khoá học đã được khởi động!');
  };

  // Xử lý edit
  const handleEditCourse = (idx: number) => {
    setEditingCourseIdx(idx);
  };

  // Lưu thay đổi khoá học
  const handleSaveEditCourse = (updated: CourseData) => {
    if (editingCourseIdx === null) return;
    setCourses(courses.map((c, i) => i === editingCourseIdx ? { ...c, ...updated } : c));
    setEditingCourseIdx(null);
    message.success('Đã cập nhật khoá học!');
  };

  // Huỷ chỉnh sửa
  const handleCancelEditCourse = () => {
    setEditingCourseIdx(null);
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      {/* Custom Header */}
      <Header style={{ background: '#fff', padding: '0 20px', display: 'flex', alignItems: 'center' }}>
        <HomeOutlined style={{ fontSize: '24px', marginRight: '10px' }} />
        <Title level={3} style={{ margin: 0, flex: 1 }}>Teacher Workspace</Title>
        <Dropdown overlay={menu} trigger={['click']}>
          <Avatar size="large" icon={<UserOutlined />} style={{ cursor: 'pointer' }} />
        </Dropdown>
      </Header>

      <Layout>
        {/* Vertical Navbar */}
        <Sider width={200} style={{ background: '#fff' }}>
          <Menu mode="inline" selectedKeys={[activeTab]} style={{ height: '100%' }}>
            <Menu.Item key="courses" onClick={() => setActiveTab('courses')}>All Courses</Menu.Item>
            <Menu.Item key="grading" onClick={() => setActiveTab('grading')}>Grading</Menu.Item>
            <Menu.Item key="records" onClick={() => setActiveTab('records')}>Records</Menu.Item>
          </Menu>
        </Sider>

        {/* Main Content Section */}
        <Content style={{ padding: '20px' }}>
          {activeTab === 'courses' && (
            editingCourseIdx !== null ? (
              <EditCourse
                course={{ ...courses[editingCourseIdx], modules: courses[editingCourseIdx].modules || [] }}
                onSave={handleSaveEditCourse}
                onCancel={handleCancelEditCourse}
              />
            ) : (
              <div style={{ maxWidth: 1600, margin: '0 auto' }}>
                <div
                  style={{
                    marginBottom: 24,
                    display: 'flex',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    gap: 16,
                  }}
                >
                  <Button
                    type="primary"
                    icon={<PlusOutlined />}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      fontWeight: 600,
                      padding: '0 24px',
                      height: 40,
                    }}
                    onClick={() => setIsCreateModalOpen(true)}
                  >
                    Tạo khoá học
                  </Button>
                  <Input.Search
                    placeholder="Tìm kiếm tên khoá học..."
                    allowClear
                    enterButton
                    size="large"
                    style={{
                      maxWidth: 340,
                      height: 40,
                    }}
                    value={searchText}
                    onChange={e => setSearchText(e.target.value)}
                  />
                </div>
                {/* Danh sách khoá học */}
                <Row gutter={[16, 16]}>
                  {filteredCourses.map((course, idx) => (
                    <Col key={idx} xs={24} sm={12} md={8} lg={6}>
                      <div style={{ position: 'relative' }}>
                        <CourseCard
                          courseImage={course.courseImage}
                          courseName={course.courseName}
                          description={course.description}
                          courseCategory={course.courseCategory}
                          rating={course.rating}
                          ratingCount={course.ratingCount}
                          level={course.level}
                          duration={course.duration}
                          style={{
                            maxWidth: 400,
                            margin: 2,
                          }}
                        />
                        <Space style={{ marginTop: 8 }}>
                          {!course.isActive && (
                            <Button size="small" icon={<PlayCircleOutlined />} onClick={() => handleActivateCourse(idx)}>
                              Khởi động khoá học
                            </Button>
                          )}
                          <Button size="small" icon={<EditOutlined />} onClick={() => handleEditCourse(idx)}>
                            Edit
                          </Button>
                          <Button size="small" icon={<DeleteOutlined />} danger onClick={() => handleDeleteCourse(idx)}>
                            Delete
                          </Button>
                        </Space>
                      </div>
                    </Col>
                  ))}
                </Row>
              </div>
            )
          )}
          {activeTab === 'grading' && <GradingPanel />}
          {/* Records tab có thể bổ sung sau */}
          {/* Modal tạo khoá học mới */}
          <Modal
            title="Tạo khoá học mới"
            open={isCreateModalOpen}
            onCancel={() => setIsCreateModalOpen(false)}
            onOk={() => form.submit()}
            okText="Lưu"
            cancelText="Huỷ"
          >
            <Form
              form={form}
              layout="vertical"
              onFinish={handleCreateCourse}
            >
              <Form.Item
                label="Tên khoá học"
                name="courseName"
                rules={[{ required: true, message: 'Vui lòng nhập tên khoá học!' }]}
              >
                <Input placeholder="Nhập tên khoá học" />
              </Form.Item>
              <Form.Item
                label="Danh mục"
                name="courseCategory"
                rules={[{ required: true, message: 'Vui lòng chọn danh mục!' }]}
              >
                <Select placeholder="Chọn danh mục">
                  <Option value="Lập trình Web">Lập trình Web</Option>
                  <Option value="Backend">Backend</Option>
                  <Option value="Thiết kế">Thiết kế</Option>
                  <Option value="Khác">Khác</Option>
                </Select>
              </Form.Item>
              <Form.Item
                label="Trình độ"
                name="level"
                rules={[{ required: true, message: 'Vui lòng chọn trình độ!' }]}
              >
                <Select placeholder="Chọn trình độ">
                  <Option value="Beginner">Beginner</Option>
                  <Option value="Intermediate">Intermediate</Option>
                  <Option value="Advanced">Advanced</Option>
                </Select>
              </Form.Item>
              <Form.Item
                label="Mô tả"
                name="description"
                rules={[{ required: true, message: 'Vui lòng nhập mô tả!' }]}
              >
                <Input.TextArea rows={3} placeholder="Nhập mô tả khoá học" />
              </Form.Item>
            </Form>
          </Modal>
        </Content>
      </Layout>
    </Layout>
  );
};

export default TeacherDashboard;

