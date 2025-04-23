import api from './api';

interface CommentCreatePayload {
  name: string;
  email: string;
  comment: string;
  blogId: number;
}

interface CommentUpdatePayload {
  name?: string;
  email?: string;
  comment?: string;
}

// Fetch comments for a blog
export const fetchComments = async (blogId: number) => {
  try {
    const response = await api.get(`/api/comments`, {
      params: { blogId }
    });
    return response.data;
  } catch (error: any) {
    console.error("Error fetching comments:", error.response?.data || error.message);
    throw error;
  }
};

// Create a new comment
export const createComment = async (commentData: CommentCreatePayload) => {
  try {
    const response = await api.post('/api/comments', commentData);
    return response.data;
  } catch (error: any) {
    console.error("Error creating comment:", error.response?.data || error.message);
    throw error;
  }
};

// Update a comment
export const updateComment = async (commentId: number, updatedFields: CommentUpdatePayload) => {
  try {
    const response = await api.put(`/api/comments/${commentId}`, updatedFields);
    return response.data;
  } catch (error: any) {
    console.error("Error updating comment:", error.response?.data || error.message);
    throw error;
  }
};

// Delete a comment
export const deleteComment = async (commentId: number) => {
  try {
    const response = await api.delete(`/api/comments/${commentId}`);
    return response.data;
  } catch (error: any) {
    console.error("Error deleting comment:", error.response?.data || error.message);
    throw error;
  }
};
