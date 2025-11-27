import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { colors } from '../styles/colors';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const result = await login(email, password);
      
      if (result.success) {
        // 登录成功，跳转到博客页面
        navigate('/blog');
      } else {
        setError(result.error);
      }
    } catch (err) {
      setError('登录失败: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={pageStyle}>
      <div style={formContainer}>
        <h1 style={titleStyle}>登录</h1>
        
        {error && (
          <div style={errorStyle}>
            <p style={errorText}>{error}</p>
          </div>
        )}
        
        <form onSubmit={handleSubmit} style={formStyle}>
          <div style={inputGroup}>
            <label style={labelStyle}>邮箱</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={inputStyle}
              required
              disabled={loading}
              placeholder="请输入密码"
              minLength="6"
            />
          </div>
          
          <button 
            type="submit" 
            style={loading ? { ...buttonStyle, ...disabledButton } : buttonStyle}
            disabled={loading}
          >
            {loading ? '登录中...' : '登录'}
          </button>
        </form>
        
        <div style={demoInfo}>
          <p style={demoText}>需要先注册账号才能登录</p>
          <p style={demoText}>密码至少6位字符</p>
        </div>
      </div>
    </div>
  );
}

// 样式定义保持不变...
// [这里保持原有的所有样式定义]

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
  backgroundColor: colors.darkBrown,
  color: colors.cream,
  border: 'none',
  borderRadius: '4px',
  fontSize: '1.1rem',
  cursor: 'pointer',
  transition: 'all 0.3s ease',
  marginTop: '1rem'
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

export default Login;