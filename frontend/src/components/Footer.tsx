import React from 'react';
import { Layout } from 'antd';

const { Footer: AntFooter } = Layout;

const Footer: React.FC = () => {
  return (
    <AntFooter style={{ textAlign: 'center' }}>
      E-Learning Platform ©2023 Created by Your Company
    </AntFooter>
  );
};

export default Footer; 