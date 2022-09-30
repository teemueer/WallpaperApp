import { baseUrl, mainTag } from "../utils/config";
import myFetch from "../utils/myFetch";

const useMedia = () => {
  const postMedia = async (data) => {
    try {
      const json = await myFetch(`${baseUrl}/media`, "POST", data, false);
      return json;
    } catch (error) {
      throw new Error(error.message);
    }
  };

  return { postMedia };
};

export default useMedia;
