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
    return await myFetch(`${baseUrl}/tags/${tag}`);
  }

  const postUser = async (userCredentials) => {
    try {
      const json = await myFetch(`${baseUrl}/users`, "POST", userCredentials);
      console.log("PostUser()", json);
      return json;
    } catch (error) {
      console.error("postUser():", error.message);
    }
  };

  const checkUsername = async (username) => {
    try {
      const response = await myFetch(`${baseUrl}/users/username/${username}`);
      if (response.available) {
        return response.available;
      }
    } catch (error) {
      console.error("checkUsername():", error.message);
    }
  };

  return { getUserByToken, getUserAvatar, postUser, checkUsername };
};

export default useUser;
