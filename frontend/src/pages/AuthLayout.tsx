import React, { useState } from 'react';
import { Card, Typography, Image } from 'antd';

const { Title } = Typography;


interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
  onSwitch?: () => void;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children, title, onSwitch }) => {
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
      background: '#f0f2f5',
    }}>
      <Card
        bodyStyle={{ padding: 0 }}
        style={{
          width: 800,
          overflow: 'hidden',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
        }}
      >
        <div style={{ display: 'flex', height: 500 }}>
          <div style={{
            flex: 1,
            padding: 40,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            background: '#fff',
          }}>
            <Title level={2} style={{ textAlign: 'center', marginBottom: 30 }}>{title}</Title>
            {children}
          </div>
          <div style={{
            flex: 1,
            background: '#0d1b2a',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            color: '#fff',
          }}>
            <Image
              src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
              alt="Auth background"
              preview={false}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>
        </div>
      </Card>
    </div>
  );
};

export default AuthLayout;
