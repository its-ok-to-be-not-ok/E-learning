import React from 'react';
import { Typography } from 'antd';
import './LessonDocument.css';

const { Title, Paragraph } = Typography;

export type DocumentContent =
  | { type: 'title'; text: string }
  | { type: 'para'; text: string }
  | { type: 'img'; src: string; alt?: string };

interface LessonDocumentProps {
  content: DocumentContent[];
}

const LessonDocument: React.FC<LessonDocumentProps> = ({ content }) => (
  <div className="lesson-document">
    {content.map((item, idx) => {
      if (item.type === 'title')
        return <Title key={idx} level={3} className="doc-title">{item.text}</Title>;
      if (item.type === 'para')
        return <Paragraph key={idx} className="doc-para">{item.text}</Paragraph>;
      if (item.type === 'img')
        return <div key={idx} className="doc-img-wrapper"><img src={item.src} alt={item.alt || ''} className="doc-img" /></div>;
      return null;
    })}
  </div>
);

export default LessonDocument; 