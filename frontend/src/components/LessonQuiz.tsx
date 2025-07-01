import React, { useState } from 'react';
import { Typography, Button, Card, Radio, Space, Tag, Tooltip } from 'antd';
import { FlagOutlined } from '@ant-design/icons';
import './LessonQuiz.css';

const { Title, Paragraph, Text } = Typography;

interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
}

interface LessonQuizProps {
  title: string;
  createdAt: string;
  openAt: string;
  duration: string;
  description: string;
  questions: QuizQuestion[];
}

const LessonQuiz: React.FC<LessonQuizProps> = ({
  title, createdAt, openAt, duration, description, questions
}) => {
  const [started, setStarted] = useState(false);
  const [answers, setAnswers] = useState<(number | null)[]>(Array(questions.length).fill(null));
  const [flags, setFlags] = useState<boolean[]>(Array(questions.length).fill(false));
  const [current, setCurrent] = useState(0);

  const handleSelect = (idx: number) => (e: any) => {
    const newAnswers = [...answers];
    newAnswers[idx] = e.target.value;
    setAnswers(newAnswers);
  };

  const handleFlag = (idx: number) => {
    const newFlags = [...flags];
    newFlags[idx] = !newFlags[idx];
    setFlags(newFlags);
  };

  const handleNav = (idx: number) => setCurrent(idx);

  const handleSubmit = () => {
    // Submit logic here
    setStarted(false);
  };

  return (
    <div className="lesson-quiz">
      {!started ? (
        <div className="quiz-info">
          <Title level={3}>{title}</Title>
          <Text type="secondary">Tạo lúc: {createdAt} | Mở lúc: {openAt}</Text>
          <Paragraph><b>Thời gian làm bài:</b> {duration}</Paragraph>
          <Paragraph><b>Mô tả:</b> {description}</Paragraph>
          <Button type="primary" onClick={() => setStarted(true)}>Bắt đầu thi</Button>
        </div>
      ) : (
        <div className="quiz-content-wrapper">
          <div className="quiz-questions">
            <Card className="quiz-question-card">
              <div className="quiz-question-header">
                <span>Câu {current + 1}</span>
                <Tooltip title={flags[current] ? 'Bỏ gắn cờ' : 'Gắn cờ'}>
                  <FlagOutlined
                    className={flags[current] ? 'flagged' : ''}
                    style={{ marginLeft: 12, color: flags[current] ? '#faad14' : '#aaa', cursor: 'pointer' }}
                    onClick={() => handleFlag(current)}
                  />
                </Tooltip>
              </div>
              <div className="quiz-question-text">{questions[current].question}</div>
              <Radio.Group
                onChange={handleSelect(current)}
                value={answers[current]}
                style={{ marginTop: 12 }}
              >
                <Space direction="vertical">
                  {questions[current].options.map((opt, i) => (
                    <Radio key={i} value={i}>{opt}</Radio>
                  ))}
                </Space>
              </Radio.Group>
            </Card>
          </div>
          <div className="quiz-nav-box">
            <div className="quiz-nav-list">
              {questions.map((q, idx) => (
                <Button
                  key={idx}
                  shape="circle"
                  size="large"
                  className={`quiz-nav-btn${answers[idx] !== null ? ' answered' : ''}`}
                  style={{ margin: 4, borderColor: flags[idx] ? '#faad14' : undefined }}
                  onClick={() => handleNav(idx)}
                >
                  {idx + 1}
                  {flags[idx] && <FlagOutlined style={{ fontSize: 12, color: '#faad14', marginLeft: 2 }} />}
                </Button>
              ))}
            </div>
            <Button type="primary" danger style={{ marginTop: 16, width: '100%' }} onClick={handleSubmit}>
              Nộp bài
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default LessonQuiz; 