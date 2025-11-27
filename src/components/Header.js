import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { colors } from '../styles/colors';

function Header() {
  const { isAuthenticated, logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <header style={headerStyle}>
      <nav style={navStyle}>
        <div style={logoStyle}>
          <Link to="/" style={logoLinkStyle}>
            <h2 style={logoTextStyle}>Channing Winchester</h2>
            <span style={taglineStyle}>Design & Development</span>
          </Link>
        </div>
        <ul style={navListStyle}>
          <li style={navItemStyle}><Link to="/" style={linkStyle}>首页</Link></li>
          <li style={navItemStyle}><Link to="/projects" style={linkStyle}>项目</Link></li>
          <li style={navItemStyle}><Link to="/blog" style={linkStyle}>博客</Link></li>
          <li style={navItemStyle}><Link to="/contact" style={linkStyle}>联系</Link></li>
          
         // 在 Header.js 的导航部分，找到登录链接，修改为：
{isAuthenticated() ? (
  <>
    <li style={navItemStyle}>
      <Link to="/admin" style={linkStyle}>管理</Link>
    </li>
    <li style={navItemStyle}>
      <button onClick={handleLogout} style={logoutButtonStyle}>
        退出
      </button>
    </li>
  </>
) : (
  <>
    <li style={navItemStyle}>
      <Link to="/login" style={linkStyle}>登录</Link>
    </li>
    <li style={navItemStyle}>
      <Link to="/register" style={linkStyle}>注册</Link>
    </li>
  </>
)}
        </ul>
      </nav>
    </header>
  );
}

// 使用统一颜色方案
const headerStyle = {
  backgroundColor: colors.darkBrown,
  color: colors.cream,
  padding: '1.5rem 0',
  boxShadow: `0 2px 10px ${colors.darkBrownDark}`,
  position: 'sticky',
  top: 0,
  zIndex: 100
};

const navStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  maxWidth: '1200px',
  margin: '0 auto',
  padding: '0 2rem'
};

const logoStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '0.3rem'
};

const logoLinkStyle = {
  textDecoration: 'none'
};

const logoTextStyle = {
  margin: 0,
  color: colors.cream,
  fontWeight: 'bold',
  fontSize: '1.8rem',
  letterSpacing: '0.5px'
};

const taglineStyle = {
  color: colors.teal,
  fontSize: '0.8rem',
  fontWeight: '300',
  letterSpacing: '2px',
  textTransform: 'uppercase'
};

const navListStyle = {
  display: 'flex',
  listStyle: 'none',
  gap: '2rem',
  margin: 0,
  padding: 0,
  alignItems: 'center'
};

const navItemStyle = {
  margin: 0
};

const linkStyle = {
  color: colors.cream,
  textDecoration: 'none',
  fontSize: '1.1rem',
  fontWeight: '500',
  padding: '0.6rem 1rem',
  borderRadius: '4px',
  transition: 'all 0.3s ease',
  border: '1px solid transparent'
};

const logoutButtonStyle = {
  backgroundColor: 'transparent',
  color: colors.cream,
  border: `1px solid ${colors.teal}`,
  padding: '0.6rem 1rem',
  borderRadius: '4px',
  fontSize: '1.1rem',
  cursor: 'pointer',
  transition: 'all 0.3s ease',
  fontFamily: 'inherit'
};

// 鼠标悬停效果
linkStyle[':hover'] = {
  backgroundColor: colors.teal,
  color: colors.cream,
  border: `1px solid ${colors.cream}`
};

logoutButtonStyle[':hover'] = {
  backgroundColor: colors.teal,
  color: colors.cream
};

export default Header;