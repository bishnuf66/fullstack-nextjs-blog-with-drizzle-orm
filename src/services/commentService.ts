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
    const response = await fetch(`/api/comments?blogId=${blogId}`);
    if (!response.ok) {
      throw new Error('Failed to fetch comments');
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching comments:", error);
    throw error;
  }
};

// Create a new comment
export const createComment = async (commentData: CommentCreatePayload) => {
  try {
    const response = await fetch('/api/comments', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(commentData),
    });

    if (!response.ok) {
      throw new Error('Failed to create comment');
    }

    return await response.json();
  } catch (error) {
    console.error("Error creating comment:", error);
    throw error;
  }
};

// Update a comment
export const updateComment = async (commentId: number, updatedFields: CommentUpdatePayload) => {
  try {
    const response = await fetch(`/api/comments/${commentId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedFields),
    });

    if (!response.ok) {
      throw new Error('Failed to update comment');
    }

    return await response.json();
  } catch (error) {
    console.error("Error updating comment:", error);
    throw error;
  }
};

// Delete a comment
export const deleteComment = async (commentId: number) => {
  try {
    const response = await fetch(`/api/comments/${commentId}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error('Failed to delete comment');
    }

    return await response.json();
  } catch (error) {
    console.error("Error deleting comment:", error);
    throw error;
  }
}; 