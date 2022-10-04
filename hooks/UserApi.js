import {useContext} from "react";
import {MainContext} from "../contexts/MainContext";
import { baseUrl } from "../utils/config";
import myFetch from "../utils/myFetch";

const useUser = () => {
  const {user, setAvatar} = useContext(MainContext);
  const getUserByToken = async () => {
    try {
      console.log("getUserByToken");
      const user = await myFetch(`${baseUrl}/users/user`, "GET");
      return user;
    } catch (error) {
      throw new Error(error.message);
    }
  };

  const getUserAvatar = async () => {
    try {
      const avatar =  await myFetch(`${baseUrl}/tags/avatar_${user.user_id}`);
      setAvatar(`${baseUrl}/uploads/${avatar[0].filename}`);
    } catch (error) {
      throw new Error(error.message);
    }
  };

  const postUser = async (userCredentials) => {
    try {
      const json = await myFetch(`${baseUrl}/users`, "POST", userCredentials);
      return json;
    } catch (error) {
      throw new Error(error.message);
    }
  };

  // doesnt seem to work
  /*
  const deleteUser = async (user_id) => {
    try {
      const json = await myFetch(`${baseUrl}/users/${user_id}`, "DELETE");
      return json;
    } catch (error) {
      throw new Error(error.message);
    }
  };
  */

  const modifyUser = async (data) => {
    try {
      const json = await myFetch(`${baseUrl}/users`, "PUT", data);
      return json;
    } catch (error) {
      throw new Error(error.message);
    }
  };

  const getUserById = async (id) => {
    try {
      const json = await myFetch(`${baseUrl}/users/${id}`, "GET");
      return json;
    } catch (error) {
      throw new Error(error.message);
    }
  };

  const getUsers = async () => {
    try {
      const json = await myFetch(`${baseUrl}/users`, "GET");
      return json;
    } catch (error) {
      throw new Error(error.message);
    }
  };

  const checkUsername = async (username) => {
    try {
      const res = await myFetch(`${baseUrl}/users/username/${username}`);
      return res.available;
    } catch (error) {
      throw new Error(error.message);
    }
  };

  return {
    getUserByToken,
    getUserAvatar,
    postUser,
    checkUsername,
    /*deleteUser,*/
    modifyUser,
    getUserById,
    getUsers,
  };
};

export default useUser;
