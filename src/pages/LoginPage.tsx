import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch } from 'react-redux';
import { login } from '../features/auth/authSlice';
import { Navigate } from 'react-router-dom';
import { Form, Input, Button, Layout, Typography, Space, Divider } from 'antd';
import { encryptData } from '../utils/crypto';
import { FacebookOutlined, InstagramOutlined, TwitterOutlined, YoutubeOutlined } from '@ant-design/icons';
import '../styles/LoginPage.scss';

const { Header, Footer, Content } = Layout;
const { Title } = Typography;

interface FormValues {
  email: string;
  password: string;
}

const schema = yup.object().shape({
  email: yup.string().email('Geçerli bir e-posta adresi girin').required('E-posta zorunludur'),
  password: yup.string()
    .min(8, 'Şifre en az 8 karakter uzunluğunda olmalıdır')
    .matches(/[A-Z]/, 'Şifre en az bir büyük harf içermelidir')
    .matches(/[0-9]/, 'Şifre en az bir rakam içermelidir')
    .required('Şifre zorunludur'),
});

const LoginPage: React.FC = () => {
  const dispatch = useDispatch();
  const [redirect, setRedirect] = React.useState(false);

  const { control, handleSubmit, formState: { errors } } = useForm<FormValues>({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: FormValues) => {
    const { email, password } = data;
    const validUsername = process.env.REACT_APP_USERNAME;
    const validPassword = process.env.REACT_APP_PASSWORD;

    if (email === validUsername && password === validPassword) {
      const authData = {
        isAuthenticated: true,
        loginTime: new Date().getTime(),
      };
      localStorage.setItem('auth', encryptData(authData));
      dispatch(login());
      setRedirect(true);
    } else {
      alert('Geçersiz kullanıcı adı veya şifre');
    }
  };

  if (redirect) {
    return <Navigate to="/movies" />;
  }

  return (
    <Layout className="layout">
      <Header className="header">
        <Title level={1}>Movies App</Title>
      </Header>

      <Content className="content">
        <div className="form-container">
          <Title level={2}>Giriş Yap</Title>
          <Form layout="vertical" onFinish={handleSubmit(onSubmit)}>
            <Form.Item
              label="E-posta"
              validateStatus={errors.email ? 'error' : ''}
              help={errors.email?.message}
            >
              <Controller
                name="email"
                control={control}
                render={({ field }) => (
                  <Input {...field} placeholder="E-posta adresinizi girin" />
                )}
              />
            </Form.Item>

            <Form.Item
              label="Şifre"
              validateStatus={errors.password ? 'error' : ''}
              help={errors.password?.message}
            >
              <Controller
                name="password"
                control={control}
                render={({ field }) => (
                  <Input.Password {...field} placeholder="Şifrenizi girin" />
                )}
              />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" block>
                Giriş Yap
              </Button>
            </Form.Item>
          </Form>
        </div>
      </Content>

      <Footer className="footer">
        <Space className="social-icons" size="large">
          <a href="#facebook"><FacebookOutlined /></a>
          <a href="#instagram"><InstagramOutlined /></a>
          <a href="#twitter"><TwitterOutlined /></a>
          <a href="#youtube"><YoutubeOutlined /></a>
        </Space>

        <div className="page-links">
          <a href="#about">Conditions of Use</a>
          <a href="#privacy">Privacy & Policy</a>
          <a href="#press">Press Room</a>
        </div>

        <p className="copyright">
          &copy; 2024 Movies App. All rights reserved.
        </p>
      </Footer>
    </Layout>
  );
};

export default LoginPage;