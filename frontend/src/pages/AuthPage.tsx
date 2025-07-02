import React, { useState } from 'react';
import { Form, Input, Button, Typography, Card } from 'antd';
import { UserOutlined, MailOutlined, LockOutlined } from '@ant-design/icons';
import AuthLayout from './AuthLayout';
import axios, { AxiosError } from 'axios';
import api from '../api/axiosClient';
import { useNavigate } from 'react-router-dom';

const { Title } = Typography;

interface AuthPageProps {
  isForgot?: boolean;
}

const AuthPage: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [isForgot, setIsForgot] = useState(false);
  const navigate = useNavigate();

  const onFinish = async (values: any) => {
    const {confirm, ...rest} = values;
    try {
      if (isForgot) {
        // Forgot Password
        const response = await api.post('api/auth/forgot-password/', { email: values.email });
        alert(response.data.detail || response.data.error || response.data.message || 'Password reset link sent to your email.');
      } else if (isLogin) {
        // Login
        const response = await api.post('api/auth/login/', values);
        localStorage.setItem('token', response.data.token);
        alert(response.data.detail || response.data.error || 'Login successful!');
      } else {
        // Register
        const response = await api.post('api/auth/register/', rest, { withCredentials: true });
        if (response.data.token) {
          localStorage.setItem('token', response.data.token);
        }
        alert(response.data.detail || response.data.error || 'Registration successful!');
      }
    } catch (error: any) {
      // Nếu là lỗi trả về từ server (ví dụ status 400, 403, 500...)
      if (error.response && error.response.data) {
        alert(error.response.data.detail || error.response.data.error || error.response.data.message || 'Có lỗi xảy ra!');
      } else {
        alert('Có lỗi xảy ra! ' + error.message);
      }
    } 
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  const verifyEmail = async (token: string) => {
    try {
      const response = await fetch(`/api/auth/verify-email/${token}/`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('authToken', data.token);
        navigate('/homepage');
      } else {
        console.error('Verification failed');
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
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
    <AuthLayout title={isLogin ? "Login" : "Register"}>
      <Form
        name={isLogin ? 'login' : 'register'}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        {!isLogin && !isForgot && (
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
        {!isForgot && (
          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password prefix={<LockOutlined />} placeholder="Password" />
          </Form.Item>
        )}
        {!isLogin && !isForgot && (
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
            {isForgot ? 'Reset Password' : isLogin ? 'Login' : 'Register'}
          </Button>
        </Form.Item>
        {isLogin && !isForgot && (
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
            onClick={() => { setIsLogin(!isLogin); setIsForgot(false); }}
            style={{ padding: 0, color: '#0d1b2a', fontWeight: 'bold' }}
          >
            {isForgot ? 'Back to Login' : isLogin ? 'Register now!' : 'Already have an account? Login!'}
          </Button>
        </Form.Item>
      </Form>
    </AuthLayout>
  );
};

export default AuthPage;
