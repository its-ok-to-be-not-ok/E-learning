import React from 'react';
import { Card, Avatar, Typography, Rate, Divider, Tooltip } from 'antd';
import { InfoCircleOutlined, StarFilled } from '@ant-design/icons';
import './InstructorInfo.css';

const { Title, Paragraph, Text } = Typography;

interface InstructorInfoProps {
    instructorName: string;
    rating: number;
    ratingCount: number;
    avatar: string;
    organization: string;
    courseCount: number;
    studentCount: number;
    bio: string;
}

const InstructorInfo: React.FC<InstructorInfoProps> = ({
    instructorName,
    rating,
    ratingCount,
    avatar,
    organization,
    courseCount,
    studentCount,
    bio
}) => {
    return (
        <Card className="instructor-info-card" bordered={false}>
            <Title level={5} style={{ marginBottom: 8 }}>Giảng viên</Title>
            <div className="instructor-rating-row">
                <Text type="secondary" style={{ fontSize: 13, marginRight: 4 }}>
                    Đánh giá giảng viên
                    <Tooltip title="Điểm trung bình từ học viên">
                        <InfoCircleOutlined style={{ marginLeft: 4, fontSize: 13 }} />
                    </Tooltip>
                </Text>
                <Text style={{ fontWeight: 600, fontSize: 16, color: '#222', margin: '0 6px' }}>
                    {rating.toFixed(1)}
                </Text>
                <StarFilled style={{ color: '#f7b500', fontSize: 16, marginRight: 6 }} />
                <Text type="secondary" style={{ fontSize: 13 }}>
                    ({ratingCount.toLocaleString()} xếp hạng)
                </Text>
            </div>
            <div className="instructor-profile-row">
                <Avatar size={56} src={avatar} />
                <div className="instructor-profile-info">
                    <Text strong style={{ fontSize: 16, display: 'block' }}>{instructorName}</Text>
                    <Text type="secondary" style={{ fontSize: 14 }}>{organization}</Text>
                    <div style={{ marginTop: 8, fontSize: 14 }}>
                        <span>{courseCount} Khóa học</span>
                        <span style={{ margin: '0 8px' }}>•</span>
                        <span>{studentCount.toLocaleString()} học viên</span>
                    </div>
                </div>
            </div>
            <Divider style={{ margin: '16px 0' }} />
            <Title level={5} style={{ marginBottom: 8 }}>Giới thiệu</Title>
            <Paragraph style={{ fontSize: 15, lineHeight: 1.7 }}>{bio}</Paragraph>
        </Card>
    );
};

export default InstructorInfo;
