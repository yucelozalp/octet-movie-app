import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from 'antd';
import store from './store';
import LoginPage from './pages/LoginPage';
import MoviesPage from './pages/MoviesPage';
import DetailPage from './pages/DetailPage';
import { decryptData } from './utils/crypto';
import './App.css';
import FavoritesPage from './pages/FavoritesPage';

const { Header, Content, Footer } = Layout;

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);

  React.useEffect(() => {
    const authData = localStorage.getItem('auth');
    if (authData) {
      try {
        const { isAuthenticated, loginTime } = decryptData(authData);
        if (isAuthenticated && new Date().getTime() - loginTime < 8 * 60 * 60 * 1000) { // 8 saat
          setIsAuthenticated(true);
        } else {
          localStorage.removeItem('auth');
        }
      } catch (error) {
        localStorage.removeItem('auth');
      }
    }
  }, []);

  return (
    <Router>
      <Layout className="layout">
        <Content style={{ padding: '0 50px' ,backgroundColor: 'white'  }}>
          <div className="site-layout-content">
            <Routes>
              <Route path="/login" element={!isAuthenticated ? <LoginPage /> : <Navigate to="/movies" />} />
              <Route path="/movies" element={isAuthenticated ? <MoviesPage /> : <Navigate to="/login" />} />
              <Route path="/movies/:id" element={isAuthenticated ? <DetailPage /> : <Navigate to="/login" />} />
              <Route path="/favorites" element={<FavoritesPage />} />
              <Route path="*" element={<Navigate to="/login" />} />
            </Routes>
          </div>
        </Content>
      </Layout>
    </Router>
  );
};

export default App;