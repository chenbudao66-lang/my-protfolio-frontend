import React, { useState } from 'react';
import { colors } from '../styles/colors';
import { blogManager } from '../services/mockData';
import { useAuth } from '../context/AuthContext';
import { blogAPI } from '../services/api';

function BlogModal({ post, onClose, onUpdate }) {
  const { user } = useAuth();
  const [commentText, setCommentText] = useState('');

  if (!post) return null;

const handleAddComment = async () => {
  if (!commentText.trim()) {
    alert('请输入评论内容');
    return;
  }

  if (!user) {
    alert('请先登录后再评论');
    return;
  }

  try {
    const commentData = {
      body: commentText.trim(),
      author: user.id // 使用用户ID
    };

    // 调用真实API添加评论
    await blogAPI.addComment(post.id, commentData);
    
    // 重新获取文章数据
    const response = await blogAPI.getById(post.id);
    const updatedPost = response.data || response;
    setCommentText('');
    onUpdate(updatedPost);
    alert('评论发布成功！');
  } catch (err) {
    alert('评论发布失败: ' + err.message);
  }
};

  const handleBackgroundClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div style={overlayStyle} onClick={handleBackgroundClick}>
      <div style={modalStyle}>
        {/* 关闭按钮 */}
        <button style={closeButton} onClick={onClose}>×</button>
        
        {/* 文章内容 */}
        <article style={articleStyle}>
          <header style={headerStyle}>
            <h1 style={titleStyle}>{post.title}</h1>
            <div style={metaStyle}>
              <span style={authorStyle}>作者: {post.author}</span>
              <span style={dateStyle}>发布时间: {post.createdAt}</span>
            </div>
            <div style={tagsContainer}>
              {post.tags && post.tags.map(tag => (
                <span key={tag} style={tagStyle}>{tag}</span>
              ))}
            </div>
          </header>

          <div style={contentStyle}>
            {post.content ? (
              post.content.split('\n').map((paragraph, index) => (
                <p key={index} style={paragraphStyle}>{paragraph}</p>
              ))
            ) : (
              <p style={noContentStyle}>文章内容正在编写中...</p>
            )}
          </div>

          {/* 评论区域 */}
          <section style={commentsSection}>
            <h3 style={commentsTitle}>
              评论 ({post.comments ? post.comments.length : 0})
            </h3>

            {/* 评论表单 */}
            {user ? (
              <div style={commentForm}>
                <textarea
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  placeholder="写下你的评论..."
                  style={commentTextarea}
                  rows="3"
                />
                <button onClick={handleAddComment} style={commentButton}>
                  发布评论
                </button>
              </div>
            ) : (
              <div style={loginPrompt}>
                <p>请<a href="/login" style={loginLink}>登录</a>后发表评论</p>
              </div>
            )}

            {/* 评论列表 */}
            <div style={commentsList}>
              {!post.comments || post.comments.length === 0 ? (
                <p style={noComments}>暂无评论，快来发表第一条评论吧！</p>
              ) : (
                post.comments.map(comment => (
                  <div key={comment.id} style={commentItem}>
                    <div style={commentHeader}>
                      <strong style={commentAuthor}>{comment.author}</strong>
                      <span style={commentDate}>{comment.createdAt}</span>
                    </div>
                    <p style={commentContent}>{comment.content}</p>
                  </div>
                ))
              )}
            </div>
          </section>
        </article>
      </div>
    </div>
  );
}

// 样式定义
const overlayStyle = {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0, 0, 0, 0.8)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: 1000,
  padding: '2rem'
};

const modalStyle = {
  backgroundColor: colors.cream,
  borderRadius: '12px',
  border: `2px solid ${colors.darkBrown}`,
  width: '90%',
  maxWidth: '800px',
  maxHeight: '90vh',
  overflowY: 'auto',
  position: 'relative',
  boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)'
};

const closeButton = {
  position: 'absolute',
  top: '1rem',
  right: '1rem',
  background: 'none',
  border: 'none',
  fontSize: '2rem',
  color: colors.darkBrown,
  cursor: 'pointer',
  width: '40px',
  height: '40px',
  borderRadius: '50%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 1001,
  ':hover': {
    backgroundColor: colors.overlayMedium
  }
};

const articleStyle = {
  padding: '3rem 2rem 2rem 2rem'
};

const headerStyle = {
  borderBottom: `1px solid ${colors.darkBrown}`,
  paddingBottom: '1.5rem',
  marginBottom: '2rem'
};

const titleStyle = {
  color: colors.darkBrown,
  fontSize: '2.2rem',
  marginBottom: '1rem',
  fontWeight: 'normal',
  lineHeight: '1.3'
};

const metaStyle = {
  display: 'flex',
  gap: '2rem',
  marginBottom: '1rem',
  flexWrap: 'wrap'
};

const authorStyle = {
  color: colors.teal,
  fontSize: '1rem'
};

const dateStyle = {
  color: colors.teal,
  fontSize: '1rem'
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

const contentStyle = {
  lineHeight: '1.8',
  fontSize: '1.1rem',
  marginBottom: '2.5rem',
  color: colors.darkBrown
};

const paragraphStyle = {
  marginBottom: '1.5rem'
};

const noContentStyle = {
  color: colors.teal,
  fontStyle: 'italic',
  textAlign: 'center',
  padding: '2rem'
};

const commentsSection = {
  borderTop: `1px solid ${colors.darkBrown}`,
  paddingTop: '2rem'
};

const commentsTitle = {
  color: colors.darkBrown,
  fontSize: '1.4rem',
  marginBottom: '1.5rem'
};

const commentForm = {
  marginBottom: '2rem'
};

const commentTextarea = {
  width: '100%',
  padding: '1rem',
  border: `1px solid ${colors.darkBrown}`,
  borderRadius: '6px',
  fontSize: '1rem',
  backgroundColor: colors.creamLight,
  marginBottom: '1rem',
  resize: 'vertical',
  fontFamily: 'inherit',
  minHeight: '80px'
};

const commentButton = {
  padding: '0.8rem 1.5rem',
  backgroundColor: colors.teal,
  color: colors.cream,
  border: 'none',
  borderRadius: '6px',
  cursor: 'pointer',
  fontSize: '1rem',
  fontWeight: 'bold'
};

const loginPrompt = {
  backgroundColor: colors.overlayMedium,
  padding: '1rem',
  borderRadius: '6px',
  textAlign: 'center',
  marginBottom: '2rem'
};

const loginLink = {
  color: colors.teal,
  textDecoration: 'none',
  fontWeight: 'bold',
  marginLeft: '0.5rem'
};

const commentsList = {
  display: 'flex',
  flexDirection: 'column',
  gap: '1.5rem'
};

const commentItem = {
  backgroundColor: colors.creamLight,
  padding: '1.5rem',
  borderRadius: '8px',
  border: `1px solid ${colors.darkBrown}`
};

const commentHeader = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: '0.5rem',
  flexWrap: 'wrap',
  gap: '0.5rem'
};

const commentAuthor = {
  color: colors.darkBrown,
  fontSize: '1rem',
  fontWeight: 'bold'
};

const commentDate = {
  color: colors.teal,
  fontSize: '0.9rem'
};

const commentContent = {
  color: colors.darkBrown,
  lineHeight: '1.6',
  margin: 0
};

const noComments = {
  color: colors.teal,
  textAlign: 'center',
  fontStyle: 'italic',
  padding: '2rem'
};

export default BlogModal;