import { baseUrl, mainTag } from "../utils/config";
import myFetch from "../utils/myFetch";
import useMedia from "./MediaApi";

const useTag = () => {
  const { getMediaDetailsAndSort } = useMedia();

  const getMediaByTag = async (tag = mainTag) => {
    try {
      let json = await myFetch(`${baseUrl}/tags/${tag}`, "GET");
      json = await getMediaDetailsAndSort(json);
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
      const json = await myFetch(`${baseUrl}/tags`, "GET");
      return json;
    } catch (error) {
      throw new Error(error.message);
    }
  };

  const searchTags = async (search) => {
    try {
      let json = await getTags();
      json = await json
        .filter((tag) => tag.tag.includes(search))
        .map((tag) => tag.tag);
      return [...new Set(json)];
    } catch (error) {
      throw new Error(error.message);
    }
  };

  return { getMediaByTag, postTag, getTagsByFileId, getTags, searchTags };
};

export default useTag;
