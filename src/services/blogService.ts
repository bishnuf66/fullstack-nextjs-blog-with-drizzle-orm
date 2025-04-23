interface BlogCreatePayload {
  title: string;
  description: string;
  image: string; // base64 encoded image
  imageType: string; // MIME type of the image
  userId: number;
}

interface BlogUpdatePayload {
  title?: string;
  description?: string;
  image?: string;
  imageType?: string;
}

// Fetch all blogs
export const fetchBlogs = async () => {
  try {
    const response = await fetch('/api/blogs');
    if (!response.ok) {
      throw new Error('Failed to fetch blogs');
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching blogs:", error);
    throw error;
  }
};

// Create a new blog
export const createBlog = async (blogData: BlogCreatePayload) => {
  try {
    const response = await fetch('/api/blogs/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(blogData),
    });

    if (!response.ok) {
      throw new Error('Failed to create blog');
    }

    return await response.json();
  } catch (error) {
    console.error("Error creating blog:", error);
    throw error;
  }
};

// Update a blog
export const updateBlog = async (blogId: number, updatedFields: BlogUpdatePayload) => {
  try {
    const response = await fetch(`/api/blogs/${blogId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedFields),
    });

    if (!response.ok) {
      throw new Error('Failed to update blog');
    }

    return await response.json();
  } catch (error) {
    console.error("Error updating blog:", error);
    throw error;
  }
};

// Delete a blog
export const deleteBlog = async (blogId: number) => {
  try {
    const response = await fetch(`/api/blogs/${blogId}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error('Failed to delete blog');
    }

    return await response.json();
  } catch (error) {
    console.error("Error deleting blog:", error);
    throw error;
  }
};
