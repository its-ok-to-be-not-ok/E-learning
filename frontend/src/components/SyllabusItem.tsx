import React, { useState } from 'react';
import { Card, Button, List, Space, Typography } from 'antd';
import { DownOutlined, UpOutlined } from '@ant-design/icons';
import {
  PlayCircleOutlined,
  FileTextOutlined,
  EditOutlined,
  QuestionCircleOutlined
} from '@ant-design/icons';

const { Text } = Typography;

const iconMap: Record<string, React.ReactNode> = {
  video: <PlayCircleOutlined style={{ fontSize: 20, color: '#1890ff' }} />,
  document: <FileTextOutlined style={{ fontSize: 20, color: '#52c41a' }} />,
  assignment: <EditOutlined style={{ fontSize: 20, color: '#faad14' }} />,
  quiz: <QuestionCircleOutlined style={{ fontSize: 20, color: '#eb2f96' }} />,
};

interface SyllabusItemProps {
  moduleNumber: number;
  moduleName: string;
  hoursToComplete: number;
  description: string;
  moduleDetails: string;
  learningPath: { type: string; name: string; time: string; }[];
}

const SyllabusItem: React.FC<SyllabusItemProps> = ({
  moduleNumber,
  moduleName,
  hoursToComplete,
  description,
  moduleDetails,
  learningPath
}) => {
  const [isDescriptionVisible, setDescriptionVisible] = useState(false);
  const [isLearningPathVisible, setLearningPathVisible] = useState(false);

  return (
    <Card
      className="syllabus-item"
      size="small"
      style={{ marginBottom: 16, borderRadius: 8, boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)' }}
    >
      <div className="syllabus-header">
        <Space align="center">
          <Text strong style={{ fontSize: 16 }}>Module {moduleNumber}: {moduleName}</Text>
          <Text type="secondary" style={{ fontSize: 14 }}>{hoursToComplete} hours to complete</Text>
        </Space>
        <Button
          type="link"
          icon={isDescriptionVisible ? <UpOutlined /> : <DownOutlined />}
          onClick={() => setDescriptionVisible(!isDescriptionVisible)}
          style={{ fontWeight: 600 }}
        >
          Chi tiết
        </Button>
      </div>
      {isDescriptionVisible && (
        <div className="syllabus-description">
          <div style={{ margin: '12px 0' }}>
            <Text>{description}</Text>
          </div>
          {moduleDetails && (
            <div style={{ margin: '12px 0' }}>
              <Text>{moduleDetails}</Text>
            </div>
          )}
          <Button
            type="link"
            icon={isLearningPathVisible ? <UpOutlined /> : <DownOutlined />}
            onClick={() => setLearningPathVisible(!isLearningPathVisible)}
            style={{ fontWeight: 500 }}
          >
            Lộ trình
          </Button>
          {isLearningPathVisible && (
            <List
              dataSource={learningPath}
              renderItem={item => (
                <List.Item style={{ padding: '8px 0' }}>
                  <List.Item.Meta
                    avatar={iconMap[item.type.toLowerCase()] || null}
                    title={<span style={{ fontWeight: 500 }}>{item.type} - {item.name}</span>}
                    description={<span style={{ fontSize: 13 }}>{item.time}</span>}
                  />
                </List.Item>
              )}
            />
          )}
        </div>
      )}
    </Card>
  );
};

export default SyllabusItem;
