import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { colors } from '../styles/colors';
import { blogManager } from '../services/mockData';
import { useAuth } from '../context/AuthContext';
import { blogAPI } from '../services/api';

function BlogDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [commentText, setCommentText] = useState('');

  useEffect(() => {
  const fetchPost = async () => {
    try {
      setLoading(true);
      // 改为调用真实API
      const response = await blogAPI.getById(id);
      setPost(response.data || response); // 适配不同的响应格式
    } catch (err) {
      console.error('Error fetching blog post:', err);
    } finally {
      setLoading(false);
    }
  };

  fetchPost();
}, [id]);

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
      author: user.id // 使用用户ID而不是名字
    };

    // 调用真实API添加评论
    await blogAPI.addComment(id, commentData);
    
    // 重新获取文章数据以更新评论列表
    const response = await blogAPI.getById(id);
    setPost(response.data || response);
    setCommentText('');
    alert('评论发布成功！');
  } catch (err) {
    alert('评论发布失败: ' + err.message);
  }
};

  if (loading) {
    return (
      <div style={pageStyle}>
        <div style={loadingStyle}>加载中...</div>
      </div>
    );
  }

  if (!post) {
    return (
      <div style={pageStyle}>
        <div style={errorStyle}>
          <h2>文章未找到</h2>
          <button onClick={() => navigate('/blog')} style={backButton}>
            返回博客列表
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={pageStyle}>
      <button onClick={() => navigate('/blog')} style={backButton}>
        ← 返回博客列表
      </button>

      <article style={articleStyle}>
        <header style={headerStyle}>
          <h1 style={titleStyle}>{post.title}</h1>
          <div style={metaStyle}>
            <span style={authorStyle}>作者: {post.author}</span>
            <span style={dateStyle}>发布时间: {post.createdAt}</span>
          </div>
          <div style={tagsContainer}>
            {post.tags.map(tag => (
              <span key={tag} style={tagStyle}>{tag}</span>
            ))}
          </div>
        </header>

        <div style={contentStyle}>
          {post.content.split('\n').map((paragraph, index) => (
            <p key={index} style={paragraphStyle}>{paragraph}</p>
          ))}
        </div>

        {/* 评论区域 */}
        <section style={commentsSection}>
          <h3 style={commentsTitle}>
            评论 ({post.comments.length})
          </h3>

          {/* 评论表单 */}
          {user ? (
            <div style={commentForm}>
              <textarea
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                placeholder="写下你的评论..."
                style={commentTextarea}
                rows="4"
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
            {post.comments.length === 0 ? (
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
  );
}

// 样式定义
const pageStyle = {
  padding: '2rem',
  maxWidth: '800px',
  margin: '0 auto',
  backgroundColor: colors.cream,
  color: colors.darkBrown,
  minHeight: '70vh'
};

const backButton = {
  padding: '0.5rem 1rem',
  backgroundColor: 'transparent',
  color: colors.teal,
  border: `1px solid ${colors.teal}`,
  borderRadius: '4px',
  cursor: 'pointer',
  marginBottom: '2rem'
};

const articleStyle = {
  backgroundColor: colors.overlayLight,
  padding: '2rem',
  borderRadius: '8px',
  border: `1px solid ${colors.darkBrown}`
};

const headerStyle = {
  borderBottom: `1px solid ${colors.darkBrown}`,
  paddingBottom: '1rem',
  marginBottom: '2rem'
};

const titleStyle = {
  color: colors.darkBrown,
  fontSize: '2.5rem',
  marginBottom: '1rem',
  fontWeight: 'normal'
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
  marginBottom: '3rem'
};

const paragraphStyle = {
  marginBottom: '1.5rem'
};

const commentsSection = {
  borderTop: `1px solid ${colors.darkBrown}`,
  paddingTop: '2rem'
};

const commentsTitle = {
  color: colors.darkBrown,
  fontSize: '1.5rem',
  marginBottom: '1.5rem'
};

const commentForm = {
  marginBottom: '2rem'
};

const commentTextarea = {
  width: '100%',
  padding: '1rem',
  border: `1px solid ${colors.darkBrown}`,
  borderRadius: '4px',
  fontSize: '1rem',
  backgroundColor: colors.creamLight,
  marginBottom: '1rem',
  resize: 'vertical'
};

const commentButton = {
  padding: '0.8rem 1.5rem',
  backgroundColor: colors.teal,
  color: colors.cream,
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
  fontSize: '1rem'
};

const loginPrompt = {
  backgroundColor: colors.overlayMedium,
  padding: '1rem',
  borderRadius: '4px',
  textAlign: 'center',
  marginBottom: '2rem'
};

const loginLink = {
  color: colors.teal,
  textDecoration: 'none',
  fontWeight: 'bold'
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
  fontSize: '1rem'
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

const loadingStyle = {
  textAlign: 'center',
  padding: '4rem',
  color: colors.darkBrown
};

const errorStyle = {
  textAlign: 'center',
  padding: '4rem',
  color: colors.darkBrown
};

export default BlogDetail;