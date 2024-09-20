import React from 'react';
import { Button, Layout, Typography } from 'antd';
import { useNavigate } from 'react-router-dom';
import '../styles/NotFoundPage.scss';

const { Content } = Layout;
const { Title, Paragraph } = Typography;

const NotFoundPage: React.FC = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate('/');
  };

  return (
    <Layout style={{ minHeight: '100vh', textAlign: 'center', padding: '50px' }}>
      <Content>
        <Title level={1}>404 - Sayfa Bulunamadı</Title>
        <Paragraph>Aradığınız sayfa mevcut değil veya kaldırılmış olabilir.</Paragraph>
        <Button type="primary" onClick={handleGoHome}>
          Ana Sayfaya Dön
        </Button>
      </Content>
    </Layout>
  );
};

export default NotFoundPage;