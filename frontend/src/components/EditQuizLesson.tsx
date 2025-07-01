import React, { useState } from 'react';
import { Form, Input, Button, List, Space, Modal } from 'antd';

interface QuizOption {
  id: string;
  text: string;
}
interface QuizQuestion {
  id: string;
  question: string;
  options: QuizOption[];
}

interface EditQuizLessonProps {
  lesson: any;
  onSave: (lesson: any) => void;
  onCancel: () => void;
}

const EditQuizLesson: React.FC<EditQuizLessonProps> = ({ lesson, onSave, onCancel }) => {
  const [form] = Form.useForm();
  const [questions, setQuestions] = useState<QuizQuestion[]>(lesson.questions || []);
  const [newQ, setNewQ] = useState('');
  const [newOpts, setNewOpts] = useState<string[]>(['', '', '', '']);

  const handleAddQuestion = () => {
    if (!newQ.trim() || newOpts.some(opt => !opt.trim())) return;
    setQuestions([
      ...questions,
      {
        id: Date.now().toString(),
        question: newQ,
        options: newOpts.map((text, idx) => ({ id: Date.now() + '-' + idx, text })),
      },
    ]);
    setNewQ('');
    setNewOpts(['', '', '', '']);
  };

  const handleDeleteQuestion = (id: string) => {
    setQuestions(questions.filter(q => q.id !== id));
  };

  const handleFinish = (values: any) => {
    onSave({ ...lesson, ...values, questions });
  };

  return (
    <div style={{ maxWidth: 600, margin: '0 auto', background: '#fff', padding: 24, borderRadius: 8 }}>
      <h3>Chỉnh sửa Quiz</h3>
      <Form form={form} layout="vertical" initialValues={lesson} onFinish={handleFinish}>
        <Form.Item label="Tên Quiz" name="name" rules={[{ required: true, message: 'Nhập tên quiz' }]}> <Input /> </Form.Item>
        <div style={{ marginBottom: 16 }}>
          <b>Thêm câu hỏi mới</b>
          <Input
            placeholder="Nội dung câu hỏi"
            value={newQ}
            onChange={e => setNewQ(e.target.value)}
            style={{ margin: '8px 0' }}
          />
          <Space direction="vertical" style={{ width: '100%' }}>
            {newOpts.map((opt, idx) => (
              <Input
                key={idx}
                placeholder={`Lựa chọn ${idx + 1}`}
                value={opt}
                onChange={e => setNewOpts(newOpts.map((o, i) => i === idx ? e.target.value : o))}
              />
            ))}
          </Space>
          <Button style={{ marginTop: 8 }} onClick={handleAddQuestion}>Thêm câu hỏi</Button>
        </div>
        <List
          bordered
          dataSource={questions}
          renderItem={q => (
            <List.Item
              actions={[
                <Button size="small" danger onClick={() => handleDeleteQuestion(q.id)}>Xoá</Button>,
              ]}
            >
              <div>
                <b>{q.question}</b>
                <ul style={{ margin: 0 }}>
                  {q.options.map(opt => <li key={opt.id}>{opt.text}</li>)}
                </ul>
              </div>
            </List.Item>
          )}
        />
        <Form.Item style={{ marginTop: 16 }}>
          <Button type="primary" htmlType="submit">Lưu</Button>
          <Button style={{ marginLeft: 8 }} onClick={onCancel}>Huỷ</Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default EditQuizLesson; 