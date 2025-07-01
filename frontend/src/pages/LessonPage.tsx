import React, { useState } from 'react';
import { Layout, Avatar, Dropdown, Menu, Button, Typography, Tabs } from 'antd';
import { LeftOutlined, DownOutlined, UserOutlined, FileTextOutlined, VideoCameraOutlined } from '@ant-design/icons';
import './LessonPage.css';
import LessonVideo from '../components/LessonVideo';
import LessonDocument, { DocumentContent } from '../components/LessonDocument';
import LessonAssignment from '../components/LessonAssignment';
import LessonQuiz from '../components/LessonQuiz';

const { Sider, Content } = Layout;
const { Title, Text } = Typography;

const modules = [
  {
    moduleName: 'Giới thiệu Python',
    lessons: [
      { type: 'Video', name: 'Giới thiệu khoá học feafdafffffffffffggaeafffff', duration: '10 phút' },
      { type: 'Document', name: 'Tài liệu tổng quan', duration: '5 phút' },
      { type: 'Video', name: 'Cài đặt môi trường', duration: '15 phút' }
    ]
  },
  {
    moduleName: 'Biến & Kiểu dữ liệu',
    lessons: [
      { type: 'Video', name: 'Biến trong Python', duration: '12 phút' },
      { type: 'Document', name: 'Kiểu dữ liệu cơ bản', duration: '8 phút' },
      { type: 'Video', name: 'Thực hành biến', duration: '18 phút' }
    ]
  }
];

const lessonTypeIcon = (type: string) => {
  switch (type) {
    case 'Video':
      return <VideoCameraOutlined style={{ color: '#1890ff', fontSize: 18, marginRight: 8 }} />;
    case 'Document':
      return <FileTextOutlined style={{ color: '#52c41a', fontSize: 18, marginRight: 8 }} />;
    default:
      return <UserOutlined style={{ fontSize: 18, marginRight: 8 }} />;
  }
};

const userMenu = (
  <Menu>
    <Menu.Item key="profile">Profile</Menu.Item>
    <Menu.Item key="settings">Settings</Menu.Item>
    <Menu.Item key="logout">Logout</Menu.Item>
  </Menu>
);

const documentContent: DocumentContent[] = [
  { type: 'title', text: 'Giới thiệu về Python' },
  { type: 'para', text: 'Python là một ngôn ngữ lập trình mạnh mẽ, dễ học.' },
  { type: 'img', src: 'https://www.python.org/static/community_logos/python-logo.png', alt: 'Python Logo' },
  { type: 'para', text: 'Python được sử dụng rộng rãi trong khoa học dữ liệu, AI, web...' },
  { type: 'title', text: 'Cài đặt Python' },
  { type: 'para', text: 'Bạn có thể tải Python từ trang chủ python.org.' }
];

const assignmentComments = [
  { id: 1, author: 'Nguyễn Văn A', content: 'Thầy ơi cho em hỏi về bài này.', date: '2024-05-01' },
  { id: 2, author: 'Giảng viên', content: 'Em cần chú ý phần mô tả.', date: '2024-05-02' }
];

const quizQuestions = [
  { id: 1, question: 'Python là ngôn ngữ gì?', options: ['Lập trình web', 'Lập trình hệ thống', 'Lập trình đa năng', 'Chỉ dùng cho AI'] },
  { id: 2, question: 'Cách khai báo biến trong Python?', options: ['var x = 5', 'x = 5', 'let x = 5', 'int x = 5'] }
];

const LessonPage: React.FC = () => {
  const [openModule, setOpenModule] = useState<number | null>(null);

  return (
    <Layout className="lesson-layout">
      {/* Header */}
      <div className="lesson-header">
        <div className="lesson-header-left">
          <Button type="link" icon={<LeftOutlined />} className="back-btn">
            Back
          </Button>
          <span className="course-title">Python Cho Người Mới</span>
        </div>
        <div className="lesson-header-right">
          <Dropdown overlay={userMenu} placement="bottomRight" trigger={["click"]}>
            <Avatar size={36} src="https://randomuser.me/api/portraits/men/32.jpg" style={{ cursor: 'pointer' }} />
          </Dropdown>
        </div>
      </div>
      <Layout>
        {/* Sidebar */}
        <Sider width={320} className="lesson-sider">
          <div className="module-navbar">
            <div className="fixed-options">
              <div className="fixed-option view-intro">
                <Button type="text" icon={<FileTextOutlined style={{ color: '#1890ff', fontSize: 18 }} />} className="fixed-btn">
                  View course introduction
                </Button>
              </div>
              <div className="fixed-option group-chat">
                <Button type="text" icon={<UserOutlined style={{ color: '#52c41a', fontSize: 18 }} />} className="fixed-btn">
                  Group chat
                </Button>
              </div>
            </div>
            {modules.map((mod, idx) => (
              <div key={idx} className="module-item">
                <div
                  className="module-title-row"
                  onClick={() => setOpenModule(openModule === idx ? null : idx)}
                >
                  <span className="module-title">Module {idx + 1}: {mod.moduleName}</span>
                  <DownOutlined
                    className={openModule === idx ? 'arrow open' : 'arrow'}
                  />
                </div>
                {openModule === idx && (
                  <div className="module-lessons">
                    {mod.lessons.map((lesson, lidx) => (
                      <div key={lidx} className="lesson-row">
                        <div className="lesson-info">
                          {lessonTypeIcon(lesson.type)}
                          {/* <span className="lesson-type">{lesson.type}</span> */}
                          <span className="lesson-name">{lesson.name}</span>
                        </div>
                        <div className="lesson-duration">{lesson.duration}</div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </Sider>
        <Content className="lesson-content">
          {/* Nội dung bài học sẽ hiển thị ở đây */}
          <Tabs defaultActiveKey="video" style={{ background: '#fff', borderRadius: 8, padding: 16 }}>
            <Tabs.TabPane tab="Video" key="video">
              <LessonVideo
                videoUrl="https://www.w3schools.com/html/mov_bbb.mp4"
                description="Đây là video giới thiệu về khoá học Python."
              />
            </Tabs.TabPane>
            <Tabs.TabPane tab="Document" key="document">
              <LessonDocument content={documentContent} />
            </Tabs.TabPane>
            <Tabs.TabPane tab="Assignment" key="assignment">
              <LessonAssignment
                title="Bài tập 1: Cài đặt Python"
                createdAt="2024-05-01"
                dueAt="2024-05-10"
                score={7}
                maxScore={10}
                weight={10}
                description="Hãy cài đặt Python và gửi ảnh chụp màn hình."
                comments={assignmentComments}
              />
            </Tabs.TabPane>
            <Tabs.TabPane tab="Quiz" key="quiz">
              <LessonQuiz
                title="Quiz 1: Kiến thức cơ bản về Python"
                createdAt="2024-05-01"
                openAt="2024-05-05"
                duration="30 phút"
                description="Quiz kiểm tra kiến thức cơ bản về Python."
                questions={quizQuestions}
              />
            </Tabs.TabPane>
          </Tabs>
        </Content>
      </Layout>
    </Layout>
  );
};

export default LessonPage; 