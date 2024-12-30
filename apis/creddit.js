import instance from "./index";

async function getAllPosts() {
  const data = await instance.get("/posts");
  console.log("getAllPost", data);
  return data;
}

async function getPostById(id) {
  const data = await instance.get(`/posts/${id}`);
  console.log("getPostById", data);
  return data;
}

async function addPost(formData) {
  const data = await instance.post("/posts", formData);
  console.log("addPost", data);
  return data;
}

async function deletePost(id) {
  const data = await instance.delete(`/posts/${id}`);
  console.log("deletePost", data);

  return data;
}

async function addComment(formData, id) {
  try {
    const data = await instance.post(`/posts/${id}/comments`, formData);
    return data;
  } catch (error) {
    throw error;
  }
}

async function deleteComment(id) {
  try {
    const data = await instance.delete(`/posts/comments/${id}`);
    return data;
  } catch (error) {
    throw error;
  }
}

export {
  getAllPosts,
  getPostById,
  addPost,
  deletePost,
  addComment,
  deleteComment,
};
