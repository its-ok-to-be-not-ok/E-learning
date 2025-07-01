import React from 'react';
import { Form, Input, Button, InputNumber } from 'antd';

interface EditAssignmentLessonProps {
  lesson: any;
  onSave: (lesson: any) => void;
  onCancel: () => void;
}

const EditAssignmentLesson: React.FC<EditAssignmentLessonProps> = ({ lesson, onSave, onCancel }) => {
  const [form] = Form.useForm();

  const handleFinish = (values: any) => {
    onSave({ ...lesson, ...values });
  };

  return (
    <div style={{ maxWidth: 500, margin: '0 auto', background: '#fff', padding: 24, borderRadius: 8 }}>
      <h3>Chỉnh sửa Assignment</h3>
      <Form form={form} layout="vertical" initialValues={lesson} onFinish={handleFinish}>
        <Form.Item label="Tên Assignment" name="name" rules={[{ required: true, message: 'Nhập tên assignment' }]}> <Input /> </Form.Item>
        <Form.Item label="Max Score" name="maxScore" rules={[{ required: true, message: 'Nhập max score' }]}> <InputNumber min={1} style={{ width: 120 }} /> </Form.Item>
        <Form.Item label="Trọng số (%)" name="weight" rules={[{ required: true, message: 'Nhập trọng số' }]}> <InputNumber min={0} max={100} style={{ width: 120 }} /> </Form.Item>
        <Form.Item label="Mô tả" name="description"> <Input.TextArea rows={3} /> </Form.Item>
        <Form.Item label="File đính kèm (link)" name="attachment"> <Input /> </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">Lưu</Button>
          <Button style={{ marginLeft: 8 }} onClick={onCancel}>Huỷ</Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default EditAssignmentLesson; 