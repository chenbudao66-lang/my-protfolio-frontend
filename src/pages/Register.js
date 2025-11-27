import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { colors } from '../styles/colors';

function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // 前端验证
    if (formData.password !== formData.confirmPassword) {
      setError('密码确认不一致');
      setLoading(false);
      return;
    }

    if (formData.password.length < 6) {
      setError('密码至少需要6位字符');
      setLoading(false);
      return;
    }

    try {
      const result = await register(formData.name, formData.email, formData.password);
      
      if (result.success) {
        // 注册成功，自动登录并跳转到博客页面
        navigate('/blog');
      } else {
        setError(result.error);
      }
    } catch (err) {
      setError('注册失败: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={pageStyle}>
      <div style={formContainer}>
        <h1 style={titleStyle}>注册账号</h1>
        
        {error && (
          <div style={errorStyle}>
            <p style={errorText}>{error}</p>
          </div>
        )}
        
        <form onSubmit={handleSubmit} style={formStyle}>
          <div style={inputGroup}>
            <label style={labelStyle}>用户名</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              style={inputStyle}
              required
              disabled={loading}
              placeholder="请输入用户名"
              minLength="2"
            />
          </div>

          <div style={inputGroup}>
            <label style={labelStyle}>邮箱</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              style={inputStyle}
              required
              disabled={loading}
              placeholder="请输入邮箱"
            />
          </div>
          
          <div style={inputGroup}>
            <label style={labelStyle}>密码</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              style={inputStyle}
              required
              disabled={loading}
              placeholder="至少6位字符"
              minLength="6"
            />
          </div>

          <div style={inputGroup}>
            <label style={labelStyle}>确认密码</label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              style={inputStyle}
              required
              disabled={loading}
              placeholder="请再次输入密码"
              minLength="6"
            />
          </div>
          
          <button 
            type="submit" 
            style={loading ? { ...buttonStyle, ...disabledButton } : buttonStyle}
            disabled={loading}
          >
            {loading ? '注册中...' : '注册'}
          </button>
        </form>
        
        <div style={loginLink}>
          <p style={loginText}>
            已有账号？ <Link to="/login" style={linkStyle}>立即登录</Link>
          </p>
        </div>

        <div style={demoInfo}>
          <p style={demoText}>用户名和邮箱都是唯一的，不能重复注册</p>
          <p style={demoText}>注册成功后会自动登录</p>
        </div>
      </div>
    </div>
  );
}

// 样式定义
const pageStyle = {
  padding: '2rem',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  minHeight: '70vh',
  backgroundColor: colors.cream
};

const formContainer = {
  backgroundColor: colors.overlayLight,
  padding: '3rem',
  borderRadius: '8px',
  border: `2px solid ${colors.darkBrown}`,
  boxShadow: `0 4px 20px ${colors.darkBrownDark}`,
  maxWidth: '400px',
  width: '100%'
};

const titleStyle = {
  color: colors.darkBrown,
  fontSize: '2.5rem',
  textAlign: 'center',
  marginBottom: '2rem'
};

const formStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '1.5rem'
};

const inputGroup = {
  display: 'flex',
  flexDirection: 'column',
  gap: '0.5rem'
};

const labelStyle = {
  color: colors.darkBrown,
  fontSize: '1rem',
  fontWeight: '500'
};

const inputStyle = {
  padding: '0.8rem',
  border: `1px solid ${colors.darkBrown}`,
  borderRadius: '4px',
  fontSize: '1rem',
  backgroundColor: colors.creamLight,
  color: colors.darkBrown
};

const buttonStyle = {
  padding: '0.8rem 2rem',
  backgroundColor: colors.teal,
  color: colors.cream,
  border: 'none',
  borderRadius: '4px',
  fontSize: '1.1rem',
  cursor: 'pointer',
  transition: 'all 0.3s ease',
  marginTop: '1rem'
};

const loginLink = {
  marginTop: '2rem',
  textAlign: 'center'
};

const loginText = {
  color: colors.darkBrown,
  fontSize: '1rem',
  margin: 0
};

const linkStyle = {
  color: colors.teal,
  textDecoration: 'none',
  fontWeight: '500'
};

const demoInfo = {
  marginTop: '2rem',
  padding: '1rem',
  backgroundColor: colors.overlayDark,
  borderRadius: '4px',
  border: `1px solid ${colors.teal}`
};

const demoText = {
  color: colors.darkBrown,
  fontSize: '0.9rem',
  margin: '0.3rem 0',
  textAlign: 'center'
};

const errorStyle = {
  backgroundColor: colors.overlayLight,
  border: `1px solid ${colors.darkBrown}`,
  padding: '1rem',
  borderRadius: '4px',
  marginBottom: '1.5rem'
};

const errorText = {
  color: colors.darkBrown,
  fontSize: '0.9rem',
  margin: 0,
  textAlign: 'center'
};

const disabledButton = {
  backgroundColor: colors.creamDark,
  cursor: 'not-allowed'
};

export default Register;