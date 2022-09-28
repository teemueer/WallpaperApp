import { baseUrl } from "../utils/config";
import myFetch from "../utils/myFetch";

const useUser = () => {
  const getUserByToken = async () => {
    try {
      console.log("getUserByToken");
      const user = await myFetch(`${baseUrl}/users/user`, "GET");
      return user;
    } catch (error) {
      throw new Error(error.message);
    }
  };

  const getUserAvatar = async (tag) => {
    return await myFetch(`${baseUrl}/tags/${tag}`)
  }

  return { getUserByToken, getUserAvatar};
};

export default useUser;
