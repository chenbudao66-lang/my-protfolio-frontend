import React, { useState, useEffect } from 'react';
import { colors } from '../styles/colors';

function BlogEditor({ post, onSave, onCancel }) {
  const [title, setTitle] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // 如果是编辑模式，填充现有数据
  useEffect(() => {
    if (post) {
      setTitle(post.title || '');
      setExcerpt(post.excerpt || '');
      setContent(post.content || '');
      setTags(Array.isArray(post.tags) ? post.tags.join(', ') : '');
    }
  }, [post]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!title.trim() || !excerpt.trim() || !content.trim()) {
      alert('请填写标题、摘要和内容');
      return;
    }

    setIsSubmitting(true);

    try {
      const postData = {
        title: title.trim(),
        excerpt: excerpt.trim(),
        content: content.trim(),
        tags: tags.split(',').map(tag => tag.trim()).filter(tag => tag)
      };

      await onSave(postData);
    } catch (error) {
      console.error('保存文章失败:', error);
      alert('保存失败，请重试');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div style={overlayStyle}>
      <div style={modalStyle}>
        <h2 style={modalTitle}>
          {post ? '编辑文章' : '撰写新文章'}
        </h2>
        
        <form onSubmit={handleSubmit} style={formStyle}>
          <div style={inputGroup}>
            <label style={labelStyle}>标题 *</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              style={inputStyle}
              placeholder="输入文章标题"
              required
            />
          </div>

          <div style={inputGroup}>
            <label style={labelStyle}>摘要 *</label>
            <textarea
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
              style={textareaStyle}
              placeholder="输入文章摘要"
              rows="3"
              required
            />
          </div>

          <div style={inputGroup}>
            <label style={labelStyle}>内容 *</label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              style={contentTextareaStyle}
              placeholder="输入文章内容"
              rows="10"
              required
            />
          </div>

          <div style={inputGroup}>
            <label style={labelStyle}>标签</label>
            <input
              type="text"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              style={inputStyle}
              placeholder="用逗号分隔标签，例如：艺术,设计,技术"
            />
            <small style={helpText}>多个标签请用英文逗号分隔</small>
          </div>

          <div style={buttonGroup}>
            <button
              type="button"
              onClick={onCancel}
              style={cancelButton}
              disabled={isSubmitting}
            >
              取消
            </button>
            <button
              type="submit"
              style={submitButton}
              disabled={isSubmitting}
            >
              {isSubmitting ? '保存中...' : (post ? '更新文章' : '发布文章')}
            </button>
          </div>
        </form>
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
  backgroundColor: 'rgba(0, 0, 0, 0.7)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: 1000
};

const modalStyle = {
  backgroundColor: colors.cream,
  padding: '2rem',
  borderRadius: '8px',
  border: `2px solid ${colors.darkBrown}`,
  width: '90%',
  maxWidth: '600px',
  maxHeight: '90vh',
  overflowY: 'auto'
};

const modalTitle = {
  color: colors.darkBrown,
  fontSize: '1.5rem',
  marginBottom: '1.5rem',
  textAlign: 'center'
};

const formStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '1.5rem'
};

const inputGroup = {
  display: 'flex',
  flexDirection: 'column',
  gap: '0.5rem'
};

const labelStyle = {
  color: colors.darkBrown,
  fontSize: '1rem',
  fontWeight: 'bold'
};

const inputStyle = {
  padding: '0.8rem',
  border: `1px solid ${colors.darkBrown}`,
  borderRadius: '4px',
  fontSize: '1rem',
  backgroundColor: colors.overlayLight
};

const textareaStyle = {
  ...inputStyle,
  resize: 'vertical',
  minHeight: '80px'
};

const contentTextareaStyle = {
  ...textareaStyle,
  minHeight: '200px'
};

const helpText = {
  color: colors.teal,
  fontSize: '0.8rem',
  fontStyle: 'italic'
};

const buttonGroup = {
  display: 'flex',
  gap: '1rem',
  justifyContent: 'flex-end',
  marginTop: '1rem'
};

const cancelButton = {
  padding: '0.8rem 1.5rem',
  backgroundColor: 'transparent',
  color: colors.darkBrown,
  border: `1px solid ${colors.darkBrown}`,
  borderRadius: '4px',
  cursor: 'pointer',
  fontSize: '1rem'
};

const submitButton = {
  padding: '0.8rem 1.5rem',
  backgroundColor: colors.teal,
  color: colors.cream,
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
  fontSize: '1rem'
};

export default BlogEditor;