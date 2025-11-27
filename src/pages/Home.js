import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { colors } from '../styles/colors';
import { blogManager } from '../services/mockData';

function Home() {
  const navigate = useNavigate();
  const [recentPosts, setRecentPosts] = useState([]);

  useEffect(() => {
    // 获取最新的3篇博客文章
    const posts = blogManager.getAllPosts().slice(0, 3);
    setRecentPosts(posts);
  }, []);

  return (
    <div style={pageStyle}>
      {/* 英雄区域 */}
      <section style={heroSection}>
        <div style={heroContent}>
          <h1 style={heroTitle}>Channing Winchester</h1>
          <p style={heroSubtitle}>数字艺术家 & 创意开发者</p>
          <div style={ornamentStyle}>❧</div>
          <p style={heroDescription}>
            融合古典美学与现代技术，创造独特的数字艺术体验。<br/>
            受穆夏启发的创作，探索艺术与科技的边界。
          </p>
          <div style={heroButtons}>
            <button 
              onClick={() => navigate('/projects')}
              style={primaryButton}
            >
              探索作品
            </button>
            <button 
              onClick={() => navigate('/contact')}
              style={secondaryButton}
            >
              联系我
            </button>
          </div>
        </div>
      </section>

      {/* 技能简介 */}
      <section style={skillsSection}>
        <div style={skillsGrid}>
          <div style={skillCard}>
            <div style={skillIcon}>🎨</div>
            <h3 style={skillTitle}>数字艺术</h3>
            <p style={skillDescription}>
              受新艺术运动启发的视觉创作，融合自然形态与优雅线条
            </p>
          </div>
          <div style={skillCard}>
            <div style={skillIcon}>💻</div>
            <h3 style={skillTitle}>前端开发</h3>
            <p style={skillDescription}>
              构建现代、响应式的用户体验，注重细节与性能
            </p>
          </div>
          <div style={skillCard}>
            <div style={skillIcon}>✍️</div>
            <h3 style={skillTitle}>创意写作</h3>
            <p style={skillDescription}>
              分享艺术见解与技术思考，记录创作历程
            </p>
          </div>
        </div>
      </section>

      {/* 博客预览部分 */}
      <section style={blogSection}>
        <h2 style={sectionTitle}>最新文章</h2>
        <p style={sectionSubtitle}>思想与灵感的记录</p>
        <div style={blogGrid}>
          {recentPosts.map(post => (
            <div 
              key={post.id} 
              style={blogCard}
              onClick={() => navigate(`/blog/${post.id}`)}
            >
              <h3 style={blogTitle}>{post.title}</h3>
              <p style={blogExcerpt}>{post.excerpt}</p>
              <div style={blogMeta}>
                <span style={blogDate}>{post.createdAt}</span>
                <span style={blogComments}>💬 {post.comments.length}</span>
              </div>
              <div style={tagsContainer}>
                {post.tags.slice(0, 3).map(tag => (
                  <span key={tag} style={tagStyle}>{tag}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
        {recentPosts.length === 0 && (
          <div style={emptyState}>
            <h3 style={emptyTitle}>暂无文章</h3>
            <p style={emptyText}>还没有发布任何博客文章</p>
          </div>
        )}
        {recentPosts.length > 0 && (
          <div style={viewAllContainer}>
            <button 
              onClick={() => navigate('/blog')}
              style={viewAllButton}
            >
              查看所有文章 →
            </button>
          </div>
        )}
      </section>

      {/* 召唤区域 */}
      <section style={ctaSection}>
        <div style={ctaContent}>
          <h2 style={ctaTitle}>开始创作对话</h2>
          <p style={ctaText}>
            对某个项目感兴趣？想要讨论合作机会？<br/>
            或者只是想聊聊艺术与技术的融合？
          </p>
          <button 
            onClick={() => navigate('/contact')}
            style={ctaButton}
          >
            取得联系
          </button>
        </div>
      </section>
    </div>
  );
}

// 样式定义
const pageStyle = {
  minHeight: '70vh',
  backgroundColor: colors.cream,
  color: colors.darkBrown
};

// 英雄区域样式
const heroSection = {
  padding: '6rem 2rem 4rem',
  textAlign: 'center',
  background: `linear-gradient(135deg, ${colors.cream} 0%, ${colors.creamLight} 100%)`,
  borderBottom: `1px solid ${colors.darkBrown}`
};

const heroContent = {
  maxWidth: '800px',
  margin: '0 auto'
};

const heroTitle = {
  fontSize: '4rem',
  color: colors.darkBrown,
  marginBottom: '1rem',
  fontWeight: 'normal',
  letterSpacing: '2px'
};

const heroSubtitle = {
  fontSize: '1.5rem',
  color: colors.teal,
  marginBottom: '2rem',
  fontStyle: 'italic'
};

const ornamentStyle = {
  fontSize: '3rem',
  color: colors.teal,
  marginBottom: '2rem'
};

const heroDescription = {
  fontSize: '1.2rem',
  lineHeight: '1.8',
  marginBottom: '3rem',
  color: colors.darkBrown
};

const heroButtons = {
  display: 'flex',
  gap: '1rem',
  justifyContent: 'center',
  flexWrap: 'wrap'
};

const primaryButton = {
  padding: '1rem 2rem',
  backgroundColor: colors.darkBrown,
  color: colors.cream,
  border: 'none',
  borderRadius: '4px',
  fontSize: '1.1rem',
  cursor: 'pointer',
  transition: 'all 0.3s ease'
};

const secondaryButton = {
  padding: '1rem 2rem',
  backgroundColor: 'transparent',
  color: colors.darkBrown,
  border: `2px solid ${colors.darkBrown}`,
  borderRadius: '4px',
  fontSize: '1.1rem',
  cursor: 'pointer',
  transition: 'all 0.3s ease'
};

// 技能区域样式
const skillsSection = {
  padding: '4rem 2rem',
  backgroundColor: colors.overlayLight
};

const skillsGrid = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
  gap: '2rem',
  maxWidth: '1000px',
  margin: '0 auto'
};

const skillCard = {
  textAlign: 'center',
  padding: '2rem',
  backgroundColor: colors.cream,
  borderRadius: '8px',
  border: `1px solid ${colors.darkBrown}`
};

const skillIcon = {
  fontSize: '3rem',
  marginBottom: '1rem'
};

const skillTitle = {
  color: colors.darkBrown,
  fontSize: '1.3rem',
  marginBottom: '1rem'
};

const skillDescription = {
  color: colors.darkBrown,
  lineHeight: '1.6'
};

// 博客区域样式
const blogSection = {
  padding: '4rem 2rem',
  backgroundColor: colors.cream
};

const sectionTitle = {
  color: colors.darkBrown,
  fontSize: '2.5rem',
  textAlign: 'center',
  marginBottom: '1rem',
  fontWeight: 'normal'
};

const sectionSubtitle = {
  color: colors.teal,
  fontSize: '1.2rem',
  textAlign: 'center',
  marginBottom: '3rem',
  fontStyle: 'italic'
};

const blogGrid = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
  gap: '2rem',
  maxWidth: '1200px',
  margin: '0 auto 3rem'
};

const blogCard = {
  backgroundColor: colors.overlayLight,
  padding: '2rem',
  borderRadius: '8px',
  border: `1px solid ${colors.darkBrown}`,
  cursor: 'pointer',
  transition: 'all 0.3s ease',
  height: '100%',
  display: 'flex',
  flexDirection: 'column'
};

// 添加悬停效果
const blogCardHover = {
  transform: 'translateY(-4px)',
  boxShadow: `0 8px 25px ${colors.darkBrownDark}`
};

const blogTitle = {
  color: colors.darkBrown,
  fontSize: '1.4rem',
  marginBottom: '1rem',
  fontWeight: 'normal'
};

const blogExcerpt = {
  color: colors.darkBrown,
  lineHeight: '1.6',
  marginBottom: '1.5rem',
  flex: 1
};

const blogMeta = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: '1rem'
};

const blogDate = {
  color: colors.teal,
  fontSize: '0.9rem'
};

const blogComments = {
  color: colors.teal,
  fontSize: '0.9rem'
};

const tagsContainer = {
  display: 'flex',
  flexWrap: 'wrap',
  gap: '0.5rem'
};

const tagStyle = {
  padding: '0.2rem 0.6rem',
  backgroundColor: colors.teal,
  color: colors.cream,
  fontSize: '0.8rem',
  borderRadius: '4px'
};

const emptyState = {
  textAlign: 'center',
  padding: '4rem 2rem',
  backgroundColor: colors.overlayLight,
  borderRadius: '8px',
  border: `1px solid ${colors.darkBrown}`,
  maxWidth: '600px',
  margin: '0 auto'
};

const emptyTitle = {
  color: colors.darkBrown,
  fontSize: '1.5rem',
  marginBottom: '1rem'
};

const emptyText = {
  color: colors.teal,
  fontSize: '1.1rem'
};

const viewAllContainer = {
  textAlign: 'center'
};

const viewAllButton = {
  padding: '1rem 2rem',
  backgroundColor: 'transparent',
  color: colors.teal,
  border: `2px solid ${colors.teal}`,
  borderRadius: '4px',
  cursor: 'pointer',
  fontSize: '1.1rem',
  transition: 'all 0.3s ease'
};

// 召唤区域样式
const ctaSection = {
  padding: '4rem 2rem',
  backgroundColor: colors.overlayLight,
  borderTop: `1px solid ${colors.darkBrown}`
};

const ctaContent = {
  maxWidth: '600px',
  margin: '0 auto',
  textAlign: 'center'
};

const ctaTitle = {
  color: colors.darkBrown,
  fontSize: '2rem',
  marginBottom: '1rem'
};

const ctaText = {
  color: colors.darkBrown,
  fontSize: '1.2rem',
  lineHeight: '1.6',
  marginBottom: '2rem'
};

const ctaButton = {
  padding: '1rem 2rem',
  backgroundColor: colors.teal,
  color: colors.cream,
  border: 'none',
  borderRadius: '4px',
  fontSize: '1.1rem',
  cursor: 'pointer',
  transition: 'all 0.3s ease'
};

// 添加悬停效果
primaryButton.onmouseover = secondaryButton.onmouseover = 
viewAllButton.onmouseover = ctaButton.onmouseover = function() {
  this.style.transform = 'translateY(-2px)';
  this.style.boxShadow = `0 4px 12px ${colors.darkBrownDark}`;
};

primaryButton.onmouseout = secondaryButton.onmouseout = 
viewAllButton.onmouseout = ctaButton.onmouseout = function() {
  this.style.transform = 'translateY(0)';
  this.style.boxShadow = 'none';
};

blogCard.onmouseover = function() {
  Object.assign(this.style, blogCardHover);
};

blogCard.onmouseout = function() {
  this.style.transform = 'translateY(0)';
  this.style.boxShadow = 'none';
};

export default Home;