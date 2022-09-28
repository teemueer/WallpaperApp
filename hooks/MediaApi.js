import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useContext, useEffect, useState } from "react";
import { MainContext } from "../contexts/MainContext";
import { baseUrl } from "../utils/config";
import myFetch from "../utils/myFetch";

const fetchUserMedia = () => {
  const [userMedia, setUserMedia] = useState([]);

  const loadUserPosts = async () => {
    try {
      const response = await myFetch(`${baseUrl}/media/user`)
      const media = await Promise.all(
      response.map(async (item) =>{
        const response = await myFetch(`${baseUrl}/media/${item.file_id}`)
        return response;
      })
      );
      setUserMedia(media)
    } catch (error) {
      console.error("loadUserPosts():", error.message);
    }
  };

  useEffect(() => {
    loadUserPosts();
  }, []);

  return { userMedia };
};

export default fetchUserMedia;
