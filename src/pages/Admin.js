import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { colors } from '../styles/colors';
import { mockProjects, mockBlogPosts } from '../services/mockData';

function Admin() {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [projects, setProjects] = useState([]);
  const [blogPosts, setBlogPosts] = useState([]);

  useEffect(() => {
    // 加载初始数据
    setProjects(mockProjects);
    setBlogPosts(mockBlogPosts);
  }, []);

  const handleLogout = () => {
    logout();
    alert('已退出登录');
  };

  const handleDeleteProject = (projectId) => {
    if (window.confirm('确定要删除这个项目吗？')) {
      setProjects(projects.filter(project => project.id !== projectId));
      alert('项目已删除');
    }
  };

  const handleDeletePost = (postId) => {
    if (window.confirm('确定要删除这篇文章吗？')) {
      setBlogPosts(blogPosts.filter(post => post.id !== postId));
      alert('文章已删除');
    }
  };

  const renderDashboard = () => (
    <div style={dashboardGrid}>
      <div style={statCard}>
        <h3 style={statNumber}>{projects.length}</h3>
        <p style={statLabel}>项目总数</p >
      </div>
      <div style={statCard}>
        <h3 style={statNumber}>{blogPosts.length}</h3>
        <p style={statLabel}>文章总数</p >
      </div>
      <div style={statCard}>
        <h3 style={statNumber}>{blogPosts.reduce((acc, post) => acc + post.comments.length, 0)}</h3>
        <p style={statLabel}>评论总数</p >
      </div>
    </div>
  );

  const renderProjects = () => (
    <div>
      <div style={sectionHeader}>
        <h3 style={sectionTitle}>项目管理</h3>
        <button style={addButton}>添加新项目</button>
      </div>
      <div style={listContainer}>
        {projects.map(project => (
          <div key={project.id} style={listItem}>
            <div style={itemContent}>
              <h4 style={itemTitle}>{project.title}</h4>
              <p style={itemDescription}>{project.description}</p >
              <div style={tagsContainer}>
                {project.tags.map(tag => (
                  <span key={tag} style={tagStyle}>{tag}</span>
                ))}
              </div>
            </div>
            <div style={itemActions}>
              <button style={editButton}>编辑</button>
              <button 
                style={deleteButton}
                onClick={() => handleDeleteProject(project.id)}
              >
                删除
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderBlog = () => (
    <div>
      <div style={sectionHeader}>
        <h3 style={sectionTitle}>博客管理</h3>
        <button style={addButton}>撰写新文章</button>
      </div>
      <div style={listContainer}>
        {blogPosts.map(post => (
          <div key={post.id} style={listItem}>
            <div style={itemContent}>
              <h4 style={itemTitle}>{post.title}</h4>
              <p style={itemDescription}>{post.excerpt}</p >
              <div style={itemMeta}>
                <span style={metaText}>发布于: {post.createdAt}</span>
                <span style={metaText}>评论: {post.comments.length}</span>
              </div>
            </div>
            <div style={itemActions}>
              <button style={editButton}>编辑</button>
              <button 
                style={deleteButton}
                onClick={() => handleDeletePost(post.id)}
              >
                删除
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div style={pageStyle}>
      <div style={adminContainer}>
        <h1 style={titleStyle}>管理后台</h1>
        
        <div style={welcomeSection}>
          <p style={welcomeText}>欢迎回来，{user?.name}！</p >
          <p style={emailText}>邮箱：{user?.email}</p >
        </div>

        {/* 标签页导航 */}
        <div style={tabContainer}>
          <button 
            style={activeTab === 'dashboard' ? activeTabStyle : tabStyle}
            onClick={() => setActiveTab('dashboard')}
          >
            仪表板
          </button>
          <button 
            style={activeTab === 'projects' ? activeTabStyle : tabStyle}
            onClick={() => setActiveTab('projects')}
          >
            项目管理
          </button>
          <button 
            style={activeTab === 'blog' ? activeTabStyle : tabStyle}
            onClick={() => setActiveTab('blog')}
          >
            博客管理
          </button>
        </div>

        {/* 内容区域 */}
        <div style={contentSection}>
          {activeTab === 'dashboard' && renderDashboard()}
          {activeTab === 'projects' && renderProjects()}
          {activeTab === 'blog' && renderBlog()}
        </div>

        <div style={actionSection}>
          <button onClick={handleLogout} style={logoutButton}>
            退出登录
          </button>
        </div>
      </div>
    </div>
  );
}

// 样式定义保持不变...
const pageStyle = {
  padding: '2rem',
  minHeight: '70vh',
  backgroundColor: colors.cream
};

const adminContainer = {
  maxWidth: '1200px',
  margin: '0 auto'
};

const titleStyle = {
  color: colors.darkBrown,
  fontSize: '2.5rem',
  textAlign: 'center',
  marginBottom: '2rem'
};

const welcomeSection = {
  backgroundColor: colors.overlayLight,
  padding: '2rem',
  borderRadius: '8px',
  border: `1px solid ${colors.darkBrown}`,
  marginBottom: '3rem',
  textAlign: 'center'
};

const welcomeText = {
  color: colors.darkBrown,
  fontSize: '1.3rem',
  marginBottom: '0.5rem'
};

const emailText = {
  color: colors.teal,
  fontSize: '1rem'
};

const tabContainer = {
  display: 'flex',
  gap: '1rem',
  marginBottom: '2rem',
  borderBottom: `1px solid ${colors.darkBrown}`,
  paddingBottom: '1rem'
};

const tabStyle = {
  padding: '0.8rem 1.5rem',
  backgroundColor: 'transparent',
  color: colors.darkBrown,
  border: `1px solid ${colors.darkBrown}`,
  borderRadius: '4px',
  cursor: 'pointer',
  transition: 'all 0.3s ease'
};

const activeTabStyle = {
  ...tabStyle,
  backgroundColor: colors.darkBrown,
  color: colors.cream
};

const contentSection = {
  backgroundColor: colors.overlayLight,
  padding: '2rem',
  borderRadius: '8px',
  border: `1px solid ${colors.darkBrown}`,
  marginBottom: '3rem',
  minHeight: '400px'
};

const dashboardGrid = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
  gap: '2rem'
};

const statCard = {
  backgroundColor: colors.cream,
  padding: '2rem',
  borderRadius: '8px',
  border: `1px solid ${colors.darkBrown}`,
  textAlign: 'center'
};

const statNumber = {
  color: colors.teal,
  fontSize: '2.5rem',
  margin: '0 0 0.5rem 0'
};

const statLabel = {
  color: colors.darkBrown,
  fontSize: '1rem',
  margin: 0
};

const sectionHeader = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: '2rem',
  flexWrap: 'wrap',
  gap: '1rem'
};

const sectionTitle = {
  color: colors.darkBrown,
  fontSize: '1.5rem',
  margin: 0
};

const addButton = {
  padding: '0.6rem 1.2rem',
  backgroundColor: colors.teal,
  color: colors.cream,
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer'
};

const listContainer = {
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem'
};

const listItem = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'flex-start',
  padding: '1.5rem',
  backgroundColor: colors.cream,
  borderRadius: '8px',
  border: `1px solid ${colors.darkBrown}`,
  gap: '1rem'
};

const itemContent = {
  flex: 1
};

const itemTitle = {
  color: colors.darkBrown,
  fontSize: '1.2rem',
  margin: '0 0 0.5rem 0'
};

const itemDescription = {
  color: colors.darkBrown,
  margin: '0 0 1rem 0',
  lineHeight: '1.5'
};

const itemMeta = {
  display: 'flex',
  gap: '1rem'
};

const metaText = {
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

const itemActions = {
  display: 'flex',
  gap: '0.5rem',
  flexShrink: 0
};

const editButton = {
  padding: '0.4rem 0.8rem',
  backgroundColor: colors.teal,
  color: colors.cream,
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
  fontSize: '0.9rem'
};

const deleteButton = {
  padding: '0.4rem 0.8rem',
  backgroundColor: colors.darkBrown,
  color: colors.cream,
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
  fontSize: '0.9rem'
};

const actionSection = {
  textAlign: 'center',
  paddingTop: '2rem',
  borderTop: `1px solid ${colors.darkBrown}`
};

const logoutButton = {
  padding: '0.8rem 2rem',
  backgroundColor: 'transparent',
  color: colors.darkBrown,
  border: `2px solid ${colors.darkBrown}`,
  borderRadius: '4px',
  fontSize: '1.1rem',
  cursor: 'pointer',
  transition: 'all 0.3s ease'
};

export default Admin;