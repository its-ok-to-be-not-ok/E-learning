import React from 'react';
import { Form, Input, Button } from 'antd';

interface EditVideoLessonProps {
  lesson: any;
  onSave: (lesson: any) => void;
  onCancel: () => void;
}

const EditVideoLesson: React.FC<EditVideoLessonProps> = ({ lesson, onSave, onCancel }) => {
  const [form] = Form.useForm();

  const handleFinish = (values: any) => {
    onSave({ ...lesson, ...values });
  };

  return (
    <div style={{ maxWidth: 500, margin: '0 auto', background: '#fff', padding: 24, borderRadius: 8 }}>
      <h3>Chỉnh sửa Video</h3>
      <Form form={form} layout="vertical" initialValues={lesson} onFinish={handleFinish}>
        <Form.Item label="Tên video" name="name" rules={[{ required: true, message: 'Nhập tên video' }]}> <Input /> </Form.Item>
        <Form.Item label="Link video" name="videoUrl" rules={[{ required: true, message: 'Nhập link video' }]}> <Input /> </Form.Item>
        <Form.Item label="Mô tả" name="description"> <Input.TextArea rows={3} /> </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">Lưu</Button>
          <Button style={{ marginLeft: 8 }} onClick={onCancel}>Huỷ</Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default EditVideoLesson; 