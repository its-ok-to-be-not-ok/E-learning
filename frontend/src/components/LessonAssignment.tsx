import React, { useState } from 'react';
import { Typography, Input, Button, Upload, List, Avatar, message } from 'antd';
import { UploadOutlined, UserOutlined } from '@ant-design/icons';
import './LessonAssignment.css';

const { Title, Paragraph, Text } = Typography;

interface Comment {
  id: number;
  author: string;
  avatar?: string;
  content: string;
  date: string;
}

interface LessonAssignmentProps {
  title: string;
  createdAt: string;
  dueAt: string;
  score: number;
  maxScore: number;
  weight: number;
  description: string;
  comments: Comment[];
}

const LessonAssignment: React.FC<LessonAssignmentProps> = ({
  title, createdAt, dueAt, score, maxScore, weight, description, comments
}) => {
  const [file, setFile] = useState<any>(null);
  const [submitted, setSubmitted] = useState(false);
  const [comment, setComment] = useState('');
  const [commentList, setCommentList] = useState(comments);

  const handleUpload = (info: any) => {
    setFile(info.file);
  };

  const handleSubmit = () => {
    if (!file) return message.warning('Vui lòng upload file trước khi nộp bài!');
    setSubmitted(true);
    message.success('Đã nộp bài thành công!');
  };

  const handleCancel = () => {
    setFile(null);
    setSubmitted(false);
  };

  const handleAddComment = () => {
    if (!comment.trim()) return;
    setCommentList([
      ...commentList,
      { id: Date.now(), author: 'Bạn', content: comment, date: new Date().toLocaleString() }
    ]);
    setComment('');
  };

  return (
    <div className="lesson-assignment">
      <Title level={3}>{title}</Title>
      <Text type="secondary">Tạo lúc: {createdAt} | Đến hạn: {dueAt}</Text>
      <Paragraph>
        <b>Điểm:</b> {score}/{maxScore} | <b>Trọng số:</b> {weight}%
      </Paragraph>
      <Paragraph><b>Mô tả:</b> {description}</Paragraph>
      <div className="assignment-comments">
        <Title level={5} style={{ marginTop: 24 }}>Bình luận</Title>
        <List
          dataSource={commentList}
          renderItem={item => (
            <List.Item>
              <List.Item.Meta
                avatar={<Avatar src={item.avatar} icon={!item.avatar && <UserOutlined />} />}
                title={<span>{item.author}</span>}
                description={<span>{item.content}<br /><Text type="secondary" style={{ fontSize: 12 }}>{item.date}</Text></span>}
              />
            </List.Item>
          )}
        />
        <Input.TextArea
          rows={2}
          value={comment}
          onChange={e => setComment(e.target.value)}
          placeholder="Viết bình luận..."
          style={{ marginTop: 8, marginBottom: 8 }}
        />
        <Button type="primary" onClick={handleAddComment}>Gửi</Button>
      </div>
      <div className="assignment-upload">
        <Title level={5} style={{ marginTop: 24 }}>Nộp bài tập</Title>
        <Upload beforeUpload={() => false} onChange={handleUpload} showUploadList={!!file}>
          <Button icon={<UploadOutlined />}>Chọn file</Button>
        </Upload>
        {file && <Text style={{ marginLeft: 8 }}>{file.name}</Text>}
        <div style={{ marginTop: 12 }}>
          {!submitted ? (
            <Button type="primary" onClick={handleSubmit} disabled={!file}>Nộp bài</Button>
          ) : (
            <Button danger onClick={handleCancel}>Huỷ nộp bài</Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default LessonAssignment; 