import React, { useState } from 'react';
import { colors } from '../styles/colors';
import { mockAPI } from '../services/mockData';

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSubmitStatus(null);

    try {
      // 使用模拟API发送消息
      const response = await mockAPI.contact.sendMessage(formData);
      
      if (response.success) {
        setSubmitStatus({ type: 'success', message: '消息发送成功！我会尽快回复您。' });
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: ''
        });
      }
    } catch (err) {
      setSubmitStatus({ type: 'error', message: '发送失败，请稍后重试。' });
      console.error('Error sending message:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={pageStyle}>
      <div style={headerSection}>
        <h1 style={titleStyle}>与我联系</h1>
        <p style={subtitleStyle}>期待与您的艺术对话</p >
        <div style={ornamentStyle}>✉</div>
      </div>

      {/* 提交状态提示 */}
      {submitStatus && (
        <div style={submitStatus.type === 'success' ? successStyle : errorStyle}>
          <p style={statusText}>{submitStatus.message}</p >
        </div>
      )}

      <div style={contactContent}>
        <div style={infoSection}>
          <h3 style={sectionTitle}>联系信息</h3>
          <div style={contactItem}>
            <span style={icon}>📧</span>
            <span style={contactText}>art@channingwinchester.com</span>
          </div>
          <div style={contactItem}>
            <span style={icon}>📱</span>
            <span style={contactText}>基于项目预约沟通</span>
          </div>
          <div style={contactItem}>
            <span style={icon}>📍</span>
            <span style={contactText}>数字游牧 · 灵感所在</span>
          </div>
          
          <div style={divider}></div>
          
          <p style={infoText}>
            我专注于创造融合古典美学与现代技术的数字体验。
            如果您有艺术项目或创意合作的想法，欢迎与我联系。
          </p >
        </div>

        <div style={formSection}>
          <h3 style={sectionTitle}>发送消息</h3>
          <form onSubmit={handleSubmit} style={formStyle}>
            <div style={inputGroup}>
              <label style={labelStyle}>姓名 *</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                style={inputStyle}
                required
                disabled={loading}
              />
            </div>
            <div style={inputGroup}>
              <label style={labelStyle}>邮箱 *</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                style={inputStyle}
                required
                disabled={loading}
              />
            </div>
            <div style={inputGroup}>
              <label style={labelStyle}>主题 *</label>
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                style={inputStyle}
                required
                disabled={loading}
              />
            </div>
            <div style={inputGroup}>
              <label style={labelStyle}>消息 *</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                style={textareaStyle}
                rows="5"
                required
                disabled={loading}
              ></textarea>
            </div>
            <button 
              type="submit" 
              style={loading ? { ...buttonStyle, ...disabledButton } : buttonStyle}
              disabled={loading}
            >
              {loading ? '发送中...' : '发送消息'}
            </button>
          </form>
        </div>
      </div>

      <div style={quoteSection}>
        <p style={quoteText}>
          "每一次交流都是灵感的碰撞，<br/>
          期待与您共同创造美的可能。"
        </p >
        <p style={signature}>— Channing Winchester —</p >
      </div>
    </div>
  );
}

// 样式定义
const pageStyle = {
  padding: '2rem',
  maxWidth: '1000px',
  margin: '0 auto',
  backgroundColor: colors.cream,
  color: colors.darkBrown,
  minHeight: '70vh'
};

const headerSection = {
  textAlign: 'center',
  padding: '3rem 0',
  marginBottom: '3rem'
};

const titleStyle = {
  color: colors.darkBrown,
  fontSize: '3rem',
  marginBottom: '1rem',
  fontWeight: 'normal'
};

const subtitleStyle = {
  color: colors.teal,
  fontSize: '1.3rem',
  marginBottom: '1.5rem',
  fontStyle: 'italic'
};

const ornamentStyle = {
  color: colors.teal,
  fontSize: '2rem'
};

const contactContent = {
  display: 'grid',
  gridTemplateColumns: '1fr 1.5fr',
  gap: '3rem',
  marginBottom: '4rem'
};

const infoSection = {
  padding: '2rem',
  border: `1px solid ${colors.darkBrown}`,
  backgroundColor: colors.overlayLight,
  height: 'fit-content'
};

const sectionTitle = {
  color: colors.darkBrown,
  fontSize: '1.5rem',
  marginBottom: '1.5rem',
  fontWeight: 'normal'
};

const contactItem = {
  display: 'flex',
  alignItems: 'center',
  gap: '1rem',
  marginBottom: '1.2rem'
};

const icon = {
  fontSize: '1.2rem'
};

const contactText = {
  color: colors.darkBrown
};

const divider = {
  height: '1px',
  backgroundColor: colors.darkBrown,
  margin: '1.5rem 0'
};

const infoText = {
  color: colors.darkBrown,
  lineHeight: '1.7',
  fontStyle: 'italic'
};

const formSection = {
  padding: '2rem',
  border: `1px solid ${colors.darkBrown}`,
  backgroundColor: colors.overlayLight
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
  padding: '0.7rem',
  backgroundColor: colors.creamLight,
  border: `1px solid ${colors.darkBrown}`,
  color: colors.darkBrown,
  fontSize: '1rem'
};

const textareaStyle = {
  padding: '0.7rem',
  backgroundColor: colors.creamLight,
  border: `1px solid ${colors.darkBrown}`,
  color: colors.darkBrown,
  fontSize: '1rem',
  resize: 'vertical'
};

const buttonStyle = {
  padding: '0.8rem 2rem',
  backgroundColor: colors.darkBrown,
  color: colors.cream,
  border: 'none',
  fontSize: '1rem',
  cursor: 'pointer',
  transition: 'all 0.3s ease',
  borderRadius: '4px'
};

const quoteSection = {
  textAlign: 'center',
  padding: '3rem 0',
  borderTop: `1px solid ${colors.darkBrown}`,
  marginTop: '2rem'
};

const quoteText = {
  color: colors.darkBrown,
  fontSize: '1.3rem',
  lineHeight: '1.8',
  fontStyle: 'italic',
  marginBottom: '2rem'
};

const signature = {
  color: colors.teal,
  fontSize: '1.1rem',
  fontStyle: 'italic'
};

const successStyle = {
  backgroundColor: colors.overlayDark,
  border: `1px solid ${colors.teal}`,
  padding: '1rem',
  borderRadius: '4px',
  margin: '0 auto 2rem auto',
  maxWidth: '600px',
  textAlign: 'center'
};

const errorStyle = {
  backgroundColor: colors.overlayLight,
  border: `1px solid ${colors.darkBrown}`,
  padding: '1rem',
  borderRadius: '4px',
  margin: '0 auto 2rem auto',
  maxWidth: '600px',
  textAlign: 'center'
};

const statusText = {
  color: colors.darkBrown,
  fontSize: '1rem',
  margin: 0
};

const disabledButton = {
  backgroundColor: colors.creamDark,
  cursor: 'not-allowed'
};

export default Contact;