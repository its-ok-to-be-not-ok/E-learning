import React, { useState } from 'react';
import { Form, Input, Button, Typography, Card } from 'antd';
import { UserOutlined, MailOutlined, LockOutlined } from '@ant-design/icons';
import AuthLayout from './AuthLayout';

const { Title } = Typography;

interface AuthPageProps {
  isForgot?: boolean;
}


const AuthPage: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [isForgot, setIsForgot] = useState(false);

  const onFinish = (values: any) => {
    console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  // Nếu là trang quên mật khẩu
  if (isForgot) {
    return (
      <AuthLayout title="Forgot Password">
        <Form
          name="forgot"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item
            name="email"
            rules={[{ required: true, message: 'Please input your email!' }]}
          >
            <Input prefix={<MailOutlined />} placeholder="Email" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
              Reset Password
            </Button>
          </Form.Item>
          <Form.Item>
            <Button type="link" onClick={() => setIsForgot(false)}>
              Back to Login
            </Button>
          </Form.Item>
        </Form>
      </AuthLayout>
    );
  }

  // Nếu là login hoặc register
  return (
    <AuthLayout title={"Login"}>
      <Form
        name={isLogin ? 'login' : 'register'}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        {!isLogin && (
          <Form.Item
            name="username"
            rules={[{ required: true, message: 'Please input your username!' }]}
          >
            <Input prefix={<UserOutlined />} placeholder="Username" />
          </Form.Item>
        )}
        <Form.Item
          name="email"
          rules={[{ required: true, message: 'Please input your email!' }]}
        >
          <Input prefix={<MailOutlined />} placeholder="Email" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password prefix={<LockOutlined />} placeholder="Password" />
        </Form.Item>
        {!isLogin && (
          <Form.Item
            name="confirm"
            dependencies={['password']}
            hasFeedback
            rules={[
              { required: true, message: 'Please confirm your password!' },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('The two passwords do not match!'));
                },
              }),
            ]}
          >
            <Input.Password prefix={<LockOutlined />} placeholder="Confirm Password" />
          </Form.Item>
        )}
        <Form.Item>
          <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
            {isLogin ? 'Login' : 'Register'}
          </Button>
        </Form.Item>
        {isLogin && (
          <Form.Item>
            <Button
              type="link"
              onClick={() => setIsForgot(true)}
              style={{ padding: 0, color: '#0d1b2a', fontWeight: 'bold' }}
            >
              Forgot password?
            </Button>
          </Form.Item>
        )}
        <Form.Item>
          <Button
            type="link"
            onClick={() => setIsLogin(!isLogin)}
            style={{ padding: 0, color: '#0d1b2a', fontWeight: 'bold' }}
          >
            {isLogin ? 'Register now!' : 'Already have an account? Login!'}
          </Button>
        </Form.Item>
      </Form>
    </AuthLayout>
  );
};

export default AuthPage;
