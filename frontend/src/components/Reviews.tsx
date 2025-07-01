import React, { useState } from 'react';
import { Card, List, Avatar, Rate, Input, Button, Typography, message } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import './Reviews.css';

const { TextArea } = Input;
const { Title, Text } = Typography;

interface Review {
  id: number;
  studentName: string;
  avatar?: string;
  rating: number;
  comment: string;
  date: string;
}

interface ReviewsProps {
  reviews: Review[];
  isEnrolled: boolean;
  onSubmitReview?: (review: Omit<Review, 'id' | 'date'>) => void;
}

const Reviews: React.FC<ReviewsProps> = ({ reviews, isEnrolled, onSubmitReview }) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = () => {
    if (!rating || !comment.trim()) {
      message.warning('Vui lòng nhập đầy đủ đánh giá và nhận xét.');
      return;
    }
    setSubmitting(true);
    setTimeout(() => {
      onSubmitReview && onSubmitReview({ studentName: 'Bạn', rating, comment });
      setRating(0);
      setComment('');
      setSubmitting(false);
      message.success('Đã gửi đánh giá!');
    }, 1000);
  };

  return (
    <div className="reviews-section">
      {isEnrolled && (
        <Card className="review-input-card" bordered={false}>
          <Title level={5} style={{ marginBottom: 8 }}>Viết đánh giá của bạn</Title>
          <Rate value={rating} onChange={setRating} style={{ marginBottom: 8 }} />
          <TextArea
            rows={3}
            value={comment}
            onChange={e => setComment(e.target.value)}
            placeholder="Chia sẻ cảm nhận về khoá học..."
            style={{ marginBottom: 8 }}
          />
          <Button type="primary" loading={submitting} onClick={handleSubmit}>
            Gửi đánh giá
          </Button>
        </Card>
      )}
      <List
        className="reviews-list"
        itemLayout="horizontal"
        dataSource={reviews}
        header={<Title level={5} style={{ margin: 0 }}>Đánh giá từ học viên</Title>}
        renderItem={item => (
          <List.Item>
            <List.Item.Meta
              avatar={<Avatar src={item.avatar} icon={!item.avatar && <UserOutlined />} />}
              title={<span><b>{item.studentName}</b> <Rate disabled value={item.rating} style={{ fontSize: 14, marginLeft: 8 }} /></span>}
              description={<span>{item.comment}<br /><Text type="secondary" style={{ fontSize: 12 }}>{item.date}</Text></span>}
            />
          </List.Item>
        )}
      />
    </div>
  );
};

export default Reviews; 