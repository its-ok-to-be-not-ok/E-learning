import React, { useState } from 'react';
import { Card, List, Button, Collapse, Input, Modal, Space, Typography, message } from 'antd';

const { Panel } = Collapse;
const { Text } = Typography;

// Dữ liệu mẫu assignment và submissions
const sampleAssignments = [
  {
    id: 'a1',
    course: 'ReactJS Cơ Bản Đến Nâng Cao',
    title: 'Bài tập 1: Component cơ bản',
    submissions: [
      {
        id: 's1',
        student: 'Nguyễn Văn B',
        fileUrl: 'https://example.com/file1.pdf',
        score: null,
        comment: '',
      },
      {
        id: 's2',
        student: 'Trần Thị C',
        fileUrl: 'https://example.com/file2.pdf',
        score: 8,
        comment: 'Làm tốt!',
      },
    ],
  },
  {
    id: 'a2',
    course: 'NodeJS Thực Chiến',
    title: 'Assignment: Xây dựng API',
    submissions: [
      {
        id: 's3',
        student: 'Lê Văn D',
        fileUrl: 'https://example.com/file3.pdf',
        score: null,
        comment: '',
      },
    ],
  },
];

const GradingPanel: React.FC = () => {
  const [assignments, setAssignments] = useState(sampleAssignments);
  const [grading, setGrading] = useState<{ sid: string; score: number | null } | null>(null);
  const [commenting, setCommenting] = useState<{ sid: string; comment: string } | null>(null);

  // Chấm điểm
  const handleGrade = (aid: string, sid: string, score: number) => {
    setAssignments(assignments.map(a =>
      a.id === aid
        ? {
            ...a,
            submissions: a.submissions.map(s =>
              s.id === sid ? { ...s, score } : s
            ),
          }
        : a
    ));
    setGrading(null);
    message.success('Đã lưu điểm!');
  };

  // Nhận xét
  const handleComment = (aid: string, sid: string, comment: string) => {
    setAssignments(assignments.map(a =>
      a.id === aid
        ? {
            ...a,
            submissions: a.submissions.map(s =>
              s.id === sid ? { ...s, comment } : s
            ),
          }
        : a
    ));
    setCommenting(null);
    message.success('Đã lưu nhận xét!');
  };

  return (
    <div style={{ maxWidth: 900, margin: '0 auto', background: '#fff', padding: 24, borderRadius: 8 }}>
      <h2>Chấm bài tập</h2>
      <List
        dataSource={assignments}
        renderItem={assignment => (
          <Card
            key={assignment.id}
            title={<span><b>{assignment.title}</b> <Text type="secondary">({assignment.course})</Text></span>}
            style={{ marginBottom: 16 }}
          >
            <Collapse>
              <Panel header={`Xem bài nộp (${assignment.submissions.length})`} key="submissions">
                <List
                  dataSource={assignment.submissions}
                  renderItem={sub => (
                    <List.Item style={{ alignItems: 'flex-start' }}>
                      <Space direction="vertical" style={{ width: '100%' }}>
                        <div>
                          <b>{sub.student}</b> &nbsp;
                          <a href={sub.fileUrl} target="_blank" rel="noopener noreferrer">Tải file nộp</a>
                        </div>
                        <div>
                          <Space>
                            <span>Điểm: {sub.score !== null ? <b>{sub.score}</b> : <i>Chưa chấm</i>}</span>
                            <Button size="small" onClick={() => setGrading({ sid: sub.id, score: sub.score })}>Chấm điểm</Button>
                          </Space>
                        </div>
                        <div>
                          <Space>
                            <span>Nhận xét: {sub.comment ? sub.comment : <i>Chưa có</i>}</span>
                            <Button size="small" onClick={() => setCommenting({ sid: sub.id, comment: sub.comment })}>Thêm nhận xét</Button>
                          </Space>
                        </div>
                      </Space>
                      {/* Modal chấm điểm */}
                      <Modal
                        open={grading?.sid === sub.id}
                        title="Chấm điểm"
                        onCancel={() => setGrading(null)}
                        onOk={() => grading && handleGrade(assignment.id, sub.id, grading.score ?? 0)}
                      >
                        <Input
                          type="number"
                          min={0}
                          max={10}
                          value={grading?.score ?? ''}
                          onChange={e => setGrading(grading ? { ...grading, score: Number(e.target.value) } : null)}
                          placeholder="Nhập điểm"
                        />
                      </Modal>
                      {/* Modal nhận xét */}
                      <Modal
                        open={commenting?.sid === sub.id}
                        title="Thêm nhận xét"
                        onCancel={() => setCommenting(null)}
                        onOk={() => commenting && handleComment(assignment.id, sub.id, commenting.comment)}
                      >
                        <Input.TextArea
                          rows={3}
                          value={commenting?.comment ?? ''}
                          onChange={e => setCommenting(commenting ? { ...commenting, comment: e.target.value } : null)}
                          placeholder="Nhập nhận xét"
                        />
                      </Modal>
                    </List.Item>
                  )}
                />
              </Panel>
            </Collapse>
          </Card>
        )}
      />
    </div>
  );
};

export default GradingPanel; 