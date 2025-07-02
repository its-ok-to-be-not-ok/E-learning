import React, { useEffect, useState, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Spin, Result, Button } from 'antd';
import api from '../api/axiosClient';

const VerifyEmailPage: React.FC = () => {
  const navigate = useNavigate();
  const { token } = useParams<{ token: string }>();

  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState(false);
  const [message, setMessage] = useState('');
  const hasVerified = useRef(false); // Đảm bảo chỉ xử lý trạng thái thành công một lần

  useEffect(() => {
    const verify = async () => {
      try {
        const response = await api.get(`/api/auth/verify-email/${token}/`);
        const data = response.data;

        if (data.access && data.refresh) {
          localStorage.setItem('access_token', data.access);
          localStorage.setItem('refresh_token', data.refresh);
          setSuccess(true);
          setMessage(data.detail || 'Xác nhận email thành công!');
          hasVerified.current = true;
        } else {
          localStorage.removeItem('access_token');
          localStorage.removeItem('refresh_token');
          setSuccess(false);
          setMessage(data.detail || data.error || 'Xác thực email thất bại!');
        }
      } catch (error: any) {
        // Nếu đã xác thực thành công trước đó, không ghi đè trạng thái thành công
        if (!hasVerified.current) {
          setSuccess(false);
          setMessage(
            error.response?.data?.detail ||
            error.response?.data?.error ||
            error.message ||
            'Có lỗi xảy ra khi xác thực email!'
          );
        }
      } finally {
        setLoading(false);
      }
    };
    if (token) verify();
    else {
      setLoading(false);
      setSuccess(false);
      setMessage('Không tìm thấy token xác thực.');
    }
    // eslint-disable-next-line
  }, [token]);

  if (loading) return <Spin style={{ display: 'block', margin: '100px auto' }} />;

  return (
    <Result
      status={success ? "success" : "error"}
      title={success ? "Xác thực email thành công!" : "Xác thực email thất bại"}
      subTitle={message}
      extra={[
        <Button type="primary" key="home" onClick={() => navigate('/')}>
          Về trang chủ
        </Button>,
        !success && (
          <Button key="login" onClick={() => navigate('/login')}>
            Đăng nhập
          </Button>
        ),
      ]}
    />
  );
};

export default VerifyEmailPage;
