import React, { useState } from 'react';
import { Button, Input, Form, Select, Space, Modal, Typography, List, message } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import EditVideoLesson from './EditVideoLesson';
import EditDocLesson from './EditDocLesson';
import EditAssignmentLesson from './EditAssignmentLesson';
import EditQuizLesson from './EditQuizLesson';

const { Option } = Select;
const { Title } = Typography;

export type LessonType = 'video' | 'doc' | 'assignment' | 'quiz';

export interface Lesson {
  id: string;
  type: LessonType;
  name: string;
}

export interface Module {
  id: string;
  name: string;
  lessons: Lesson[];
}

export interface CourseData {
  courseName: string;
  courseCategory: string;
  level: string;
  description: string;
  modules: Module[];
}

interface EditCourseProps {
  course: CourseData;
  onSave: (course: CourseData) => void;
  onCancel: () => void;
}

const EditCourse: React.FC<EditCourseProps> = ({ course, onSave, onCancel }) => {
  const [form] = Form.useForm();
  const [modules, setModules] = useState<Module[]>(course.modules || []);
  const [editingModuleId, setEditingModuleId] = useState<string | null>(null);
  const [newModuleName, setNewModuleName] = useState('');
  const [editingModuleName, setEditingModuleName] = useState('');
  const [editingLesson, setEditingLesson] = useState<{
    moduleId: string;
    lesson: Lesson;
  } | null>(null);

  // Thêm module mới
  const handleAddModule = () => {
    if (!newModuleName.trim()) return;
    setModules([
      ...modules,
      { id: Date.now().toString(), name: newModuleName, lessons: [] },
    ]);
    setNewModuleName('');
  };

  // Xoá module
  const handleDeleteModule = (id: string) => {
    Modal.confirm({
      title: 'Xoá module',
      content: 'Bạn có chắc muốn xoá module này?',
      onOk: () => setModules(modules.filter(m => m.id !== id)),
    });
  };

  // Sửa tên module
  const handleEditModuleName = (id: string) => {
    setEditingModuleId(id);
    const mod = modules.find(m => m.id === id);
    setEditingModuleName(mod ? mod.name : '');
  };
  const handleSaveModuleName = (id: string) => {
    setModules(modules.map(m => m.id === id ? { ...m, name: editingModuleName } : m));
    setEditingModuleId(null);
    setEditingModuleName('');
  };

  // Thêm bài học (chỉ khung)
  const handleAddLesson = (moduleId: string, type: LessonType) => {
    setModules(modules.map(m =>
      m.id === moduleId
        ? {
            ...m,
            lessons: [
              ...m.lessons,
              { id: Date.now().toString(), type, name: `${type} mới` },
            ],
          }
        : m
    ));
  };

  // Xoá bài học
  const handleDeleteLesson = (moduleId: string, lessonId: string) => {
    setModules(modules.map(m =>
      m.id === moduleId
        ? { ...m, lessons: m.lessons.filter(l => l.id !== lessonId) }
        : m
    ));
  };

  // Sửa bài học
  const handleEditLesson = (moduleId: string, lesson: Lesson) => {
    setEditingLesson({ moduleId, lesson });
  };

  // Lưu bài học sau khi chỉnh sửa
  const handleSaveLesson = (updatedLesson: any) => {
    if (!editingLesson) return;
    setModules(modules.map(m =>
      m.id === editingLesson.moduleId
        ? {
            ...m,
            lessons: m.lessons.map(l => l.id === editingLesson.lesson.id ? { ...l, ...updatedLesson } : l)
          }
        : m
    ));
    setEditingLesson(null);
  };

  // Huỷ chỉnh sửa bài học
  const handleCancelLesson = () => {
    setEditingLesson(null);
  };

  // Lưu toàn bộ
  const handleSave = (values: any) => {
    onSave({ ...values, modules });
    message.success('Đã lưu thay đổi khoá học!');
  };

  if (editingLesson) {
    const { lesson } = editingLesson;
    if (lesson.type === 'video') {
      return <EditVideoLesson lesson={lesson} onSave={handleSaveLesson} onCancel={handleCancelLesson} />;
    }
    if (lesson.type === 'doc') {
      return <EditDocLesson lesson={lesson} onSave={handleSaveLesson} onCancel={handleCancelLesson} />;
    }
    if (lesson.type === 'assignment') {
      return <EditAssignmentLesson lesson={lesson} onSave={handleSaveLesson} onCancel={handleCancelLesson} />;
    }
    if (lesson.type === 'quiz') {
      return <EditQuizLesson lesson={lesson} onSave={handleSaveLesson} onCancel={handleCancelLesson} />;
    }
    return null;
  }

  return (
    <div style={{ maxWidth: 900, margin: '0 auto', background: '#fff', padding: 24, borderRadius: 8 }}>
      <Title level={3}>Chỉnh sửa khoá học</Title>
      <Form
        form={form}
        layout="vertical"
        initialValues={course}
        onFinish={handleSave}
      >
        <Form.Item label="Tên khoá học" name="courseName" rules={[{ required: true, message: 'Nhập tên khoá học' }]}> <Input /> </Form.Item>
        <Form.Item label="Danh mục" name="courseCategory" rules={[{ required: true, message: 'Chọn danh mục' }]}> <Select> <Option value="Lập trình Web">Lập trình Web</Option> <Option value="Backend">Backend</Option> <Option value="Thiết kế">Thiết kế</Option> <Option value="Khác">Khác</Option> </Select> </Form.Item>
        <Form.Item label="Trình độ" name="level" rules={[{ required: true, message: 'Chọn trình độ' }]}> <Select> <Option value="Beginner">Beginner</Option> <Option value="Intermediate">Intermediate</Option> <Option value="Advanced">Advanced</Option> </Select> </Form.Item>
        <Form.Item label="Mô tả" name="description" rules={[{ required: true, message: 'Nhập mô tả' }]}> <Input.TextArea rows={3} /> </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">Lưu</Button>
          <Button style={{ marginLeft: 8 }} onClick={onCancel}>Huỷ</Button>
        </Form.Item>
      </Form>
      <div style={{ marginTop: 32 }}>
        <Title level={4}>Modules</Title>
        <Space style={{ marginBottom: 16 }}>
          <Input
            placeholder="Tên module mới"
            value={newModuleName}
            onChange={e => setNewModuleName(e.target.value)}
            onPressEnter={handleAddModule}
            style={{ width: 240 }}
          />
          <Button icon={<PlusOutlined />} onClick={handleAddModule}>Thêm module</Button>
        </Space>
        <List
          bordered
          dataSource={modules}
          renderItem={mod => (
            <List.Item
              style={{ alignItems: 'flex-start', flexDirection: 'column' }}
              actions={[
                editingModuleId === mod.id ? (
                  <>
                    <Button size="small" type="link" onClick={() => handleSaveModuleName(mod.id)}>Lưu</Button>
                    <Button size="small" type="link" onClick={() => setEditingModuleId(null)}>Huỷ</Button>
                  </>
                ) : (
                  <>
                    <Button size="small" icon={<EditOutlined />} onClick={() => handleEditModuleName(mod.id)}>Sửa tên</Button>
                    <Button size="small" icon={<DeleteOutlined />} danger onClick={() => handleDeleteModule(mod.id)}>Xoá</Button>
                  </>
                ),
                <Select
                  size="small"
                  style={{ width: 120 }}
                  placeholder="Thêm bài học"
                  onSelect={type => handleAddLesson(mod.id, type as LessonType)}
                >
                  <Option value="video">Video</Option>
                  <Option value="doc">Doc</Option>
                  <Option value="assignment">Assignment</Option>
                  <Option value="quiz">Quiz</Option>
                </Select>
              ]}
            >
              {editingModuleId === mod.id ? (
                <Input
                  value={editingModuleName}
                  onChange={e => setEditingModuleName(e.target.value)}
                  onPressEnter={() => handleSaveModuleName(mod.id)}
                  style={{ width: 220, marginBottom: 8 }}
                />
              ) : (
                <b>{mod.name}</b>
              )}
              <List
                size="small"
                style={{ marginTop: 8, width: '100%' }}
                bordered
                dataSource={mod.lessons}
                renderItem={lesson => (
                  <List.Item
                    actions={[
                      <Button size="small" onClick={() => handleEditLesson(mod.id, lesson)}>Sửa</Button>,
                      <Button size="small" danger onClick={() => handleDeleteLesson(mod.id, lesson.id)}>Xoá</Button>,
                    ]}
                  >
                    <span>[{lesson.type}] {lesson.name}</span>
                  </List.Item>
                )}
              />
            </List.Item>
          )}
        />
      </div>
    </div>
  );
};

export default EditCourse; 