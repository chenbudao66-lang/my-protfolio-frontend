import React from 'react';
import { colors } from '../styles/colors';

function Home() {
  return (
    <div style={pageStyle}>
      <div style={heroSection}>
        <div style={heroContent}>
          <h1 style={titleStyle}>Channing Winchester</h1>
          <p style={subtitleStyle}>创意设计师 & 全栈开发者</p >
          <div style={divider}></div>
          <p style={description}>
            专注于创造美观且功能强大的数字体验。<br/>
            将设计思维与现代技术完美融合。
          </p >
          <div style={ctaButtons}>
            <button style={primaryButton}>浏览作品</button>
            <button style={secondaryButton}>了解更多</button>
          </div>
        </div>
      </div>

      <div style={aboutSection}>
        <div style={aboutContent}>
          <div style={textContent}>
            <h2 style={sectionTitle}>关于我</h2>
            <p style={aboutText}>
              我是一名充满激情的创意专业人士，专注于用户体验设计和全栈开发。
              我相信好的设计不仅仅是美观，更重要的是解决问题和创造价值。
            </p >
            <p style={aboutText}>
              我的工作融合了艺术眼光和技术实现，致力于为每个项目带来独特的视觉语言和流畅的用户体验。
            </p >
            <p style={signature}>— Channing Winchester —</p >
          </div>
          <div style={imagePlaceholder}></div>
        </div>
      </div>

      <div style={servicesSection}>
        <h2 style={sectionTitle}>我的服务</h2>
        <div style={servicesGrid}>
          <div style={serviceCard}>
            <div style={serviceIcon}>🎨</div>
            <h3 style={serviceTitle}>UI/UX 设计</h3>
            <p style={serviceText}>用户界面与体验设计</p >
          </div>
          <div style={serviceCard}>
            <div style={serviceIcon}>💻</div>
            <h3 style={serviceTitle}>前端开发</h3>
            <p style={serviceText}>响应式网站与应用</p >
          </div>
          <div style={serviceCard}>
            <div style={serviceIcon}>📱</div>
            <h3 style={serviceTitle}>品牌设计</h3>
            <p style={serviceText}>视觉识别系统</p >
          </div>
        </div>
      </div>
    </div>
  );
}

// 使用统一颜色方案
const pageStyle = {
  backgroundColor: colors.cream,
  color: colors.darkBrown,
  minHeight: '100vh'
};

const heroSection = {
  padding: '6rem 2rem 4rem',
  textAlign: 'center',
  backgroundColor: colors.cream
};

const heroContent = {
  maxWidth: '800px',
  margin: '0 auto'
};

const titleStyle = {
  color: colors.darkBrown,
  fontSize: '3.5rem',
  marginBottom: '1rem',
  fontWeight: 'bold'
};

const subtitleStyle = {
  color: colors.teal,
  fontSize: '1.4rem',
  marginBottom: '2rem',
  fontWeight: '300'
};

const divider = {
  width: '100px',
  height: '3px',
  backgroundColor: colors.darkBrown,
  margin: '2rem auto',
  borderRadius: '2px'
};

const description = {
  color: colors.darkBrown,
  fontSize: '1.3rem',
  lineHeight: '1.8',
  marginBottom: '3rem'
};

const ctaButtons = {
  display: 'flex',
  gap: '1rem',
  justifyContent: 'center',
  flexWrap: 'wrap'
};

const primaryButton = {
  padding: '0.8rem 2rem',
  backgroundColor: colors.darkBrown,
  color: colors.cream,
  border: 'none',
  borderRadius: '4px',
  fontSize: '1.1rem',
  cursor: 'pointer',
  transition: 'all 0.3s ease'
};

const secondaryButton = {
  padding: '0.8rem 2rem',
  backgroundColor: 'transparent',
  color: colors.darkBrown,
  border: `2px solid ${colors.darkBrown}`,
  borderRadius: '4px',
  fontSize: '1.1rem',
  cursor: 'pointer',
  transition: 'all 0.3s ease'
};

const aboutSection = {
  padding: '5rem 2rem',
  backgroundColor: colors.cream
};

const aboutContent = {
  display: 'flex',
  alignItems: 'center',
  gap: '4rem',
  maxWidth: '1200px',
  margin: '0 auto',
  flexWrap: 'wrap'
};

const textContent = {
  flex: 1,
  minWidth: '300px'
};

const sectionTitle = {
  color: colors.darkBrown,
  fontSize: '2.5rem',
  marginBottom: '2rem'
};

const aboutText = {
  color: colors.darkBrown,
  fontSize: '1.1rem',
  lineHeight: '1.7',
  marginBottom: '1.5rem'
};

const signature = {
  color: colors.teal,
  fontSize: '1.1rem',
  fontStyle: 'italic',
  marginTop: '2rem'
};

const imagePlaceholder = {
  width: '300px',
  height: '400px',
  backgroundColor: colors.darkBrown,
  borderRadius: '8px',
  flexShrink: 0
};

const servicesSection = {
  padding: '5rem 2rem',
  backgroundColor: colors.cream,
  textAlign: 'center'
};

const servicesGrid = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
  gap: '2rem',
  maxWidth: '1000px',
  margin: '0 auto'
};

const serviceCard = {
  padding: '2.5rem 2rem',
  backgroundColor: colors.overlayLight,
  borderRadius: '8px',
  border: `1px solid ${colors.darkBrown}`,
  transition: 'all 0.3s ease'
};

const serviceIcon = {
  fontSize: '3rem',
  marginBottom: '1.5rem'
};

const serviceTitle = {
  color: colors.darkBrown,
  fontSize: '1.5rem',
  marginBottom: '1rem'
};

const serviceText = {
  color: colors.darkBrown,
  lineHeight: '1.6'
};

export default Home;