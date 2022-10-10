import { baseUrl, mainTag } from "../utils/config";
import myFetch from "../utils/myFetch";

const useTag = () => {
  const getMediaByTag = async (tag) => {
    try {
      let json = await myFetch(`${baseUrl}/tags/${mainTag}`, "GET");
      return json;
    } catch (error) {
      throw new Error(error.message);
    }
  };

  const postTag = async (data) => {
    try {
      const json = await myFetch(`${baseUrl}/tags`, "POST", data);
      return json;
    } catch (error) {
      throw new Error(error.message);
    }
  };

  const getTagsByFileId = async (file_id) => {
    try {
      const json = await myFetch(`${baseUrl}/tags/file/${file_id}`, "GET");
      return json;
    } catch (error) {
      throw new Error(error.message);
    }
  };

  const getTags = async () => {
    try {
      let json = await myFetch(`${baseUrl}/tags`, "GET");
      return json;
    } catch (error) {
      throw new Error(error.message);
    }
  };

  const searchTags = async (search) => {
    try {
      let json = await getTags();
      json = await json.filter((tag) => tag.tag.includes(search));
      return [...new Set(json)];
    } catch (error) {
      throw new Error(error.message);
    }
  };

  const deleteTag = async (id) => {
    try {
      const json = await myFetch(`${baseUrl}/tags/${id}`, "DELETE");
      return json;
    } catch (error) {
      throw new Error(error.message);
    }
  };

  return {
    getMediaByTag,
    postTag,
    getTagsByFileId,
    getTags,
    searchTags,
    deleteTag,
  };
};

export default useTag;
