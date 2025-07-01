import React from 'react';
import { Typography } from 'antd';

const { Paragraph } = Typography;

interface LessonVideoProps {
  videoUrl: string;
  description: string;
}

const LessonVideo: React.FC<LessonVideoProps> = ({ videoUrl, description }) => (
  <div className="lesson-video">
    <video controls width="100%" style={{ borderRadius: 8, marginBottom: 16 }}>
      <source src={videoUrl} type="video/mp4" />
      Trình duyệt của bạn không hỗ trợ video.
    </video>
    <Paragraph>{description}</Paragraph>
  </div>
);

export default LessonVideo; 