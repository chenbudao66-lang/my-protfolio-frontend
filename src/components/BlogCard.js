import React, { useState } from 'react';
import { colors } from '../styles/colors';

const BlogCard = ({ post, onClick }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      style={{
        ...cardStyle,
        ...(isHovered ? cardHoverStyle : {})
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
    >
      {/* 装饰性顶部条 */}
      <div style={accentBarStyle}></div>
      
      {/* 标题区域 - 最高权重 */}
      <div style={headerStyle}>
        <h3 style={titleStyle}>{post.title}</h3>
        <div style={ornamentStyle}>❧</div>
      </div>

      {/* 标签行 */}
      <div style={tagsRowStyle}>
        {post.tags && post.tags.slice(0, 3).map((tag, index) => (
          <span key={index} style={tagStyle}>{tag}</span>
        ))}
      </div>

      {/* 摘要 - 中等权重 */}
      <p style={excerptStyle}>{post.excerpt}</p>

      {/* 底部元数据 - 最低权重 */}
      <div style={footerStyle}>
        <div style={metaStyle}>
          <span style={dateStyle}>{post.createdAt}</span>
          <span style={statsStyle}>
            💬 {post.comments ? post.comments.length : 0}
          </span>
        </div>
        <button 
          style={readButtonStyle}
          onMouseEnter={(e) => {
            e.stopPropagation();
            e.target.style.backgroundColor = colors.tealDark;
          }}
          onMouseLeave={(e) => {
            e.stopPropagation();
            e.target.style.backgroundColor = colors.teal;
          }}
        >
          阅读全文
        </button>
      </div>
    </div>
  );
};

// 样式定义 - 严格遵循设计规范
const cardStyle = {
  backgroundColor: colors.cream,
  borderRadius: '12px',
  padding: '24px',
  boxShadow: `0 2px 12px ${colors.darkBrownDark}15`,
  cursor: 'pointer',
  transition: 'all 0.3s ease',
  position: 'relative',
  overflow: 'hidden',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  border: `1px solid ${colors.darkBrown}20`
};

const cardHoverStyle = {
  transform: 'translateY(-4px)',
  boxShadow: `0 8px 25px ${colors.darkBrownDark}25`,
  backgroundColor: colors.creamLight
};

const accentBarStyle = {
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '3px',
  background: `linear-gradient(90deg, ${colors.teal}, ${colors.tealLight})`,
  borderRadius: '12px 12px 0 0'
};

const headerStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'flex-start',
  marginBottom: '12px'
};

const titleStyle = {
  fontSize: '24px',
  fontWeight: 'bold',
  color: colors.darkBrown,
  margin: 0,
  lineHeight: 1.3,
  flex: 1,
  marginRight: '12px'
};

const ornamentStyle = {
  color: colors.teal,
  fontSize: '20px',
  flexShrink: 0
};

const tagsRowStyle = {
  display: 'flex',
  gap: '8px',
  marginBottom: '16px',
  flexWrap: 'wrap'
};

const tagStyle = {
  padding: '4px 10px',
  backgroundColor: colors.overlayDark,
  color: colors.teal,
  fontSize: '12px',
  borderRadius: '20px',
  fontWeight: '500',
  border: `1px solid ${colors.teal}30`
};

const excerptStyle = {
  fontSize: '16px',
  color: colors.darkBrown,
  opacity: 0.8,
  lineHeight: 1.6,
  margin: '0 0 20px 0',
  flex: 1
};

const footerStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginTop: 'auto',
  paddingTop: '16px',
  borderTop: `1px solid ${colors.darkBrown}15`
};

const metaStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '4px'
};

const dateStyle = {
  fontSize: '14px',
  color: colors.darkBrown,
  opacity: 0.6
};

const statsStyle = {
  fontSize: '14px',
  color: colors.darkBrown,
  opacity: 0.6
};

const readButtonStyle = {
  padding: '10px 20px',
  backgroundColor: colors.teal,
  color: colors.cream,
  border: 'none',
  borderRadius: '8px',
  fontSize: '14px',
  fontWeight: '600',
  cursor: 'pointer',
  transition: 'all 0.3s ease',
  flexShrink: 0
};

export default BlogCard;