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
      message.warning('Please provide both a rating and your feedback.');
      return;
    }
    setSubmitting(true);
    setTimeout(() => {
      onSubmitReview && onSubmitReview({ studentName: 'You', rating, comment });
      setRating(0);
      setComment('');
      setSubmitting(false);
      message.success('Review submitted!');
    }, 1000);
  };

  return (
    <section className="reviews-section">
      {isEnrolled && (
        <Card className="review-input-card" bordered={false}>
          <Title level={5} className="section-title">Write Your Review</Title>
          <Rate value={rating} onChange={setRating} style={{ marginBottom: 12 }} />
          <TextArea
            rows={4}
            value={comment}
            onChange={e => setComment(e.target.value)}
            placeholder="Share your thoughts about this course..."
            className="review-textarea"
          />
          <Button
            type="primary"
            loading={submitting}
            onClick={handleSubmit}
            className="submit-button"
          >
            Submit Review
          </Button>
        </Card>
      )}
      <List
        className="reviews-list"
        itemLayout="horizontal"
        dataSource={reviews}
        header={<Title level={5} className="section-title">Student Reviews</Title>}
        renderItem={item => (
          <List.Item>
            <List.Item.Meta
              avatar={<Avatar src={item.avatar} icon={!item.avatar && <UserOutlined />} size={44} />}
              title={
                <span className="reviewer-name">
                  <b>{item.studentName}</b>
                  <Rate disabled value={item.rating} style={{ fontSize: 15, marginLeft: 10 }} />
                </span>
              }
              description={
                <span>
                  <span className="review-comment">{item.comment}</span>
                  <br />
                  <Text type="secondary" className="review-date">{item.date}</Text>
                </span>
              }
            />
          </List.Item>
        )}
      />
    </section>
  );
};

export default Reviews;
