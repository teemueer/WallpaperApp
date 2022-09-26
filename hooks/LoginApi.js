import AsyncStorage from "@react-native-async-storage/async-storage";
import { baseUrl } from "../utils/config";
import myFetch from "../utils/myFetch";

const useLogin = () => {
  const postLogin = async (userCredentials) => {
    try {
      const json = await myFetch(`${baseUrl}/login`, "POST", userCredentials);
      await AsyncStorage.setItem("userToken", json.token);
      return json;
    } catch (error) {
      throw new Error(error.message);
    }
  };

  return { postLogin };
};

export default useLogin;
