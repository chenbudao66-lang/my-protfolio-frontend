import React, { useState, useEffect } from 'react';
import { colors } from '../styles/colors';
import { mockAPI } from '../services/mockData';

function Blog() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const response = await mockAPI.blog.getAll();
        setPosts(response.data);
      } catch (err) {
        setError('获取博客文章失败: ' + err.message);
        console.error('Error fetching blog posts:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) {
    return (
      <div style={pageStyle}>
        <div style={loadingStyle}>
          <div style={spinnerStyle}></div>
          <p style={loadingText}>加载文章中...</p >
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
        <h1 style={titleStyle}>艺术随笔</h1>
        <p style={subtitleStyle}>思想与灵感的记录</p >
        <div style={ornamentStyle}>❧</div>
      </div>

      <div style={articlesList}>
        {posts.map(post => (
          <div key={post.id} style={articleCard}>
            <div style={articleHeader}>
              <h3 style={articleTitle}>{post.title}</h3>
              <span style={articleDate}>{post.createdAt}</span>
            </div>
            <p style={articleExcerpt}>{post.excerpt}</p >
            <div style={articleFooter}>
              <div style={tagsContainer}>
                {post.tags.map(tag => (
                  <span key={tag} style={tagStyle}>{tag}</span>
                ))}
              </div>
              <span style={readMore}>阅读更多 →</span>
            </div>
          </div>
        ))}
      </div>

      <div style={quoteSection}>
        <p style={quoteText}>
          "写作是思想的绘画，<br/>
          每一篇文章都是心灵的风景。"
        </p >
        <p style={signature}>— Channing Winchester —</p >
      </div>
    </div>
  );
}

const pageStyle = {
  padding: '2rem',
  maxWidth: '800px',
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

const articlesList = {
  display: 'flex',
  flexDirection: 'column',
  gap: '2rem',
  marginBottom: '4rem'
};

const articleCard = {
  border: `1px solid ${colors.darkBrown}`,
  backgroundColor: colors.overlayLight,
  padding: '2rem',
  borderRadius: '8px',
  transition: 'all 0.3s ease'
};

const articleHeader = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'flex-start',
  marginBottom: '1rem',
  flexWrap: 'wrap',
  gap: '1rem'
};

const articleTitle = {
  color: colors.darkBrown,
  fontSize: '1.5rem',
  fontWeight: 'normal',
  margin: 0,
  flex: 1
};

const articleDate = {
  color: colors.teal,
  fontSize: '0.9rem',
  whiteSpace: 'nowrap'
};

const articleExcerpt = {
  color: colors.darkBrown,
  lineHeight: '1.7',
  fontSize: '1.1rem',
  marginBottom: '1.5rem'
};

const articleFooter = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  flexWrap: 'wrap',
  gap: '1rem'
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

const readMore = {
  color: colors.teal,
  fontSize: '1rem',
  textDecoration: 'none',
  fontStyle: 'italic',
  cursor: 'pointer',
  whiteSpace: 'nowrap'
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
  color: 'colors.darkBrown',
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

export default Blog;