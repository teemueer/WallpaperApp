import { baseUrl, mainTag } from "../utils/config";
import myFetch from "../utils/myFetch";

const useTag = () => {
  const getMediaByTag = async () => {
    try {
      const json = await myFetch(`${baseUrl}/tags/${mainTag}`, "GET");
      return json.map((item) => ({
        ...item,
        uri: `${baseUrl}/uploads/${item.filename}`,
      }));
    } catch (error) {
      throw new Error(error.message);
    }
  };

  return { getMediaByTag };
};

export default useTag;
