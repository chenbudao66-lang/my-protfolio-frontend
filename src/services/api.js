// API基础URL - 在实际项目中替换为你的后端API地址
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// 通用的API请求函数
async function apiRequest(endpoint, options = {}) {
  const url = `${API_BASE_URL}${endpoint}`;
  
  const config = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  };

  // 如果有token，添加到请求头
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  try {
    const response = await fetch(url, config);
    
    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('API Request failed:', error);
    throw error;
  }
}

// 项目相关API
export const projectsAPI = {
  // 获取所有项目
  getAll: () => apiRequest('/projects'),
  
  // 获取单个项目
  getById: (id) => apiRequest(`/projects/${id}`),
  
  // 创建项目 (需要认证)
  create: (projectData) => apiRequest('/projects', {
    method: 'POST',
    body: JSON.stringify(projectData),
  }),
  
  // 更新项目 (需要认证)
  update: (id, projectData) => apiRequest(`/projects/${id}`, {
    method: 'PUT',
    body: JSON.stringify(projectData),
  }),
  
  // 删除项目 (需要认证)
  delete: (id) => apiRequest(`/projects/${id}`, {
    method: 'DELETE',
  }),
};

// 博客相关API
export const blogAPI = {
  // 获取所有博客文章
  getAll: () => apiRequest('/blog'),
  
  // 获取单篇文章
  getById: (id) => apiRequest(`/blog/${id}`),
  
  // 创建文章 (需要认证)
  create: (postData) => apiRequest('/blog', {
    method: 'POST',
    body: JSON.stringify(postData),
  }),
  
  // 更新文章 (需要认证)
  update: (id, postData) => apiRequest(`/blog/${id}`, {
    method: 'PUT',
    body: JSON.stringify(postData),
  }),
  
  // 删除文章 (需要认证)
  delete: (id) => apiRequest(`/blog/${id}`, {
    method: 'DELETE',
  }),
  
  // 添加评论 (需要认证)
  addComment: (postId, commentData) => apiRequest(`/blog/${postId}/comments`, {
    method: 'POST',
    body: JSON.stringify(commentData),
  }),
};

// 联系表单API
export const contactAPI = {
  // 发送联系消息
  sendMessage: (messageData) => apiRequest('/contact', {
    method: 'POST',
    body: JSON.stringify(messageData),
  }),
};

// 用户认证API
export const authAPI = {
  // 用户登录
  login: (credentials) => apiRequest('/users/login', {
    method: 'POST',
    body: JSON.stringify(credentials),
  }),
  
  // 用户注册
  register: (userData) => apiRequest('/users/register', {
    method: 'POST',
    body: JSON.stringify(userData),
  }),
  
  // 获取当前用户信息
  getCurrentUser: () => apiRequest('/users/me'),
};

export default apiRequest;