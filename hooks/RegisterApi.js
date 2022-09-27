import { baseUrl } from "../utils/config";
import myFetch from "../utils/myFetch";


const useRegister = () => {

  const postUser = async (userCredentials) => {
    try {
      const json = await myFetch(`${baseUrl}/users`, "POST", userCredentials);
      console.log('PostUser()',json)
      return json;
    } catch (error) {
      console.error('postUser():', error.message);
    }
  };

  const checkUsername = async (username) => {
    try {
        const response = await myFetch(`${baseUrl}/users/username/${username}`)
        if(response.available){
            return response.available;
        }
    } catch (error) {
        console.error("checkUsername():", error.message);
    }
  }

  return { postUser, checkUsername };
};

export default useRegister;
