import React, { useState } from 'react';
import { Form, Input, Button, Select, Space, List, Modal } from 'antd';

const { Option } = Select;

interface DocComponent {
  id: string;
  type: 'title' | 'paragraph' | 'image';
  text?: string;
  src?: string;
  alt?: string;
}

interface EditDocLessonProps {
  lesson: any;
  onSave: (lesson: any) => void;
  onCancel: () => void;
}

const EditDocLesson: React.FC<EditDocLessonProps> = ({ lesson, onSave, onCancel }) => {
  const [form] = Form.useForm();
  const [components, setComponents] = useState<DocComponent[]>(lesson.components || []);
  const [addType, setAddType] = useState<'title' | 'paragraph' | 'image'>('title');
  const [addValue, setAddValue] = useState('');
  const [addImgAlt, setAddImgAlt] = useState('');

  const handleAddComponent = () => {
    if (!addValue && addType !== 'image') return;
    setComponents([
      ...components,
      addType === 'image'
        ? { id: Date.now().toString(), type: addType, src: addValue, alt: addImgAlt }
        : { id: Date.now().toString(), type: addType, text: addValue },
    ]);
    setAddValue('');
    setAddImgAlt('');
  };

  const handleDeleteComponent = (id: string) => {
    setComponents(components.filter(c => c.id !== id));
  };

  const handleMove = (idx: number, dir: -1 | 1) => {
    if ((dir === -1 && idx === 0) || (dir === 1 && idx === components.length - 1)) return;
    const newArr = [...components];
    const [removed] = newArr.splice(idx, 1);
    newArr.splice(idx + dir, 0, removed);
    setComponents(newArr);
  };

  const handleFinish = (values: any) => {
    onSave({ ...lesson, ...values, components });
  };

  return (
    <div style={{ maxWidth: 600, margin: '0 auto', background: '#fff', padding: 24, borderRadius: 8 }}>
      <h3>Chỉnh sửa Document</h3>
      <Form form={form} layout="vertical" initialValues={lesson} onFinish={handleFinish}>
        <Form.Item label="Tên tài liệu" name="name" rules={[{ required: true, message: 'Nhập tên tài liệu' }]}> <Input /> </Form.Item>
        <div style={{ marginBottom: 16 }}>
          <Space>
            <Select value={addType} onChange={v => setAddType(v)} style={{ width: 120 }}>
              <Option value="title">Title</Option>
              <Option value="paragraph">Paragraph</Option>
              <Option value="image">Image</Option>
            </Select>
            <Input
              placeholder={addType === 'image' ? 'Image URL' : 'Nội dung'}
              value={addValue}
              onChange={e => setAddValue(e.target.value)}
              style={{ width: 200 }}
            />
            {addType === 'image' && (
              <Input placeholder="Alt text" value={addImgAlt} onChange={e => setAddImgAlt(e.target.value)} style={{ width: 120 }} />
            )}
            <Button onClick={handleAddComponent}>Thêm</Button>
          </Space>
        </div>
        <List
          bordered
          dataSource={components}
          renderItem={(item, idx) => (
            <List.Item
              actions={[
                <Button size="small" onClick={() => handleMove(idx, -1)} disabled={idx === 0}>↑</Button>,
                <Button size="small" onClick={() => handleMove(idx, 1)} disabled={idx === components.length - 1}>↓</Button>,
                <Button size="small" danger onClick={() => handleDeleteComponent(item.id)}>Xoá</Button>,
              ]}
            >
              {item.type === 'image' ? (
                <span>🖼 <b>{item.src}</b> <i>({item.alt})</i></span>
              ) : (
                <span><b>{item.type === 'title' ? 'Tiêu đề:' : 'Đoạn văn:'}</b> {item.text}</span>
              )}
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

export default EditDocLesson; 