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