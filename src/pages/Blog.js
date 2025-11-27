import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { colors } from '../styles/colors';
import { blogManager } from '../services/mockData';
import BlogModal from '../components/BlogModal';
import BlogCard from '../components/BlogCard';
import { blogAPI } from '../services/api';

function Blog() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedPost, setSelectedPost] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

 useEffect(() => {
  const fetchPosts = async () => {
    try {
      setLoading(true);
      // 改为调用真实API
      const response = await blogAPI.getAll();
      setPosts(response.data || response); // 适配不同的响应格式
    } catch (err) {
      setError('获取博客文章失败: ' + err.message);
      console.error('Error fetching blog posts:', err);
    } finally {
      setLoading(false);
    }
  };

  fetchPosts();
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
    const updatedPosts = posts.map(post => 
      post.id === updatedPost.id ? updatedPost : post
    );
    setPosts(updatedPosts);
    setSelectedPost(updatedPost);
  };

  const handleCreatePost = () => {
    if (isAuthenticated()) {
      navigate('/admin');
    } else {
      navigate('/login');
    }
  };

  if (loading) {
    return (
      <div style={pageStyle}>
        <div style={loadingStyle}>
          <div style={spinnerStyle}></div>
          <p style={loadingText}>加载文章中...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div style={pageStyle}>
        <div style={errorStyle}>
          <p style={errorText}>{error}</p>
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
        <p style={subtitleStyle}>思想与灵感的记录</p>
        <div style={ornamentStyle}>❧</div>
        
        <button 
          onClick={handleCreatePost}
          style={createButton}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = colors.tealDark;
            e.target.style.transform = 'translateY(-2px)';
            e.target.style.boxShadow = `0 4px 15px ${colors.darkBrownDark}50`;
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = colors.teal;
            e.target.style.transform = 'translateY(0)';
            e.target.style.boxShadow = `0 2px 10px ${colors.darkBrownDark}30`;
          }}
        >
          ✍🏻️ 写下灵感
        </button>
      </div>

      <div style={blogGridStyle}>
        {posts.length === 0 ? (
          <div style={emptyState}>
            <h3 style={emptyTitle}>暂无文章</h3>
            <p style={emptyText}>还没有发布任何博客文章</p>
            <button 
              onClick={handleCreatePost}
              style={createButton}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = colors.tealDark;
                e.target.style.transform = 'translateY(-2px)';
                e.target.style.boxShadow = `0 4px 15px ${colors.darkBrownDark}50`;
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = colors.teal;
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = `0 2px 10px ${colors.darkBrownDark}30`;
              }}
            >
               📜 写下第一篇文章
            </button>
          </div>
        ) : (
          posts.map(post => (
            <BlogCard 
              key={post.id} 
              post={post}
              onClick={() => handlePostClick(post)}
            />
          ))
        )}
      </div>

      <div style={quoteSection}>
        <p style={quoteText}>
          "写作是思想的绘画，<br/>
          每一篇文章都是心灵的风景。"
        </p>
        <p style={signature}>— Channing Winchester —</p>
      </div>

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
  padding: '2rem',
  maxWidth: '1400px',
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
  fontSize: '2rem',
  marginBottom: '2rem'
};

// 响应式网格布局
const blogGridStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(1, 1fr)',
  gap: '2rem',
  marginBottom: '4rem',
  '@media (min-width: 768px)': {
    gridTemplateColumns: 'repeat(2, 1fr)'
  },
  '@media (min-width: 1024px)': {
    gridTemplateColumns: 'repeat(3, 1fr)'
  }
};

const createButton = {
  padding: '12px 24px',
  backgroundColor: colors.teal,
  color: colors.cream,
  border: 'none',
  borderRadius: '8px',
  fontSize: '1rem',
  fontWeight: '600',
  cursor: 'pointer',
  transition: 'all 0.3s ease',
  marginTop: '1rem',
  boxShadow: `0 2px 10px ${colors.darkBrownDark}30`
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

const emptyState = {
  textAlign: 'center',
  padding: '4rem 2rem',
  backgroundColor: colors.overlayLight,
  borderRadius: '12px',
  border: `1px solid ${colors.darkBrown}`,
  gridColumn: '1 / -1'
};

const emptyTitle = {
  color: colors.darkBrown,
  fontSize: '1.5rem',
  marginBottom: '1rem'
};

const emptyText = {
  color: colors.teal,
  fontSize: '1.1rem',
  lineHeight: '1.6',
  marginBottom: '2rem'
};

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
const styleSheet = document.styleSheets[0];
const keyframes = `
@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

@media (min-width: 768px) {
  .blog-grid-responsive {
    grid-template-columns: repeat(2, 1fr) !important;
  }
}

@media (min-width: 1024px) {
  .blog-grid-responsive {
    grid-template-columns: repeat(3, 1fr) !important;
  }
}
`;

// 插入样式
try {
  styleSheet.insertRule(keyframes, styleSheet.cssRules.length);
} catch (e) {
  console.log('Styles already exist');
}

// 创建带有响应式类名的样式
const blogGridWithResponsive = {
  ...blogGridStyle,
  className: 'blog-grid-responsive'
};

export default Blog;