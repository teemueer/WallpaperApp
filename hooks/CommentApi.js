import { baseUrl } from "../utils/config";
import myFetch from "../utils/myFetch";

const useComment = () => {
  const deleteCommentById = async (id) => {
    try {
      const json = await myFetch(`${baseUrl}/comments/${id}`, "DELETE");
      return json;
    } catch (error) {
      throw new Error(error.message);
    }
  };

  const postComment = async (data) => {
    try {
      const json = await myFetch(`${baseUrl}/comments`, "POST", data);
      return json;
    } catch (error) {
      throw new Error(error.message);
    }
  };

  const getCommentsByFileId = async (file_id) => {
    try {
      const json = await myFetch(`${baseUrl}/comments/file/${file_id}`, "GET");
      return json;
    } catch (error) {
      throw new Error(error.message);
    }
  };

  const getMyComments = async () => {
    try {
      const json = await myFetch(`${baseUrl}/comments`, "GET");
      return json;
    } catch (error) {
      throw new Error(error.message);
    }
  };

  return { deleteCommentById, postComment, getCommentsByFileId, getMyComments };
};

export default useComment;
