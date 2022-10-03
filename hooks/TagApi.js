import { baseUrl, mainTag } from "../utils/config";
import myFetch from "../utils/myFetch";

const useTag = () => {
  const getMediaByTag = async (tag = mainTag) => {
    try {
      const json = await myFetch(`${baseUrl}/tags/${tag}`, "GET");
      return json.map((item) => ({
        ...item,
        uri: `${baseUrl}/uploads/${item.filename}`,
      }));
    } catch (error) {
      throw new Error(error.message);
    }
  };

  const postTag = async (data) => {
    try {
      const json = await myFetch(`${baseUrl}/tags`, "POST", data);
      return json;
    } catch (error) {
      console.error("postUser():", error.message);
    }
  };

  const getTagsByFileId = async (file_id) => {
    try {
      const json = await myFetch(`${baseUrl}/tags/file/${file_id}`, "GET");
      return json;
    } catch (error) {
      console.error("postUser():", error.message);
    }
  };

  const getTags = async () => {
    try {
      const json = await myFetch(`${baseUrl}/tags`, "GET");
      return json;
    } catch (error) {
      console.error("postUser():", error.message);
    }
  };

  return { getMediaByTag, postTag, getTagsByFileId, getTags };
};

export default useTag;
