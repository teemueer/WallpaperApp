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

  return { getUserByToken };
};

export default useUser;
