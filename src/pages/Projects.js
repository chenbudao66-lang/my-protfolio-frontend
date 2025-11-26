import React, { useState, useEffect } from 'react';
import { colors } from '../styles/colors';
import { mockAPI } from '../services/mockData';

function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        // 使用模拟API - 在实际项目中替换为真实的API调用
        const response = await mockAPI.projects.getAll();
        setProjects(response.data);
      } catch (err) {
        setError('获取项目数据失败: ' + err.message);
        console.error('Error fetching projects:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  if (loading) {
    return (
      <div style={pageStyle}>
        <div style={loadingStyle}>
          <div style={spinnerStyle}></div>
          <p style={loadingText}>加载项目中...</p >
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div style={pageStyle}>
        <div style={errorStyle}>
          <p style={errorText}>{error}</p >
          <button 
            onClick={() => window.location.reload()} 
            style={retryButton}
          >
            重试
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={pageStyle}>
      <div style={headerSection}>
        <h1 style={titleStyle}>我的作品</h1>
        <p style={subtitleStyle}>艺术与技术的完美融合</p >
        <div style={ornamentStyle}>✻</div>
      </div>

      <div style={projectsGrid}>
        {projects.map(project => (
          <div key={project.id} style={projectCard}>
            <div style={projectImage}>
              {/* 项目图片占位符 */}
            </div>
            <div style={projectContent}>
              <h3 style={projectTitle}>{project.title}</h3>
              <p style={projectDesc}>{project.description}</p >
              <div style={tagsContainer}>
                {project.tags.map(tag => (
                  <span key={tag} style={projectTag}>{tag}</span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div style={quoteSection}>
        <p style={quoteText}>
          "每个项目都是一次艺术探索，<br/>
          在古典与现代之间寻找平衡点。"
        </p >
        <p style={signature}>— Channing Winchester —</p >
      </div>
    </div>
  );
}

const pageStyle = {
  padding: '2rem',
  maxWidth: '1200px',
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

const projectsGrid = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
  gap: '2rem',
  marginBottom: '4rem'
};

const projectCard = {
  border: `2px solid ${colors.darkBrown}`,
  backgroundColor: colors.overlayLight,
  borderRadius: '8px',
  overflow: 'hidden',
  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  boxShadow: `0 4px 16px ${colors.darkBrownDark}`,
  cursor: 'pointer'
};

projectCard[':hover'] = {
  transform: 'translateY(-5px)',
  boxShadow: `0 8px 25px ${colors.darkBrownDark}`
};

const projectImage = {
  height: '200px',
  backgroundColor: colors.teal,
  borderBottom: `1px solid ${colors.darkBrown}`
};

const projectContent = {
  padding: '1.5rem'
};

const projectTitle = {
  color: colors.darkBrown,
  fontSize: '1.5rem',
  marginBottom: '0.8rem',
  fontWeight: 'normal'
};

const projectDesc = {
  color: colors.darkBrown,
  lineHeight: '1.6',
  marginBottom: '1rem'
};

const tagsContainer = {
  display: 'flex',
  flexWrap: 'wrap',
  gap: '0.5rem'
};

const projectTag = {
  display: 'inline-block',
  padding: '0.3rem 0.8rem',
  backgroundColor: colors.darkBrown,
  color: colors.cream,
  fontSize: '0.8rem',
  borderRadius: '4px'
};

const quoteSection = {
  textAlign: 'center',
  padding: '3rem',
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

// 加载状态样式
const loadingStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '4rem 2rem'
};

const spinnerStyle = {
  width: '50px',
  height: '50px',
  border: `4px solid ${colors.creamLight}`,
  borderTop: `4px solid ${colors.teal}`,
  borderRadius: '50%',
  animation: 'spin 1s linear infinite',
  marginBottom: '1rem'
};

const loadingText = {
  color: colors.darkBrown,
  fontSize: '1.2rem'
};

// 错误状态样式
const errorStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '4rem 2rem',
  textAlign: 'center'
};

const errorText = {
  color: colors.darkBrown,
  fontSize: '1.2rem',
  marginBottom: '1.5rem'
};

const retryButton = {
  padding: '0.8rem 2rem',
  backgroundColor: colors.darkBrown,
  color: colors.cream,
  border: 'none',
  borderRadius: '4px',
  fontSize: '1rem',
  cursor: 'pointer',
  transition: 'all 0.3s ease'
};

// 添加CSS动画
const styles = document.createElement('style');
styles.textContent = `
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;
document.head.appendChild(styles);

export default Projects;