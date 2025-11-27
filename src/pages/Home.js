import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { colors } from '../styles/colors';
import { blogManager } from '../services/mockData';
import BlogModal from '../components/BlogModal';

function Home() {
  const navigate = useNavigate();
  const [recentPosts, setRecentPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    // 获取最新的3篇博客文章
    const posts = blogManager.getAllPosts().slice(0, 3);
    setRecentPosts(posts);
  }, []);

  const handlePostClick = (post) => {
    setSelectedPost(post);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedPost(null);
  };

  const handleUpdatePost = (updatedPost) => {
    // 更新文章列表中的文章数据
    const updatedPosts = recentPosts.map(post => 
      post.id === updatedPost.id ? updatedPost : post
    );
    setRecentPosts(updatedPosts);
    setSelectedPost(updatedPost);
  };

  return (
    <div style={pageStyle}>
      {/* 英雄区域 */}
      <section style={heroSection}>
        <div style={heroContent}>
          <h1 style={heroTitle}>Channing Winchester</h1>
          <p style={heroSubtitle}>数字艺术家 & 视觉设计师</p>
          <div style={ornamentStyle}>❧</div>
          <p style={heroDescription}>
            受穆夏启发的数字艺术创作，融合古典美学与现代技术，<br/>
            探索艺术与设计的无限可能。
          </p>
          <button 
            style={ctaButton}
            onClick={() => navigate('/projects')}
          >
            探索作品
          </button>
        </div>
      </section>

      {/* 技能简介 */}
      <section style={skillsSection}>
        <div style={skillsGrid}>
          <div style={skillCard}>
            <h3 style={skillTitle}>数字艺术</h3>
            <p style={skillDescription}>
              受新艺术运动影响的插画与设计，强调自然形态与优雅线条。
            </p>
          </div>
          <div style={skillCard}>
            <h3 style={skillTitle}>UI/UX 设计</h3>
            <p style={skillDescription}>
              结合美学与功能的用户体验设计，创造直观而美丽的数字产品。
            </p>
          </div>
          <div style={skillCard}>
            <h3 style={skillTitle}>创意开发</h3>
            <p style={skillDescription}>
              将艺术思维融入代码，构建独特的交互体验和视觉呈现。
            </p>
          </div>
        </div>
      </section>

      {/* 博客预览部分 */}
      <section style={blogSection}>
        <h2 style={sectionTitle}>最新文章</h2>
        <div style={blogGrid}>
          {recentPosts.map(post => (
            <div 
              key={post.id} 
              style={blogCard}
              onClick={() => handlePostClick(post)}
            >
              <h3 style={blogTitle}>{post.title}</h3>
              <p style={blogExcerpt}>{post.excerpt}</p>
              <div style={blogMeta}>
                <span style={blogDate}>{post.createdAt}</span>
                <span style={blogComments}>💬 {post.comments ? post.comments.length : 0}</span>
              </div>
            </div>
          ))}
        </div>
        {recentPosts.length === 0 && (
          <p style={noPostsText}>暂无博客文章</p>
        )}
        {recentPosts.length > 0 && (
          <button 
            onClick={() => navigate('/blog')}
            style={viewAllButton}
          >
            查看所有文章 →
          </button>
        )}
      </section>

      {/* 联系召唤 */}
      <section style={contactSection}>
        <div style={contactContent}>
          <h2 style={contactTitle}>开始创意对话</h2>
          <p style={contactText}>
            有项目想法或合作意向？我很乐意与您交流。
          </p>
          <button 
            style={contactButton}
            onClick={() => navigate('/contact')}
          >
            联系我
          </button>
        </div>
      </section>

      {/* 博客模态框 */}
      {showModal && (
        <BlogModal 
          post={selectedPost}
          onClose={handleCloseModal}
          onUpdate={handleUpdatePost}
        />
      )}
    </div>
  );
}

// 样式定义
const pageStyle = {
  minHeight: '100vh',
  backgroundColor: colors.cream,
  color: colors.darkBrown
};

const heroSection = {
  padding: '6rem 2rem 4rem 2rem',
  textAlign: 'center',
  background: `linear-gradient(135deg, ${colors.cream} 0%, ${colors.creamLight} 100%)`,
  borderBottom: `1px solid ${colors.darkBrown}`
};

const heroContent = {
  maxWidth: '800px',
  margin: '0 auto'
};

const heroTitle = {
  fontSize: '3.5rem',
  color: colors.darkBrown,
  marginBottom: '1rem',
  fontWeight: 'normal'
};

const heroSubtitle = {
  fontSize: '1.5rem',
  color: colors.teal,
  marginBottom: '2rem',
  fontStyle: 'italic'
};

const ornamentStyle = {
  color: colors.teal,
  fontSize: '2.5rem',
  marginBottom: '2rem'
};

const heroDescription = {
  fontSize: '1.2rem',
  lineHeight: '1.8',
  marginBottom: '3rem',
  color: colors.darkBrown
};

const ctaButton = {
  padding: '1rem 2.5rem',
  backgroundColor: 'transparent',
  color: colors.teal,
  border: `2px solid ${colors.teal}`,
  borderRadius: '4px',
  fontSize: '1.1rem',
  cursor: 'pointer',
  transition: 'all 0.3s ease'
};

ctaButton[':hover'] = {
  backgroundColor: colors.teal,
  color: colors.cream
};

const skillsSection = {
  padding: '4rem 2rem',
  maxWidth: '1200px',
  margin: '0 auto'
};

const skillsGrid = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
  gap: '2rem'
};

const skillCard = {
  backgroundColor: colors.overlayLight,
  padding: '2rem',
  borderRadius: '8px',
  border: `1px solid ${colors.darkBrown}`,
  textAlign: 'center'
};

const skillTitle = {
  color: colors.darkBrown,
  fontSize: '1.5rem',
  marginBottom: '1rem',
  fontWeight: 'normal'
};

const skillDescription = {
  color: colors.darkBrown,
  lineHeight: '1.6'
};

const blogSection = {
  padding: '4rem 2rem',
  borderTop: `1px solid ${colors.darkBrown}`,
  backgroundColor: colors.creamLight,
  maxWidth: '1200px',
  margin: '0 auto'
};

const sectionTitle = {
  color: colors.darkBrown,
  fontSize: '2.5rem',
  textAlign: 'center',
  marginBottom: '3rem',
  fontWeight: 'normal'
};

const blogGrid = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
  gap: '2rem',
  marginBottom: '3rem'
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
  flexDirection: 'column',
  justifyContent: 'space-between'
};

blogCard[':hover'] = {
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
  marginTop: 'auto'
};

const blogDate = {
  color: colors.teal,
  fontSize: '0.9rem'
};

const blogComments = {
  color: colors.teal,
  fontSize: '0.9rem'
};

const noPostsText = {
  textAlign: 'center',
  color: colors.teal,
  fontStyle: 'italic',
  padding: '2rem',
  fontSize: '1.1rem'
};

const viewAllButton = {
  display: 'block',
  margin: '0 auto',
  padding: '1rem 2rem',
  backgroundColor: 'transparent',
  color: colors.teal,
  border: `2px solid ${colors.teal}`,
  borderRadius: '4px',
  cursor: 'pointer',
  fontSize: '1.1rem',
  transition: 'all 0.3s ease',
  textDecoration: 'none'
};

viewAllButton[':hover'] = {
  backgroundColor: colors.teal,
  color: colors.cream
};

const contactSection = {
  padding: '4rem 2rem',
  textAlign: 'center',
  backgroundColor: colors.overlayLight,
  borderTop: `1px solid ${colors.darkBrown}`
};

const contactContent = {
  maxWidth: '600px',
  margin: '0 auto'
};

const contactTitle = {
  color: colors.darkBrown,
  fontSize: '2.2rem',
  marginBottom: '1rem',
  fontWeight: 'normal'
};

const contactText = {
  color: colors.darkBrown,
  fontSize: '1.2rem',
  marginBottom: '2rem',
  lineHeight: '1.6'
};

const contactButton = {
  padding: '1rem 2.5rem',
  backgroundColor: colors.teal,
  color: colors.cream,
  border: 'none',
  borderRadius: '4px',
  fontSize: '1.1rem',
  cursor: 'pointer',
  transition: 'all 0.3s ease'
};

contactButton[':hover'] = {
  backgroundColor: colors.tealDark,
  transform: 'translateY(-2px)'
};

export default Home;