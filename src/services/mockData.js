// 模拟项目数据
export const mockProjects = [
  {
    id: 1,
    title: '星辰系列',
    description: '受穆夏启发的数字艺术创作，融合古典美学与现代技术。',
    image: '/images/project1.jpg',
    tags: ['插画', '设计', '艺术'],
    createdAt: '2024-01-15',
    link: '#'
  },
  {
    id: 2,
    title: '古典复兴',
    description: '传统艺术风格的现代诠释，探索历史与未来的交汇点。',
    image: '/images/project2.jpg',
    tags: ['设计', '品牌', 'UI/UX'],
    createdAt: '2024-01-10',
    link: '#'
  },
  {
    id: 3,
    title: '诗意代码',
    description: '将算法转化为视觉诗篇，创造独特的数字艺术体验。',
    image: '/images/project3.jpg',
    tags: ['开发', '创意编程', '交互'],
    createdAt: '2024-01-05',
    link: '#'
  }
];

// 模拟博客文章数据
export const mockBlogPosts = [
  {
    id: 1,
    title: '穆夏与新艺术运动',
    excerpt: '探索阿尔丰斯·穆夏如何将自然形态与装饰艺术完美结合，创造出一个充满优雅线条和柔和色彩的世界。',
    content: '这里是完整的文章内容...',
    author: 'Channing Winchester',
    createdAt: '2024-01-20',
    tags: ['艺术', '设计', '历史'],
    comments: [
      {
        id: 1,
        author: '艺术爱好者',
        content: '非常精彩的分析！',
        createdAt: '2024-01-21'
      }
    ]
  },
  {
    id: 2,
    title: '数字时代的古典美学',
    excerpt: '在快节奏的数字化时代，如何保持对传统艺术形式的尊重与创新，让古典美学在现代设计中焕发新生。',
    content: '这里是完整的文章内容...',
    author: 'Channing Winchester',
    createdAt: '2024-01-15',
    tags: ['设计', '技术', '美学'],
    comments: []
  },
  {
    id: 3,
    title: '色彩心理学在UI设计中的应用',
    excerpt: '从穆夏的配色方案中学习如何运用色彩影响用户情绪，创造既有美感又具功能性的数字体验。',
    content: '这里是完整的文章内容...',
    author: 'Channing Winchester',
    createdAt: '2024-01-10',
    tags: ['UI/UX', '心理学', '色彩'],
    comments: []
  }
];

// 模拟API响应延迟
export const simulateAPIDelay = (ms = 1000) => 
  new Promise(resolve => setTimeout(resolve, ms));

// 模拟API函数 - 用于开发阶段
export const mockAPI = {
  projects: {
    getAll: async () => {
      await simulateAPIDelay(800);
      return { success: true, data: mockProjects };
    },
    getById: async (id) => {
      await simulateAPIDelay(500);
      const project = mockProjects.find(p => p.id === parseInt(id));
      return { success: true, data: project };
    }
  },
  
  blog: {
    getAll: async () => {
      await simulateAPIDelay(800);
      return { success: true, data: mockBlogPosts };
    },
    getById: async (id) => {
      await simulateAPIDelay(500);
      const post = mockBlogPosts.find(p => p.id === parseInt(id));
      return { success: true, data: post };
    }
  },
  
  contact: {
    sendMessage: async (messageData) => {
      await simulateAPIDelay(1000);
      console.log('Message sent:', messageData);
      return { success: true, message: '消息发送成功！' };
    }
  },
  
  auth: {
    login: async (credentials) => {
      await simulateAPIDelay(800);
      if (credentials.email && credentials.password) {
        return {
          success: true,
          data: {
            user: {
              id: 1,
              name: 'Channing Winchester',
              email: credentials.email
            },
            token: 'mock-jwt-token-' + Date.now()
          }
        };
      } else {
        throw new Error('请输入邮箱和密码');
      }
    }
  }
};
// 博客管理功能 - 存储在本地存储中
export const blogManager = {
  // 获取所有博客文章
  getAllPosts: () => {
    try {
      const posts = localStorage.getItem('blogPosts');
      return posts ? JSON.parse(posts) : mockBlogPosts;
    } catch (error) {
      console.error('Error reading blog posts:', error);
      return mockBlogPosts;
    }
  },

  // 保存所有博客文章
  saveAllPosts: (posts) => {
    try {
      localStorage.setItem('blogPosts', JSON.stringify(posts));
      return true;
    } catch (error) {
      console.error('Error saving blog posts:', error);
      return false;
    }
  },

  // 创建新文章
  createPost: (postData) => {
    const posts = blogManager.getAllPosts();
    const newPost = {
      id: Date.now(), // 使用时间戳作为ID
      title: postData.title,
      excerpt: postData.excerpt,
      content: postData.content,
      author: 'Channing Winchester',
      createdAt: new Date().toISOString().split('T')[0], // 格式：YYYY-MM-DD
      tags: postData.tags || [],
      comments: []
    };
    
    posts.unshift(newPost); // 添加到开头
    blogManager.saveAllPosts(posts);
    return newPost;
  },

  // 更新文章
  updatePost: (id, postData) => {
    const posts = blogManager.getAllPosts();
    const index = posts.findIndex(post => post.id === id);
    
    if (index !== -1) {
      posts[index] = {
        ...posts[index],
        ...postData,
        id: id // 保持ID不变
      };
      blogManager.saveAllPosts(posts);
      return posts[index];
    }
    return null;
  },

  // 删除文章
  deletePost: (id) => {
    const posts = blogManager.getAllPosts();
    const filteredPosts = posts.filter(post => post.id !== id);
    blogManager.saveAllPosts(filteredPosts);
    return true;
  },

  // 添加评论
  addComment: (postId, commentData) => {
    const posts = blogManager.getAllPosts();
    const post = posts.find(p => p.id === postId);
    
    if (post) {
      const newComment = {
        id: Date.now(),
        author: commentData.author,
        content: commentData.content,
        createdAt: new Date().toLocaleDateString()
      };
      
      post.comments.push(newComment);
      blogManager.saveAllPosts(posts);
      return newComment;
    }
    return null;
  }
};