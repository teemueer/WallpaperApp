import { baseUrl } from "../utils/config";
import myFetch from "../utils/myFetch";

const useFavourite = () => {
  const postFavourite = async (data) => {
    console.log(data)
    try {
      const json = await myFetch(`${baseUrl}/favourites`, "POST", data);
      console.log(json)
      return json;
    } catch (error) {
      throw new Error(error.message);
    }
  };

  const deleteFavouriteByFileId = async (file_id) => {
    try {
      const json = await myFetch(
        `${baseUrl}/favourites/file/${file_id}`,
        "DELETE"
      );
      return json;
    } catch (error) {
      throw new Error(error.message);
    }
  };

  const getFavouritesByFileId = async (file_id) => {
    try {
      const json = await myFetch(
        `${baseUrl}/favourites/file/${file_id}`,
        "GET"
      );
      return json;
    } catch (error) {
      throw new Error(error.message);
    }
  };

  const getFavourites = async () => {
    try {
      const json = await myFetch(`${baseUrl}/favourites`, "GET");
      return json;
    } catch (error) {
      throw new Error(error.message);
    }
  };

  return {
    postFavourite,
    deleteFavouriteByFileId,
    getFavouritesByFileId,
    getFavourites,
  };
};

export default useFavourite;
