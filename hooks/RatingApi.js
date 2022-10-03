import { baseUrl, mainTag } from "../utils/config";
import myFetch from "../utils/myFetch";

const useRating = () => {
  const postRating = async (data) => {
    try {
      const json = await myFetch(`${baseUrl}/ratings`, "POST", data);
      return json;
    } catch (error) {
      throw new Error(error.message);
    }
  };

  const deleteRatingByFileId = async (file_id) => {
    try {
      const json = await myFetch(
        `${baseUrl}/ratings/file/${file_id}`,
        "DELETE"
      );
      return json;
    } catch (error) {
      throw new Error(error.message);
    }
  };

  const getRatingsByFileId = async (file_id) => {
    try {
      const json = await myFetch(`${baseUrl}/ratings/file/${file_id}`, "GET");
      return json;
    } catch (error) {
      throw new Error(error.message);
    }
  };

  const getRatings = async () => {
    try {
      const json = await myFetch(`${baseUrl}/ratings`, "GET");
      return json;
    } catch (error) {
      throw new Error(error.message);
    }
  };

  return { postRating, deleteRatingByFileId, getRatingsByFileId, getRatings };
};

export default useRating;
